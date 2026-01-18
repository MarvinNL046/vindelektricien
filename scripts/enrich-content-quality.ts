#!/usr/bin/env npx tsx
/**
 * HIGH-QUALITY Content Enrichment Script for Rehab Facilities
 *
 * Generates unique, valuable content per facility for SEO and AdSense approval.
 *
 * Features:
 * - Treatment-type-specific prompts (inpatient, outpatient, detox, etc.)
 * - Uses ALL available context data
 * - Minimum 400 words per page
 * - Variation in opening sentences (no template content)
 * - Quality checks and retry logic
 * - Progress tracking with resume capability
 *
 * Usage:
 *   npx tsx scripts/enrich-content-quality.ts --dry-run      # Preview
 *   npx tsx scripts/enrich-content-quality.ts --batch 50     # First 50
 *   npx tsx scripts/enrich-content-quality.ts --reset        # Start over
 *   npx tsx scripts/enrich-content-quality.ts                # Full run
 */

import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env.openai
dotenv.config({ path: path.join(process.cwd(), '.env.openai') });
dotenv.config({ path: path.join(process.cwd(), '.env.local') }); // Fallback

// =============================================================================
// CONFIGURATION
// =============================================================================

const CONFIG = {
  MODEL: 'gpt-4o-mini',
  MAX_TOKENS: 1500,
  TEMPERATURE: 0.8, // Higher temperature for more variation
  CONCURRENCY: 5,
  MIN_WORDS: 400,
  MAX_RETRIES: 3,
  DELAY_BETWEEN_REQUESTS: 200, // ms
  SAVE_INTERVAL: 25, // Save every 25 entries

  DATA_FILE: path.join(process.cwd(), 'data', 'facilities.json'),
  PROGRESS_FILE: path.join(process.cwd(), 'data', 'enrichment-quality-progress.json'),
  BACKUP_FILE: path.join(process.cwd(), 'data', 'facilities-pre-enrichment.json'),
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface Facility {
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  county?: string;
  slug: string;
  facility_types: string[];
  treatment_types: string[];
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  review_count?: number;
  photo?: string;
  insurance_accepted?: string[];
  amenities?: string[];
  description?: string;
  generated?: any;
  [key: string]: any;
}

interface GeneratedContent {
  summary: string;
  treatment_approach?: string;
  what_to_expect?: string;
  practical_information?: string;
  highlights?: string[];
  visitor_tips?: string[];
}

interface Progress {
  total: number;
  completed: number;
  failed: number;
  skipped: number;
  completedSlugs: string[];
  failedSlugs: string[];
  lastRun: string;
  avgWordCount: number;
}

// =============================================================================
// TREATMENT-TYPE-SPECIFIC PROMPTS
// =============================================================================

const TYPE_CONTEXTS: Record<string, string> = {
  'inpatient': `
This is an INPATIENT REHABILITATION facility. Key aspects to emphasize:
- 24/7 medical supervision and care
- Structured daily routines and therapeutic activities
- Detox services and medical monitoring
- Individual and group therapy sessions
- Safe, supportive residential environment
- Typical length of stay (30, 60, 90 days)
- Benefits of removing from triggers and daily stress
- Family involvement and visitation policies
`,

  'outpatient': `
This is an OUTPATIENT TREATMENT program. Key aspects to emphasize:
- Flexibility to maintain work and family commitments
- Day programs vs. evening programs
- Intensive outpatient (IOP) vs. standard outpatient
- Therapy sessions and support groups
- Drug testing and accountability measures
- Step-down care from inpatient treatment
- Ideal for those with strong support systems at home
- Cost-effectiveness compared to residential treatment
`,

  'detox': `
This is a DETOX CENTER. Key aspects to emphasize:
- Medical supervision during withdrawal
- Medication-assisted treatment (MAT) options
- Safe, comfortable withdrawal management
- Duration typically 3-10 days depending on substance
- 24/7 nursing care and monitoring
- Transition to further treatment after detox
- Addressing both physical and psychological aspects
- Importance of continued treatment after detox
`,

  'sober living': `
This is a SOBER LIVING HOME. Key aspects to emphasize:
- Transitional housing after treatment
- Drug-free living environment
- Peer support and accountability
- House rules and structure
- Often self-pay with reasonable costs
- Duration flexible, typically 3-12 months
- Employment and life skills focus
- Building independent living skills
`,

  'dual diagnosis': `
This is a DUAL DIAGNOSIS treatment facility. Key aspects to emphasize:
- Treating addiction and mental health together
- Common co-occurring disorders (depression, anxiety, PTSD, bipolar)
- Integrated treatment approach
- Psychiatric evaluation and medication management
- Specialized therapy modalities
- Importance of treating both conditions simultaneously
- Higher success rates with dual diagnosis care
- Long-term recovery planning
`,

  'luxury': `
This is a LUXURY REHABILITATION CENTER. Key aspects to emphasize:
- Upscale amenities and comfortable accommodations
- Private or semi-private rooms
- Gourmet meals and nutrition programs
- Holistic therapies (yoga, meditation, acupuncture)
- Beautiful settings and grounds
- Executive program options for professionals
- High staff-to-client ratios
- Comprehensive aftercare planning
`,

  'adolescent': `
This is an ADOLESCENT TREATMENT program. Key aspects to emphasize:
- Age-appropriate treatment approaches
- Academic support and educational services
- Family therapy and involvement
- Addressing underlying trauma and peer pressure
- Building healthy coping skills
- Recreational and creative therapies
- Life skills development
- Transition back to school and community
`,

  'veterans': `
This is a VETERANS treatment program. Key aspects to emphasize:
- Understanding military culture and experiences
- PTSD and combat-related trauma treatment
- VA benefits and insurance accepted
- Peer support from fellow veterans
- Treatment for service-related injuries
- Reintegration support
- Family and relationship counseling
- Career transition assistance
`,
};

const OPENING_VARIATIONS = [
  'In the heart of {city} stands',
  'Nestled in {state} is',
  'For those seeking recovery in {city},',
  'Among the treatment options in {state},',
  'When searching for help in {city},',
  'Located in the {state} community of {city} is',
  'For individuals and families in {city},',
  'A beacon of hope in {state} is',
  'Supporting recovery in {city} is',
  'Dedicated to healing in {state} is',
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getTypeContext(facilityTypes: string[]): string {
  const types = (facilityTypes || []).map(t => t.toLowerCase()).join(' ');

  for (const [key, context] of Object.entries(TYPE_CONTEXTS)) {
    if (types.includes(key)) {
      return context;
    }
  }

  // Default for general treatment center
  return `
This is a GENERAL ADDICTION TREATMENT facility. Key aspects to emphasize:
- Comprehensive addiction treatment services
- Evidence-based therapies and approaches
- Individual and group counseling
- Support for various substance use disorders
- Aftercare planning and support
- Family involvement opportunities
- Connection to local recovery community
- Path to lasting recovery
`;
}

function buildContextString(facility: Facility): string {
  const parts: string[] = [];

  if (facility.facility_types?.length > 0) {
    parts.push(`Facility Types: ${facility.facility_types.join(', ')}`);
  }
  if (facility.treatment_types?.length > 0) {
    parts.push(`Treatment Specializations: ${facility.treatment_types.join(', ')}`);
  }
  if (facility.insurance_accepted?.length > 0) {
    parts.push(`Insurance Accepted: ${facility.insurance_accepted.slice(0, 5).join(', ')}${facility.insurance_accepted.length > 5 ? ', and more' : ''}`);
  }
  if (facility.amenities?.length > 0) {
    parts.push(`Amenities: ${facility.amenities.join(', ')}`);
  }
  if (facility.rating && facility.review_count) {
    parts.push(`Rating: ${facility.rating}/5 (${facility.review_count} reviews)`);
  }
  if (facility.phone) {
    parts.push(`Contact: ${facility.phone}`);
  }
  if (facility.website) {
    parts.push(`Website available`);
  }

  return parts.join('\n');
}

function createPrompt(facility: Facility): string {
  const typeContext = getTypeContext(facility.facility_types || []);
  const dataContext = buildContextString(facility);
  const randomOpening = OPENING_VARIATIONS[Math.floor(Math.random() * OPENING_VARIATIONS.length)];

  return `You are an experienced writer specializing in addiction treatment and recovery resources in the United States.

TASK: Write an informative, unique, and engaging description for this rehabilitation facility.

=== FACILITY INFORMATION ===
Name: ${facility.name}
City: ${facility.city}
State: ${facility.state}
County: ${facility.county || 'N/A'}
${facility.address ? `Address: ${facility.address}` : ''}

=== AVAILABLE DATA ===
${dataContext || 'Limited additional information available.'}

=== TREATMENT TYPE CONTEXT ===
${typeContext}

=== WRITING INSTRUCTIONS ===

1. LENGTH: Write MINIMUM 400 words, preferably 450-500 words.

2. OPENING: Do NOT begin with "${facility.name} is a..."
   Use a creative opening, variations like: "${randomOpening}"

3. STRUCTURE: Naturally weave these elements into your text:
   - An atmospheric introduction that draws the reader in
   - Overview of treatment approach and philosophy
   - What clients can expect during treatment
   - Practical information for those considering treatment
   - What makes this facility stand out

4. TONE: Compassionate, professional, and hopeful. Not clinical or salesy.

5. LOCAL RELEVANCE: Reference ${facility.city} and ${facility.state}.
   Make the content relevant for people searching in this area.

6. UNIQUENESS: Every sentence should add value. No filler or generic content.

7. SEO: Naturally incorporate terms: "${facility.name}", "rehab ${facility.city}", "addiction treatment ${facility.state}".

8. CALL TO ACTION: End with encouraging words about taking the first step toward recovery.

=== OUTPUT FORMAT (JSON) ===
{
  "summary": "The main text of at least 400 words",
  "treatment_approach": "2-3 sentences about treatment philosophy if applicable",
  "what_to_expect": "2-3 sentences about what to expect during treatment",
  "practical_information": "Key practical info for prospective clients",
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "visitor_tips": ["Tip 1", "Tip 2"]
}

IMPORTANT: The "summary" must be the main text of at least 400 words. This is the most important content.`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function validateContent(content: GeneratedContent, facility: Facility): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  const wordCount = countWords(content.summary || '');
  if (wordCount < CONFIG.MIN_WORDS) {
    issues.push(`Too few words: ${wordCount} (minimum: ${CONFIG.MIN_WORDS})`);
  }

  // Check for template-like openings
  const templateOpenings = [
    `${facility.name} is a`,
    `${facility.name} is an`,
    `This is a treatment`,
    `This facility is`,
  ];

  const summary = content.summary?.toLowerCase() || '';
  for (const template of templateOpenings) {
    if (summary.startsWith(template.toLowerCase())) {
      issues.push(`Template-like opening detected: "${template}..."`);
      break;
    }
  }

  // Check for overly generic content
  const genericPhrases = [
    'offers comprehensive treatment',
    'provides quality care',
    'serves the community',
  ];

  let genericCount = 0;
  for (const phrase of genericPhrases) {
    if (summary.includes(phrase.toLowerCase())) {
      genericCount++;
    }
  }
  if (genericCount >= 2) {
    issues.push('Too many generic phrases detected');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

// =============================================================================
// MAIN ENRICHMENT LOGIC
// =============================================================================

async function enrichFacility(
  openai: OpenAI,
  facility: Facility,
  attempt: number = 1
): Promise<GeneratedContent | null> {
  try {
    const prompt = createPrompt(facility);

    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert in addiction treatment and recovery resources. You write unique, informative content that helps people find the right treatment. Always respond in valid JSON format.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: CONFIG.TEMPERATURE,
      max_tokens: CONFIG.MAX_TOKENS,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content || '{}';
    const parsed = JSON.parse(content) as GeneratedContent;

    // Validate
    const validation = validateContent(parsed, facility);

    if (!validation.valid && attempt < CONFIG.MAX_RETRIES) {
      console.log(`   Warning: Validation failed: ${validation.issues.join(', ')}`);
      console.log(`   Retry ${attempt + 1}/${CONFIG.MAX_RETRIES}...`);
      await sleep(1000);
      return enrichFacility(openai, facility, attempt + 1);
    }

    if (!validation.valid) {
      console.log(`   Failed validation after ${CONFIG.MAX_RETRIES} attempts`);
      return null;
    }

    return parsed;

  } catch (error: any) {
    if (attempt < CONFIG.MAX_RETRIES) {
      console.log(`   Error: ${error.message}, retry ${attempt + 1}...`);
      await sleep(2000);
      return enrichFacility(openai, facility, attempt + 1);
    }
    console.error(`   Failed after ${CONFIG.MAX_RETRIES} attempts:`, error.message);
    return null;
  }
}

// =============================================================================
// PROGRESS MANAGEMENT
// =============================================================================

function loadProgress(): Progress {
  try {
    if (fs.existsSync(CONFIG.PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG.PROGRESS_FILE, 'utf-8'));
    }
  } catch (e) {}

  return {
    total: 0,
    completed: 0,
    failed: 0,
    skipped: 0,
    completedSlugs: [],
    failedSlugs: [],
    lastRun: new Date().toISOString(),
    avgWordCount: 0,
  };
}

function saveProgress(progress: Progress): void {
  progress.lastRun = new Date().toISOString();
  fs.writeFileSync(CONFIG.PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function loadFacilities(): Facility[] {
  return JSON.parse(fs.readFileSync(CONFIG.DATA_FILE, 'utf-8'));
}

function saveFacilities(facilities: Facility[]): void {
  fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(facilities, null, 2));
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const reset = args.includes('--reset');
  const batchArg = args.find(a => a.startsWith('--batch'));
  const batchSize = batchArg ? parseInt(args[args.indexOf(batchArg) + 1]) : Infinity;

  console.log('');
  console.log('HIGH-QUALITY Content Enrichment for Rehab Facilities');
  console.log('=====================================================');
  console.log(`Model: ${CONFIG.MODEL}`);
  console.log(`Minimum words: ${CONFIG.MIN_WORDS}`);
  console.log(`Dry run: ${dryRun}`);
  console.log('');

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY not found in environment');
    console.log('   Set: export OPENAI_API_KEY=sk-...');
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  // Load data
  console.log('Loading data...');
  const facilities = loadFacilities();
  let progress = reset ? loadProgress() : loadProgress();

  if (reset) {
    progress = {
      total: 0, completed: 0, failed: 0, skipped: 0,
      completedSlugs: [], failedSlugs: [],
      lastRun: new Date().toISOString(), avgWordCount: 0,
    };
  }

  console.log(`   Total facilities: ${facilities.length}`);
  console.log(`   Already processed: ${progress.completedSlugs.length}`);

  // Filter entries to process
  const toProcess = facilities.filter(f => {
    // Skip if already processed
    if (progress.completedSlugs.includes(f.slug)) return false;

    // Check if current generated content is good enough
    const gen = f.generated;
    if (gen && typeof gen === 'object') {
      const summary = gen.summary || '';
      const words = countWords(summary);
      if (words >= CONFIG.MIN_WORDS) {
        return false; // Already has good content
      }
    }

    return true;
  });

  console.log(`   To process: ${toProcess.length}`);
  console.log('');

  if (toProcess.length === 0) {
    console.log('All entries already have good content!');
    return;
  }

  // Dry run
  if (dryRun) {
    console.log('DRY RUN - First 5 entries:');
    for (const f of toProcess.slice(0, 5)) {
      const gen = f.generated?.summary || '';
      const words = countWords(gen);
      console.log(`   - ${f.name} (${f.city}, ${f.state})`);
      console.log(`     Current words: ${words}`);
    }
    console.log('');
    console.log(`Total to process: ${Math.min(toProcess.length, batchSize)}`);
    return;
  }

  // Create backup
  if (!fs.existsSync(CONFIG.BACKUP_FILE)) {
    console.log('Creating backup...');
    fs.copyFileSync(CONFIG.DATA_FILE, CONFIG.BACKUP_FILE);
  }

  // Process
  const processCount = Math.min(toProcess.length, batchSize);
  console.log(`Processing ${processCount} entries...`);
  console.log('');

  let totalWords = 0;
  let successCount = 0;

  for (let i = 0; i < processCount; i++) {
    const facility = toProcess[i];
    const pct = Math.round((i / processCount) * 100);

    process.stdout.write(`[${pct}%] ${i + 1}/${processCount}: ${facility.name.substring(0, 40)}...`);

    const content = await enrichFacility(openai, facility);

    if (content) {
      // Update facility
      const idx = facilities.findIndex(f => f.slug === facility.slug);
      if (idx !== -1) {
        facilities[idx].generated = content;

        // Update stats
        const words = countWords(content.summary);
        totalWords += words;
        successCount++;

        console.log(` ${words} words`);

        progress.completedSlugs.push(facility.slug);
        progress.completed++;
      }
    } else {
      console.log(' Failed');
      progress.failedSlugs.push(facility.slug);
      progress.failed++;
    }

    // Save periodically
    if ((i + 1) % CONFIG.SAVE_INTERVAL === 0) {
      console.log(`   Saving progress...`);
      saveFacilities(facilities);
      saveProgress(progress);
    }

    // Rate limiting
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Final save
  saveFacilities(facilities);
  progress.avgWordCount = successCount > 0 ? Math.round(totalWords / successCount) : 0;
  saveProgress(progress);

  // Summary
  console.log('');
  console.log('=====================================================');
  console.log('RESULTS');
  console.log('=====================================================');
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${progress.failed}`);
  console.log(`Average words: ${progress.avgWordCount}`);
  console.log(`Data saved to: ${CONFIG.DATA_FILE}`);
  console.log('');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nStopped by user. Progress has been saved.');
  process.exit(0);
});

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
