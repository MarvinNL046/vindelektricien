/**
 * HYBRID ENRICHMENT STRATEGY
 *
 * Voorbeeld scripts voor het combineren van Jina (scraping) en GPT (generatie)
 * ZONDER dat ze elkaars data overschrijven.
 *
 * Structuur:
 * - Script 1: jina-metadata.ts  → schrijft naar `place.scraped`
 * - Script 2: gpt-content.ts    → schrijft naar `place.generated`
 * - Beide scripts: lezen/schrijven naar DEZELFDE data file
 * - Maar naar VERSCHILLENDE velden!
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// =============================================================================
// TYPES
// =============================================================================

interface ScrapedData {
  email?: string;
  telefoon?: string;
  openingstijden?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  adres_verified?: string;
  last_scraped?: string;
}

interface GeneratedData {
  aboutUs?: string;
  services?: string;
  seoTitle?: string;
  seoDescription?: string;
  last_generated?: string;
}

interface Place {
  id: string;
  naam: string;
  adres?: string;
  gemeente?: string;
  website?: string;
  // Jina data - APART veld
  scraped?: ScrapedData;
  // GPT data - APART veld
  generated?: GeneratedData;
}

// =============================================================================
// CONFIG
// =============================================================================

const CONFIG = {
  DATA_FILE: path.join(process.cwd(), 'data', 'places.json'),
  PROGRESS_FILE_JINA: path.join(process.cwd(), 'data', 'jina-progress.json'),
  PROGRESS_FILE_GPT: path.join(process.cwd(), 'data', 'gpt-progress.json'),
  SAVE_INTERVAL: 25,
  MIN_WORDS: 400,
  MAX_RETRIES: 3,
};

// =============================================================================
// SCRIPT 1: JINA METADATA SCRAPER
// =============================================================================

/**
 * Jina script - haalt alleen FEITEN op, geen lange teksten
 */
