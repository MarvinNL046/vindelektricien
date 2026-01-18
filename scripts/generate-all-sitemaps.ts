import { getAllFacilities, getAllStates, getAllCities } from '../lib/data';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const BASE_URL = 'https://www.rehabnearbyme.com';
const URLS_PER_SITEMAP = 1000;

async function generateAllSitemaps() {
  console.log(chalk.blue('🗺️  Generating complete sitemap structure...'));

  // Get all data
  const facilities = await getAllFacilities();
  const states = await getAllStates();
  const cities = await getAllCities();

  console.log(chalk.cyan(`Found ${facilities.length} facilities`));
  console.log(chalk.cyan(`Found ${states.length} states`));
  console.log(chalk.cyan(`Found ${cities.length} cities`));

  const publicDir = path.join(process.cwd(), 'public');
  const generatedSitemaps: string[] = [];

  // 1. Generate main sitemap with static pages and states
  let mainXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  mainXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Homepage
  mainXml += `  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;

  // Static pages
  const staticPages = [
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/about', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
    { path: '/guide', priority: 0.8 },
    { path: '/search', priority: 0.9 },
    { path: '/treatment-types', priority: 0.7 },
    { path: '/insurance', priority: 0.7 },
    { path: '/resources', priority: 0.7 },
  ];

  for (const page of staticPages) {
    mainXml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
  }

  // State pages
  for (const state of states) {
    const slug = state.toLowerCase().replace(/\s+/g, '-');
    mainXml += `  <url>
    <loc>${BASE_URL}/state/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }

  mainXml += '</urlset>';
  await fs.writeFile(path.join(publicDir, 'sitemap-main.xml'), mainXml);
  generatedSitemaps.push('sitemap-main.xml');

  // 2. Generate city sitemaps
  const cityChunks = Math.ceil(cities.length / URLS_PER_SITEMAP);
  for (let i = 0; i < cityChunks; i++) {
    const start = i * URLS_PER_SITEMAP;
    const end = Math.min(start + URLS_PER_SITEMAP, cities.length);
    const chunk = cities.slice(start, end);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const city of chunk) {
      const slug = city.toLowerCase().replace(/\s+/g, '-');
      xml += `  <url>
    <loc>${BASE_URL}/city/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    }

    xml += '</urlset>';
    const filename = `sitemap-cities-${i + 1}.xml`;
    await fs.writeFile(path.join(publicDir, filename), xml);
    generatedSitemaps.push(filename);
  }

  // 3. Generate facility sitemaps
  const facilityChunks = Math.ceil(facilities.length / URLS_PER_SITEMAP);
  for (let i = 0; i < facilityChunks; i++) {
    const start = i * URLS_PER_SITEMAP;
    const end = Math.min(start + URLS_PER_SITEMAP, facilities.length);
    const chunk = facilities.slice(start, end);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const facility of chunk) {
      xml += `  <url>
    <loc>${BASE_URL}/facility/${facility.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
    }

    xml += '</urlset>';
    const filename = `sitemap-facilities-${i + 1}.xml`;
    await fs.writeFile(path.join(publicDir, filename), xml);
    generatedSitemaps.push(filename);
  }

  // 4. Generate sitemap index
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const sitemap of generatedSitemaps) {
    indexXml += `  <sitemap>
    <loc>${BASE_URL}/${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>\n`;
  }

  indexXml += '</sitemapindex>';
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), indexXml);

  // 5. Update robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
${generatedSitemaps.map(s => `Sitemap: ${BASE_URL}/${s}`).join('\n')}`;

  await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt);

  // Calculate stats
  const totalUrls = staticPages.length + 1 + states.length + cities.length + facilities.length;

  console.log(chalk.green('✅ All sitemaps generated successfully!'));
  console.log(chalk.white(`Total URLs: ${totalUrls}`));
  console.log(chalk.gray(`- Static + states: ${staticPages.length + 1 + states.length}`));
  console.log(chalk.gray(`- Cities: ${cities.length} (in ${cityChunks} sitemaps)`));
  console.log(chalk.gray(`- Facilities: ${facilities.length} (in ${facilityChunks} sitemaps)`));
  console.log(chalk.yellow(`\nGenerated ${generatedSitemaps.length} sitemaps:`));
  generatedSitemaps.forEach(s => console.log(chalk.gray(`  - ${s}`)));
  console.log(chalk.green('\n✅ robots.txt updated with all sitemaps'));
}

// Run if called directly
if (require.main === module) {
  generateAllSitemaps().catch(console.error);
}

export { generateAllSitemaps };
