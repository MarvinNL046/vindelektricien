# VindElektricien.nl - E-E-A-T Implementation Guide

**Website:** https://vindelektricien.nl
**Created:** 18-01-2026
**Purpose:** Maximize Google Search visibility through E-E-A-T compliance

---

## What is E-E-A-T?

Google's E-E-A-T framework evaluates content quality:

- **E**xperience - First-hand experience with the topic
- **E**xpertise - Knowledge and skills in the field
- **A**uthoritativeness - Recognition as a trusted source
- **T**rustworthiness - Accuracy, honesty, and safety

**Why it matters for VindElektricien:** Electrical work involves safety concerns, making our content important for users making decisions about their home and business electrical needs. Quality content helps users find reliable electricians.

---

## Experience Implementation

### 1. User-Generated Content

**Reviews & Testimonials:**
- [ ] Enable verified user reviews on electrician pages
- [ ] Require email verification for reviewers
- [ ] Add "Verified Customer" badge for confirmed jobs
- [ ] Allow photo uploads with reviews
- [ ] Display review dates prominently

**Implementation:**
```tsx
// Review component should show:
- Reviewer name (or anonymous option)
- "Verified Customer" badge if confirmed
- Date of review
- Type of work performed
- Electrician response
- Would recommend (yes/no)
- Detailed review text
```

### 2. First-Person Experience Content

**Blog Topics from Experience:**
- [ ] "Mijn ervaring met een meterkast vervanging"
- [ ] "Hoe ik de juiste elektricien voor mijn laadpaal vond"
- [ ] "Wat ik leerde over elektrische storingen"
- [ ] "Tips voor het voorbereiden op een elektricien bezoek"
- [ ] "Na de renovatie: mijn nieuwe elektrische installatie"

**Guidelines:**
- Partner with homeowners for authentic stories
- Include author bio and location
- Add disclaimer about individual experiences
- Update content with follow-up stories

### 3. Electrician Profiles

- [ ] Encourage electricians to add photos of their work
- [ ] Create "Portfolio" sections on electrician pages
- [ ] Collect case studies from verified electricians
- [ ] Interview electricians about their expertise

---

## Expertise Implementation

### 1. Expert Contributors

**Build Expert Network:**

| Expert Type | Role | Content |
|-------------|------|---------|
| Certified Electricians | Article review, Q&A | Technical advice |
| NEN Inspectors | Safety content review | Inspection guides |
| Domotica Specialists | Smart home content | Smart home guides |
| Solar Installers | Renewable energy content | Solar panel guides |
| Industry Associations | Industry insights | Standards and regulations |

**Expert Author Pages:**
- [ ] Create /over-ons/experts page
- [ ] Individual expert bio pages
- [ ] Link experts to their content
- [ ] Display credentials prominently
- [ ] Include certification verification links

**Schema Implementation:**
```json
{
  "@type": "Person",
  "name": "Jan de Vries",
  "jobTitle": "Erkend Installateur",
  "credentials": ["NEN 1010", "VCA-VOL"],
  "affiliation": {
    "@type": "Organization",
    "name": "UNETO-VNI"
  },
  "sameAs": [
    "https://linkedin.com/in/jandevries"
  ]
}
```

### 2. Content Quality Standards

**Every Article Must Include:**
- [ ] Author name and credentials
- [ ] Technical reviewer (for technical content)
- [ ] Publication date
- [ ] Last reviewed/updated date
- [ ] Sources and citations
- [ ] Clear, accurate information

**Article Template:**
```markdown
# Article Title

**Geschreven door:** [Author Name], [Credentials]
**Technisch gecontroleerd door:** [Reviewer Name], [Credentials]
**Gepubliceerd:** [Date] | **Laatst bijgewerkt:** [Date]

[Content...]

## Bronnen
1. [Source with link]
2. [Source with link]

---
*Dit artikel is gecontroleerd op technische juistheid door [Reviewer].*
```

### 3. Educational Content

**Create Comprehensive Guides:**
- [x] Elektricien kiezen gids
- [x] Storingen en reparaties gids
- [x] Meterkast/groepenkast gids
- [x] Laadpaal installatie gids
- [x] Zonnepanelen installatie gids
- [x] NEN-keuringen gids
- [ ] Veilig werken met elektra gids
- [ ] Energiebesparing tips
- [ ] Domotica beginnersgids
- [ ] Elektrische installatie bij verbouwing

---

## Authoritativeness Implementation

### 1. Brand Authority Signals

**About Page Requirements:**
- [ ] Company mission and values
- [ ] Team bios with photos
- [ ] KvK registration information
- [ ] Contact information (email, phone)
- [ ] Company history
- [ ] Editorial guidelines
- [ ] Partnerships and affiliations

**Trust Badges:**
- [ ] SSL certificate (already implemented)
- [ ] Privacy policy compliance (AVG)
- [ ] Industry association partnerships
- [ ] Quality mark affiliations
- [ ] Verified business registration

### 2. External Authority Signals

**Link Building Strategy:**
- [ ] Guest posts on home improvement blogs
- [ ] Partnerships with industry associations
- [ ] Press releases for major updates
- [ ] Expert quotes in media articles
- [ ] Local news features

**Desired Backlinks From:**
- Industry associations (UNETO-VNI, Techniek Nederland)
- Government sites (RVO.nl for subsidies)
- Consumer organizations (Consumentenbond)
- Home improvement sites
- Local business directories

### 3. Citations & References

**Always Cite:**
- NEN (Nederlands Normalisatie-instituut)
- RVO (Rijksdienst voor Ondernemend Nederland)
- UNETO-VNI / Techniek Nederland
- Netbeheer Nederland
- Official manufacturer documentation
- Government energy websites

