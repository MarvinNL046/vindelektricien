# VindElektricien.nl - Project Roadmap

**Website:** https://vindelektricien.nl
**Last Updated:** 19-01-2026
**Status:** Development Phase

---

## Project Overview

VindElektricien.nl is a comprehensive directory of electricians (elektriciens) across the Netherlands. The platform helps Dutch consumers and businesses find qualified electricians based on location, service type, and certifications.

---

## Completed Tasks

### Phase 1: Project Setup (Completed)
- [x] Set up Next.js project with App Router
- [x] Configure Tailwind CSS and shadcn/ui
- [x] Set up Drizzle ORM with database schema
- [x] Create base components and layouts
- [x] Implement Dutch language throughout

### Phase 2: Design & Branding (Completed)
- [x] Update color theme: Yellow/Blue for electrical branding
- [x] Update Logo component with lightning bolt icon
- [x] Design homepage hero section
- [x] Create responsive navigation
- [x] Update Header and Footer for electrician branding

### Phase 3: Content & Pages (Completed)
- [x] Create province guide pages (all 12 provinces)
- [x] Create topic guides (elektricien kiezen, storingen, etc.)
- [x] Create service type guides (laadpaal, zonnepanelen, etc.)
- [x] Write comprehensive FAQ content
- [x] Dutch content throughout all guides

### Phase 4: Documentation (Completed)
- [x] Create CLAUDE.md project guide
- [x] Create E-E-A-T guidelines document
- [x] Create monetization strategy document
- [x] Clean up all legacy references

---

## Pending Tasks

### Phase 5: Data & Scraping (High Priority)
- [ ] **Set up Database**
  - Create Neon/Supabase PostgreSQL instance
  - Configure DATABASE_URL in .env.local
  - Run drizzle migrations

- [ ] **Electrician Data Collection**
  - [ ] Update discovery script for Google Places API
  - [ ] Scrape electricians by city/province
  - [ ] Enrich data with GPT (descriptions, specializations)
  - [ ] Add electrician photos
  - [ ] Verify contact information

- [ ] **Data Quality**
  - [ ] Add certification data (Erkend, VCA, etc.)
  - [ ] Add service type classifications
  - [ ] Generate SEO content for each electrician
  - [ ] Implement data validation

### Phase 6: Core Features (Medium Priority)
- [ ] **Search & Filtering**
  - [ ] Implement location-based search (city, province, postal code)
  - [ ] Add service type filters (storingen, laadpaal, etc.)
  - [ ] Add certification filters
  - [ ] Add specialization filters
  - [ ] Implement sorting (rating, distance, name)

- [ ] **User Features**
  - [ ] User reviews and ratings
  - [ ] Save/bookmark electricians
  - [ ] Contact electrician form
  - [ ] Request quote functionality
  - [ ] Compare electricians feature

- [ ] **Electrician Features**
  - [ ] Claim listing functionality
  - [ ] Dashboard for electricians
  - [ ] Edit business information
  - [ ] Respond to reviews
  - [ ] Upload portfolio photos
  - [ ] Service area management

### Phase 7: SEO & Marketing (Medium Priority)
- [ ] **SEO Optimization**
  - [ ] Generate province landing pages with unique content
  - [ ] Generate city landing pages
  - [ ] Generate service type landing pages
  - [ ] Create blog content about electrical topics
  - [ ] Submit sitemap to Google Search Console
  - [ ] Set up Google Analytics

- [ ] **Schema Markup**
  - [ ] Add LocalBusiness/Electrician schema
  - [ ] Add BreadcrumbList schema
  - [ ] Add FAQPage schema to guide pages
  - [ ] Add Review schema
  - [ ] Add Organization schema

### Phase 8: Monetization (Low Priority)
- [ ] **Advertising**
  - [ ] Set up Google AdSense
  - [ ] Configure ad placements
  - [ ] Add affiliate partnerships (laadpalen, zonnepanelen)

- [ ] **Premium Features**
  - [ ] Featured listing upgrades
  - [ ] Lead generation system
  - [ ] Premium electrician profiles
  - [ ] Subscription management (Mollie/Stripe)

### Phase 9: Deployment & Launch (High Priority)
- [ ] **Vercel Deployment**
  - [ ] Connect GitHub repository
  - [ ] Configure environment variables
  - [ ] Set up custom domain (vindelektricien.nl)
  - [ ] Configure SSL certificate
  - [ ] Set up preview deployments

- [ ] **Post-Launch**
  - [ ] Monitor error tracking (Sentry)
  - [ ] Set up uptime monitoring
  - [ ] Performance optimization
  - [ ] Mobile responsiveness testing

---

## Technical Debt

- [ ] Fix any npm audit vulnerabilities
- [ ] Review and remove unused exports
- [ ] Add TypeScript strict mode
- [ ] Add unit tests for critical functions
- [ ] Add E2E tests with Playwright

---

## Environment Setup

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://...

# Google APIs
GOOGLE_PLACES_API_KEY=your-api-key

# OpenAI (for content enrichment)
OPENAI_API_KEY=your-api-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run health check
npx tsx scripts/check-health.ts

# Run TypeScript check
npx tsc --noEmit

# Build for production
npm run build
```

---

## Geographic Structure

The site is organized by Dutch geography:

```
/ (homepage)
├── /provincie/[province]     # 12 provinces
│   ├── noord-holland
│   ├── zuid-holland
│   ├── noord-brabant
│   ├── gelderland
│   ├── limburg
│   ├── overijssel
│   ├── utrecht
│   ├── friesland
│   ├── groningen
│   ├── drenthe
│   ├── zeeland
│   └── flevoland
├── /gemeente/[municipality]  # Municipalities
├── /stad/[city]              # Cities
└── /elektricien/[slug]       # Individual electricians
```

---

## Service Types

Main service categories for filtering:

- Storingen & Reparaties (Faults & Repairs)
- Nieuwe Installaties (New Installations)
- Meterkast/Groepenkast (Electrical Panel)
- Laadpaal Installatie (EV Charger Installation)
- Zonnepanelen (Solar Panels)
- NEN-keuringen (NEN Inspections)
- Domotica/Smart Home (Home Automation)
- Bedrijfsinstallaties (Commercial Installations)

---

## Contact

For questions or contributions, please open an issue on GitHub.

---

*This roadmap is a living document and will be updated as the project progresses.*
