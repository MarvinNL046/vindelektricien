'use client';

import AdBanner from './AdBanner';

interface LeaderboardAdProps {
  slot?: string;
  className?: string;
}

export default function LeaderboardAd({ 
  slot = '1122334455', // Default leaderboard slot
  className = ''
}: LeaderboardAdProps) {
  return (
    <div className={`w-full bg-gray-50 py-4 ${className}`}>
      <div className="container mx-auto px-4">
        <p className="text-xs text-center text-muted-foreground mb-2">Advertisement</p>
        
        {/* Leaderboard 728x90 on desktop, 320x50 on mobile */}
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