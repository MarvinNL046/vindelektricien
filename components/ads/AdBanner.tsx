'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
  testMode?: boolean; // For testing without real ads
}

// Your AdSense Publisher ID
const ADSENSE_CLIENT_ID = 'ca-pub-9667530069853985';

export default function AdBanner({
  slot,
  format = 'auto',
  style,
  className = '',
  responsive = true,
  testMode = false
}: AdBannerProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adError, setAdError] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);
  const adUniqueId = useRef(`ad-${slot}-${Math.random().toString(36).substr(2, 9)}`);

  const loadAd = useCallback(() => {
    if (typeof window === 'undefined' || !hasConsent || isAdPushed.current) {
      return;
    }

    // Check if AdSense script is loaded
    if (!(window as any).adsbygoogle) {
      console.log('AdSense script not yet loaded, retrying...');
      setTimeout(loadAd, 500);
      return;
    }

    // Check if the ad container exists and is visible
    const adContainer = adRef.current;
    if (!adContainer) {
      return;
    }

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      isAdPushed.current = true;
    } catch (err) {
      console.error('AdSense push error:', err);
      setAdError(true);
    }
  }, [hasConsent]);

  useEffect(() => {
    // Check initial consent
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
          const parsed = JSON.parse(consent);
          setHasConsent(parsed.advertising === true);
        }
      } catch (e) {
        console.error('Error reading consent:', e);
      }
      setIsLoading(false);
    };

    checkConsent();

    // Listen for consent updates
    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newConsent = customEvent.detail;
      const nowHasConsent = newConsent.advertising === true;

      setHasConsent(nowHasConsent);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  useEffect(() => {
    // Load ad when component mounts and has consent
    if (hasConsent && !isLoading && !isAdPushed.current) {
      // Delay to ensure DOM and AdSense script are ready
      const timer = setTimeout(() => {
        loadAd();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [hasConsent, isLoading, loadAd]);

  // Show loading state
  if (isLoading) {
    return (
      <div className={`bg-gray-50 rounded-lg animate-pulse ${className}`} style={style}>
        <div className="h-[250px] bg-gray-200 rounded"></div>
      </div>
    );
  }

  // No consent - show placeholder
  if (!hasConsent) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`} style={style}>
        <div className="max-w-sm mx-auto">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-600 font-medium mb-2">Advertisement</p>
          <p className="text-xs text-gray-500">
            Accept advertising cookies to see relevant ads
          </p>
        </div>
      </div>
    );
  }

  // Test mode - show colored placeholder
  if (testMode) {
    return (
      <div className={`bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center ${className}`} style={style}>
        <p className="text-sm text-blue-600 font-medium">AdSense Test Mode</p>
        <p className="text-xs text-blue-500">Slot: {slot}</p>
      </div>
    );
  }

  // Show error state
  if (adError) {
    return (
      <div className={`bg-gray-50 rounded-lg p-4 text-center ${className}`} style={style}>
        <p className="text-xs text-gray-400">Advertisement could not be loaded</p>
      </div>
    );
  }

  // Render actual ad
  return (
    <div ref={adRef} className={`ad-container ${className}`} style={style} id={adUniqueId.current}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', ...style }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        data-ad-layout={format === 'fluid' ? 'in-article' : undefined}
      />
    </div>
  );
}