async function scrapeWithJina(place: Place): Promise<ScrapedData | null> {
  if (!place.website) return null;

  try {
    // Jina Reader API
    const response = await fetch(`https://r.jina.ai/${place.website}`, {
      headers: {
        'Authorization': `Bearer ${process.env.JINA_API_KEY}`,
        'X-Return-Format': 'markdown',
      }
    });

    const content = await response.text();

    // Gebruik GPT om structured data te extracten (NIET voor content!)
    const openai = new OpenAI();
    const extraction = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Je bent een data extractor. Extract ALLEEN feitelijke gegevens.
Geen lange teksten of beschrijvingen. Alleen concrete data.`
        },
        {
          role: 'user',
          content: `Extract de volgende gegevens uit deze pagina content:
- Email adressen
- Telefoonnummers
- Openingstijden
- Social media links (facebook, instagram, linkedin)
- Fysiek adres

PAGINA CONTENT:
${content.substring(0, 5000)}

Antwoord in JSON format:
{
  "email": "...",
  "telefoon": "...",
  "openingstijden": "...",
  "social": { "facebook": "...", "instagram": "...", "linkedin": "..." },
  "adres": "..."
}`
        }
      ],
      temperature: 0.1,  // Laag voor consistente extractie
      response_format: { type: 'json_object' }
    });

    const data = JSON.parse(extraction.choices[0].message.content || '{}');

    return {
      email: data.email || undefined,
      telefoon: data.telefoon || undefined,
      openingstijden: data.openingstijden || undefined,
      social: data.social || undefined,
      adres_verified: data.adres || undefined,
      last_scraped: new Date().toISOString(),
    };

  } catch (error) {
    console.error(`Jina error for ${place.naam}:`, error);
    return null;
  }
}

/**
 * Main Jina runner - schrijft ALLEEN naar place.scraped
 */
async function runJinaScraper() {
  const places: Place[] = JSON.parse(fs.readFileSync(CONFIG.DATA_FILE, 'utf-8'));
  const progress = loadProgress(CONFIG.PROGRESS_FILE_JINA);

  const toProcess = places.filter(p =>
    p.website &&
    !progress.completedIds.includes(p.id)
  );

  console.log(`Jina Scraper: ${toProcess.length} te verwerken`);

  for (let i = 0; i < toProcess.length; i++) {
    const place = toProcess[i];
    const scraped = await scrapeWithJina(place);

    if (scraped) {
      // BELANGRIJK: Alleen .scraped updaten, niet de rest!
      const idx = places.findIndex(p => p.id === place.id);
      places[idx].scraped = scraped;
      progress.completedIds.push(place.id);
      console.log(`✅ ${place.naam} - scraped`);
    }

    // Periodiek opslaan
    if ((i + 1) % CONFIG.SAVE_INTERVAL === 0) {
      fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(places, null, 2));
      saveProgress(CONFIG.PROGRESS_FILE_JINA, progress);
    }
  }

  // Final save
  fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(places, null, 2));
  saveProgress(CONFIG.PROGRESS_FILE_JINA, progress);
}


// =============================================================================
// SCRIPT 2: GPT CONTENT GENERATOR
// =============================================================================

/**
 * GPT script - genereert VERHAAL content
 */
async function generateWithGPT(
  openai: OpenAI,
  place: Place
): Promise<GeneratedData | null> {

  // Bouw context met ALLE beschikbare data (incl. scraped!)
  const context = buildContext(place);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Je schrijft unieke, informatieve teksten voor bedrijven. Minimaal 400 woorden.'
        },
        {
          role: 'user',
          content: `Schrijf een "Over Ons" tekst voor dit bedrijf.

=== GEGEVENS ===
Naam: ${place.naam}
${place.gemeente ? `Locatie: ${place.gemeente}` : ''}
${place.adres ? `Adres: ${place.adres}` : ''}

=== BESCHIKBARE INFO ===
${context}

=== INSTRUCTIES ===
- Minimaal 400 woorden
- Professioneel maar toegankelijk
- Verwerk de echte gegevens in de tekst
- Maak het uniek voor dit bedrijf

=== OUTPUT (JSON) ===
{
  "aboutUs": "De volledige tekst...",
  "services": "Kort overzicht van diensten...",
  "seoTitle": "SEO titel max 60 chars",
  "seoDescription": "Meta description max 160 chars"
}`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    });

    const data = JSON.parse(response.choices[0].message.content || '{}');

    // Valideer minimaal 400 woorden
    const wordCount = (data.aboutUs || '').split(/\s+/).length;
    if (wordCount < CONFIG.MIN_WORDS) {
      return null;  // Retry in main loop
    }

    return {
      aboutUs: data.aboutUs,
      services: data.services,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      last_generated: new Date().toISOString(),
    };

  } catch (error) {
    console.error(`GPT error for ${place.naam}:`, error);
    return null;
  }
}

/**
 * Bouw context string met alle beschikbare data
 */
function buildContext(place: Place): string {
  const parts: string[] = [];

  // Scraped data meegeven aan GPT!
  if (place.scraped) {
    if (place.scraped.openingstijden) {
      parts.push(`Openingstijden: ${place.scraped.openingstijden}`);
    }
    if (place.scraped.telefoon) {
      parts.push(`Telefoon: ${place.scraped.telefoon}`);
    }
    if (place.scraped.email) {
      parts.push(`Email: ${place.scraped.email}`);
    }
  }

  return parts.join('\n') || 'Geen aanvullende info beschikbaar.';
}

/**
 * Main GPT runner - schrijft ALLEEN naar place.generated
 */
async function runGPTGenerator() {
  const openai = new OpenAI();
  const places: Place[] = JSON.parse(fs.readFileSync(CONFIG.DATA_FILE, 'utf-8'));
  const progress = loadProgress(CONFIG.PROGRESS_FILE_GPT);

  const toProcess = places.filter(p =>
    !progress.completedIds.includes(p.id) &&
    !p.generated?.aboutUs  // Nog geen content
  );

  console.log(`GPT Generator: ${toProcess.length} te verwerken`);

  for (let i = 0; i < toProcess.length; i++) {
    const place = toProcess[i];

    let generated: GeneratedData | null = null;
    let attempts = 0;

    // Retry loop
    while (!generated && attempts < CONFIG.MAX_RETRIES) {
      attempts++;
      generated = await generateWithGPT(openai, place);
      if (!generated && attempts < CONFIG.MAX_RETRIES) {
        console.log(`   🔄 Retry ${attempts + 1}/${CONFIG.MAX_RETRIES}`);
      }
    }

    if (generated) {
      // BELANGRIJK: Alleen .generated updaten, niet de rest!
      const idx = places.findIndex(p => p.id === place.id);
      places[idx].generated = generated;
      progress.completedIds.push(place.id);

      const words = (generated.aboutUs || '').split(/\s+/).length;
      console.log(`✅ ${place.naam} - ${words} woorden`);
    } else {
      progress.failedIds.push(place.id);
      console.log(`❌ ${place.naam} - failed`);
    }

    // Periodiek opslaan
    if ((i + 1) % CONFIG.SAVE_INTERVAL === 0) {
      console.log('💾 Saving...');
      fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(places, null, 2));
      saveProgress(CONFIG.PROGRESS_FILE_GPT, progress);
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  // Final save
  fs.writeFileSync(CONFIG.DATA_FILE, JSON.stringify(places, null, 2));
  saveProgress(CONFIG.PROGRESS_FILE_GPT, progress);
}


// =============================================================================
// PROGRESS HELPERS
// =============================================================================

interface Progress {
  completedIds: string[];
  failedIds: string[];
  lastRun: string;
}

function loadProgress(file: string): Progress {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
  } catch (e) {}
  return { completedIds: [], failedIds: [], lastRun: '' };
}

function saveProgress(file: string, progress: Progress): void {
  progress.lastRun = new Date().toISOString();
  fs.writeFileSync(file, JSON.stringify(progress, null, 2));
}


// =============================================================================
// USAGE
// =============================================================================

/*
STAP 1: Run Jina eerst (voor metadata)
$ npx tsx scripts/jina-metadata.ts

STAP 2: Run GPT daarna (voor content)
$ npx tsx scripts/gpt-content.ts

OF: Run beiden TEGELIJK (veilig want aparte velden!)
$ npx tsx scripts/jina-metadata.ts &
$ npx tsx scripts/gpt-content.ts &

RESULTAAT in data/places.json:
{
  "id": "123",
  "naam": "Bakkerij Jansen",
  "scraped": {              ← Jina data
    "email": "info@...",
    "telefoon": "020-...",
    "last_scraped": "2024-..."
  },
  "generated": {            ← GPT data
    "aboutUs": "400+ woorden...",
    "seoTitle": "...",
    "last_generated": "2024-..."
  }
}
*/

// Export voor gebruik
export { runJinaScraper, runGPTGenerator };
