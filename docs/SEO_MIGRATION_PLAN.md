# SEO Migration Plan - Safe Transition

## Goal
Prevent Google penalties and 404 errors during the transition to the new system.

## Step-by-Step Plan for Safe Migration

### Phase 1: Preparation (Before Go-Live)

1. **Inventory of old URLs**
   - Check Google Search Console for indexed pages
   - Download list of all current URLs
   - Identify URL structure changes

2. **Implement 301 Redirects**
   - Old sitemap URLs -> new sitemap.xml
   - Old page structures -> new structures
   - Via `next.config.js` redirects

3. **Test Redirects Locally**
   ```bash
   npm run build
   npm run start
   # Test old URLs to see if they redirect correctly
   ```

### Phase 2: Deployment Strategy

1. **Keep Old Content Temporarily**
   - Keep old sitemap files online for 30 days
   - This gives Google time to process the redirects
   - Prevents immediate 404s

2. **Dual Sitemap Strategy**
   ```xml
   <!-- In robots.txt temporarily both sitemaps -->
   Sitemap: https://www.rehabnearbyme.com/sitemap.xml
   Sitemap: https://www.rehabnearbyme.com/sitemap-old.xml
   ```

3. **Monitoring Setup**
   - Google Search Console alerts for 404s
   - Analytics tracking for redirect performance

### Phase 3: Go-Live Checklist

- [ ] All redirects tested
- [ ] Old sitemaps still accessible (with redirect)
- [ ] robots.txt updated
- [ ] Google Search Console monitored
- [ ] 404 error page friendly and helpful

### Phase 4: Post-Launch (First 30 days)

1. **Daily Monitoring**
   - Check Search Console for crawl errors
   - Monitor 404 reports
   - Check rankings for important keywords

2. **Quick Fixes**
   - Add missing redirects as soon as 404s are found
   - Update `middleware.ts` for edge cases

3. **Communication with Google**
   - Submit new sitemap in Search Console
   - Request re-crawl for important pages
   - Monitor indexing status

### Phase 5: Cleanup (After 30-60 days)

1. **Remove Old Assets**
   ```bash
   npx tsx scripts/cleanup-old-sitemaps.ts
   ```

2. **Remove Temporary Redirects**
   - Keep only permanent redirects
   - Cleanup temporary dual-sitemap setup

## Safety Measures

### 1. 404 Fallback Page
```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page may have been moved. Try:</p>
      <ul>
        <li><a href="/search">Search for a facility</a></li>
        <li><a href="/">Go to homepage</a></li>
      </ul>
    </div>
  )
}
```

### 2. Custom Error Tracking
```typescript
// Track 404s for analysis
if (typeof window !== 'undefined') {
  // Log to analytics
  gtag('event', '404_error', {
    page_path: window.location.pathname,
    referrer: document.referrer
  });
}
```

### 3. Gradual Rollout
- Start with 10% traffic to new version
- Monitor for issues
- Increase gradually to 100%

## Success Metrics

- **404 Error Rate**: < 1% after first week
- **Crawl Errors**: Declining trend in Search Console
- **Rankings**: No significant drops
- **Indexing**: New pages indexed within 7 days

## Emergency Plan

If rankings drop dramatically:
1. Keep rollback to old version possible
2. Immediate restore of all old URLs
3. Communicate with Google via Search Console
4. Temporary dual-site strategy

## Tips

1. **Timing**: Deploy during low traffic (weekend evening)
2. **Communication**: Inform Google via Search Console
3. **Patience**: SEO recovery can take 2-4 weeks
4. **Documentation**: Log all changes and issues

## Tools for Monitoring

- Google Search Console (Crawl errors, Index status)
- Google Analytics (Traffic patterns, 404s)
- Screaming Frog (Crawl test for broken links)
- Ahrefs/SEMrush (Ranking monitoring)
