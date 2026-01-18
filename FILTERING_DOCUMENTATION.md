# Facility Data Filtering Documentation

## Overview
This document explains the filtering process implemented to ensure only actual rehabilitation facilities are included in the dataset, removing non-facility businesses that appeared in the raw data.

## Problem
The original dataset may contain entries that are not actual rehab facilities. These could include:
- Medical practices that don't offer addiction treatment
- General hospitals without specialized rehab programs
- Non-treatment businesses with rehab-related words in their names
- Wellness spas or fitness centers

## Solution
We implemented a comprehensive filtering system that:
1. Identifies and excludes non-facility businesses based on keywords
2. Identifies and excludes non-treatment services
3. Preserves actual rehabilitation and treatment facilities
4. Uses positive identification for facility-related keywords

## Filtering Rules

### Excluded Keywords (Non-Facility Businesses)
- **Non-treatment medical**: general hospital, urgent care, primary care, dental
- **Wellness/fitness**: spa, gym, fitness, yoga studio, meditation center
- **General businesses**: hotel, motel, restaurant, cafe

### Included Facility Keywords
- rehab, rehabilitation, treatment center, recovery
- Specific types: inpatient, outpatient, detox
- Programs: addiction, substance abuse, mental health
- General: treatment facility, recovery center

### Special Handling
- **Treatment Centers**: Included by default
- **Mixed names**: If a business name contains both excluded and facility keywords, facility keywords take precedence

## Results
- **Original entries**: 6,548
- **Filtered entries**: 3,861 (actual facilities)
- **Removed entries**: 2,687 (non-facility businesses)

## Implementation

### Standalone Filter Script
`scripts/filter-non-facilities.ts` - Can be run independently to filter data

### Integrated Filtering
The filtering logic is integrated into:
- `scripts/process-facility-data.ts`
- `scripts/process-all-data.ts`

### Usage
```bash
# Run standalone filter
npx tsx scripts/filter-non-facilities.ts

# Process facility data with filtering
npx tsx scripts/process-all-data.ts facility data/facilities.csv

# Build production data
npm run build-data
```

## Files Created
- `data/facilities-filtered.csv` - Filtered facility data
- `data/removed-entries.json` - List of removed entries for review
- `data/facilities-processed.json` - Processed facility data
- `public/data/facilities.json` - Production-ready data

## Maintenance
To update filtering rules:
1. Edit the keyword arrays in the filter functions
2. Test with sample data to ensure no valid facilities are excluded
3. Review `removed-entries.json` to verify filtering accuracy
4. Update this documentation with any changes
