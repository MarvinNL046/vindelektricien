import { promises as fs } from 'fs';
import path from 'path';

interface Facility {
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  county: string;
  facility_types: string[];
  treatment_types: string[];
  address: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  review_count?: number;
  photo?: string;
  slug: string;
  insurance_accepted?: string[];
  amenities?: string[];
  description?: string;
}

async function buildData() {
  try {
    console.log('Building facility data for production...');

    // Check if we already have the public data (useful for Vercel if source is not available)
    const publicDataPath = path.join(process.cwd(), 'public', 'data', 'facilities.json');
    try {
      await fs.access(publicDataPath);
      console.log('Public data already exists, checking if source is available...');
    } catch {
      // Public data doesn't exist, we need to build it
    }

    // Read the processed JSON file
    const processedJsonPath = path.join(process.cwd(), 'data', 'facilities-processed.json');
    let processedRecords: Facility[];

    try {
      const jsonContent = await fs.readFile(processedJsonPath, 'utf-8');
      processedRecords = JSON.parse(jsonContent);
    } catch {
      console.log('Processed JSON not found, checking for existing public data...');
      try {
        await fs.access(publicDataPath);
        console.log('Public data already exists, skipping build.');
        return;
      } catch {
        console.error('No data source available. Please ensure either:');
        console.error('1. Run: npx tsx scripts/process-all-data.ts facility data/facilities.csv');
        console.error('2. /public/data/facilities.json is already built');
        process.exit(1);
      }
    }

    // Create output directory
    const publicDataDir = path.join(process.cwd(), 'public', 'data');
    await fs.mkdir(publicDataDir, { recursive: true });

    // Save the processed data
    const outputPath = path.join(publicDataDir, 'facilities.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify(processedRecords, null, 2),
      'utf-8'
    );

    console.log(`✓ Processed ${processedRecords.length} facilities`);
    console.log(`✓ Saved to ${outputPath}`);

    // Create a summary file for quick stats
    const summary = {
      total: processedRecords.length,
      states: [...new Set(processedRecords.map(f => f.state).filter(Boolean))].sort(),
      cities: [...new Set(processedRecords.map(f => f.city).filter(Boolean))].sort(),
      facility_types: [...new Set(processedRecords.flatMap(f => f.facility_types || []).filter(Boolean))].sort(),
      treatment_types: [...new Set(processedRecords.flatMap(f => f.treatment_types || []).filter(Boolean))].sort(),
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(publicDataDir, 'summary.json'),
      JSON.stringify(summary, null, 2),
      'utf-8'
    );

    console.log('✓ Build complete!');

  } catch (error) {
    console.error('Error building data:', error);
    process.exit(1);
  }
}

// Run the build
buildData();
