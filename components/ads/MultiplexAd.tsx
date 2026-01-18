'use client';

import { useEffect, useState, useRef } from 'react';
import { ADSENSE_PUBLISHER_ID, AD_SLOTS } from '@/lib/ad-config';

interface MultiplexAdProps {
  slot?: string;
  className?: string;
  rows?: number;
  columns?: number;
  title?: string;
}

/**
 * Multiplex Ad (Matched Content / Related Content)
 *
 * Shows a grid of content recommendations with ads mixed in.
 * Best placed at the end of articles or in sidebars.
 *
 * Requirements:
 * - Site must be approved for Multiplex in AdSense
 * - Minimum content requirements must be met
 */
export default function MultiplexAd({
  slot = AD_SLOTS.generic.multiplex,
  className = '',
  title = 'You May Also Like',
}: MultiplexAdProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const adPushed = useRef(false);

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

  // Lazy load with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px', threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load ad
  useEffect(() => {
    if (!isVisible || !hasConsent || adPushed.current) return;

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
        console.error('Multiplex ad error:', err);
      }
    };

    setTimeout(tryPush, 200);
  }, [isVisible, hasConsent]);

  if (!hasConsent) {
    return (
      <div
        ref={containerRef}
        className={`multiplex-ad-placeholder bg-gray-50 rounded-lg p-8 ${className}`}
      >
        <h3 className="text-lg font-semibold text-gray-400 text-center mb-4">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded h-32 animate-pulse" />
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          Accept cookies to see personalized recommendations
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`multiplex-ad ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      )}

      {isVisible ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format="autorelaxed"
        />
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded h-32" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
