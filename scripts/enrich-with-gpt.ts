import fs from 'fs/promises';
import path from 'path';
import { OpenAI } from 'openai';
import chalk from 'chalk';
import ora from 'ora';
import pLimit from 'p-limit';
import cliProgress from 'cli-progress';
import { config } from 'dotenv';

// Load environment variables
config({ path: path.join(__dirname, '..', '.env.openai') });

// Configuration
const CONFIG = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  MODEL: 'gpt-4o-mini',
  MAX_TOKENS: 1200,
  TEMPERATURE: 0.7,
  CONCURRENCY: 15,
  INPUT_DIR: path.join(__dirname, '..', 'data', 'scraped-brightdata'),
  JINA_SCRAPED_DIR: path.join(__dirname, '..', 'data', 'scraped-facilities'),
  OUTPUT_DIR: path.join(__dirname, '..', 'data', 'enriched-content'),
  PROGRESS_FILE: path.join(__dirname, '..', 'data', 'enriched-content', 'progress.json'),
};

// Types
interface ScrapedData {
  slug: string;
  name: string;
  city: string;
  state: string;
  facility_types: string[];
  treatment_types: string[];
  websiteData?: any;
  googleData?: any;
}

interface EnrichedContent {
  slug: string;
  name: string;
  city: string;
  state: string;
  facility_types: string[];
  treatment_types: string[];
  seoTitle: string;
  seoDescription: string;
  content: string;
  highlights: string[];
  praktischeInfo: {
    openingstijden?: string;
    adres?: string;
    contact?: string;
    parkeren?: string;
    toegankelijkheid?: string;
  };
  treatmentPrograms?: string;
  amenities?: string[];
  enrichedAt: string;
  wordCount: number;
}

// Progress tracking
let progress = {
  total: 0,
  completed: 0,
  failed: 0,
  completedSlugs: [] as string[],
  failedSlugs: [] as string[],
};

// Load Jina-scraped content for a facility
async function loadJinaContent(slug: string): Promise<string | null> {
  try {
    // Try to find matching Jina-scraped file
    const files = await fs.readdir(CONFIG.JINA_SCRAPED_DIR);
    const matchingFile = files.find(f =>
      f.toLowerCase().includes(slug.toLowerCase().split('-')[0]) &&
      f.endsWith('.json')
    );

    if (matchingFile) {
      const jinaPath = path.join(CONFIG.JINA_SCRAPED_DIR, matchingFile);
      const data = JSON.parse(await fs.readFile(jinaPath, 'utf-8'));

      if (data.rawContent || data.about) {
        // Return combined content from Jina scrape
        const content = [data.rawContent, data.about].filter(Boolean).join('\n\n');
        return content.substring(0, 3000);
      }
    }
    return null;
  } catch {
    // No Jina content available
    return null;
  }
}

