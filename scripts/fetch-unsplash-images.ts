/**
 * Script om Unsplash images te zoeken en downloaden met Jina.ai
 * Gebruik: npx tsx scripts/fetch-unsplash-images.ts
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const JINA_API_KEY = 'jina_87f2d697e60a4f93b5b0b7576da1a857shcct21CGvGd4dbCBSyCUHLfKodA';

// Mapping van blog posts naar zoektermen en bestandsnamen
const blogImages: Record<string, { searchTerm: string; filename: string }> = {
  'choosing-treatment-center-guide': {
    searchTerm: 'peaceful nature wellness retreat',
    filename: 'choosing-treatment-center-guide.jpg'
  },
  'understanding-addiction-recovery': {
    searchTerm: 'recovery support group therapy',
    filename: 'addiction-recovery.jpg'
  }
};

// Curated Unsplash image IDs for rehab-related topics
const curatedImages: Record<string, string[]> = {
  rehab: [
    'photo-1507003211169-0a1dd7228f2d', // Peaceful setting
    'photo-1571019614242-c5c5dee9f50b', // Wellness retreat
    'photo-1545205597-3d9d02c29597', // Meditation
    'photo-1544367567-0f2fcb009e0b', // Yoga wellness
    'photo-1604014237800-1c9102c219da', // Garden therapy
  ],
  nature: [
    'photo-1441974231531-c6227db76b6e', // Forest path
    'photo-1518495973542-4542c06a5843', // Peaceful trees
    'photo-1542273917363-3b1817f69a2d', // Garden
  ],
  wellness: [
    'photo-1571019614242-c5c5dee9f50b', // Wellness retreat
    'photo-1582653291997-079a1c04e5a1', // Health center
    'photo-1590362891991-f776e747a588', // Recovery space
  ]
};

async function searchUnsplashWithJina(query: string): Promise<string[]> {
  const searchUrl = `https://s.jina.ai/?q=unsplash+${encodeURIComponent(query)}`;

  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${JINA_API_KEY}`,
        'X-Respond-With': 'no-content'
      }
    };

    https.get(searchUrl, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Extract Unsplash photo IDs from response
        const photoIdRegex = /unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/g;
        const matches = [...data.matchAll(photoIdRegex)];
        const photoIds = matches.map(m => m[1]);
        resolve(photoIds);
      });
    }).on('error', reject);
  });
}

function downloadImage(photoId: string, outputPath: string): Promise<void> {
  const imageUrl = `https://images.unsplash.com/${photoId}?w=1200&h=630&fit=crop&q=80`;

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    https.get(imageUrl, (response) => {
      // Handle redirect
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          https.get(redirectUrl, (redirectResponse) => {
            redirectResponse.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          }).on('error', reject);
        }
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete incomplete file
      reject(err);
    });
  });
}

async function downloadUnsplashImage(photoId: string, filename: string): Promise<boolean> {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'blog');
  const outputPath = path.join(outputDir, filename);

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    await downloadImage(photoId, outputPath);
    const stats = fs.statSync(outputPath);

    if (stats.size < 1000) {
      console.log(`❌ ${filename}: File too small (${stats.size} bytes), might be invalid`);
      return false;
    }

    console.log(`✅ ${filename}: Downloaded (${Math.round(stats.size / 1024)} KB)`);
    return true;
  } catch (error) {
    console.error(`❌ ${filename}: Failed to download`, error);
    return false;
  }
}

async function main() {
  console.log('🖼️  Unsplash Image Fetcher voor Blog\n');

  // Download curated images for blog posts
  const downloads = [
    { photoId: 'photo-1507003211169-0a1dd7228f2d', filename: 'choosing-treatment-center-guide.jpg' },
    { photoId: 'photo-1571019614242-c5c5dee9f50b', filename: 'addiction-recovery.jpg' },
  ];

  for (const { photoId, filename } of downloads) {
    await downloadUnsplashImage(photoId, filename);
  }

  console.log('\n📝 Unsplash Attributie (verplicht bij gebruik):');
  console.log('   Foto\'s van Unsplash - https://unsplash.com');
  console.log('   Gratis te gebruiken met vermelding van de fotograaf\n');
}

// Export functions for use in other scripts
export { downloadUnsplashImage, searchUnsplashWithJina, curatedImages };

// Run if called directly
main().catch(console.error);
