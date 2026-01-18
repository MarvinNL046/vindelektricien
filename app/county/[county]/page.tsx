import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCounties, getFacilitiesByCounty, createCountySlug, createCitySlug, createStateSlug, Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MapPin, Building2, Trees, Users, Calendar, ChevronRight, ArrowRight, Lightbulb } from 'lucide-react';
import FacilityCard from '@/components/FacilityCard';
import SidebarAd from '@/components/ads/SidebarAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import InlineAd from '@/components/ads/InlineAd';
import { AD_SLOTS } from '@/lib/ad-config';
import { Card } from '@/components/ui/card';

interface PageProps {
  params: Promise<{
    county: string;
  }>;
}

// Limit static generation to top 200 counties to stay under Vercel's 75MB limit
export async function generateStaticParams() {
  const counties = await getAllCounties();
  return counties.slice(0, 200).map(county => ({
    county: createCountySlug(county),
  }));
}

// Allow dynamic params for counties not in static params
export const dynamicParams = true;

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county: countySlug } = await params;
  const counties = await getAllCounties();
  const matchedCounty = counties.find(
    c => createCountySlug(c) === countySlug
  );

  if (!matchedCounty) {
    return {
      title: 'County not found',
      description: 'The requested county could not be found.',
    };
  }

  return {
    title: `Rehab Centers in ${matchedCounty} County | RehabNearByMe`,
    description: `Find all rehab and addiction treatment centers in ${matchedCounty} County. View facilities, treatment types, insurance accepted, and contact information.`,
    openGraph: {
      title: `Rehab Centers in ${matchedCounty} County`,
      description: `Directory of all rehab and treatment centers in ${matchedCounty} County`,
      type: 'website',
    },
  };
}

