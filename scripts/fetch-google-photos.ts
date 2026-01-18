/**
 * Google Maps Photo Fetcher via Bright Data
 *
 * Fetches photos from Google Maps using Place IDs through Bright Data's SERP API
 * Photos from Google Maps require proper attribution
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
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

interface PlaceResult {
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
    html_attributions?: string[];
  }>;
}

const BRIGHTDATA_CUSTOMER_ID = process.env.BRIGHTDATA_CUSTOMER_ID;
const BRIGHTDATA_API_KEY = process.env.BRIGHTDATA_API_KEY;
const BRIGHTDATA_ZONE = process.env.BRIGHTDATA_ZONE || 'mcp_unlocker';

if (!BRIGHTDATA_CUSTOMER_ID || !BRIGHTDATA_API_KEY) {
  console.error('Missing Bright Data credentials in .env.local');
  process.exit(1);
}

// Bright Data proxy configuration
const proxyHost = 'brd.superproxy.io';
const proxyPort = 22225;
const proxyAuth = `brd-customer-${BRIGHTDATA_CUSTOMER_ID}-zone-${BRIGHTDATA_ZONE}:${BRIGHTDATA_API_KEY}`;

// Fetch URL through Bright Data proxy
async function fetchThroughProxy(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const proxyUrl = `http://${proxyAuth}@${proxyHost}:${proxyPort}`;

    const options = {
      host: proxyHost,
      port: proxyPort,
      path: url,
      headers: {
        'Proxy-Authorization': 'Basic ' + Buffer.from(proxyAuth).toString('base64'),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    http.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Download image
async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);

    const options = {
      host: proxyHost,
      port: proxyPort,
      path: url,
      headers: {
        'Proxy-Authorization': 'Basic ' + Buffer.from(proxyAuth).toString('base64'),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    http.get(options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          // Follow redirect through proxy
          const redirectOptions = {
            ...options,
            path: redirectUrl
          };
          http.get(redirectOptions, (res) => {
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve(true);
            });
          }).on('error', () => resolve(false));
        } else {
          resolve(false);
        }
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', () => resolve(false));
  });
}

// Get photo URL from Google Place ID
async function getPlacePhoto(placeId: string): Promise<string | null> {
  try {
    // Use Google Maps Place Details via Bright Data
    const searchUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

    const html = await fetchThroughProxy(searchUrl);

    // Extract photo URL from the page
    // Google Maps embeds photo URLs in the page data
    const photoMatch = html.match(/https:\/\/lh5\.googleusercontent\.com\/p\/[^"'\s]+/);

    if (photoMatch) {
      return photoMatch[0];
    }

    // Alternative: look for AF1QipN style URLs
    const altPhotoMatch = html.match(/https:\/\/[^"'\s]*googleusercontent\.com[^"'\s]*AF1QipN[^"'\s]*/);
    if (altPhotoMatch) {
      return altPhotoMatch[0];
    }

    return null;
  } catch (error) {
    console.error(`Error fetching place ${placeId}:`, error);
    return null;
  }
}

// Alternative: Scrape Google Maps search results
async function searchGoogleMapsPhoto(facilityName: string, city: string, state: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${facilityName} ${city} ${state} rehab treatment center`);
    const searchUrl = `https://www.google.com/maps/search/${query}`;

    const html = await fetchThroughProxy(searchUrl);

    // Look for photo URLs in search results
    const photoMatches = html.match(/https:\/\/lh5\.googleusercontent\.com\/p\/[^"'\s]+/g);

    if (photoMatches && photoMatches.length > 0) {
      return photoMatches[0];
    }

    return null;
  } catch (error) {
    console.error(`Error searching for ${facilityName}:`, error);
    return null;
  }
}

async function main() {
  console.log('📷 Google Maps Photo Fetcher via Bright Data');
  console.log('=============================================\n');

  // Load facilities
  const facilitiesPath = path.join(process.cwd(), 'data/facilities.json');
  const facilities: Facility[] = JSON.parse(fs.readFileSync(facilitiesPath, 'utf-8'));

  // Filter facilities without photos
  const facilitiesWithoutPhotos = facilities.filter(f =>
    !f.photo &&
    !f.google_photo &&
    f.google_place_id
  );

  console.log(`📊 Total facilities: ${facilities.length}`);
  console.log(`📷 Without photos (with Place ID): ${facilitiesWithoutPhotos.length}\n`);

  // Create output directory
  const outputDir = path.join(process.cwd(), 'public/images/google-maps');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process facilities (limit to batch size)
  const batchSize = parseInt(process.argv[2]) || 50;
  const batch = facilitiesWithoutPhotos.slice(0, batchSize);

  console.log(`🔄 Processing batch of ${batch.length} facilities...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const facility of batch) {
    console.log(`📍 ${facility.name} (${facility.city}, ${facility.state})`);

    // Try to get photo via Place ID
    let photoUrl = await getPlacePhoto(facility.google_place_id!);

    // If that fails, try search
    if (!photoUrl) {
      console.log('   Trying search fallback...');
      photoUrl = await searchGoogleMapsPhoto(facility.name, facility.city, facility.state);
    }

    if (photoUrl) {
      const filename = `${facility.slug}.jpg`;
      const filepath = path.join(outputDir, filename);

      console.log(`   Found photo, downloading...`);
      const success = await downloadImage(photoUrl, filepath);

      if (success && fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
        // Update facility data
        const index = facilities.findIndex(f => f.slug === facility.slug);
        if (index !== -1) {
          facilities[index].google_photo = `/images/google-maps/${filename}`;
          successCount++;
          console.log(`   ✅ Saved\n`);
        }
      } else {
        failCount++;
        console.log(`   ❌ Download failed\n`);
        // Remove empty/small file
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    } else {
      failCount++;
      console.log(`   ❌ No photo found\n`);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Save updated data
  fs.writeFileSync(facilitiesPath, JSON.stringify(facilities, null, 2));

  console.log('\n=============================================');
  console.log(`✨ Done!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log('=============================================\n');
}

main().catch(console.error);
