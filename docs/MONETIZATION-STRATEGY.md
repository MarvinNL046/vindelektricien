# RehabNearMe.com - Monetization Strategy

**Repository:** https://github.com/MarvinNL046/rehabnearbyme
**Created:** 18-01-2026
**Status:** Planning Phase

---

## Executive Summary

RehabNearMe.com operates in the addiction treatment directory space, a high-value vertical with significant monetization potential. This document outlines multiple revenue streams while maintaining ethical standards and user trust.

---

## Revenue Streams

### 1. Pay-Per-Lead (PPL) - Primary Revenue

**Model:** Facilities pay for qualified leads (contact form submissions, phone calls)

| Lead Type | Estimated CPL | Notes |
|-----------|---------------|-------|
| Contact Form | $50-150 | Basic inquiry |
| Phone Call (30s+) | $75-200 | Tracked via call tracking |
| Insurance Verified | $150-300 | Pre-qualified lead |
| Admission Inquiry | $200-500 | High intent |

**Implementation:**
- [ ] Integrate call tracking (CallRail, Invoca)
- [ ] Create lead capture forms on facility pages
- [ ] Build CRM for lead management
- [ ] Set up facility dashboard for lead access
- [ ] Implement lead quality scoring

**Projected Revenue:** $50,000-200,000/month at scale

---

### 2. Featured Listings - Subscription Model

**Tiers:**

| Tier | Price/Month | Features |
|------|-------------|----------|
| **Basic** | Free | Standard listing, basic info |
| **Enhanced** | $299/mo | Logo, photos, extended description |
| **Premium** | $599/mo | Top placement, highlighted, badge |
| **Enterprise** | $999/mo | Multiple locations, analytics, dedicated support |

**Features by Tier:**

**Enhanced ($299/mo):**
- Custom facility logo
- Up to 10 photos
- Extended description (2000 chars)
- Treatment programs details
- Staff profiles
- Response to reviews

**Premium ($599/mo):**
- Everything in Enhanced
- "Featured" badge
- Top 3 placement in search results
- Priority in city/state pages
- Click-through analytics
- Lead source tracking

**Enterprise ($999/mo):**
- Everything in Premium
- Multiple location management
- API access for lead integration
- Dedicated account manager
- Quarterly performance reviews
- Custom landing pages

**Projected Revenue:** $20,000-100,000/month with 100-500 paying facilities

---

### 3. Google AdSense - Display Advertising

**Strategic Placements:**
- Above search results (728x90 leaderboard)
- Sidebar on facility pages (300x250)
- In-article on guide pages (native)
- Footer banner (728x90)

**Expected RPM:** $15-40 (health/medical niche)

**Traffic Projections:**
| Monthly Visitors | Ad Revenue |
|------------------|------------|
| 10,000 | $150-400 |
| 50,000 | $750-2,000 |
| 100,000 | $1,500-4,000 |
| 500,000 | $7,500-20,000 |

**Implementation:**
- [ ] Apply for AdSense approval
- [ ] Configure ad units
- [ ] Implement lazy loading for performance
- [ ] A/B test placements
- [ ] Monitor Core Web Vitals impact

---

### 4. Affiliate Partnerships

**Potential Partners:**

| Partner Type | Commission Model | Estimated Revenue |
|--------------|------------------|-------------------|
| Insurance Verification Services | $25-50/verification | $5,000-20,000/mo |
| Intervention Services | $100-300/referral | $2,000-10,000/mo |
| Recovery Apps (Sober Grid, etc.) | $5-15/install | $1,000-5,000/mo |
| Recovery Books (Amazon) | 4-8% of sale | $500-2,000/mo |
| Sober Living Directories | $50-100/referral | $2,000-8,000/mo |
| Drug Testing Kits | 10-20% of sale | $500-2,000/mo |

**Implementation:**
- [x] Create AffiliateBottomBar component
- [x] Create AffiliateSection component
- [ ] Sign up for affiliate programs
- [ ] Implement tracking pixels
- [ ] Create dedicated landing pages

