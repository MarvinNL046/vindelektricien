// Load environment variables first
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import { neon } from '@neondatabase/serverless';

const baseUrl = 'https://www.rehabnearbyme.com';
const URLS_PER_SITEMAP = 1000;

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function createSitemapXML(urls: SitemapUrl[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    const encodedLoc = encodeURI(url.loc);
    xml += `  <url>
    <loc>${encodedLoc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>\n`;
  }

  xml += '</urlset>';
  return xml;
}

async function generateSitemaps() {
  console.log('🗺️  Generating sitemaps for rehabnearbyme.com...');

  // Initialize database connection
  const sql = neon(process.env.DATABASE_URL!);

  // Create sitemaps directory
  const sitemapsDir = path.join(process.cwd(), 'public/sitemaps');
  if (!fs.existsSync(sitemapsDir)) {
    fs.mkdirSync(sitemapsDir, { recursive: true });
  }

  // Fetch data from database
  console.log('📊 Fetching data from database...');
  const facilitiesData = await sql`SELECT slug FROM facilities WHERE status = 'active' ORDER BY slug`;
  const countiesData = await sql`SELECT DISTINCT county FROM facilities WHERE county IS NOT NULL ORDER BY county`;
  const citiesData = await sql`SELECT DISTINCT city FROM facilities ORDER BY city`;
  const typesData = await sql`SELECT DISTINCT facility_type_slug FROM facilities WHERE facility_type_slug IS NOT NULL ORDER BY facility_type_slug`;

  console.log(`   Found ${facilitiesData.length} facilities, ${countiesData.length} counties, ${citiesData.length} cities`);

  const lastmod = new Date().toISOString().split('T')[0];
  const sitemapFiles: string[] = [];

  // 1. STATIC PAGES SITEMAP
  console.log('📄 Generating static pages sitemap...');
  const staticUrls: SitemapUrl[] = [
    // Homepage
    { loc: baseUrl, lastmod, changefreq: 'daily', priority: '1.0' },

    // Main navigation pages
    { loc: `${baseUrl}/search`, lastmod, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/treatment-types`, lastmod, changefreq: 'weekly', priority: '0.8' },

    // Information pages
    { loc: `${baseUrl}/about`, lastmod, changefreq: 'monthly', priority: '0.6' },
    { loc: `${baseUrl}/contact`, lastmod, changefreq: 'monthly', priority: '0.6' },
    { loc: `${baseUrl}/guide`, lastmod, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/compare`, lastmod, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/insurance`, lastmod, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/resources`, lastmod, changefreq: 'weekly', priority: '0.7' },

    // Legal pages
    { loc: `${baseUrl}/privacy`, lastmod, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/terms`, lastmod, changefreq: 'yearly', priority: '0.3' },
  ];

  // 2. STATE PAGES
  console.log('🏛️  Adding state pages...');
  const usStates = [
    'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado',
    'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho',
    'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana',
    'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota',
    'mississippi', 'missouri', 'montana', 'nebraska', 'nevada',
    'new-hampshire', 'new-jersey', 'new-mexico', 'new-york',
    'north-carolina', 'north-dakota', 'ohio', 'oklahoma', 'oregon',
    'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota',
    'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington',
    'west-virginia', 'wisconsin', 'wyoming', 'district-of-columbia'
  ];

  for (const state of usStates) {
    staticUrls.push({
      loc: `${baseUrl}/state/${state}`,
      lastmod,
      changefreq: 'weekly',
      priority: '0.7'
    });
  }

  // 3. TYPE PAGES - from database
  console.log('🏷️  Adding treatment type pages...');
  for (const row of typesData) {
    if (row.facility_type_slug) {
      staticUrls.push({
        loc: `${baseUrl}/treatment-types/${row.facility_type_slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: '0.7'
      });
    }
  }

  // Write static sitemap
  fs.writeFileSync(
    path.join(sitemapsDir, 'sitemap-static.xml'),
    createSitemapXML(staticUrls)
  );
  sitemapFiles.push('sitemap-static.xml');
  console.log(`✅ Static sitemap: ${staticUrls.length} URLs`);

  // 4. COUNTY SITEMAPS
  console.log('🏘️  Generating county sitemaps...');
  const countyUrls: SitemapUrl[] = countiesData.map((row: any) => ({
    loc: `${baseUrl}/county/${createSlug(row.county)}`,
    lastmod,
    changefreq: 'weekly',
    priority: '0.6'
  }));

  if (countyUrls.length > 0) {
    const countyChunks: SitemapUrl[][] = [];
    for (let i = 0; i < countyUrls.length; i += URLS_PER_SITEMAP) {
      countyChunks.push(countyUrls.slice(i, i + URLS_PER_SITEMAP));
    }

    countyChunks.forEach((chunk, index) => {
      const filename = countyChunks.length > 1
        ? `sitemap-counties-${index + 1}.xml`
        : 'sitemap-counties.xml';
      fs.writeFileSync(
        path.join(sitemapsDir, filename),
        createSitemapXML(chunk)
      );
      sitemapFiles.push(filename);
    });
    console.log(`✅ County sitemaps: ${countiesData.length} URLs in ${countyChunks.length} file(s)`);
  }

  // 5. CITY SITEMAPS
  console.log('🏙️  Generating city sitemaps...');
  const cityUrls: SitemapUrl[] = citiesData.map((row: any) => ({
    loc: `${baseUrl}/city/${createSlug(row.city)}`,
    lastmod,
    changefreq: 'weekly',
    priority: '0.6'
  }));

  if (cityUrls.length > 0) {
    const cityChunks: SitemapUrl[][] = [];
    for (let i = 0; i < cityUrls.length; i += URLS_PER_SITEMAP) {
      cityChunks.push(cityUrls.slice(i, i + URLS_PER_SITEMAP));
    }

    cityChunks.forEach((chunk, index) => {
      const filename = cityChunks.length > 1
        ? `sitemap-cities-${index + 1}.xml`
        : 'sitemap-cities.xml';
      fs.writeFileSync(
        path.join(sitemapsDir, filename),
        createSitemapXML(chunk)
      );
      sitemapFiles.push(filename);
    });
    console.log(`✅ City sitemaps: ${citiesData.length} URLs in ${cityChunks.length} file(s)`);
  }

  // 6. FACILITY DETAIL PAGES
  console.log('🏥  Generating facility sitemaps...');
  const facilityUrls: SitemapUrl[] = facilitiesData.map((row: any) => ({
    loc: `${baseUrl}/facility/${row.slug}`,
    lastmod,
    changefreq: 'monthly',
    priority: '0.5'
  }));

  if (facilityUrls.length > 0) {
    const facilityChunks: SitemapUrl[][] = [];
    for (let i = 0; i < facilityUrls.length; i += URLS_PER_SITEMAP) {
      facilityChunks.push(facilityUrls.slice(i, i + URLS_PER_SITEMAP));
    }

    facilityChunks.forEach((chunk, index) => {
      const filename = facilityChunks.length > 1
        ? `sitemap-facilities-${index + 1}.xml`
        : 'sitemap-facilities.xml';
      fs.writeFileSync(
        path.join(sitemapsDir, filename),
        createSitemapXML(chunk)
      );
      sitemapFiles.push(filename);
    });
    console.log(`✅ Facility sitemaps: ${facilitiesData.length} URLs in ${facilityChunks.length} file(s)`);
  }

  // 7. CREATE SITEMAP INDEX
  console.log('📑 Creating sitemap index...');
  let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapIndex += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const filename of sitemapFiles) {
    sitemapIndex += `  <sitemap>
    <loc>${baseUrl}/sitemaps/${filename}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>\n`;
  }

  sitemapIndex += '</sitemapindex>';

  // Write sitemap index to root
  fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemapIndex);

  // Print summary
  console.log('\n📊 Sitemap Generation Summary:');
  console.log('================================');
  console.log(`✅ Static pages: ${staticUrls.length} URLs`);
  console.log(`✅ Counties: ${countiesData.length} URLs`);
  console.log(`✅ Cities: ${citiesData.length} URLs`);
  console.log(`✅ Facilities: ${facilitiesData.length} URLs`);
  console.log(`✅ Total sitemaps: ${sitemapFiles.length}`);
  console.log(`✅ Total URLs: ${staticUrls.length + countyUrls.length + cityUrls.length + facilityUrls.length}`);
  console.log('================================');
  console.log('✨ Sitemap generation complete!');
}

// Run the script
generateSitemaps().catch(error => {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
});
