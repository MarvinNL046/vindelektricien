import { Map, Phone } from 'lucide-react';

interface FacilityActionsProps {
  facility: {
    name: string;
    city: string;
    address?: string;
    phone?: string;
    slug: string;
  };
  googleMapsUrl: string | null;
}

export default function FacilityActions({ facility, googleMapsUrl }: FacilityActionsProps) {
  return (
    <section className="mb-8 bg-primary/5 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Contact This Facility</h3>
      <p className="text-muted-foreground mb-6">
        Ready to take the next step? Contact {facility.name} directly for more information about their treatment programs.
      </p>
      {googleMapsUrl && (
        <div className="mb-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-6 py-3 hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            <Map className="w-5 h-5" />
            Get Directions via Google Maps
          </a>
        </div>
      )}
      {facility.phone && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">Have questions? Call now for a free consultation.</p>
          <a
            href={`tel:${facility.phone}`}
            className="inline-flex items-center gap-2 text-primary hover:underline text-lg font-semibold"
          >
            <Phone className="w-5 h-5" />
            {facility.phone}
          </a>
        </div>
      )}
    </section>
  );
}
