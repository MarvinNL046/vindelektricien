import Link from 'next/link';
import { MapPin, Phone, Building2, Star, Shield } from 'lucide-react';
import ProxiedImage from './ProxiedImage';

interface Facility {
  slug: string;
  name: string;
  address?: string;
  city: string;
  state?: string;
  state_abbr?: string;
  rating?: number;
  review_count?: number;
  phone?: string;
  facility_types?: string[];
  insurance_accepted?: string[];
  photo_url?: string;
  photo?: string;
  description?: string;
}

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  // Render rating stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-amber-400/50 text-amber-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <Link
      href={`/facility/${facility.slug}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:border-teal-300 transition-all duration-300"
    >
      <div className="flex gap-6 p-6">
        {/* Image */}
        {(facility.photo_url || facility.photo) && (
          <div className="flex-shrink-0 w-48 h-36 bg-gray-100 rounded-lg overflow-hidden relative">
            <ProxiedImage
              src={facility.photo_url || facility.photo}
              alt={facility.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold mb-2 truncate text-slate-800 group-hover:text-teal-600 transition-colors">
            {facility.name}
          </h2>

          {/* Facility Type Badges */}
          {facility.facility_types && facility.facility_types.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {facility.facility_types.slice(0, 3).map((type, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200"
                >
                  <Building2 className="w-3 h-3" />
                  <span className="capitalize">{type}</span>
                </span>
              ))}
            </div>
          )}

          <div className="space-y-2 text-sm text-muted-foreground">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span className="text-slate-600">
                {facility.address && `${facility.address}, `}
                {facility.city}
                {facility.state_abbr && `, ${facility.state_abbr}`}
                {facility.state && !facility.state_abbr && `, ${facility.state}`}
              </span>
            </div>

            {/* Phone */}
            {facility.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-500" />
                <span className="text-slate-600 hover:text-teal-600 transition-colors">
                  {facility.phone}
                </span>
              </div>
            )}

            {/* Rating */}
            {facility.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(facility.rating)}
                </div>
                <span className="text-slate-600 font-medium">
                  {facility.rating.toFixed(1)}
                </span>
                <span className="text-slate-400">
                  ({facility.review_count || 0} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Insurance Badges */}
          {facility.insurance_accepted && facility.insurance_accepted.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Shield className="w-4 h-4 text-indigo-500" />
              {facility.insurance_accepted.slice(0, 3).map((insurance, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-indigo-50 text-indigo-700 border border-indigo-200"
                >
                  {insurance}
                </span>
              ))}
              {facility.insurance_accepted.length > 3 && (
                <span className="text-xs text-slate-500">
                  +{facility.insurance_accepted.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Description preview */}
          {facility.description && (
            <p className="mt-3 text-sm text-slate-500 line-clamp-2">
              {facility.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
