# CLAUDE.md - VindElektricien.nl Project Guide

This file provides guidance to Claude Code when working with the VindElektricien.nl project.

## Project Overview

VindElektricien.nl is a comprehensive directory of electricians (elektriciens) in the Netherlands. It helps Dutch consumers find qualified electricians in their area.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase / Drizzle ORM
- **Deployment**: Vercel

## Key Features

### 1. Geographic Structure
- `/provincie/[province]` - Province-level listings (e.g., Noord-Holland)
- `/gemeente/[municipality]` - Municipality-level listings
- `/stad/[city]` - City-level listings
- `/elektricien/[slug]` - Individual electrician detail pages

### 2. Service Types (Diensten)
- Storingen & Reparaties (Electrical faults & repairs)
- Installatie (New installations)
- Meterkast/Groepenkast (Fuse box / electrical panel)
- Laadpaal installatie (EV charging station installation)
- Zonnepanelen (Solar panel installation)
- Domotica / Smart Home
- Verlichting (Lighting)
- Bedrijfsinstallaties (Commercial installations)

### 3. Electrician Specializations
- Particulier (Residential)
- Zakelijk / MKB (Commercial / SMB)
- Industrieel (Industrial)
- Noodservice 24/7 (Emergency service)
- NEN-keuringen (NEN inspections)

### 4. Search & Filter
- Search by location, electrician name
- Filter by service type
- Filter by specialization
- Filter by certifications (Erkend, VCA, etc.)

## Data Structure

### Electrician Data Format
```typescript
{
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone?: string;
  website?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  review_count?: number;
  photo?: string;
  service_types: string[];      // storingen, installatie, meterkast, etc.
  specializations: string[];    // particulier, zakelijk, industrieel
  certifications: string[];     // Erkend, VCA, NEN
  description?: string;
}
```

## Important URLs and Routes

### Public Pages
- `/` - Homepage with search
- `/zoeken` - Search results page
- `/provincie/[province]` - Province listings
- `/gemeente/[municipality]` - Municipality listings
- `/stad/[city]` - City listings
- `/elektricien/[slug]` - Electrician detail page
- `/vergelijken` - Compare electricians
- `/diensten` - Service types overview
- `/over-ons` - About page
- `/contact` - Contact page

### API Routes
- `/api/search` - Search electricians
- `/api/elektricien/[slug]` - Get electrician data
- `/api/elektriciens/nearby` - Get nearby electricians

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Discover electricians (scraping)
npm run discover:test
npm run discover:province
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
- Homeowners needing electrical work
- Businesses looking for commercial electricians
- Property managers
- Contractors needing subcontractors

### Tone
- Professional and trustworthy
- Clear and informative
- Helpful and service-oriented
- Dutch language throughout

### SEO Focus Keywords (Dutch)
- elektricien bij mij in de buurt
- elektricien [city]
- storingsdienst elektra
- laadpaal installateur
- meterkast vervangen
- zonnepanelen installatie
- elektrische installatie
- elektricien spoed

## Design Theme

### Colors
- **Primary**: Yellow (#EAB308) - Electricity, energy, visibility
- **Secondary**: Dark Blue (#1E3A8A) - Trust, professionalism
- **Background**: Light gray/white
- **Accents**: Orange for CTAs

### Icons
- Lightning bolt (main logo)
- Electrical plug
- Power/electricity symbols

## Notes

- This project follows a directory website architecture
- Electrician data will be scraped from Google Places API
- Focus on Netherlands market
- All content in Dutch language
- Comply with Dutch privacy regulations (AVG/GDPR)
