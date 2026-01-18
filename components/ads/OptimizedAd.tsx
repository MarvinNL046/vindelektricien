'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { ADSENSE_PUBLISHER_ID, AD_PLACEMENT_RULES } from '@/lib/ad-config';

interface OptimizedAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
  lazy?: boolean; // Enable lazy loading
  priority?: boolean; // Above-fold priority loading
  minHeight?: number;
  showLabel?: boolean;
}

export default function OptimizedAd({
  slot,
  format = 'auto',
  className = '',
  style,
  responsive = true,
  lazy = true,
  priority = false,
  minHeight = 90,
  showLabel = true,
}: OptimizedAdProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy || priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const adPushed = useRef(false);
  const uniqueId = useRef(`ad-${slot}-${Math.random().toString(36).slice(2, 9)}`);

  // Check consent
  useEffect(() => {
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
          const parsed = JSON.parse(consent);
          setHasConsent(parsed.advertising === true);
        }
      } catch {
        setHasConsent(false);
      }
    };

    checkConsent();

    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHasConsent(customEvent.detail?.advertising === true);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!lazy || priority || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: AD_PLACEMENT_RULES.belowFold.rootMargin,
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isVisible]);

  // Load ad
  const loadAd = useCallback(() => {
    if (!hasConsent || adPushed.current || !isVisible) return;

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
        setIsLoaded(true);
      } catch (err) {
        console.error('AdSense error:', err);
        setHasError(true);
      }
    };

    const delay = priority ? 0 : AD_PLACEMENT_RULES.belowFold.delayMs;
    setTimeout(tryPush, delay);
  }, [hasConsent, isVisible, priority]);

  useEffect(() => {
    if (isVisible && hasConsent && !adPushed.current) {
      loadAd();
    }
  }, [isVisible, hasConsent, loadAd]);

  // Placeholder styles
  const placeholderStyle: React.CSSProperties = {
    minHeight: `${minHeight}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  // Not visible yet (lazy loading placeholder)
  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        className={`ad-placeholder bg-gray-50 ${className}`}
        style={placeholderStyle}
        aria-hidden="true"
      >
        <div className="text-xs text-gray-400">Loading...</div>
      </div>
    );
  }

  // No consent
  if (!hasConsent) {
    return (
      <div
        ref={containerRef}
        className={`ad-no-consent bg-gray-100 border-2 border-dashed border-gray-200 rounded-lg ${className}`}
        style={placeholderStyle}
      >
        <div className="text-center p-4">
          <p className="text-xs text-gray-500">Advertisement</p>
          <p className="text-xs text-gray-400 mt-1">
            Accept cookies to see ads
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={`ad-error bg-gray-50 rounded ${className}`}
        style={{ ...placeholderStyle, minHeight: '50px' }}
      >
        <p className="text-xs text-gray-300">Ad unavailable</p>
      </div>
    );
  }

  // Render ad
  return (
    <div ref={containerRef} className={`ad-container ${className}`}>
      {showLabel && (
        <p className="text-xs text-center text-gray-400 mb-1">Advertisement</p>
      )}
      <div
        id={uniqueId.current}
        className={`ad-wrapper ${!isLoaded ? 'bg-gray-50 animate-pulse' : ''}`}
        style={{ minHeight: `${minHeight}px` }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            minHeight: `${minHeight}px`,
            ...style,
          }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