**Citation Format:**
```html
<cite>
  Volgens de <a href="https://www.nen.nl/..." rel="noopener">NEN 1010 norm</a>,
  moeten alle laagspanningsinstallaties voldoen aan...
</cite>
```

---

## Trustworthiness Implementation

### 1. Accuracy & Transparency

**Fact-Checking Process:**
1. Writer creates content with citations
2. Technical expert reviews for accuracy
3. Editor checks sources and claims
4. Legal review for compliance
5. Publish with review date
6. Schedule annual content audits

**Correction Policy:**
- [ ] Create /correcties page
- [ ] Document all content corrections
- [ ] Add correction notices to updated articles
- [ ] Allow users to report inaccuracies

### 2. User Safety

**Safety Information (Always Visible):**
```tsx
// Safety banner component - show on relevant pages
<SafetyBanner>
  Bij elektrisch gevaar: schakel de hoofdschakelaar uit.
  Bij brand of letsel: bel 112.
  Werk nooit zelf aan elektrische installaties.
</SafetyBanner>
```

**Safety Disclaimers:**
- [ ] Safety disclaimer on all technical content
- [ ] "Laat dit doen door een professional" notices
- [ ] Emergency contact information
- [ ] Link to fire safety resources

### 3. Privacy & Security

**User Data Protection:**
- [ ] Clear privacy policy (AVG compliant)
- [ ] Secure contact forms
- [ ] No selling of user data
- [ ] Cookie consent banner
- [ ] Data deletion requests honored

**Contact Form Disclaimer:**
```
Uw gegevens worden vertrouwelijk behandeld. Wij gebruiken deze
alleen om u in contact te brengen met elektriciens. Wij delen
uw persoonlijke informatie niet met derden zonder uw toestemming.
```

### 4. Financial Transparency

**Disclosure Requirements:**
- [ ] Affiliate link disclosures
- [ ] Sponsored content labels
- [ ] Advertising policy page
- [ ] How we make money page

**Example Disclosure:**
```html
<aside class="disclosure">
  VindElektricien.nl kan een vergoeding ontvangen van elektriciens
  voor uitgelichte vermeldingen. Dit heeft geen invloed op onze
  redactionele content of beoordelingen.
</aside>
```

---

## Technical E-E-A-T Implementation

### 1. Schema Markup

**Required Schema Types:**

```json
// Organization Schema
{
  "@type": "Organization",
  "name": "VindElektricien.nl",
  "url": "https://vindelektricien.nl",
  "logo": "https://vindelektricien.nl/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@vindelektricien.nl",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://facebook.com/vindelektricien",
    "https://linkedin.com/company/vindelektricien"
  ]
}

// LocalBusiness Schema for Electricians
{
  "@type": "Electrician",
  "name": "...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "...",
    "addressRegion": "..."
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "...",
    "reviewCount": "..."
  }
}

// Article Schema with Author
{
  "@type": "Article",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "...",
    "credentials": "...",
    "url": "/over-ons/experts/..."
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "...",
    "credentials": "Erkend Installateur"
  },
  "datePublished": "...",
  "dateModified": "..."
}
```

### 2. Content Freshness

**Update Schedule:**

| Content Type | Review Frequency |
|--------------|------------------|
| Electrician data | Monthly |
| Price guides | Quarterly |
| Technical guides | Annually |
| Blog posts | Annually |
| Expert bios | Annually |
| Subsidy information | When regulations change |

**Show Update Dates:**
```tsx
<time dateTime="2026-01-18">
  Laatst bijgewerkt: 18 januari 2026
</time>
```

### 3. Page Quality Indicators

**Add to All Pages:**
- [ ] Clear page titles
- [ ] Descriptive meta descriptions
- [ ] Breadcrumb navigation
- [ ] Table of contents (for long articles)
- [ ] Related content links
- [ ] Share buttons
- [ ] Print-friendly option

---

## E-E-A-T Checklist for New Content

Before publishing any content:

### Experience
- [ ] Does the content reflect real experience?
- [ ] Are user experiences/reviews included?
- [ ] Is first-hand knowledge demonstrated?

### Expertise
- [ ] Is the author qualified to write this?
- [ ] Are credentials displayed?
- [ ] Was it reviewed by an expert?

### Authoritativeness
- [ ] Are sources cited?
- [ ] Are sources authoritative?
- [ ] Does it link to official resources?

### Trustworthiness
- [ ] Is the information accurate?
- [ ] Are there proper disclaimers?
- [ ] Is the publication date shown?
- [ ] Is contact information available?

---

## Monitoring & Improvement

### Track These Metrics:
- Google Search Console: Impressions, clicks, CTR
- Core Web Vitals: LCP, FID, CLS
- User engagement: Time on page, bounce rate
- Review quality: Average rating, response rate
- Content freshness: Last updated dates

### Quarterly E-E-A-T Audit:
1. Review top 20 pages for compliance
2. Update outdated information
3. Add missing expert reviews
4. Check broken citations
5. Update schema markup
6. Review user feedback

---

## Resources

- [Google Search Quality Rater Guidelines](https://guidelines.raterhub.com/)
- [Google E-E-A-T Documentation](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [NEN Normshop](https://www.nen.nl/)
- [Schema.org LocalBusiness Types](https://schema.org/Electrician)
- [RVO.nl - Energie subsidies](https://www.rvo.nl/)

---

*This document should be reviewed quarterly and updated based on Google algorithm changes and industry best practices.*
