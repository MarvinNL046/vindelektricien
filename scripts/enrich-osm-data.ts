#!/usr/bin/env npx tsx
/**
 * OSM Enrichment Script for Rehab Facilities
 *
 * Fetches facility data from OpenStreetMap via Overpass API
 * and searches for additional info via Jina AI
 */

import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'facilities.json');
const ENRICHMENT_LOG = path.join(process.cwd(), 'data', 'enrichment-log.json');
const JINA_API_KEY = process.env.JINA_API_KEY || '';

interface Facility {
  name: string;
  slug: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  osm_id?: string;
  website?: string;
  phone?: string;
  bed_count?: number;
  accreditation?: string[];
  [key: string]: any;
}

interface EnrichmentStats {
  total_processed: number;
  osm_found: number;
  jina_searched: number;
  info_found: number;
  errors: number;
  timestamp: string;
}

// Query Overpass API for healthcare facility data near GPS coordinates
async function queryOSM(lat: number, lon: number, name: string): Promise<{
  osm_id?: string;
  phone?: string;
  website?: string;
  opening_hours?: string;
  healthcare?: string;
} | null> {
  // Search in a 500m radius around the GPS point
  const radius = 500;

  const query = `[out:json][timeout:25];
(
  node["amenity"="clinic"](around:${radius},${lat},${lon});
  node["amenity"="hospital"](around:${radius},${lat},${lon});
  node["healthcare"="rehabilitation"](around:${radius},${lat},${lon});
  node["healthcare"="counselling"](around:${radius},${lat},${lon});
  way["amenity"="clinic"](around:${radius},${lat},${lon});
  way["amenity"="hospital"](around:${radius},${lat},${lon});
  way["healthcare"="rehabilitation"](around:${radius},${lat},${lon});
  way["healthcare"="counselling"](around:${radius},${lat},${lon});
);
out body;`;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: { 'Content-Type': 'text/plain' }
    });

    if (!response.ok) {
      console.error(`  OSM API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return null;
    }

    // Find best match by name similarity or closest
    let bestMatch = data.elements[0];
    const nameLower = name.toLowerCase();

    for (const element of data.elements) {
      if (element.tags?.name) {
        const osmName = element.tags.name.toLowerCase();
        if (osmName.includes(nameLower) || nameLower.includes(osmName)) {
          bestMatch = element;
          break;
        }
      }
    }

    const result: {
      osm_id?: string;
      phone?: string;
      website?: string;
      opening_hours?: string;
      healthcare?: string;
    } = {};

    result.osm_id = `${bestMatch.type}/${bestMatch.id}`;

    if (bestMatch.tags?.phone) {
      result.phone = bestMatch.tags.phone;
    }

    if (bestMatch.tags?.website) {
      result.website = bestMatch.tags.website;
    }

    if (bestMatch.tags?.opening_hours) {
      result.opening_hours = bestMatch.tags.opening_hours;
    }

    if (bestMatch.tags?.healthcare) {
      result.healthcare = bestMatch.tags.healthcare;
    }

    return result;
  } catch (error) {
    console.error(`  OSM query error:`, error);
    return null;
  }
}

// Search for additional facility info using Jina AI
async function searchJina(name: string, city: string, state: string): Promise<{
  bed_count?: number;
  accreditation?: string[];
} | null> {
  if (!JINA_API_KEY) {
    return null;
  }

  const query = encodeURIComponent(`"${name}" ${city} ${state} beds accreditation JCAHO treatment`);

  try {
    const response = await fetch(`https://s.jina.ai/?q=${query}`, {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'X-Respond-With': 'no-content'
      }
    });

    if (!response.ok) {
      return null;
    }

    const text = await response.text();

    // Try to extract numbers
    const result: { bed_count?: number; accreditation?: string[] } = {};

    // Look for patterns like "X beds" or "X-bed facility"
    const bedsMatch = text.match(/(\d{1,3})\s*(?:beds|bed facility|patient capacity)/i);
    if (bedsMatch) {
      const num = parseInt(bedsMatch[1]);
      if (num > 5 && num < 1000) {
        result.bed_count = num;
      }
    }

    // Look for accreditation mentions
    const accreditations: string[] = [];
    if (text.toLowerCase().includes('jcaho') || text.toLowerCase().includes('joint commission')) {
      accreditations.push('Joint Commission');
    }
    if (text.toLowerCase().includes('carf')) {
      accreditations.push('CARF');
    }
    if (text.toLowerCase().includes('legit script') || text.toLowerCase().includes('legitscript')) {
      accreditations.push('LegitScript');
    }
    if (text.toLowerCase().includes('naatp')) {
      accreditations.push('NAATP');
    }

    if (accreditations.length > 0) {
      result.accreditation = accreditations;
    }

    return Object.keys(result).length > 0 ? result : null;
  } catch (error) {
    console.error(`  Jina search error:`, error);
    return null;
  }
}

