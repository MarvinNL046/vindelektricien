import { Metadata } from 'next';
import Link from 'next/link';
import { getAllStates, getStateBySlug, getFacilitiesByState, createCitySlug, Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ChevronRight, Zap, ArrowRight, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import InlineAd from '@/components/ads/InlineAd';
import { AD_SLOTS } from '@/lib/ad-config';

interface PageProps {
  params: Promise<{
    provincie: string;
  }>;
}

export async function generateStaticParams() {
  const provinces = await getAllStates();
  return provinces.map(province => ({
    provincie: province.slug,
  }));
}

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provincie: provincieSlug } = await params;
  const province = await getStateBySlug(provincieSlug);

  if (!province) {
    return { title: 'Provincie Niet Gevonden' };
  }

  return {
    title: `Elektriciens in ${province.name} | VindElektricien.nl`,
    description: `Vind elektriciens in ${province.name}. Bekijk erkende elektriciens, storingsdiensten, laadpaal installateurs en meer in uw regio.`,
    openGraph: {
      title: `Elektriciens in ${province.name}`,
      description: `Overzicht van alle elektriciens in ${province.name}`,
      type: 'website',
    },
  };
}

export default async function ProvinciePage({ params }: PageProps) {
  const { provincie: provincieSlug } = await params;
  const province = await getStateBySlug(provincieSlug);

  if (!province) {
    notFound();
  }

  const facilities = await getFacilitiesByState(province.name);

  // Get unique cities with counts
  const cityCounts = facilities.reduce((acc: Record<string, number>, facility: Facility) => {
    if (facility.city) {
      acc[facility.city] = (acc[facility.city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const cities = Object.entries(cityCounts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => a.city.localeCompare(b.city));

  // Breadcrumb structured data
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.vindelektricien.nl'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Provincies',
        item: 'https://www.vindelektricien.nl/provincie'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: province.name,
        item: `https://www.vindelektricien.nl/provincie/${provincieSlug}`
      }
    ]
  };

  // Group cities by first letter
  const citiesByLetter = cities.reduce((acc, { city, count }) => {
    const firstLetter = city[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push({ city, count });
    return acc;
  }, {} as Record<string, Array<{ city: string; count: number }>>);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/provincie" className="hover:text-white transition-colors">Provincies</Link></li>
                <li>/</li>
                <li className="text-white">{province.name}</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Elektriciens in {province.name}
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mb-8">
              Vind elektriciens in {province.name}. Selecteer een stad om elektriciens in uw regio te bekijken.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-yellow-400">{facilities.length}</div>
                <div className="text-white/70 text-sm">Elektriciens</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">{cities.length}</div>
                <div className="text-white/70 text-sm">Steden</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Ad after hero */}
        <div className="container mx-auto px-4 pt-8">
          <LeaderboardAd slot={AD_SLOTS.state?.afterHero} />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-bold mb-2">
                Steden in {province.name}
              </h2>
              <p className="text-muted-foreground">
                Klik op een stad om alle elektriciens in dat gebied te bekijken.
              </p>
            </div>

            {cities.length > 0 ? (
              <div className="space-y-10">
                {Object.entries(citiesByLetter).map(([letter, citiesInLetter]) => (
                  <div key={letter}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-10 rounded-lg bg-yellow-500 text-navy-900 flex items-center justify-center font-serif font-bold text-xl">
                        {letter}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {citiesInLetter.length} {citiesInLetter.length !== 1 ? 'steden' : 'stad'}
                      </span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {citiesInLetter.map(({ city, count }) => (
                        <Link
                          key={city}
                          href={`/stad/${createCitySlug(city)}`}
                          className="group"
                        >
                          <Card className="h-full p-4 flex items-center justify-between border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                                <MapPin className="w-5 h-5 text-yellow-700 group-hover:text-white transition-colors" />
                              </div>
                              <span className="font-medium group-hover:text-yellow-600 transition-colors">
                                {city}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-yellow-600">
                                {count}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-yellow-600 transition-colors" />
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Nog geen elektriciens gevonden in {province.name}. We voegen continu nieuwe bedrijven toe.
                </p>
                <Link
                  href="/zoeken"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-navy-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  Zoek Alle Elektriciens
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            )}

            {/* Inline Ad before About Section */}
            <div className="mt-12">
              <InlineAd slot={AD_SLOTS.state?.inContent} />
            </div>

            {/* About Section */}
            <Card className="mt-16 p-8 bg-gradient-to-r from-yellow-50 to-navy-50/30 border-yellow-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-yellow-700" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold mb-3">Over elektriciens in {province.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    De provincie {province.name} heeft een breed aanbod aan elektriciens voor zowel particuliere als zakelijke klanten.
                    Van storingsdiensten tot complete installaties, laadpalen en zonnepanelen - er is altijd een geschikte
                    vakman in de buurt. Veel elektriciens zijn erkend en beschikken over certificeringen zoals VCA en NEN.
                    {province.capital && ` De hoofdstad van ${province.name} is ${province.capital}.`}
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <h2 className="font-serif text-2xl font-semibold mb-4">
                Op zoek naar een specifieke elektricien?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Gebruik onze zoekfunctie om elektriciens te vinden op naam, stad, postcode of specialisatie.
              </p>
              <Link
                href="/zoeken"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-navy-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Zoek Elektricien
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