---

### 5. Sponsored Content

**Options:**

| Content Type | Price | Deliverables |
|--------------|-------|--------------|
| Blog Post | $500-1,500 | 1000+ word article, SEO optimized |
| Guide Sponsorship | $1,000-3,000 | Logo + mention in guide |
| Newsletter Mention | $250-750 | Featured in email blast |
| Facility Spotlight | $750-2,000 | Detailed facility profile |

**Guidelines:**
- All sponsored content marked as "Sponsored"
- Must meet editorial standards
- No false claims allowed
- Subject to editorial review

---

### 6. Data & API Access

**For Researchers & Healthcare Organizations:**

| Package | Price | Access |
|---------|-------|--------|
| Basic API | $99/mo | 1,000 requests, basic data |
| Professional | $299/mo | 10,000 requests, full data |
| Enterprise | Custom | Unlimited, raw data access |

**Data Products:**
- Treatment facility database
- Geographic coverage analysis
- Treatment type trends
- Insurance acceptance data

---

## Ethical Considerations

### What We Will NOT Do:
- Accept payment to manipulate search rankings
- Allow false or misleading facility information
- Share user data without consent
- Promote facilities with compliance issues
- Accept kickbacks for referrals without disclosure

### Transparency Commitments:
- Clear disclosure of paid placements
- Honest reviews and ratings
- Equal opportunity for all facilities to be listed
- Free basic listings always available
- User privacy protection

---

## Revenue Projections

### Year 1 Goals (Conservative)

| Revenue Stream | Monthly Target | Annual |
|----------------|----------------|--------|
| Featured Listings | $15,000 | $180,000 |
| Pay-Per-Lead | $25,000 | $300,000 |
| AdSense | $2,000 | $24,000 |
| Affiliates | $3,000 | $36,000 |
| **Total** | **$45,000** | **$540,000** |

### Year 2 Goals (Growth)

| Revenue Stream | Monthly Target | Annual |
|----------------|----------------|--------|
| Featured Listings | $50,000 | $600,000 |
| Pay-Per-Lead | $100,000 | $1,200,000 |
| AdSense | $10,000 | $120,000 |
| Affiliates | $10,000 | $120,000 |
| Sponsored Content | $5,000 | $60,000 |
| **Total** | **$175,000** | **$2,100,000** |

---

## Implementation Priority

### Phase 1 (Month 1-3)
1. Apply for AdSense
2. Set up featured listing tiers
3. Implement basic lead capture

### Phase 2 (Month 4-6)
1. Launch PPL program with 10 pilot facilities
2. Sign affiliate partnerships
3. Build facility dashboard

### Phase 3 (Month 7-12)
1. Scale PPL to 100+ facilities
2. Launch call tracking
3. Implement insurance verification affiliate
4. Launch API product

---

## Competitive Analysis

| Competitor | Primary Revenue | Estimated Revenue |
|------------|-----------------|-------------------|
| Rehabs.com | PPL, Ads | $5-10M/year |
| AddictionCenter.com | PPL, Featured | $10-20M/year |
| DrugAbuse.com | Ads, Affiliate | $2-5M/year |
| SAMHSA (gov) | N/A (free) | N/A |

**Our Advantage:** Modern tech stack, better UX, local SEO focus, transparent practices.

---

## Key Metrics to Track

- **Traffic:** Monthly visitors, page views, bounce rate
- **Leads:** Form submissions, phone calls, quality score
- **Revenue:** RPM, CPL, MRR from subscriptions
- **Facilities:** Active listings, paying customers, churn rate
- **SEO:** Rankings, organic traffic, domain authority

---

## Next Steps

1. [ ] Validate pricing with facility owners
2. [ ] Build payment integration (Stripe)
3. [ ] Create sales materials
4. [ ] Hire sales representative
5. [ ] Launch beta with 20 facilities

---

*This strategy will be reviewed and updated quarterly based on market conditions and performance data.*