// Rate limiting helper
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🗺️  OSM & Jina Enrichment Script for Rehab Facilities');
  console.log('======================================================\n');

  // Load facilities
  const facilities: Facility[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📊 Loaded ${facilities.length} facilities\n`);

  // Filter facilities that have GPS but missing key data
  const toEnrich = facilities.filter(f =>
    f.lat &&
    f.lng &&
    (!f.phone || !f.website)
  );

  console.log(`🎯 ${toEnrich.length} facilities to enrich (have GPS, missing phone/website)\n`);

  // Check for --limit flag
  const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : toEnrich.length;
  const batch = toEnrich.slice(0, limit);

  console.log(`📦 Processing ${batch.length} facilities...\n`);

  const stats: EnrichmentStats = {
    total_processed: 0,
    osm_found: 0,
    jina_searched: 0,
    info_found: 0,
    errors: 0,
    timestamp: new Date().toISOString()
  };

  for (let i = 0; i < batch.length; i++) {
    const facility = batch[i];

    console.log(`[${i + 1}/${batch.length}] ${facility.name} (${facility.city}, ${facility.state})`);

    stats.total_processed++;

    // Query OSM for additional data
    const osmData = await queryOSM(facility.lat!, facility.lng!, facility.name);

    if (osmData) {
      stats.osm_found++;

      if (osmData.osm_id) {
        facility.osm_id = osmData.osm_id;
      }

      if (osmData.phone && !facility.phone) {
        facility.phone = osmData.phone;
        console.log(`  📞 Phone: ${osmData.phone}`);
      }

      if (osmData.website && !facility.website) {
        facility.website = osmData.website;
        console.log(`  🌐 Website: ${osmData.website}`);
      }

      if (osmData.opening_hours) {
        console.log(`  ⏰ Hours: ${osmData.opening_hours}`);
      }
    } else {
      console.log(`  ⚠️ Not found in OSM`);
    }

    // Rate limit for OSM (1 request per second recommended)
    await sleep(1000);

    // Search Jina for additional info
    if (!facility.bed_count || !facility.accreditation) {
      stats.jina_searched++;
      const jinaData = await searchJina(facility.name, facility.city, facility.state);

      if (jinaData) {
        stats.info_found++;
        if (jinaData.bed_count) {
          facility.bed_count = jinaData.bed_count;
          console.log(`  🛏️ Beds: ${jinaData.bed_count}`);
        }
        if (jinaData.accreditation) {
          facility.accreditation = jinaData.accreditation;
          console.log(`  ✅ Accreditations: ${jinaData.accreditation.join(', ')}`);
        }
      }

      // Rate limit for Jina
      await sleep(500);
    }

    // Find and update in main array
    const mainIndex = facilities.findIndex(f => f.slug === facility.slug);
    if (mainIndex !== -1) {
      facilities[mainIndex] = facility;
    }

    // Save progress every 50 facilities
    if ((i + 1) % 50 === 0) {
      console.log(`\n💾 Saving progress (${i + 1}/${batch.length})...\n`);
      fs.writeFileSync(DATA_FILE, JSON.stringify(facilities, null, 2));
    }
  }

  // Final save
  console.log('\n💾 Saving final results...');
  fs.writeFileSync(DATA_FILE, JSON.stringify(facilities, null, 2));

  // Also update public data
  const publicDataFile = path.join(process.cwd(), 'public', 'data', 'facilities.json');
  fs.writeFileSync(publicDataFile, JSON.stringify(facilities, null, 2));

  // Save enrichment log
  fs.writeFileSync(ENRICHMENT_LOG, JSON.stringify(stats, null, 2));

  console.log('\n📊 Enrichment Summary:');
  console.log('======================');
  console.log(`Total processed:    ${stats.total_processed}`);
  console.log(`OSM matches:        ${stats.osm_found}`);
  console.log(`Jina searches:      ${stats.jina_searched}`);
  console.log(`Info found:         ${stats.info_found}`);
  console.log(`Errors:             ${stats.errors}`);
  console.log('\nDone!');
}

main().catch(console.error);
