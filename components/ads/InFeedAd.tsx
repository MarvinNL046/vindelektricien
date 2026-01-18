'use client';

import AdBanner from './AdBanner';

interface InFeedAdProps {
  slot?: string;
  className?: string;
}

/**
 * In-feed ad component for displaying ads between search results or listings.
 * Designed to blend with the surrounding content.
 */
export default function InFeedAd({
  slot = '5566778899', // Default in-feed slot
  className = ''
}: InFeedAdProps) {
  return (
    <div className={`my-4 ${className}`}>
      <div className="bg-secondary/30 rounded-lg border border-border/50 overflow-hidden">
        <div className="px-3 py-1.5 bg-secondary/50 border-b border-border/50">
          <p className="text-xs text-muted-foreground">Sponsored</p>
        </div>

        {/* In-feed ad - blends with content */}
        <div className="p-3">
          <AdBanner
            slot={slot}
            format="fluid"
            className="min-h-[100px]"
            responsive={true}
          />
        </div>
      </div>
    </div>
  );
}
