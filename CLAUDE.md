# CLAUDE.md - RehabNearByMe.com Project Guide

This file provides guidance to Claude Code when working with the RehabNearByMe.com project.

## Project Overview

RehabNearByMe.com is a comprehensive directory of rehabilitation and addiction treatment centers in the United States.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase / Drizzle ORM
- **Deployment**: Vercel

## Key Features

### 1. Geographic Structure
- `/state/[state]` - State-level listings (e.g., California)
- `/county/[county]` - County-level listings
- `/city/[city]` - City-level listings
- `/facility/[slug]` - Individual facility detail pages

### 2. Facility Types
- Inpatient Rehabilitation Centers
- Outpatient Treatment Programs
- Detox Centers
- Sober Living Homes
- Dual Diagnosis Treatment
- Luxury Rehab Centers

### 3. Treatment Specializations
- Alcohol Addiction
- Drug Addiction (Opioids, Cocaine, Meth, etc.)
- Prescription Drug Abuse
- Mental Health & Co-occurring Disorders
- Adolescent Programs
- Veterans Programs

### 4. Search & Filter
- Search by location, facility name
- Filter by treatment type
- Filter by insurance accepted
- Filter by amenities

## Data Structure

### Facility Data Format
```typescript
{
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  state_abbr: string;
  county: string;
  zip: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  review_count?: number;
  photo?: string;
  facility_types: string[];
  treatment_types: string[];
  insurance_accepted: string[];
  amenities: string[];
  description?: string;
}
```

## Important URLs and Routes

### Public Pages
- `/` - Homepage with search
- `/search` - Search results page
- `/state/[state]` - State listings
- `/county/[county]` - County listings
- `/city/[city]` - City listings
- `/facility/[slug]` - Facility detail page
- `/compare` - Compare facilities
- `/guide` - Treatment guides
- `/about` - About page
- `/contact` - Contact page

### API Routes
- `/api/search` - Search facilities
- `/api/facility/[slug]` - Get facility data
- `/api/facilities/nearby` - Get nearby facilities

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Discover facilities (scraping)
npm run discover:test
npm run discover:state
npm run discover:full
```

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GOOGLE_PLACES_API_KEY=
```

## Content Guidelines

### Target Audience
- People seeking addiction treatment
- Family members looking for help
- Healthcare professionals
- Insurance providers

### Tone
- Compassionate and supportive
- Professional and informative
- Non-judgmental
- Hopeful

### SEO Focus Keywords
- rehab near me
- addiction treatment centers
- drug rehab [city]
- alcohol rehab [state]
- inpatient rehab
- outpatient treatment
- detox centers near me

## Notes

- This project follows a directory website architecture
- Facility data will be scraped from Google Places API
- Focus on US market initially
- HIPAA compliance considerations for any user data
