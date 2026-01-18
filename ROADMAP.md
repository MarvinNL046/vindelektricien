# RehabNearMe.com - Project Roadmap

**Repository:** https://github.com/MarvinNL046/rehabnearbyme
**Last Updated:** 18-01-2026 18:45u
**Status:** Development Phase

---

## Project Overview

RehabNearMe.com is a comprehensive directory of addiction treatment and rehabilitation centers across the United States. The platform helps individuals and families find appropriate treatment facilities based on location, treatment type, and insurance coverage.

---

## Completed Tasks

### Phase 1: Site Transformation (Completed)
- [x] Transform codebase from cemetery directory to rehab directory
- [x] Update all components, pages, and APIs for rehab context
- [x] Remove all Dutch content and cemetery references
- [x] Create new drizzle schema with facilities table
- [x] Add indexes and relations to database schema

### Phase 2: Design Overhaul (Completed)
- [x] Update color theme: forest green/gold → teal/coral
- [x] Update Logo component with Heart icon
- [x] Redesign homepage hero section
- [x] Update all components with new color scheme
- [x] Update Header and Footer for rehab branding
- [x] Add SAMHSA helpline banner (verified: 1-800-662-4357)

### Phase 3: Content & Pages (Completed)
- [x] Create /guide/insurance page
- [x] Create /guide/what-to-expect page
- [x] Update affiliate and premium content components
- [x] Fix broken internal links
- [x] Fix missing image references

### Phase 4: Developer Tooling (Completed)
- [x] Create health check script (scripts/check-health.ts)
- [x] Install missing dependencies (sharp, chalk, openai, etc.)

---

## Pending Tasks

### Phase 5: Data & Scraping (High Priority)
- [ ] **Set up Neon PostgreSQL database**
  - Create new database instance
  - Configure DATABASE_URL in .env.local
  - Run drizzle migrations

- [ ] **Facility Data Collection**
  - [ ] Update discovery script for SAMHSA API integration
  - [ ] Scrape treatment facilities from Google Places
  - [ ] Import SAMHSA treatment locator data
  - [ ] Enrich facility data with GPT (descriptions, features)
  - [ ] Add facility photos from Google Places

- [ ] **Data Quality**
  - [ ] Verify facility contact information
  - [ ] Add insurance acceptance data
  - [ ] Add treatment type classifications
  - [ ] Generate SEO content for each facility

### Phase 6: Core Features (Medium Priority)
- [ ] **Search & Filtering**
  - [ ] Implement location-based search (city, state, zip)
  - [ ] Add treatment type filters
  - [ ] Add insurance filter
  - [ ] Add amenity filters
  - [ ] Implement sorting (rating, distance, name)

- [ ] **User Features**
  - [ ] Enable user authentication (currently disabled)
  - [ ] User reviews and ratings
  - [ ] Save/bookmark facilities
  - [ ] Contact facility form
  - [ ] Insurance verification requests

- [ ] **Facility Owner Features**
  - [ ] Claim listing functionality
  - [ ] Dashboard for facility owners
  - [ ] Edit facility information
  - [ ] Respond to reviews
  - [ ] Upload photos

### Phase 7: SEO & Marketing (Medium Priority)
- [ ] **SEO Optimization**
  - [ ] Generate state landing pages with content
  - [ ] Generate city landing pages
  - [ ] Generate treatment type landing pages
  - [ ] Create blog content about addiction/recovery
  - [ ] Submit sitemap to Google Search Console
  - [ ] Set up Google Analytics

- [ ] **Schema Markup**
  - [ ] Add LocalBusiness schema to facility pages
  - [ ] Add BreadcrumbList schema
  - [ ] Add FAQPage schema to guide pages
  - [ ] Add Review schema

### Phase 8: Monetization (Low Priority)
- [ ] **Advertising**
  - [ ] Set up Google AdSense
  - [ ] Configure ad placements
  - [ ] Add affiliate partnerships (insurance, interventionists)

- [ ] **Premium Features**
  - [ ] Featured listing upgrades
  - [ ] Lead generation for facilities
  - [ ] Premium facility profiles

### Phase 9: Deployment & Launch (High Priority)
- [ ] **Vercel Deployment**
  - [ ] Connect GitHub repository
  - [ ] Configure environment variables
  - [ ] Set up custom domain (rehabnearme.com)
  - [ ] Configure SSL certificate
  - [ ] Set up preview deployments

- [ ] **Post-Launch**
  - [ ] Monitor error tracking (Sentry)
  - [ ] Set up uptime monitoring
  - [ ] Performance optimization
  - [ ] Mobile responsiveness testing

---

## Technical Debt

- [ ] Fix npm audit vulnerabilities (7 found)
- [ ] Update Node.js to v22+ (required by @react-email packages)
- [ ] Review and remove unused exports (111 flagged)
- [ ] Add TypeScript strict mode
- [ ] Add unit tests for critical functions
- [ ] Add E2E tests with Playwright

---

## Environment Setup

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key

# Google APIs
GOOGLE_PLACES_API_KEY=your-api-key

# OpenAI (for content enrichment)
OPENAI_API_KEY=your-api-key

# Email (Resend)
RESEND_API_KEY=your-api-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev -- -p 3003

# Run health check
npx tsx scripts/check-health.ts

# Run TypeScript check
npx tsc --noEmit

# Build for production
npm run build
```

---

## Contact

For questions or contributions, please open an issue on GitHub:
https://github.com/MarvinNL046/rehabnearbyme/issues

---

*This roadmap is a living document and will be updated as the project progresses.*
