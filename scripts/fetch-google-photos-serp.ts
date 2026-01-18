/**
 * Google Maps Photo Fetcher via Bright Data SERP API
 *
 * Uses Bright Data's Google Search Images to find rehab facility photos
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface Facility {
  name: string;
  city: string;
  state: string;
  slug: string;
  google_place_id?: string;
  photo?: string;
  google_photo?: string;
  [key: string]: unknown;
}

const BRIGHTDATA_CUSTOMER_ID = process.env.BRIGHTDATA_CUSTOMER_ID;
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const BRIGHTDATA_SERP_ZONE = process.env.BRIGHTDATA_SERP_ZONE || 'serp';

if (!BRIGHTDATA_CUSTOMER_ID || !BRIGHTDATA_API_KEY) {
  console.error('Missing Bright Data credentials in .env.local');
  process.exit(1);
}

// Fetch Google Image Search results via Bright Data SERP API
async function searchGoogleImages(query: string): Promise<string | null> {
  return new Promise((resolve) => {
    const searchQuery = encodeURIComponent(query);

    // Bright Data SERP API endpoint for Google Images
    const options = {
      hostname: 'api.brightdata.com',
      port: 443,
      path: `/serp/google/images?q=${searchQuery}&gl=us&hl=en`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BRIGHTDATA_API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          // Get first image result
          if (result.images && result.images.length > 0) {
            resolve(result.images[0].original || result.images[0].thumbnail);
          } else if (result.organic && result.organic.length > 0) {
            // Sometimes images are in organic results
            const withImage = result.organic.find((r: any) => r.thumbnail);
            if (withImage) {
              resolve(withImage.thumbnail);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        } catch {
          console.log('   Parse error, raw response:', data.substring(0, 200));
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.error('   Request error:', error.message);
      resolve(null);
    });

    req.end();
  });
}

// Download image from URL
async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Handle both http and https
    const protocol = url.startsWith('https') ? https : require('http');

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response: any) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve);
          return;
        }
        resolve(false);
        return;
      }

      if (response.statusCode !== 200) {
        resolve(false);
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        // Check file size
        const stats = fs.statSync(filepath);
        if (stats.size < 1000) {
          fs.unlinkSync(filepath);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }).on('error', () => resolve(false));
  });
}

async function main() {
  console.log('📷 Google Images Photo Fetcher via Bright Data SERP');
  console.log('====================================================\n');

  // Load facilities
  const facilitiesPath = path.join(process.cwd(), 'data/facilities.json');
  const facilities: Facility[] = JSON.parse(fs.readFileSync(facilitiesPath, 'utf-8'));

  // Filter facilities without photos
  const facilitiesWithoutPhotos = facilities.filter(f =>
    !f.photo &&
    !f.google_photo
  );

  console.log(`📊 Total facilities: ${facilities.length}`);
  console.log(`📷 Without photos: ${facilitiesWithoutPhotos.length}\n`);

  // Create output directory
  const outputDir = path.join(process.cwd(), 'public/images/google');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process facilities (limit to batch size)
  const batchSize = parseInt(process.argv[2]) || 20;
  const batch = facilitiesWithoutPhotos.slice(0, batchSize);

  console.log(`🔄 Processing batch of ${batch.length} facilities...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const facility of batch) {
    console.log(`📍 ${facility.name} (${facility.city}, ${facility.state})`);

    // Search for facility photo
    const query = `${facility.name} ${facility.city} ${facility.state} rehab treatment center`;
    const photoUrl = await searchGoogleImages(query);

    if (photoUrl) {
      const filename = `${facility.slug}.jpg`;
      const filepath = path.join(outputDir, filename);

      console.log(`   Found photo, downloading...`);
      const success = await downloadImage(photoUrl, filepath);

      if (success) {
        // Update facility data
        const index = facilities.findIndex(f => f.slug === facility.slug);
        if (index !== -1) {
          facilities[index].google_photo = `/images/google/${filename}`;
          successCount++;
          console.log(`   ✅ Saved\n`);
        }
      } else {
        failCount++;
        console.log(`   ❌ Download failed\n`);
      }
    } else {
      failCount++;
      console.log(`   ❌ No photo found\n`);
    }

    // Rate limiting - important for SERP API
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Save updated data
  fs.writeFileSync(facilitiesPath, JSON.stringify(facilities, null, 2));

  console.log('\n====================================================');
  console.log(`✨ Done!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log('====================================================\n');
}

main().catch(console.error);
