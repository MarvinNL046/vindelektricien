'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function AdSenseConsent() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check initial consent
    const checkConsent = () => {
      const savedConsent = localStorage.getItem('cookieConsent');
      if (savedConsent) {
        const parsed = JSON.parse(savedConsent);
        setHasConsent(parsed.advertising === true);
      }
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      const newConsent = event.detail;
      setHasConsent(newConsent.advertising === true);
      
      // If consent is revoked, we need to reload the page to remove ads
      if (!newConsent.advertising && isLoaded) {
        window.location.reload();
      }
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cookieConsentUpdated', handleConsentUpdate as EventListener);
    };
  }, [isLoaded]);

  // Only load AdSense if we have consent
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        id="google-adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={() => {
          setIsLoaded(true);
          // Initialize any ads on the page
          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          } catch (e) {
            console.error('AdSense initialization error:', e);
          }
        }}
      />
      
      {/* AdSense Auto Ads - only if you want automatic ad placement */}
      <Script
        id="adsense-auto-ads"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-YOUR_PUBLISHER_ID",
              enable_page_level_ads: true,
              // Respect consent mode
              restricted_data_processing: ${!hasConsent}
            });
          `
        }}
      />
    </>
  );
}