'use client';

import { getActivePartners, buildAffiliateUrl, AffiliatePartner } from '@/lib/affiliate-config';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface AffiliateAdProps {
  sticky?: boolean;
  maxPartners?: number;
}

function AffiliateCard({ partner }: { partner: AffiliatePartner }) {
  const affiliateUrl = buildAffiliateUrl(partner);

  return (
    <Card className="overflow-hidden border-2 border-transparent hover:border-accent/30 transition-all duration-300">
      {partner.imageUrl && (
        <div className="relative h-32 bg-teal-50">
          <Image
            src={partner.imageUrl}
            alt={partner.name}
            fill
            className="object-contain p-4"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg mb-2">{partner.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          {partner.buttonText}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
}

export default function AffiliateAd({
  sticky = true,
  maxPartners = 2
}: AffiliateAdProps) {
  const activePartners = getActivePartners();

  // If there are no active partners, show nothing
  if (activePartners.length === 0) {
    return null;
  }

  // Show at most the specified number of partners
  const partnersToShow = activePartners.slice(0, maxPartners);

  return (
    <div className={`${sticky ? 'sticky top-4' : ''}`}>
      <div className="space-y-4">
        <p className="text-xs text-center text-muted-foreground">Recommended Partners</p>

        {partnersToShow.map((partner) => (
          <AffiliateCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}
