import { getAllFacilities, getAllStates, getAllCities } from '../lib/data';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

const BASE_URL = 'https://www.rehabnearbyme.com';

async function generateSimpleSitemap() {
  console.log(chalk.blue('🗺️  Generating simple sitemap...'));

  // Get all data
  const facilities = await getAllFacilities();
  const states = await getAllStates();
  const cities = await getAllCities();

  console.log(chalk.cyan(`Found ${facilities.length} facilities`));
  console.log(chalk.cyan(`Found ${states.length} states`));
  console.log(chalk.cyan(`Found ${cities.length} cities`));

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Homepage
  xml += `  <url>
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
    xml += `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
  }

  // State pages
  for (const state of states) {
    const slug = state.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>
    <loc>${BASE_URL}/state/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }

  // City pages (limit to avoid huge sitemap)
  const topCities = cities.slice(0, 500); // First 500
  for (const city of topCities) {
    const slug = city.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>
    <loc>${BASE_URL}/city/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }

  // Facility pages (most important - limit to ensure Google processes them)
  const topFacilities = facilities.slice(0, 1000); // First 1000
  for (const facility of topFacilities) {
    xml += `  <url>
    <loc>${BASE_URL}/facility/${facility.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  }

  xml += '</urlset>';

  // Write to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  await fs.writeFile(sitemapPath, xml);

  // Calculate stats
  const totalUrls = 1 + staticPages.length + states.length + topCities.length + topFacilities.length;

  console.log(chalk.green('✅ Sitemap generated successfully!'));
  console.log(chalk.white(`Total URLs: ${totalUrls}`));
  console.log(chalk.gray(`- Static pages: ${staticPages.length + 1}`));
  console.log(chalk.gray(`- States: ${states.length}`));
  console.log(chalk.gray(`- Cities: ${topCities.length} (of ${cities.length})`));
  console.log(chalk.gray(`- Facilities: ${topFacilities.length} (of ${facilities.length})`));
  console.log(chalk.yellow(`\nSaved to: ${sitemapPath}`));

  // Also create a robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

  await fs.writeFile(path.join(process.cwd(), 'public', 'robots.txt'), robotsTxt);
  console.log(chalk.green('✅ robots.txt updated'));
}

// Run if called directly
if (require.main === module) {
  generateSimpleSitemap().catch(console.error);
}

export { generateSimpleSitemap };
