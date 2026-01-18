import { Metadata } from 'next';
import Link from 'next/link';
import { getFacilityBySlug, getAllFacilities, createCountySlug, createStateSlug, getFacilitiesByCity, type FacilityWithContent } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Navigation, ExternalLink, Phone, Star, ChevronDown, Heart, Users, Calendar, CheckCircle2, Sparkles, Car, Accessibility, Building2, TreePine, Info, ChevronRight, ArrowRight } from 'lucide-react';
import ProxiedImage from '@/components/ProxiedImage';
import CompareButton from '@/components/CompareButton';
import AffiliateAd from '@/components/ads/AffiliateAd';
import InlineAd from '@/components/ads/InlineAd';
import SidebarAd from '@/components/ads/SidebarAd';
import { AD_SLOTS } from '@/lib/ad-config';
import FeedbackForm from '@/components/FeedbackForm';
import ReviewSection from '@/components/ReviewSection';
import PhotoGallery from '@/components/PhotoGallery';
import FavoriteButton from '@/components/FavoriteButton';
import ReadMore from '@/components/ReadMore';
import RelatedGuides from '@/components/RelatedGuides';
import { Card } from '@/components/ui/card';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Limit static generation to top 500 facilities to stay under Vercel's 75MB limit
// Other pages will be generated on-demand with ISR
export async function generateStaticParams() {
  const facilities = await getAllFacilities();
  // Sort by rating (highest first) and take top 500
  const topFacilities = facilities
    .sort((a, b) => (parseFloat(String(b.rating || '0')) - parseFloat(String(a.rating || '0'))))
    .slice(0, 500);
  return topFacilities.map((facility) => ({
    slug: facility.slug,
  }));
}

// Allow dynamic params for facilities not in static params
export const dynamicParams = true;

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    return {
      title: 'Facility Not Found',
    };
  }

  return {
    title: facility.seoTitle || `${facility.name} in ${facility.city}, ${facility.state} | Rehab Near By Me`,
    description: facility.seoDescription || facility.generated?.summary ||
      `Information about ${facility.name} in ${facility.city}, ${facility.state}. View hours, treatment programs, and contact details.`,
    openGraph: {
      title: facility.seoTitle || facility.name,
      description: facility.seoDescription || facility.generated?.summary || `${facility.type} in ${facility.city}`,
      type: 'website',
    },
  };
}

function getTypePlaceholder(type: string): string {
  const typeSlug = type?.toLowerCase().replace(/\s+/g, '-') || 'rehab-center';
  const validTypes = ['inpatient-rehab', 'outpatient-treatment', 'detox-center', 'sober-living', 'dual-diagnosis', 'luxury-rehab'];
  if (validTypes.includes(typeSlug)) {
    return `/images/placeholders/${typeSlug}.svg`;
  }
  return '/images/placeholders/rehab-center.svg';
}

function getTypeIcon(type: string): string {
  const typeMap: Record<string, string> = {
    'inpatient rehab': '🏥',
    'outpatient treatment': '🏢',
    'detox center': '💊',
    'sober living': '🏠',
    'dual diagnosis': '🧠',
    'luxury rehab': '✨',
    'adolescent program': '👨‍👩‍👧‍👦',
    'veterans program': '🎖️',
    'women\'s program': '👩',
    'men\'s program': '👨',
  };
  return typeMap[type?.toLowerCase()] || '🏥';
}

function getFacilityIcon(facility: string): React.ReactNode {
  const facilityLower = facility.toLowerCase();
  if (facilityLower.includes('parking')) return <Car className="w-4 h-4" />;
  if (facilityLower.includes('wheelchair') || facilityLower.includes('accessible')) return <Accessibility className="w-4 h-4" />;
  if (facilityLower.includes('chapel') || facilityLower.includes('building') || facilityLower.includes('gym') || facilityLower.includes('fitness')) return <Building2 className="w-4 h-4" />;
  if (facilityLower.includes('nature') || facilityLower.includes('garden') || facilityLower.includes('outdoor')) return <TreePine className="w-4 h-4" />;
  if (facilityLower.includes('pool') || facilityLower.includes('spa') || facilityLower.includes('wellness')) return <Heart className="w-4 h-4" />;
  return <CheckCircle2 className="w-4 h-4" />;
}

