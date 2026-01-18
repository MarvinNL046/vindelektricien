/**
 * US Rehab Facility Scraper via Jina.ai Reader API
 *
 * This script scrapes rehab facility data from various US treatment center directories:
 * - SAMHSA treatment locator data
 * - rehabs.com style directory sites
 * - treatment center directories
 *
 * Purpose: Get additional descriptive content that GPT can use
 * to write unique "About" sections for each facility page.
 *
 * Pipeline:
 * 1. Bright Data SERP → Base facility data (location, ratings, photos)
 * 2. Jina.ai → Extra content (descriptions, treatment types, insurance info)
 * 3. OpenAI GPT → Generate unique "About" sections
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Jina.ai API configuration
const JINA_API_KEY = process.env.JINA_API_KEY || '';
const JINA_READER_URL = 'https://r.jina.ai/';

if (!JINA_API_KEY) {
  console.error('❌ JINA_API_KEY not found in environment variables');
  process.exit(1);
}

// US States with their abbreviations
const US_STATES = [
  { name: 'Alabama', abbrev: 'AL' },
  { name: 'Alaska', abbrev: 'AK' },
  { name: 'Arizona', abbrev: 'AZ' },
  { name: 'Arkansas', abbrev: 'AR' },
  { name: 'California', abbrev: 'CA' },
  { name: 'Colorado', abbrev: 'CO' },
  { name: 'Connecticut', abbrev: 'CT' },
  { name: 'Delaware', abbrev: 'DE' },
  { name: 'Florida', abbrev: 'FL' },
  { name: 'Georgia', abbrev: 'GA' },
  { name: 'Hawaii', abbrev: 'HI' },
  { name: 'Idaho', abbrev: 'ID' },
  { name: 'Illinois', abbrev: 'IL' },
  { name: 'Indiana', abbrev: 'IN' },
  { name: 'Iowa', abbrev: 'IA' },
  { name: 'Kansas', abbrev: 'KS' },
  { name: 'Kentucky', abbrev: 'KY' },
  { name: 'Louisiana', abbrev: 'LA' },
  { name: 'Maine', abbrev: 'ME' },
  { name: 'Maryland', abbrev: 'MD' },
  { name: 'Massachusetts', abbrev: 'MA' },
  { name: 'Michigan', abbrev: 'MI' },
  { name: 'Minnesota', abbrev: 'MN' },
  { name: 'Mississippi', abbrev: 'MS' },
  { name: 'Missouri', abbrev: 'MO' },
  { name: 'Montana', abbrev: 'MT' },
  { name: 'Nebraska', abbrev: 'NE' },
  { name: 'Nevada', abbrev: 'NV' },
  { name: 'New Hampshire', abbrev: 'NH' },
  { name: 'New Jersey', abbrev: 'NJ' },
  { name: 'New Mexico', abbrev: 'NM' },
  { name: 'New York', abbrev: 'NY' },
  { name: 'North Carolina', abbrev: 'NC' },
  { name: 'North Dakota', abbrev: 'ND' },
  { name: 'Ohio', abbrev: 'OH' },
  { name: 'Oklahoma', abbrev: 'OK' },
  { name: 'Oregon', abbrev: 'OR' },
  { name: 'Pennsylvania', abbrev: 'PA' },
  { name: 'Rhode Island', abbrev: 'RI' },
  { name: 'South Carolina', abbrev: 'SC' },
  { name: 'South Dakota', abbrev: 'SD' },
  { name: 'Tennessee', abbrev: 'TN' },
  { name: 'Texas', abbrev: 'TX' },
  { name: 'Utah', abbrev: 'UT' },
  { name: 'Vermont', abbrev: 'VT' },
  { name: 'Virginia', abbrev: 'VA' },
  { name: 'Washington', abbrev: 'WA' },
  { name: 'West Virginia', abbrev: 'WV' },
  { name: 'Wisconsin', abbrev: 'WI' },
  { name: 'Wyoming', abbrev: 'WY' },
  { name: 'District of Columbia', abbrev: 'DC' },
  { name: 'Puerto Rico', abbrev: 'PR' },
];

interface FacilityBasic {
  name: string;
  city: string;
  county?: string;
  state: string;
  stateAbbrev: string;
  url: string;
  source: string;
}

interface FacilityDetail extends FacilityBasic {
  address?: string;
  zipCode?: string;
  facilityType?: string;
  treatmentTypes?: string[];
  insuranceAccepted?: string[];
  established?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  phone?: string;
  website?: string;
  description?: string;
  services?: string;
  accreditations?: string[];
  amenities?: string[];
  capacity?: number;
  staffCount?: number;
  photoUrl?: string;
  rawContent?: string; // For GPT enrichment
}

interface ScrapeProgress {
  lastState: string;
  lastSource: string;
  lastIndex: number;
  completedStates: string[];
  totalScraped: number;
  timestamp: string;
}

// Rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with Jina.ai Reader
async function fetchWithJina(url: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log('   Fetching:', url.substring(0, 80) + (url.length > 80 ? '...' : ''));

      const response = await fetch(JINA_READER_URL + url, {
        headers: {
          'Authorization': 'Bearer ' + JINA_API_KEY,
          'Accept': 'text/plain',
          'X-Return-Format': 'text'
        }
      });

      if (!response.ok) {
        throw new Error('Jina fetch failed: ' + response.status + ' ' + response.statusText);
      }

      const text = await response.text();
      console.log('   Received ' + text.length + ' characters');
      return text;
    } catch (error) {
      if (attempt === retries) throw error;
      console.log('   Attempt ' + attempt + ' failed, retrying...');
      await delay(2000 * attempt);
    }
  }
  throw new Error('Max retries exceeded');
}

// Parse SAMHSA state page
function parseSamhsaStatePage(content: string, state: { name: string; abbrev: string }): FacilityBasic[] {
  const facilities: FacilityBasic[] = [];

  // Look for facility links in markdown format
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/findtreatment\.samhsa\.gov\/[^)]+)\)/g;

  let match;
  while ((match = linkPattern.exec(content)) !== null) {
    const name = match[1].trim();
    const url = match[2];

    // Extract county from URL path or content context
    const pathMatch = url.match(/\/locator\/[^/]+\/([^/]+)\//);
    const county = pathMatch
      ? pathMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : undefined;

    // Skip navigation links
    if (name.toLowerCase().includes('back to') || name.toLowerCase().includes('index')) {
      continue;
    }

    facilities.push({
      name,
      city: '',
      county,
      state: state.name,
      stateAbbrev: state.abbrev,
      url,
      source: 'samhsa.gov'
    });
  }

  return facilities;
}

// Parse SAMHSA detail page for extra content
function parseSamhsaDetailPage(content: string, basic: FacilityBasic): FacilityDetail {
  const detail: FacilityDetail = { ...basic };

  // Store raw content for GPT enrichment (trimmed to reasonable size)
  detail.rawContent = content.substring(0, 3000);

  // Location extraction
  const locationMatch = content.match(/Location[:\s]+([^\n]+)/i);
  if (locationMatch) {
    const loc = locationMatch[1].trim();
    const cityMatch = loc.match(/^([^,]+),?\s*(?:County)?/i);
    if (cityMatch) {
      detail.city = cityMatch[1].trim();
    }
  }

  // County extraction
  const countyMatch = content.match(/(?:County|Parish)[:\s]+([^\n,]+)/i);
  if (countyMatch) {
    detail.county = countyMatch[1].trim();
  }

  // GPS coordinates
  const gpsMatch = content.match(/GPS[:\s]+(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/i);
  if (gpsMatch) {
    detail.coordinates = {
      latitude: parseFloat(gpsMatch[1]),
      longitude: parseFloat(gpsMatch[2])
    };
  }

  // Treatment types
  const treatmentTypes: string[] = [];
  const treatmentPatterns = [
    /inpatient/i,
    /outpatient/i,
    /detox/i,
    /residential/i,
    /dual diagnosis/i,
    /medication-assisted/i,
    /intensive outpatient/i
  ];

  for (const pattern of treatmentPatterns) {
    if (pattern.test(content)) {
      treatmentTypes.push(pattern.source.replace(/\//g, '').replace(/\\i/, ''));
    }
  }
  if (treatmentTypes.length > 0) {
    detail.treatmentTypes = treatmentTypes;
  }

  // Insurance accepted
  const insuranceTypes: string[] = [];
  const insurancePatterns = [
    'Medicare',
    'Medicaid',
    'Private Insurance',
    'Self-Pay',
    'Sliding Scale',
    'State-Funded',
    'Military Insurance'
  ];

  for (const insurance of insurancePatterns) {
    if (content.toLowerCase().includes(insurance.toLowerCase())) {
      insuranceTypes.push(insurance);
    }
  }
  if (insuranceTypes.length > 0) {
    detail.insuranceAccepted = insuranceTypes;
  }

  // Capacity
  const capacityMatch = content.match(/capacity[:\s]+(\d+)/i);
  if (capacityMatch) {
    detail.capacity = parseInt(capacityMatch[1]);
  }

  // Year established
  const yearMatch = content.match(/(?:established|founded|since)[:\s]+(\d{4})/i);
  if (yearMatch) {
    detail.established = yearMatch[1];
  }

  // Accreditations
  const accreditations: string[] = [];
  const accreditationPatterns = [
    'CARF',
    'Joint Commission',
    'LegitScript',
    'SAMHSA',
    'State Licensed',
    'NAATP'
  ];

  for (const accreditation of accreditationPatterns) {
    if (content.includes(accreditation)) {
      accreditations.push(accreditation);
    }
  }
  if (accreditations.length > 0) {
    detail.accreditations = accreditations;
  }

  // Services description - look for substantial text
  const lines = content.split('\n').filter(line =>
    line.length > 100 &&
    !line.startsWith('[') &&
    !line.startsWith('http') &&
    !line.includes('Navigation')
  );
  if (lines.length > 0) {
    detail.services = lines.slice(0, 3).join(' ').substring(0, 1000);
  }

  return detail;
}

// Progress management
function getOutputDir(): string {
  return path.join(__dirname, '..', '..', 'data', 'scraped-facilities');
}

function loadProgress(): ScrapeProgress {
  const progressPath = path.join(getOutputDir(), 'progress.json');

  if (fs.existsSync(progressPath)) {
    return JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
  }

  return {
    lastState: '',
    lastSource: '',
    lastIndex: 0,
    completedStates: [],
    totalScraped: 0,
    timestamp: new Date().toISOString()
  };
}

function saveProgress(progress: ScrapeProgress): void {
  const outputDir = getOutputDir();
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const progressPath = path.join(outputDir, 'progress.json');
  progress.timestamp = new Date().toISOString();
  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
}

function saveStateData(state: string, source: string, data: FacilityDetail[]): void {
  const outputDir = getOutputDir();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = state.toLowerCase().replace(/\s+/g, '-') + '-' + source.replace(/\./g, '-') + '.json';
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log('Saved ' + data.length + ' facilities for ' + state + ' (' + source + ')');
}

function combineAllData(): void {
  const outputDir = getOutputDir();
  const allData: FacilityDetail[] = [];

  if (!fs.existsSync(outputDir)) {
    console.log('No data to combine yet');
    return;
  }

  const files = fs.readdirSync(outputDir).filter(f =>
    f.endsWith('.json') &&
    f !== 'progress.json' &&
    f !== 'all-facilities.json' &&
    f !== 'summary.json'
  );

  for (const file of files) {
    const filePath = path.join(outputDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allData.push(...data);
  }

  // Remove duplicates by URL
  const unique = Array.from(new Map(allData.map(f => [f.url, f])).values());

  // Save combined data
  const combinedPath = path.join(outputDir, 'all-facilities.json');
  fs.writeFileSync(combinedPath, JSON.stringify(unique, null, 2));

  console.log('\nTotal: ' + unique.length + ' unique facilities combined');

  // Create summary
  const summary: Record<string, unknown> = {
    total: unique.length,
    byState: {} as Record<string, number>,
    bySource: {} as Record<string, number>,
    byType: {} as Record<string, number>,
    withAddress: unique.filter(f => f.address).length,
    withCoordinates: unique.filter(f => f.coordinates).length,
    withTreatmentTypes: unique.filter(f => f.treatmentTypes && f.treatmentTypes.length > 0).length,
    withInsurance: unique.filter(f => f.insuranceAccepted && f.insuranceAccepted.length > 0).length,
    withAccreditations: unique.filter(f => f.accreditations && f.accreditations.length > 0).length,
    withServices: unique.filter(f => f.services).length,
    lastUpdated: new Date().toISOString()
  };

  const byState = summary.byState as Record<string, number>;
  const bySource = summary.bySource as Record<string, number>;
  const byType = summary.byType as Record<string, number>;

  for (const facility of unique) {
    byState[facility.state] = (byState[facility.state] || 0) + 1;
    bySource[facility.source] = (bySource[facility.source] || 0) + 1;
    if (facility.facilityType) {
      byType[facility.facilityType] = (byType[facility.facilityType] || 0) + 1;
    }
  }

  const summaryPath = path.join(outputDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log('Summary saved to ' + summaryPath);
}

// Main scraping function for SAMHSA
async function scrapeSamhsa(states: typeof US_STATES, progress: ScrapeProgress): Promise<void> {
  console.log('\nScraping SAMHSA treatment locator...\n');

  for (const state of states) {
    const stateKey = state.abbrev + '-samhsa';

    if (progress.completedStates.includes(stateKey)) {
      console.log('Skipping ' + state.name + ' (already completed)');
      continue;
    }

    console.log('\nScraping ' + state.name + '...');

    try {
      // SAMHSA uses state abbreviations in URLs
      const stateUrl = 'https://findtreatment.samhsa.gov/locator/state/' + state.abbrev;

      const stateContent = await fetchWithJina(stateUrl);
      await delay(1500);

      const facilities = parseSamhsaStatePage(stateContent, state);
      console.log('   Found: ' + facilities.length + ' facilities');

      if (facilities.length === 0) {
        console.log('   No facilities found, skipping');
        progress.completedStates.push(stateKey);
        saveProgress(progress);
        continue;
      }

      const detailedFacilities: FacilityDetail[] = [];

      // Limit to first 30 per state to avoid timeout
      const maxDetails = 30;
      const toFetch = facilities.slice(0, maxDetails);

      for (let i = 0; i < toFetch.length; i++) {
        const facility = toFetch[i];

        try {
          console.log('   [' + (i + 1) + '/' + toFetch.length + '] ' + facility.name);

          const detailContent = await fetchWithJina(facility.url);
          const detail = parseSamhsaDetailPage(detailContent, facility);
          detailedFacilities.push(detail);

          progress.totalScraped++;

          if (i % 10 === 0) {
            saveProgress(progress);
          }

          await delay(800);

        } catch (error) {
          console.error('   Error fetching ' + facility.name + ': ' + error);
          detailedFacilities.push({ ...facility });
        }
      }

      // Add remaining without details
      for (let i = maxDetails; i < facilities.length; i++) {
        detailedFacilities.push({ ...facilities[i] });
      }

      saveStateData(state.name, 'samhsa.gov', detailedFacilities);

      progress.completedStates.push(stateKey);
      saveProgress(progress);

      console.log('Completed ' + state.name + ': ' + detailedFacilities.length + ' facilities');

      await delay(2000);

    } catch (error) {
      console.error('Error with ' + state.name + ': ' + error);
      saveProgress(progress);
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  console.log('US Rehab Facility Scraper via Jina.ai\n');
  console.log('Purpose: Gather extra content for GPT enrichment\n');

  let source = 'samhsa';
  let statesToScrape = US_STATES;
  let testMode = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--source' && args[i + 1]) {
      source = args[i + 1];
      i++;
    } else if (args[i] === '--state' && args[i + 1]) {
      const stateArg = args[i + 1].toUpperCase();
      const found = US_STATES.find(s => s.abbrev === stateArg || s.name.toUpperCase() === stateArg);
      if (found) {
        statesToScrape = [found];
      } else {
        console.error('Unknown state: ' + args[i + 1]);
        process.exit(1);
      }
      i++;
    } else if (args[i] === '--test') {
      testMode = true;
      statesToScrape = US_STATES.slice(0, 3);
    } else if (args[i] === '--help') {
      console.log(`
Usage: npx tsx scripts/scraping/scrape-us-facilities.ts [options]

Options:
  --source <name>    Source to scrape (samhsa)
  --state <abbrev>   Scrape specific state (e.g., TX, CA)
  --test             Test mode - only first 3 states
  --resume           Resume from last saved position
  --help             Show this help message

Examples:
  npx tsx scripts/scraping/scrape-us-facilities.ts --test
  npx tsx scripts/scraping/scrape-us-facilities.ts --state TX
  npx tsx scripts/scraping/scrape-us-facilities.ts --resume
      `);
      process.exit(0);
    }
  }

  if (testMode) {
    console.log('Test mode: scraping first 3 states only\n');
  }

  console.log('Source: ' + source);
  console.log('States to scrape: ' + statesToScrape.length);
  console.log('');

  const progress = loadProgress();

  if (source === 'samhsa') {
    await scrapeSamhsa(statesToScrape, progress);
  } else {
    console.log('Unknown source: ' + source);
  }

  console.log('\nCombining all data...');
  combineAllData();

  console.log('\nScraping completed!');
}

main().catch(console.error);
