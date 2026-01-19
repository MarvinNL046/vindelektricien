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
    <section className="mb-8 bg-yellow-50 rounded-lg p-6 border border-yellow-100">
      <h3 className="text-xl font-semibold mb-4">Neem Contact Op</h3>
      <p className="text-muted-foreground mb-6">
        Neem direct contact op met {facility.name} voor meer informatie over hun diensten en beschikbaarheid.
      </p>
      {googleMapsUrl && (
        <div className="mb-4">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white rounded-md px-6 py-3 hover:bg-navy-800 transition-colors w-full sm:w-auto"
          >
            <Map className="w-5 h-5" />
            Bekijk op Google Maps
          </a>
        </div>
      )}
      {facility.phone && (
        <div className="pt-4 border-t border-yellow-200">
          <p className="text-sm text-muted-foreground mb-2">Vragen? Bel voor een vrijblijvend advies.</p>
          <a
            href={`tel:${facility.phone}`}
            className="inline-flex items-center gap-2 text-yellow-700 hover:underline text-lg font-semibold"
          >
            <Phone className="w-5 h-5" />
            {facility.phone}
          </a>
        </div>
      )}
    </section>
  );
}