export default async function CountyPage({ params }: PageProps) {
  const { county: countySlug } = await params;
  const counties = await getAllCounties();
  const matchedCounty = counties.find(
    c => createCountySlug(c) === countySlug
  );

  if (!matchedCounty) {
    notFound();
  }

  const facilities = await getFacilitiesByCounty(matchedCounty);

  if (facilities.length === 0) {
    notFound();
  }

  const state = facilities[0]?.state || '';
  const stateAbbr = facilities[0]?.state_abbr || '';

  // Get unique cities
  const cities = [...new Set(facilities.map((f: Facility) => f.city).filter(Boolean))].sort();

  // Calculate statistics
  const stats = {
    total: facilities.length,
    inpatient: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('inpatient'))).length,
    outpatient: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('outpatient'))).length,
    detox: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('detox'))).length,
    dualDiagnosis: facilities.filter((f: Facility) => f.treatment_types?.some((type: string) => type.toLowerCase().includes('dual') || type.toLowerCase().includes('mental'))).length,
    luxury: facilities.filter((f: Facility) => f.facility_types?.some((type: string) => type.toLowerCase().includes('luxury'))).length,
  };

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
        name: state,
        item: `https://www.rehabnearbyme.com/state/${createStateSlug(state)}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${matchedCounty} County`,
        item: `https://www.rehabnearbyme.com/county/${countySlug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li>
                  <Link
                    href={`/state/${createStateSlug(state)}`}
                    className="hover:text-white transition-colors"
                  >
                    {state}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white">{matchedCounty} County</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Rehab Centers in {matchedCounty} County
            </h1>

            {/* Author byline */}
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-semibold">RN</span>
                </div>
                <span>By Rehab Near By Me</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-coral-300">{stats.total}</div>
                <div className="text-primary-foreground/70 text-sm">Treatment Centers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral-300">{cities.length}</div>
                <div className="text-primary-foreground/70 text-sm">Cities</div>
              </div>
              {stats.inpatient > 0 && (
                <div>
                  <div className="text-3xl font-bold text-coral-300">{stats.inpatient}</div>
                  <div className="text-primary-foreground/70 text-sm">Inpatient</div>
                </div>
              )}
              {stats.detox > 0 && (
                <div>
                  <div className="text-3xl font-bold text-coral-300">{stats.detox}</div>
                  <div className="text-primary-foreground/70 text-sm">Detox Centers</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard Ad after hero */}
        <div className="container mx-auto px-4 pt-8">
          <LeaderboardAd slot={AD_SLOTS.county.afterHero} />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tips Section */}
              <Card className="p-6 bg-gradient-to-r from-teal-50 to-coral-50/30 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Tips for Choosing a Treatment Center
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Compare multiple facilities to find the best fit for your specific needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Verify that the facility accepts your insurance and ask about payment options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Look for facilities with evidence-based treatment programs and licensed staff</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>Consider the level of care needed: detox, inpatient, outpatient, or sober living</span>
                  </li>
                </ul>
              </Card>

              {/* Facility Type Cards */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">Types of Treatment Centers</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-5 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <Building2 className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-semibold mb-2">Inpatient Rehab</h3>
                    <p className="text-sm text-muted-foreground">
                      Residential treatment with 24/7 medical supervision. Intensive programs for severe addiction cases.
                    </p>
                  </Card>
                  <Card className="p-5 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <Trees className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-semibold mb-2">Outpatient Treatment</h3>
                    <p className="text-sm text-muted-foreground">
                      Flexible treatment schedule allowing you to live at home while receiving therapy and support.
                    </p>
                  </Card>
                  <Card className="p-5 hover:shadow-hover transition-all duration-300 border-2 border-transparent hover:border-accent/30">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-teal-700" />
                    </div>
                    <h3 className="font-semibold mb-2">Detox Centers</h3>
                    <p className="text-sm text-muted-foreground">
                      Medical detoxification services with supervision to safely manage withdrawal symptoms.
                    </p>
                  </Card>
                </div>
              </div>

              {/* All Facilities */}
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-6">
                  All {facilities.length} {facilities.length !== 1 ? 'Treatment Centers' : 'Treatment Center'}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {facilities.map((facility: Facility) => (
                    <FacilityCard key={facility.slug} facility={facility} />
                  ))}
                </div>
              </div>

              {/* Inline Ad */}
              <div className="my-8">
                <InlineAd slot={AD_SLOTS.county.inContent} />
              </div>

              {/* Cities Grid */}
              {cities.length > 1 && (
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-6">Treatment Centers by City</h2>
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                    {cities.map((city) => {
                      const cityFacilities = facilities.filter((f: Facility) => f.city === city);
                      return (
                        <Link
                          key={city}
                          href={`/city/${createCitySlug(city)}`}
                          className="group"
                        >
                          <Card className="h-full p-4 border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                                <MapPin className="w-5 h-5 text-teal-700 group-hover:text-white transition-colors" />
                              </div>
                              <div>
                                <h3 className="font-semibold group-hover:text-accent transition-colors">
                                  {city}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {cityFacilities.length} {cityFacilities.length !== 1 ? 'centers' : 'center'}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Informational Content */}
              <Card className="p-6">
                <h2 className="font-serif text-2xl font-semibold mb-4">Finding Addiction Treatment in {matchedCounty} County</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    In {matchedCounty} County, {state} you&apos;ll find {stats.total} {stats.total !== 1 ? 'treatment centers' : 'treatment center'},
                    including {stats.inpatient > 0 ? `${stats.inpatient} inpatient ${stats.inpatient !== 1 ? 'facilities' : 'facility'}` : ''}
                    {stats.outpatient > 0 ? `, ${stats.outpatient} outpatient ${stats.outpatient !== 1 ? 'programs' : 'program'}` : ''}
                    {stats.detox > 0 ? `, and ${stats.detox} detox ${stats.detox !== 1 ? 'centers' : 'center'}` : ''}.
                    Each facility offers different treatment approaches and specializations.
                  </p>

                  <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-3">Choosing the Right Treatment</h3>
                  <p>
                    When selecting a treatment center, several factors are important:
                    the level of care needed (detox, inpatient, or outpatient), insurance coverage and payment options,
                    treatment approaches and therapies offered, and the facility&apos;s success rates and accreditation.
                    Many centers in {matchedCounty} County offer specialized programs for different substances and co-occurring mental health disorders.
                  </p>

                  <h3 className="font-serif text-xl font-semibold text-foreground mt-6 mb-3">Getting Started</h3>
                  <p>
                    Taking the first step toward recovery can be challenging, but help is available.
                    Most treatment centers offer free consultations to discuss your needs and determine the best treatment plan.
                    Don&apos;t hesitate to contact multiple facilities to compare programs and find the right fit for your recovery journey.
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Links */}
              <Card className="p-6 shadow-soft">
                <h3 className="font-serif text-lg font-semibold mb-4">Related Pages</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href={`/state/${createStateSlug(state)}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      All treatment centers in {state}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/type/inpatient"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Inpatient Rehab Centers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/type/outpatient"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Outpatient Programs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Search Treatment Centers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guide"
                      className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Treatment Guide
                    </Link>
                  </li>
                </ul>
              </Card>

              {/* Contact Info */}
              <Card className="p-6 shadow-soft bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-200 dark:border-teal-800">
                <h3 className="font-serif text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We can help you find the right treatment center in {matchedCounty} County.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
                >
                  Get Help Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>

              {/* Sidebar Ad */}
              <SidebarAd />

              {/* State Stats */}
              <Card className="p-6 shadow-soft">
                <h3 className="font-serif text-lg font-semibold mb-4">About {state}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {matchedCounty} County is located in {state}. View all treatment centers
                  in this state for more options.
                </p>
                <Link
                  href={`/state/${createStateSlug(state)}`}
                  className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1"
                >
                  View {state} Centers
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
