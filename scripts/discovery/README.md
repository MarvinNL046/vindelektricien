# Facility Discovery System

Automatically discover rehabilitation facilities via Bright Data SERP API.

## Overview

This system automatically searches for rehab facilities across US states and cities via Google Maps, retrieves CIDs/place_ids, and collects reviews, ratings, and opening hours.

## Scripts

### 1. `seed-locations.ts` - Generate search locations

Creates a list of all US states and cities.

```bash
# Generate all locations
npx tsx scripts/discovery/seed-locations.ts

# Only one state
npx tsx scripts/discovery/seed-locations.ts --state "California"

# Dry run (preview)
npx tsx scripts/discovery/seed-locations.ts --dry-run

# Reset and start fresh
npx tsx scripts/discovery/seed-locations.ts --reset
```

### 2. `discover-facilities.ts` - Search for facilities

Searches via Bright Data SERP API for rehab facilities in each location.

```bash
# Process all pending locations
npx tsx scripts/discovery/discover-facilities.ts

# Only one state
npx tsx scripts/discovery/discover-facilities.ts --state "Texas"

# Limit number of locations
npx tsx scripts/discovery/discover-facilities.ts --batch 50

# Dry run (preview, no API calls)
npx tsx scripts/discovery/discover-facilities.ts --dry-run

# Resume after interruption
npx tsx scripts/discovery/discover-facilities.ts --resume
```

### 3. `export-to-main-data.ts` - Export to main data

Merges discovered facilities with the existing `facilities.json`.

```bash
# Export all
npx tsx scripts/discovery/export-to-main-data.ts

# Preview without changes
npx tsx scripts/discovery/export-to-main-data.ts --dry-run

# Only new (skip updates)
npx tsx scripts/discovery/export-to-main-data.ts --skip-existing
```

## Data Files

```
data/discovery/
├── locations.json              # All US locations with status
├── progress.json               # Progress statistics
├── discovered-facilities.json  # Discovered facilities (raw)
└── rate-limits.json            # API rate limiting state
```

## Workflow

1. **Seed locations** (one-time or after boundary changes)
   ```bash
   npx tsx scripts/discovery/seed-locations.ts
   ```

2. **Run discovery** (can be run multiple times, auto-resumes)
   ```bash
   npx tsx scripts/discovery/discover-facilities.ts
   ```

3. **Export to main data**
   ```bash
   npx tsx scripts/discovery/export-to-main-data.ts
   ```

4. **Commit & deploy**
   ```bash
   git add data/
   git commit -m "Add discovered facilities"
   ```

## Rate Limiting

The discovery script has built-in rate limiting:

| Limit | Value |
|-------|-------|
| Per minute | 10 requests |
| Per hour | 300 requests |
| Per day | 3000 requests |
| Retry attempts | 3 (exponential backoff) |
| Batch delay | 3 seconds |

The state is saved in `rate-limits.json` and persists between runs.

## Retry Logic

- **Automatic retries**: 3 attempts with exponential backoff
- **Failed locations**: Are marked and can be retried
- **Resume support**: Resume where you left off with `--resume`

## What is Retrieved?

Per facility:
- Google CID (for reviews fetching)
- Google Place ID
- Name and address
- GPS coordinates
- Phone and website
- Rating and review count
- Opening hours
- Top reviews (max 10)
- Business type

## Environment Variables

Ensure these are in `.env.local`:

```env
BRIGHTDATA_API_KEY=your_api_key_here
# or
BRIGHTDATA_API_TOKEN=your_api_key_here
```

## Tips

1. **Start small**: Test first with one state (`--state "Delaware"`)
2. **Monitor progress**: Check `progress.json` for statistics
3. **Batch runs**: Use `--batch 100` for controlled runs
4. **Dry run first**: Use `--dry-run` to see what happens

## Example Output

```
🔍 Facility Discovery Script

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Status:
   Total locations: 456
   To process: 456
   Already found: 0 facilities
   Unique CIDs: 0

🚀 Starting processing of 456 locations...

📍 Los Angeles (Los Angeles, California)
   🔎 Searching: "rehab center Los Angeles"...
   ✓ 12 found (12 new)
   🔎 Searching: "addiction treatment Los Angeles"...
   ✓ 5 found (3 new)
   💾 Saved (1/456)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Processed: 456/456 locations
🆕 Newly found: 2847 facilities
📦 Total in database: 2847
🔢 Unique CIDs: 2847
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
