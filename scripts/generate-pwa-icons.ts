/**
 * Generate PWA icons from SVG
 * Run with: npx tsx scripts/generate-pwa-icons.ts
 *
 * Requires: npm install sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SOURCE_SVG = path.join(process.cwd(), 'public/icons/icon.svg');
const OUTPUT_DIR = path.join(process.cwd(), 'public/icons');

async function generateIcons() {
  console.log('Generating PWA icons...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read the SVG file
  const svgBuffer = fs.readFileSync(SOURCE_SVG);

  for (const size of ICON_SIZES) {
    const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`✅ Generated: icon-${size}x${size}.png`);
  }

  // Generate Apple Touch Icon (180x180)
  const appleTouchPath = path.join(OUTPUT_DIR, 'apple-touch-icon.png');
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(appleTouchPath);
  console.log('✅ Generated: apple-touch-icon.png');

  // Generate favicon
  const faviconPath = path.join(process.cwd(), 'public/favicon.ico');
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));
  console.log('✅ Generated: favicon-32x32.png');

  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(OUTPUT_DIR, 'favicon-16x16.png'));
  console.log('✅ Generated: favicon-16x16.png');

  console.log('\n✨ All PWA icons generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Convert favicon-32x32.png to favicon.ico using an online tool');
  console.log('2. Or run: npx png-to-ico public/icons/favicon-32x32.png > public/favicon.ico');
}

generateIcons().catch(console.error);
