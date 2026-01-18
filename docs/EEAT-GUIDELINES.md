# RehabNearMe.com - E-E-A-T Implementation Guide

**Repository:** https://github.com/MarvinNL046/rehabnearbyme
**Created:** 18-01-2026
**Purpose:** Maximize Google Search visibility through E-E-A-T compliance

---

## What is E-E-A-T?

Google's E-E-A-T framework evaluates content quality:

- **E**xperience - First-hand experience with the topic
- **E**xpertise - Knowledge and skills in the field
- **A**uthoritativeness - Recognition as a trusted source
- **T**rustworthiness - Accuracy, honesty, and safety

**Why it matters for RehabNearMe:** Addiction treatment is classified as **YMYL (Your Money or Your Life)** content, meaning Google applies stricter quality standards because incorrect information could harm users.

---

## Experience Implementation

### 1. User-Generated Content

**Reviews & Testimonials:**
- [ ] Enable verified user reviews on facility pages
- [ ] Require email verification for reviewers
- [ ] Add "Verified Patient" badge for confirmed stays
- [ ] Allow photo uploads with reviews
- [ ] Display review dates prominently

**Implementation:**
```tsx
// Review component should show:
- Reviewer name (or anonymous option)
- "Verified Stay" badge if confirmed
- Date of review
- Treatment type received
- Length of stay
- Would recommend (yes/no)
- Detailed review text
```

### 2. First-Person Experience Content

**Blog Topics from Experience:**
- [ ] "What My First Week in Rehab Was Like"
- [ ] "How I Chose the Right Treatment Center"
- [ ] "My Journey Through Detox: What to Expect"
- [ ] "Life After Rehab: 1 Year Sober"
- [ ] "Family's Perspective: Supporting a Loved One"

**Guidelines:**
- Partner with recovery advocates for authentic stories
- Include author bio with recovery credentials
- Add disclaimer about individual experiences
- Update content with follow-up stories

### 3. Facility Visit Program

- [ ] Visit and document facilities (photos, video)
- [ ] Create "Staff Verified" badge for visited facilities
- [ ] Publish facility tour content
- [ ] Interview facility staff and patients (with consent)

---

## Expertise Implementation

### 1. Expert Contributors

**Build Expert Network:**

| Expert Type | Role | Content |
|-------------|------|---------|
| Licensed Counselors (LCSW, LPC) | Article review, Q&A | Treatment approaches |
| Medical Doctors (MD, DO) | Medical accuracy review | Detox, medications |
| Addiction Specialists (CADC) | Primary content | Recovery programs |
| Psychiatrists | Mental health content | Dual diagnosis |
| Nutritionists | Wellness content | Recovery nutrition |

**Expert Author Pages:**
- [ ] Create /about/experts page
- [ ] Individual expert bio pages
- [ ] Link experts to their content
- [ ] Display credentials prominently
- [ ] Include license verification links

**Schema Implementation:**
```json
{
  "@type": "Person",
  "name": "Dr. Jane Smith",
  "jobTitle": "Addiction Medicine Specialist",
  "credentials": ["MD", "FASAM"],
  "affiliation": {
    "@type": "Organization",
    "name": "American Society of Addiction Medicine"
  },
  "sameAs": [
    "https://linkedin.com/in/drjanesmith",
    "https://npiregistry.cms.hhs.gov/..."
  ]
}
```

### 2. Content Quality Standards

**Every Article Must Include:**
- [ ] Author name and credentials
- [ ] Medical reviewer (for health content)
- [ ] Publication date
- [ ] Last reviewed/updated date
- [ ] Sources and citations
- [ ] Clear, accurate information

**Article Template:**
```markdown
# Article Title

**Written by:** [Author Name], [Credentials]
**Medically Reviewed by:** [Reviewer Name], [Credentials]
**Published:** [Date] | **Last Updated:** [Date]

[Content...]

## Sources
1. [Source with link]
2. [Source with link]

---
*This article was reviewed for medical accuracy by [Reviewer].*
```

### 3. Educational Content

**Create Comprehensive Guides:**
- [x] Insurance & Payment Guide
- [x] What to Expect in Treatment
- [ ] Types of Addiction Treatment (detailed)
- [ ] Understanding Withdrawal & Detox
- [ ] Mental Health & Addiction (Dual Diagnosis)
- [ ] Medication-Assisted Treatment (MAT)
- [ ] Family Guide to Intervention
- [ ] Relapse Prevention Strategies
- [ ] Finding Treatment for Veterans
- [ ] Teen & Adolescent Treatment