// Create the perfect SEO prompt
function createEnrichmentPrompt(data: ScrapedData, jinaContent: string | null): string {
  const websiteContent = data.websiteData?.rawContent || '';
  const googleContent = data.googleData?.results || '';
  const jinaSection = jinaContent
    ? `\n\nEXTRA INFORMATION FROM EXTERNAL SOURCES:\n${jinaContent}\n`
    : '';

  return `You are an SEO specialist and content writer for US rehabilitation and addiction treatment centers.

Write a rich, informative, and SEO-optimized description for this treatment facility:

FACILITY INFORMATION:
- Name: ${data.name}
- City: ${data.city}
- State: ${data.state}
- Facility Types: ${data.facility_types?.join(', ') || 'Treatment Center'}
- Treatment Types: ${data.treatment_types?.join(', ') || 'Addiction Treatment'}

AVAILABLE INFORMATION:
${websiteContent.substring(0, 2000)}
${googleContent.substring(0, 2000)}${jinaSection}

INSTRUCTIONS:
1. Write an engaging, informative text of MINIMUM 350 and MAXIMUM 400 words
2. Start with a compelling opening sentence that captures the essence of this facility
3. Naturally incorporate keywords: "${data.name}", "${data.city}", "rehab", "${data.state}", "addiction treatment"
4. Write in a warm, supportive, but professional tone
5. Include practical information where available
6. Add context about treatment programs if known
7. Make it locally relevant (mention nearby landmarks, accessibility)
8. End with an invitation to reach out for help
9. IMPORTANT: The text must be between 350-400 words

FORMAT RESPONSE (JSON):
{
  "seoTitle": "Short, compelling SEO title (max 60 characters)",
  "seoDescription": "Meta description for Google (max 155 characters)",
  "content": "The main text (350-400 words)",
  "highlights": [
    "First highlight/feature",
    "Second highlight/feature",
    "Third highlight/feature",
    "Fourth highlight/feature"
  ],
  "praktischeInfo": {
    "openingstijden": "24/7 or business hours if known",
    "adres": "Full address if known",
    "contact": "Phone number or email if known",
    "parkeren": "Parking information",
    "toegankelijkheid": "Accessibility info"
  },
  "treatmentPrograms": "Brief description of treatment programs offered",
  "amenities": [
    "Amenity or service 1",
    "Amenity or service 2",
    "Amenity or service 3"
  ]
}

EXAMPLE HIGHLIGHTS (use this format):
- Accredited inpatient rehabilitation facility
- Evidence-based treatment programs
- Experienced medical and clinical staff
- Insurance accepted and financing options available

Ensure the content is unique and adds value for visitors seeking information about this treatment facility.`;
}

// Initialize OpenAI client
function initOpenAI(): OpenAI {
  if (!CONFIG.OPENAI_API_KEY) {
    console.error(chalk.red('OPENAI_API_KEY not found in .env.openai'));
    console.log(chalk.yellow('Please create .env.openai with:'));
    console.log(chalk.gray('OPENAI_API_KEY=your-api-key-here'));
    process.exit(1);
  }

  return new OpenAI({
    apiKey: CONFIG.OPENAI_API_KEY,
  });
}

// Enrich single facility
async function enrichFacility(
  openai: OpenAI,
  scrapedData: ScrapedData
): Promise<EnrichedContent | null> {
  try {
    // Load Jina-scraped content if available
    const jinaContent = await loadJinaContent(scrapedData.slug);
    const prompt = createEnrichmentPrompt(scrapedData, jinaContent);

    const response = await openai.chat.completions.create({
      model: CONFIG.MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert in writing SEO-optimized content for US rehabilitation and addiction treatment centers. Always respond in perfect JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: CONFIG.TEMPERATURE,
      max_tokens: CONFIG.MAX_TOKENS,
      response_format: { type: 'json_object' },
    });

    let enrichedData;
    try {
      const content = response.choices[0].message.content || '{}';
      // Clean up common JSON issues
      const cleanedContent = content
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
        .replace(/\n/g, '\\n') // Escape newlines in strings
        .replace(/\r/g, '\\r') // Escape carriage returns
        .trim();

      enrichedData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error(chalk.yellow(`JSON parse error for ${scrapedData.slug}, retrying...`));
      // Retry with a simpler prompt
      const retryResponse = await openai.chat.completions.create({
        model: CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in writing SEO-optimized content for US rehabilitation centers. Always respond in perfect JSON format. Do not use newlines within string values.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: CONFIG.TEMPERATURE,
        max_tokens: CONFIG.MAX_TOKENS,
        response_format: { type: 'json_object' },
      });

      enrichedData = JSON.parse(retryResponse.choices[0].message.content || '{}');
    }

    // Count words in content
    const wordCount = enrichedData.content ? enrichedData.content.split(/\s+/).length : 0;

    return {
      slug: scrapedData.slug,
      name: scrapedData.name,
      city: scrapedData.city,
      state: scrapedData.state,
      facility_types: scrapedData.facility_types,
      treatment_types: scrapedData.treatment_types,
      ...enrichedData,
      enrichedAt: new Date().toISOString(),
      wordCount,
    };

  } catch (error: any) {
    console.error(chalk.red(`Failed to enrich ${scrapedData.slug}:`), error.message);
    return null;
  }
}

