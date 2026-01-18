'use client';

import AdBanner from './AdBanner';

interface SidebarAdProps {
  slot?: string;
  sticky?: boolean;
}

export default function SidebarAd({ 
  slot = '1234567890', // Default sidebar slot
  sticky = true 
}: SidebarAdProps) {
  return (
    <div className={`${sticky ? 'sticky top-4' : ''}`}>
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-2 bg-gray-50 border-b">
          <p className="text-xs text-center text-muted-foreground">Advertisement</p>
        </div>
        
        {/* Sidebar Rectangle Ad - 300x250 or 336x280 */}
        <AdBanner
          slot={slot}
          format="rectangle"
          className="min-h-[250px]"
          style={{ minHeight: '250px' }}
        />
        
        {/* Optional second ad for longer sidebars */}
        <div className="mt-4 p-2 bg-gray-50 border-t border-b">
          <p className="text-xs text-center text-muted-foreground">Advertisement</p>
        </div>
        
        {/* Vertical ad - 300x600 */}
        <AdBanner
          slot={slot}
          format="vertical"
          className="min-h-[600px]"
          style={{ minHeight: '600px' }}
        />
      </div>
    </div>
  );
}