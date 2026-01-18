'use client';

import { useEffect, useRef } from 'react';

type AdFormat = 'display' | 'in-article' | 'in-feed' | 'multiplex';
type AdLayout = 'horizontal' | 'vertical' | 'rectangle';

interface AdUnitProps {
  slot?: string; // Ad slot ID (optional for auto ads)
  format?: AdFormat;
  layout?: AdLayout;
  className?: string;
  responsive?: boolean;
  style?: 'display' | 'in-article' | 'in-feed' | 'matched-content';
}

export default function AdUnit({
  slot,
  format = 'display',
  layout = 'horizontal',
  className = '',
  responsive = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  style = 'display'
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Only load ad once
    if (isAdLoaded.current) return;

    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Get dimensions based on layout
  const getDimensions = () => {
    switch (layout) {
      case 'horizontal':
        return { minHeight: '90px' };
      case 'vertical':
        return { minHeight: '600px' };
      case 'rectangle':
        return { minHeight: '250px' };
      default:
        return { minHeight: '90px' };
    }
  };

  const dimensions = getDimensions();

  return (
    <div
      ref={adRef}
      className={`ad-container overflow-hidden ${className}`}
      style={{
        ...dimensions,
        display: 'block',
        width: '100%',
        textAlign: 'center'
      }}
    >
      {/* Visual placeholder during development/before ad loads */}
      <div className="bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground/50 text-xs"
           style={dimensions}>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            minHeight: dimensions.minHeight
          }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-9667530069853985'}
          data-ad-slot={slot}
          data-ad-format={responsive ? 'auto' : format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}

// Specific ad components for easy use
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <p className="text-xs text-muted-foreground/50 text-center mb-2">Advertisement</p>
      <AdUnit format="in-article" layout="horizontal" style="in-article" />
    </div>
  );
}

export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <div className={`sticky top-4 ${className}`}>
      <p className="text-xs text-muted-foreground/50 text-center mb-2">Advertisement</p>
      <AdUnit format="display" layout="rectangle" />
    </div>
  );
}

export function InFeedAd({ className = '' }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <AdUnit format="in-feed" layout="horizontal" style="in-feed" />
    </div>
  );
}

export function FooterAd({ className = '' }: { className?: string }) {
  return (
    <div className={`py-8 bg-muted/20 ${className}`}>
      <div className="container mx-auto px-4">
        <AdUnit format="display" layout="horizontal" />
      </div>
    </div>
  );
}
