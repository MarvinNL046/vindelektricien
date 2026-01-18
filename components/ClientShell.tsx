'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical UI components to improve TBT and LCP
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  ssr: false,
});
const FeedbackRibbon = dynamic(() => import('@/components/FeedbackRibbon'), {
  ssr: false,
});
const AffiliateBottomBar = dynamic(() => import('@/components/AffiliateBottomBar'), {
  ssr: false,
});
const ImpersonationBanner = dynamic(() => import('@/components/ImpersonationBanner'), {
  ssr: false,
});
const PWARegister = dynamic(() => import('@/components/PWARegister'), {
  ssr: false,
});
const GoogleTagManagerNoscript = dynamic(
  () => import('@/components/GoogleTagManagerNoscript'),
  { ssr: false }
);
const AnchorAd = dynamic(() => import('@/components/ads/AnchorAd'), {
  ssr: false,
});

interface ClientShellProps {
  children: React.ReactNode;
}

export function ClientShellTop() {
  return (
    <>
      <ImpersonationBanner />
      <GoogleTagManagerNoscript />
    </>
  );
}

export function ClientShellBottom() {
  return (
    <>
      <CookieConsent />
      <AffiliateBottomBar />
      <FeedbackRibbon />
      <PWARegister />
      <AnchorAd />
    </>
  );
}