// Load progress
async function loadProgress(): Promise<void> {
  try {
    const data = await fs.readFile(CONFIG.PROGRESS_FILE, 'utf-8');
    progress = JSON.parse(data);
  } catch {
    // Fresh start
  }
}

// Save progress
async function saveProgress(): Promise<void> {
  await fs.writeFile(CONFIG.PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Main enrichment function
async function main() {
  console.log(chalk.bold.blue('\n🤖 GPT Enrichment Pipeline for Rehab Facilities\n'));

  // Initialize OpenAI
  const openai = initOpenAI();

  // Ensure output directory
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  // Load progress
  await loadProgress();

  // Get all scraped files
  const files = await fs.readdir(CONFIG.INPUT_DIR);
  const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'progress.json' && f !== 'summary.json');

  console.log(chalk.cyan(`Found ${jsonFiles.length} scraped facilities to enrich`));

  // Filter already processed
  const toProcess = jsonFiles.filter(f => {
    const slug = f.replace('.json', '');
    return !progress.completedSlugs.includes(slug);
  });

  if (toProcess.length === 0) {
    console.log(chalk.green('All facilities already enriched!'));
    return;
  }

  console.log(chalk.yellow(`Processing ${toProcess.length} facilities...\n`));

  // Progress bar
  const progressBar = new cliProgress.SingleBar({
    format: 'Enriching |{bar}| {percentage}% | {value}/{total} | {filename}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  });

  progressBar.start(toProcess.length, 0, { filename: 'Starting...' });

  // Process with concurrency limit
  const limit = pLimit(CONFIG.CONCURRENCY);
  let processed = 0;

  const tasks = toProcess.map(filename =>
    limit(async () => {
      try {
        // Load scraped data
        const scrapedPath = path.join(CONFIG.INPUT_DIR, filename);
        const scrapedData = JSON.parse(await fs.readFile(scrapedPath, 'utf-8'));

        // Enrich with GPT
        const enriched = await enrichFacility(openai, scrapedData);

        if (enriched) {
          // Save enriched content
          const outputPath = path.join(CONFIG.OUTPUT_DIR, filename);
          await fs.writeFile(outputPath, JSON.stringify(enriched, null, 2));

          progress.completed++;
          progress.completedSlugs.push(scrapedData.slug);

          // Quick quality check
          if (enriched.wordCount < 300) {
            console.log(chalk.yellow(`\nShort content for ${scrapedData.name}: ${enriched.wordCount} words`));
          }
        } else {
          progress.failed++;
          progress.failedSlugs.push(filename.replace('.json', ''));
        }

        processed++;
        progressBar.update(processed, { filename: scrapedData.name || filename });

        // Save progress periodically
        if (processed % 10 === 0) {
          await saveProgress();
        }

      } catch (error: any) {
        console.error(chalk.red(`\nError processing ${filename}:`), error.message);
        progress.failed++;
      }
    })
  );

  await Promise.all(tasks);

  progressBar.stop();

  // Final save
  progress.total = jsonFiles.length;
  await saveProgress();

  // Summary
  console.log(chalk.bold.green('\n Enrichment Complete!\n'));
  console.log(chalk.white(`Total processed: ${progress.completed}`));
  console.log(chalk.red(`Failed: ${progress.failed}`));
  console.log(chalk.cyan(`Output directory: ${CONFIG.OUTPUT_DIR}`));

  // Show example
  if (progress.completed > 0) {
    console.log(chalk.yellow('\nExample enriched content:'));
    const exampleFile = `${progress.completedSlugs[0]}.json`;
    const examplePath = path.join(CONFIG.OUTPUT_DIR, exampleFile);
    const example = JSON.parse(await fs.readFile(examplePath, 'utf-8'));

    console.log(chalk.gray('\nSEO Title:'), example.seoTitle);
    console.log(chalk.gray('SEO Description:'), example.seoDescription);
    console.log(chalk.gray('Word count:'), example.wordCount);
    console.log(chalk.gray('\nHighlights:'));
    example.highlights.forEach((h: string) => console.log(chalk.gray(h)));
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { enrichFacility, createEnrichmentPrompt };
