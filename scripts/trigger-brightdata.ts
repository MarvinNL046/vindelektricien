import fs from 'fs';
import path from 'path';

const API_KEY = 'eb74cc13a9d2b8886970e445602106c99490677afcc77fa2c9c6b230cf3092d0';
const DATASET_ID = 'gd_m8ebnr0q2qlklc02fz';

async function triggerScrape(urls: { url: string }[], batchName: string) {
  console.log(`Triggering scrape for ${urls.length} URLs (${batchName})...`);
  
  const response = await fetch(
    `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&include_errors=true`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(urls),
    }
  );
  
  const result = await response.json();
  console.log('Response:', JSON.stringify(result, null, 2));
  return result;
}

async function main() {
  // Load URLs
  const urlsPath = path.join(process.cwd(), 'data', 'brightdata-urls.json');
  const allUrls = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

  // Parse command line args: npx tsx trigger-brightdata.ts [start] [count]
  // Default: first 10
  const start = parseInt(process.argv[2] || '0', 10);
  const count = parseInt(process.argv[3] || '10', 10);

  const batch = allUrls.slice(start, start + count);

  console.log(`Total URLs available: ${allUrls.length}`);
  console.log(`Processing: ${batch.length} URLs (index ${start} to ${start + batch.length - 1})\n`);

  if (batch.length === 0) {
    console.log('No URLs to process!');
    return;
  }

  const result = await triggerScrape(batch, `batch-${start}-${start + batch.length}`);

  if (result.snapshot_id) {
    console.log(`\nSnapshot ID: ${result.snapshot_id}`);
    console.log('Check status: npx tsx scripts/import-gmaps-to-db.ts status ' + result.snapshot_id);
    console.log('Import: npx tsx scripts/import-gmaps-to-db.ts ' + result.snapshot_id);
  }
}

main().catch(console.error);
