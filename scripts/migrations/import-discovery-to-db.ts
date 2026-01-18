/**
 * Import discovered facilities from discovery folder to PostgreSQL database
 * This contains treatment facilities scraped from Google Maps
 *
 * Usage: npx tsx scripts/migrations/import-discovery-to-db.ts
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { facilities } from '../../drizzle/schema-simple';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env.local');
}

const client = neon(DATABASE_URL);
const db = drizzle(client);

function createSlug(name: string, city: string, stateAbbr: string): string {
  const base = `${name}-${city}-${stateAbbr}`;
  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createTypeSlug(type: string): string {
  return type.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function determineType(businessType: string, categories: string[]): string {
  // Map business types and categories to facility types
  const allTerms = [businessType, ...(categories || [])].map(t => t?.toLowerCase() || '');

  if (allTerms.some(t => t.includes('detox'))) return 'detox-center';
  if (allTerms.some(t => t.includes('inpatient') || t.includes('residential'))) return 'inpatient-rehab';
  if (allTerms.some(t => t.includes('outpatient'))) return 'outpatient-treatment';
  if (allTerms.some(t => t.includes('sober living') || t.includes('halfway'))) return 'sober-living';
  if (allTerms.some(t => t.includes('dual diagnosis') || t.includes('mental health'))) return 'dual-diagnosis';
  if (allTerms.some(t => t.includes('luxury') || t.includes('executive'))) return 'luxury-rehab';
  if (allTerms.some(t => t.includes('veteran'))) return 'veterans-treatment';
  if (allTerms.some(t => t.includes('adolescent') || t.includes('teen'))) return 'adolescent-treatment';
  if (allTerms.some(t => t.includes('counseling') || t.includes('therapy'))) return 'addiction-counseling';
  if (allTerms.some(t => t.includes('mat') || t.includes('medication') || t.includes('suboxone') || t.includes('methadone'))) return 'mat-program';

  return 'treatment-center';
}

interface DiscoveredFacility {
  google_cid?: string;
  google_place_id?: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  city: string;
  county?: string | null;
  state: string;
  state_abbr?: string;
  country?: string;
  zip_code?: string;
  rating?: number;
  review_count?: number;
  business_type?: string;
  categories?: string[];
  photo_url?: string;
  photos?: string[];
  amenities?: string[];
  opening_hours?: string;
  discovered_at?: string;
}

async function importDiscoveredFacilities() {
  console.log('🚀 Starting discovery data import to database...\n');

  // Load discovery data
  const discoveryPath = path.join(process.cwd(), 'data/discovery/discovered-facilities.json');
  console.log(`📁 Loading data from: ${discoveryPath}`);

  const jsonData = JSON.parse(fs.readFileSync(discoveryPath, 'utf-8')) as DiscoveredFacility[];
  console.log(`📊 Found ${jsonData.length} discovered facilities\n`);

  // Process in batches - smaller batch size due to PostgreSQL parameter limits
  // With 44 columns per record, 50 records = 2,200 parameters (well under limits)
  const BATCH_SIZE = 50;
  const batches = [];
  for (let i = 0; i < jsonData.length; i += BATCH_SIZE) {
    batches.push(jsonData.slice(i, i + BATCH_SIZE));
  }
  console.log(`📦 Split into ${batches.length} batches of ${BATCH_SIZE}\n`);

  let totalImported = 0;
  let totalErrors = 0;
  let totalSkipped = 0;

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    const batchNum = batchIndex + 1;

    console.log(`⏳ Processing batch ${batchNum}/${batches.length} (${batch.length} records)...`);

    const records = batch
      .filter(c => c.name && c.city && c.state) // Skip invalid records
      .map((c) => {
        const stateAbbr = c.state_abbr || c.state.slice(0, 2).toUpperCase();
        const type = determineType(c.business_type || '', c.categories || []);

        return {
          slug: createSlug(c.name, c.city, stateAbbr),
          name: c.name,
          type: type,
          typeSlug: createTypeSlug(type),
          address: c.address || null,
          city: c.city,
          county: c.county || null,
          state: c.state,
          stateAbbr: stateAbbr,
          zipCode: c.zip_code || null,
          country: c.country || 'USA',
          latitude: c.latitude?.toString() || null,
          longitude: c.longitude?.toString() || null,
          phone: c.phone || null,
          email: null,
          website: c.website || null,
          googlePlaceId: c.google_place_id || null,
          googleCid: c.google_cid || null,
          rating: c.rating?.toString() || null,
          reviewCount: c.review_count || 0,
          photoUrl: c.photo_url || null,
          photos: c.photos || null,
          openingHours: c.opening_hours || null,
          facilities: c.facilities || null,
          categories: c.categories || null,
          yearEstablished: null,
          description: null,
          seoTitle: null,
          seoDescription: null,
          enrichedContent: null,
          generatedSummary: null,
          generatedHistory: null,
          generatedFeatures: null,
          generatedAmenities: null,
          generatedVisitorTips: null,
          generatedDirections: null,
          generatedLocalContext: null,
          enrichedAt: null,
          source: 'google_maps',
          status: 'active',
          discoveredAt: c.discovered_at || new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

    if (records.length < batch.length) {
      totalSkipped += batch.length - records.length;
    }

    try {
      // Use ON CONFLICT to upsert - update if slug exists
      await db.insert(facilities)
        .values(records)
        .onConflictDoUpdate({
          target: facilities.slug,
          set: {
            // Only update if new data has values
            name: sql`COALESCE(EXCLUDED.name, ${facilities.name})`,
            address: sql`COALESCE(EXCLUDED.address, ${facilities.address})`,
            phone: sql`COALESCE(EXCLUDED.phone, ${facilities.phone})`,
            website: sql`COALESCE(EXCLUDED.website, ${facilities.website})`,
            rating: sql`COALESCE(EXCLUDED.rating, ${facilities.rating})`,
            reviewCount: sql`GREATEST(COALESCE(EXCLUDED.review_count, 0), COALESCE(${facilities.reviewCount}, 0))`,
            photoUrl: sql`COALESCE(EXCLUDED.photo_url, ${facilities.photoUrl})`,
            photos: sql`COALESCE(EXCLUDED.photos, ${facilities.photos})`,
            facilities: sql`COALESCE(EXCLUDED.facilities, ${facilities.facilities})`,
            categories: sql`COALESCE(EXCLUDED.categories, ${facilities.categories})`,
            googlePlaceId: sql`COALESCE(EXCLUDED.google_place_id, ${facilities.googlePlaceId})`,
            googleCid: sql`COALESCE(EXCLUDED.google_cid, ${facilities.googleCid})`,
            updatedAt: sql`EXCLUDED.updated_at`,
          },
        });

      totalImported += records.length;
      console.log(`   ✅ Batch ${batchNum} complete (${totalImported}/${jsonData.length} total)`);
    } catch (error) {
      // Batch failed - try individual inserts to salvage what we can
      console.log(`   ⚠️  Batch ${batchNum} failed, retrying individually...`);
      let batchRecovered = 0;
      let batchFailed = 0;

      for (const record of records) {
        try {
          await db.insert(facilities)
            .values(record)
            .onConflictDoUpdate({
              target: facilities.slug,
              set: {
                name: sql`COALESCE(EXCLUDED.name, ${facilities.name})`,
                address: sql`COALESCE(EXCLUDED.address, ${facilities.address})`,
                phone: sql`COALESCE(EXCLUDED.phone, ${facilities.phone})`,
                website: sql`COALESCE(EXCLUDED.website, ${facilities.website})`,
                rating: sql`COALESCE(EXCLUDED.rating, ${facilities.rating})`,
                reviewCount: sql`GREATEST(COALESCE(EXCLUDED.review_count, 0), COALESCE(${facilities.reviewCount}, 0))`,
                photoUrl: sql`COALESCE(EXCLUDED.photo_url, ${facilities.photoUrl})`,
                photos: sql`COALESCE(EXCLUDED.photos, ${facilities.photos})`,
                facilities: sql`COALESCE(EXCLUDED.facilities, ${facilities.facilities})`,
                categories: sql`COALESCE(EXCLUDED.categories, ${facilities.categories})`,
                googlePlaceId: sql`COALESCE(EXCLUDED.google_place_id, ${facilities.googlePlaceId})`,
                googleCid: sql`COALESCE(EXCLUDED.google_cid, ${facilities.googleCid})`,
                updatedAt: sql`EXCLUDED.updated_at`,
              },
            });
          batchRecovered++;
          totalImported++;
        } catch (recordError) {
          batchFailed++;
          totalErrors++;
          // Log first few failures for debugging
          if (batchFailed <= 3) {
            console.log(`      ❌ Failed: ${record.slug} - ${(recordError as Error).message?.slice(0, 100)}`);
          }
        }
      }
      console.log(`   📊 Batch ${batchNum}: recovered ${batchRecovered}, failed ${batchFailed} (${totalImported}/${jsonData.length} total)`);
    }
  }

  console.log('\n========================================');
  console.log(`✅ Discovery import complete!`);
  console.log(`   📊 Total imported/updated: ${totalImported}`);
  console.log(`   ⏭️  Total skipped (invalid): ${totalSkipped}`);
  console.log(`   ❌ Total errors: ${totalErrors}`);
  console.log('========================================\n');

  // Verify import
  const [countResult] = await db.select({ count: sql`COUNT(*)` }).from(facilities);
  console.log(`📊 Database now contains ${countResult.count} facilities\n`);
}

// Run the import
importDiscoveredFacilities()
  .then(() => {
    console.log('🎉 Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
