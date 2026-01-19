import Link from 'next/link';
import { MapPin, Phone, Zap, Star, Shield, Clock } from 'lucide-react';
import ProxiedImage from './ProxiedImage';

interface Facility {
  slug: string;
  name: string;
  address?: string;
  city: string;
  province?: string;
  province_abbr?: string;
  rating?: number;
  review_count?: number;
  phone?: string;
  service_types?: string[];
  certifications?: string[];
  photo_url?: string;
  photo?: string;
  description?: string;
  has_emergency_service?: boolean;
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
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
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
      href={`/elektricien/${facility.slug}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
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
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-semibold mb-2 truncate text-slate-800 group-hover:text-yellow-600 transition-colors">
              {facility.name}
            </h2>
            {facility.has_emergency_service && (
              <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-50 text-red-700 border border-red-200">
                <Clock className="w-3 h-3" />
                24/7
              </span>
            )}
          </div>

          {/* Service Type Badges */}
          {facility.service_types && facility.service_types.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {facility.service_types.slice(0, 3).map((type, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200"
                >
                  <Zap className="w-3 h-3" />
                  <span className="capitalize">{type}</span>
                </span>
              ))}
              {facility.service_types.length > 3 && (
                <span className="text-xs text-slate-500 self-center">
                  +{facility.service_types.length - 3} meer
                </span>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm text-muted-foreground">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-600" />
              <span className="text-slate-600">
                {facility.address && `${facility.address}, `}
                {facility.city}
                {facility.province_abbr && `, ${facility.province_abbr}`}
                {facility.province && !facility.province_abbr && `, ${facility.province}`}
              </span>
            </div>

            {/* Phone */}
            {facility.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span className="text-slate-600 hover:text-yellow-600 transition-colors">
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

          {/* Certification Badges */}
          {facility.certifications && facility.certifications.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Shield className="w-4 h-4 text-navy-700" />
              {facility.certifications.slice(0, 3).map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-navy-50 text-navy-700 border border-navy-200"
                >
                  {cert}
                </span>
              ))}
              {facility.certifications.length > 3 && (
                <span className="text-xs text-slate-500">
                  +{facility.certifications.length - 3} meer
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
