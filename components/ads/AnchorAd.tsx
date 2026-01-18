'use client';

import { useEffect, useState, useRef } from 'react';
import { ADSENSE_PUBLISHER_ID, AD_SLOTS } from '@/lib/ad-config';

interface AnchorAdProps {
  slot?: string;
  position?: 'top' | 'bottom';
}

/**
 * Mobile Anchor/Sticky Ad
 *
 * Shows a sticky ad at the bottom of the screen on mobile devices.
 * Includes a close button and respects user consent.
 *
 * Best practices:
 * - Only show on mobile (< 768px)
 * - Allow users to dismiss
 * - Don't show on first visit
 * - Delay appearance by a few seconds
 */
export default function AnchorAd({
  slot = AD_SLOTS.layout.anchorMobile,
  position = 'bottom',
}: AnchorAdProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const adPushed = useRef(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check consent
  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        const parsed = JSON.parse(consent);
        setHasConsent(parsed.advertising === true);
      }
    } catch {
      setHasConsent(false);
    }
  }, []);

  // Check if previously dismissed (session-based)
  useEffect(() => {
    const dismissed = sessionStorage.getItem('anchorAdDismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  // Delay showing the ad
  useEffect(() => {
    if (!hasConsent || !isMobile || isDismissed) return;

    // Don't show on first page view - wait for navigation
    const hasNavigated = sessionStorage.getItem('hasNavigated');
    if (!hasNavigated) {
      sessionStorage.setItem('hasNavigated', 'true');
      return;
    }

    // Show after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasConsent, isMobile, isDismissed]);

  // Load ad
  useEffect(() => {
    if (!isVisible || adPushed.current) return;

    const tryPush = () => {
      if (typeof window === 'undefined') return;

      const adsbygoogle = (window as any).adsbygoogle;
      if (!adsbygoogle) {
        setTimeout(tryPush, 500);
        return;
      }

      try {
        adsbygoogle.push({});
        adPushed.current = true;
      } catch (err) {
        console.error('Anchor ad error:', err);
      }
    };

    tryPush();
  }, [isVisible]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('anchorAdDismissed', 'true');
  };

  // Don't render on desktop, without consent, or when dismissed
  if (!isMobile || !hasConsent || isDismissed || !isVisible) {
    return null;
  }

  const positionClasses = position === 'top'
    ? 'top-0'
    : 'bottom-0';

  return (
    <div
      className={`fixed ${positionClasses} left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200`}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Close button */}
      <button
        onClick={handleDismiss}
        className="absolute -top-8 right-2 bg-white rounded-t-lg px-3 py-1 text-xs text-gray-500 hover:text-gray-700 shadow-sm border border-b-0 border-gray-200"
        aria-label="Close advertisement"
      >
        Close Ad ×
      </button>

      {/* Ad container */}
      <div className="h-[50px] flex items-center justify-center bg-gray-50">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '320px',
            height: '50px',
          }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
        />
      </div>
    </div>
  );
}
