'use client';

import AdBanner from './AdBanner';

interface InlineAdProps {
  slot?: string;
  className?: string;
}

export default function InlineAd({ 
  slot = '0987654321', // Default inline slot
  className = ''
}: InlineAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="max-w-full mx-auto">
        <p className="text-xs text-center text-muted-foreground mb-2">Advertisement</p>
        
        {/* Responsive horizontal ad */}
        <AdBanner
          slot={slot}
          format="horizontal"
          className="min-h-[90px] max-w-[728px] mx-auto"
          responsive={true}
        />
      </div>
    </div>
  );
}