---

## Authoritativeness Implementation

### 1. Brand Authority Signals

**About Page Requirements:**
- [ ] Company mission and values
- [ ] Team bios with photos
- [ ] Physical address (or registered agent)
- [ ] Contact information (email, phone)
- [ ] Company history
- [ ] Editorial guidelines
- [ ] Partnerships and affiliations

**Trust Badges:**
- [ ] SAMHSA partnership/data source
- [ ] LegitScript certification (if applicable)
- [ ] BBB accreditation
- [ ] SSL certificate (already implemented)
- [ ] Privacy policy compliance

### 2. External Authority Signals

**Link Building Strategy:**
- [ ] Guest posts on addiction recovery blogs
- [ ] Partnerships with treatment associations
- [ ] Press releases for major updates
- [ ] Expert quotes in media articles
- [ ] Academic citations

**Desired Backlinks From:**
- Government sites (.gov) - SAMHSA, NIH, CDC
- Educational sites (.edu) - university addiction studies
- Healthcare organizations - hospitals, medical associations
- News outlets - health sections
- Non-profits - addiction recovery organizations

### 3. Citations & References

**Always Cite:**
- SAMHSA (Substance Abuse and Mental Health Services Administration)
- NIDA (National Institute on Drug Abuse)
- CDC (Centers for Disease Control)
- WHO (World Health Organization)
- Peer-reviewed medical journals
- State health departments

**Citation Format:**
```html
<cite>
  According to <a href="https://www.samhsa.gov/..." rel="noopener">SAMHSA</a>,
  approximately 21 million Americans have at least one addiction...
</cite>
```

---

## Trustworthiness Implementation

### 1. Accuracy & Transparency

**Fact-Checking Process:**
1. Writer creates content with citations
2. Medical expert reviews for accuracy
3. Editor checks sources and claims
4. Legal review for compliance
5. Publish with review date
6. Schedule annual content audits

**Correction Policy:**
- [ ] Create /corrections page
- [ ] Document all content corrections
- [ ] Add correction notices to updated articles
- [ ] Allow users to report inaccuracies

### 2. User Safety

**Crisis Resources (Always Visible):**
```tsx
// Crisis banner component - show on all pages
<CrisisBanner>
  If you're in crisis, call 988 (Suicide & Crisis Lifeline)
  or text HOME to 741741 (Crisis Text Line)
</CrisisBanner>
```

**Safety Disclaimers:**
- [ ] Medical disclaimer on all health content
- [ ] "Not a substitute for professional advice"
- [ ] Emergency contact information
- [ ] Overdose prevention resources

### 3. Privacy & Security

**User Data Protection:**
- [ ] Clear privacy policy
- [ ] HIPAA-compliant contact forms
- [ ] No selling of user data
- [ ] Cookie consent banner
- [ ] Data deletion requests honored

**Contact Form Disclaimer:**
```
Your information is confidential. We will only use it to
connect you with treatment resources. We never share your
personal information with third parties without your consent.
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
  RehabNearMe.com may receive compensation from treatment
  facilities for featured placements. This does not influence
  our editorial content or facility ratings.
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
  "name": "RehabNearMe.com",
  "url": "https://rehabnearme.com",
  "logo": "https://rehabnearme.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://facebook.com/rehabnearme",
    "https://twitter.com/rehabnearme"
  ]
}

// Article Schema with Author
{
  "@type": "Article",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "...",
    "credentials": "...",
    "url": "/about/experts/..."
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Dr. ...",
    "credentials": "MD"
  },
  "datePublished": "...",
  "dateModified": "..."
}

// MedicalWebPage Schema
{
  "@type": "MedicalWebPage",
  "about": {
    "@type": "MedicalCondition",
    "name": "Substance Use Disorder"
  },
  "lastReviewed": "2026-01-18",
  "reviewedBy": {
    "@type": "Person",
    "name": "..."
  }
}
```

### 2. Content Freshness

**Update Schedule:**

| Content Type | Review Frequency |
|--------------|------------------|
| Facility data | Monthly |
| Treatment guides | Quarterly |
| Statistics/data | When new data released |
| Blog posts | Annually |
| Expert bios | Annually |

**Show Update Dates:**
```tsx
<time dateTime="2026-01-18">
  Last updated: January 18, 2026
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
- [SAMHSA Resources](https://www.samhsa.gov/)
- [Schema.org Medical Types](https://schema.org/MedicalWebPage)

---

*This document should be reviewed quarterly and updated based on Google algorithm changes and industry best practices.*