function generateFAQs(facility: FacilityWithContent) {
  return [
    {
      question: `What are the admission hours at ${facility.name}?`,
      answer: facility.opening_hours || 'Admission hours may vary. Please contact the facility for current hours and intake information.'
    },
    {
      question: `How do I get to ${facility.name}?`,
      answer: facility.generated?.directions || `${facility.name} is located in ${facility.city}, ${facility.state}. ${facility.address ? `The address is ${facility.address}.` : 'Use the directions feature for navigation.'}`
    },
    {
      question: `What treatment programs does ${facility.name} offer?`,
      answer: facility.treatment_types?.join(', ') || facility.generated?.amenities?.join(', ') || 'Please contact the facility for information about available treatment programs.'
    },
    {
      question: `What insurance does ${facility.name} accept?`,
      answer: facility.insurance_accepted && facility.insurance_accepted.length > 0
        ? `${facility.name} accepts the following insurance: ${facility.insurance_accepted.join(', ')}.`
        : 'Please contact the facility directly for information about accepted insurance plans.'
    }
  ];
}

export default async function FacilityPage({ params }: PageProps) {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    notFound();
  }

  // Get similar facilities in same city
  const allFacilities = await getFacilitiesByCity(facility.city);
  const similarFacilities = allFacilities
    .filter(f => f.slug !== facility.slug)
    .slice(0, 4);

  let lat = facility.latitude || null;
  let lon = facility.longitude || null;
  let googleMapsUrl = null;

  if (!lat && !lon && facility.gps_coordinates) {
    const coords = facility.gps_coordinates.split(',').map((coord: string) => coord.trim());
    lat = parseFloat(coords[0]);
    lon = parseFloat(coords[1]);
  }

  if (lat && lon) {
    googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
  }

  const rating = facility.rating || null;
  const reviewCount = facility.review_count || 0;
  const phone = facility.phone;
  const faqs = generateFAQs(facility);

  // Breadcrumb structured data
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.rehabnearbyme.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: facility.state,
        item: `https://www.rehabnearbyme.com/state/${createStateSlug(facility.state)}`
      },
      ...(facility.county ? [{
        '@type': 'ListItem',
        position: 3,
        name: `${facility.county} County`,
        item: `https://www.rehabnearbyme.com/county/${createCountySlug(facility.county)}`
      }] : []),
      {
        '@type': 'ListItem',
        position: facility.county ? 4 : 3,
        name: facility.name,
        item: `https://www.rehabnearbyme.com/facility/${facility.slug}`
      }
    ]
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: facility.name,
    description: facility.generated?.summary || facility.description || `${facility.type} in ${facility.city}, ${facility.state}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: facility.address || '',
      addressLocality: facility.city,
      addressRegion: facility.state,
      addressCountry: 'US',
      postalCode: facility.zipCode || '',
    },
    ...(lat && lon && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: lat,
        longitude: lon,
      }
    }),
    openingHours: facility.opening_hours,
    telephone: phone || '',
    url: `https://www.rehabnearbyme.com/facility/${facility.slug}`,
    ...((facility.photo_url || facility.photo) && { image: facility.photo_url || facility.photo }),
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewCount,
        bestRating: 5,
        worstRating: 1,
      }
    }),
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-8 relative">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center flex-wrap gap-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li>
                <Link
                  href={`/state/${createStateSlug(facility.state)}`}
                  className="hover:text-white transition-colors"
                >
                  {facility.state}
                </Link>
              </li>
              {facility.county && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/county/${createCountySlug(facility.county)}`}
                      className="hover:text-white transition-colors"
                    >
                      {facility.county} County
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-white font-medium truncate max-w-[200px]">{facility.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-4">
                <span>{getTypeIcon(facility.type)}</span>
                <span className="capitalize">{facility.type}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {facility.name}
              </h1>

              {/* Rating and Location */}
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                {rating && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(rating)
                              ? 'fill-coral-400 text-coral-400'
                              : 'fill-gray-400/30 text-gray-400/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-coral-300">{rating}</span>
                    <span className="text-primary-foreground/60">({reviewCount} reviews)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-coral-400" />
                  <span>{facility.city}, {facility.state_abbr || facility.state}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {facility.year_established && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                    <Calendar className="w-4 h-4 text-coral-400" />
                    <span>Since {facility.year_established}</span>
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  <CheckCircle2 className="w-4 h-4 text-coral-400" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call</span>
                </a>
              )}
              <FavoriteButton
                facilitySlug={slug}
                facilityName={facility.name}
                variant="hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Main Column */}
            <div className="flex-1 min-w-0 space-y-6 sm:space-y-8 lg:max-w-2xl xl:max-w-3xl">
              {/* Image */}
              <Card className="aspect-video overflow-hidden relative shadow-soft">
                {(facility.photo_url || facility.photo) ? (
                  <ProxiedImage
                    src={facility.photo_url || facility.photo}
                    alt={facility.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <img
                    src={getTypePlaceholder(facility.type)}
                    alt={`${facility.type || 'Treatment Facility'} - ${facility.name}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </Card>

              {/* About Section */}
              <Card className="p-4 sm:p-6 shadow-soft">
                <h2 className="font-serif text-xl sm:text-2xl font-bold mb-4 text-foreground">About {facility.name}</h2>
                {facility.enrichedContent ? (
                  <ReadMore text={facility.enrichedContent} maxLength={600} />
                ) : facility.description ? (
                  <ReadMore text={facility.description} maxLength={600} />
                ) : facility.generated?.summary ? (
                  <ReadMore text={facility.generated.summary} maxLength={600} />
                ) : (
                  <p className="text-muted-foreground">
                    {facility.name} is a {facility.type || 'treatment facility'} located in {facility.city}, {facility.state}.
                    {facility.amenities && facility.amenities.length > 0 && ` Available amenities include ${facility.amenities.join(', ').toLowerCase()}.`}
                    {facility.year_established && ` The facility was established in ${facility.year_established}.`}
                    {` For more information about ${facility.name}, please contact using the details on this page.`}
                  </p>
                )}
              </Card>

              {/* Amenities */}
              {facility.amenities && facility.amenities.length > 0 && (
                <Card className="p-6 shadow-soft">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <h2 className="font-serif text-2xl font-bold">Amenities</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {facility.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
                        <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center flex-shrink-0 text-teal-700 dark:text-teal-400">
                          {getFacilityIcon(amenity)}
                        </div>
                        <span className="font-medium text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* History Section - commented out as GeneratedContent doesn't have history property */}
              {/* {facility.generated?.history && (
                <Card className="p-6 shadow-soft">
                  <h2 className="font-serif text-2xl font-bold mb-4">History</h2>
                  <p className="text-muted-foreground">{facility.generated.history}</p>
                </Card>
              )} */}

              {/* Inline Ad */}
              <InlineAd slot={AD_SLOTS.facility.afterInfo} />

              {/* Treatment Programs Section */}
              {facility.treatment_types && facility.treatment_types.length > 0 && (
                <Card className="p-6 shadow-soft">
                  <h2 className="font-serif text-2xl font-bold mb-4">Treatment Programs</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {facility.treatment_types.map((program: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl border border-accent/20">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="font-medium text-sm">{program}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Insurance Accepted */}
              {facility.insurance_accepted && facility.insurance_accepted.length > 0 && (
                <Card className="p-6 shadow-soft">
                  <h2 className="font-serif text-2xl font-bold mb-4">Insurance Accepted</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {facility.insurance_accepted.map((insurance: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{insurance}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Photo Gallery */}
              <PhotoGallery
                facilitySlug={slug}
                facilityName={facility.name}
              />

              {/* Reviews Section */}
              <ReviewSection
                facilitySlug={slug}
                facilityName={facility.name}
                initialRating={rating || 0}
                initialReviewCount={reviewCount}
                embeddedReviews={facility.reviews}
              />

              {/* Inline Ad after reviews */}
              <InlineAd slot={AD_SLOTS.facility.afterReviews} />

              {/* FAQ Section */}
              <Card className="p-6 shadow-soft">
                <h2 className="font-serif text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
                        <span className="font-medium pr-4">{faq.question}</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-4 py-3 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </Card>

              {/* Visitor Tips */}
              {facility.generated?.visitor_tips && facility.generated.visitor_tips.length > 0 && (
                <Card className="p-6 shadow-soft">
                  <h2 className="font-serif text-2xl font-bold mb-4">Visitor Tips</h2>
                  <ul className="space-y-3">
                    {facility.generated.visitor_tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-coral-50 dark:bg-coral-900/20 rounded-xl border border-coral-100 dark:border-coral-800">
                        <span className="text-coral-500 text-xl">💡</span>
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Contact Form */}
              <Card id="contact-form" className="p-6 shadow-soft scroll-mt-24">
                <h2 className="font-serif text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions about {facility.name}? Fill out the form and we&apos;ll be happy to help.
                </p>
                <FeedbackForm
                  pageTitle={facility.name}
                  pageUrl={`/facility/${slug}`}
                />
              </Card>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 order-first lg:order-last">
              <div className="lg:sticky lg:top-4 space-y-6">
                {/* Business Info Card */}
                <Card className="p-4 sm:p-6 shadow-soft">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <span className="text-2xl">{getTypeIcon(facility.type)}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {facility.year_established ? `Since ${facility.year_established}` : facility.type}
                      </p>
                      <p className="font-medium">{facility.city}, {facility.state_abbr}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {phone && (
                      <a href={`tel:${phone}`} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                        <Phone className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium">{phone}</span>
                      </a>
                    )}

                    {facility.website && (
                      <a
                        href={facility.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium truncate">Visit Website</span>
                      </a>
                    )}

                    {googleMapsUrl && (
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Navigation className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium">Get Directions</span>
                      </a>
                    )}

                    {facility.address && (
                      <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                        <MapPin className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="text-sm">{facility.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {facility.city}, {facility.state_abbr} {facility.zipCode}
                          </p>
                        </div>
                      </div>
                    )}

                    {facility.opening_hours && (
                      <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                        <Clock className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Hours</p>
                          <p className="text-sm text-muted-foreground">{facility.opening_hours}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Compare Button */}
                  <div className="mt-6 pt-6 border-t">
                    <CompareButton
                      facilityId={facility.slug}
                      facilityName={facility.name}
                    />
                  </div>
                </Card>

                {/* Affiliate Blocks */}
                <Card className="p-4 sm:p-6 shadow-soft bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-200 dark:border-teal-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-accent" />
                    <span className="font-semibold">Recovery Support</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find the right treatment program and start your recovery journey today.
                  </p>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Get Help Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Card>

                <AffiliateAd sticky={false} maxPartners={2} />

                {/* Sidebar Ad */}
                <SidebarAd slot={AD_SLOTS.facility.sidebar} sticky={false} />
              </div>
            </div>
          </div>

          {/* Similar Facilities */}
          {similarFacilities.length > 0 && (
            <section className="mt-12 max-w-6xl mx-auto">
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-6">Treatment Facilities in {facility.city}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {similarFacilities.map((similar) => (
                  <Link
                    key={similar.slug}
                    href={`/facility/${similar.slug}`}
                    className="group"
                  >
                    <Card className="h-full p-3 sm:p-4 border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm sm:text-base">{getTypeIcon(similar.type)}</span>
                        </div>
                        {similar.rating && (
                          <div className="flex items-center gap-1 text-xs sm:text-sm">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-coral-400 text-coral-400" />
                            <span>{similar.rating}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-accent transition-colors line-clamp-2">
                        {similar.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground capitalize line-clamp-1">{similar.type}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Discover More Links */}
          <section className="mt-12 max-w-6xl mx-auto">
            <h2 className="font-serif text-xl sm:text-2xl font-bold mb-6">Discover More</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Link
                href={`/state/${createStateSlug(facility.state)}`}
                className="group"
              >
                <Card className="h-full p-4 sm:p-6 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                  <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-accent transition-colors">
                    {facility.state}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    All treatment facilities in this state
                  </p>
                  <div className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium text-accent">
                    View
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </Card>
              </Link>

              {facility.county && (
                <Link
                  href={`/county/${createCountySlug(facility.county)}`}
                  className="group"
                >
                  <Card className="h-full p-4 sm:p-6 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-accent transition-colors">
                      {facility.county} County
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                      All treatment facilities in this county
                    </p>
                    <div className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium text-accent">
                      View
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </Card>
                </Link>
              )}

              {facility.type && (
                <Link
                  href={`/type/${facility.type_slug || facility.type.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group"
                >
                  <Card className="h-full p-4 sm:p-6 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-accent transition-colors capitalize line-clamp-2">
                      {facility.type}s
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                      Similar treatment facilities
                    </p>
                    <div className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium text-accent">
                      View
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </Card>
                </Link>
              )}

              <Link
                href="/compare"
                className="group"
              >
                <Card className="h-full p-4 sm:p-6 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                  <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-accent transition-colors">
                    Compare
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    Compare up to 3 treatment facilities
                  </p>
                  <div className="mt-2 sm:mt-3 flex items-center gap-1 text-xs sm:text-sm font-medium text-accent">
                    View
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </Card>
              </Link>
            </div>
          </section>

          {/* Related Guides */}
          <section className="mt-12 max-w-6xl mx-auto">
            <RelatedGuides
              currentType={facility.type_slug || facility.type?.toLowerCase().replace(/\s+/g, '-')}
              currentState={createStateSlug(facility.state)}
              maxGuides={3}
              variant="card"
              showDescription={true}
            />
          </section>

          {/* Disclaimer */}
          <Card className="mt-12 p-4 sm:p-6 bg-secondary/50 max-w-6xl mx-auto">
            <h3 className="font-serif text-lg font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              We have tried to collect all information as carefully as possible.
              If you find incorrect or outdated information (such as address, description,
              facility status, treatment programs), you can submit a correction request via the contact form.
              This directory is for informational purposes only and does not constitute medical advice.
              Please consult with healthcare professionals before making treatment decisions.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
