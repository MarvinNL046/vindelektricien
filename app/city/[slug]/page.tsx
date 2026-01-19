import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities, getFacilitiesByCity, createCitySlug, createStateSlug, type Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Zap, Info, MapPin, Phone, Star } from 'lucide-react';
import FacilityCard from '@/components/FacilityCard';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import SidebarAd from '@/components/ads/SidebarAd';
import InlineAd from '@/components/ads/InlineAd';
import { AD_SLOTS } from '@/lib/ad-config';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Limit static generation to top 200 cities to stay under Vercel's 75MB limit
export async function generateStaticParams() {
  const cities = await getAllCities();
  return cities.slice(0, 200).map((city) => ({
    slug: createCitySlug(city),
  }));
}

// Allow dynamic params for cities not in static params
export const dynamicParams = true;

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cities = await getAllCities();
  const city = cities.find(c => createCitySlug(c) === slug);

  if (!city) {
    return {
      title: 'Stad niet gevonden',
    };
  }

  const facilities = await getFacilitiesByCity(city);
  const province = facilities[0]?.state || '';

  return {
    title: `Elektricien ${city} - Vind een Elektricien bij jou in de buurt | VindElektricien.nl`,
    description: `Vind ${facilities.length} elektriciens in ${city}${province ? `, ${province}` : ''}. Bekijk beoordelingen, contactgegevens en specialisaties van lokale elektriciens.`,
    openGraph: {
      title: `Elektriciens in ${city}`,
      description: `Alle elektriciens in ${city}${province ? `, ${province}` : ''}`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const cities = await getAllCities();
  const city = cities.find(c => createCitySlug(c) === slug);

  if (!city) {
    notFound();
  }

  const facilities = await getFacilitiesByCity(city);

  if (facilities.length === 0) {
    notFound();
  }

  const province = facilities[0]?.state || '';
  const provinceAbbr = facilities[0]?.state_abbr || '';

  // Count facility types
  const typeCount = facilities.reduce((acc: Record<string, number>, facility: Facility) => {
    const typeName = facility.type || 'Elektricien';
    acc[typeName] = (acc[typeName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Elektriciens in ${city}`,
    description: `Overzicht van alle elektriciens in ${city}${province ? `, ${province}` : ''}`,
    breadcrumb: {
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
          name: province,
          item: `https://www.vindelektricien.nl/provincie/${createStateSlug(province)}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: city,
          item: `https://www.vindelektricien.nl/stad/${slug}`
        }
      ]
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: facilities.length,
      itemListElement: facilities.map((facility, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://www.vindelektricien.nl/elektricien/${facility.slug}`
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Leaderboard Ad at top */}
      <LeaderboardAd slot={AD_SLOTS.city.topLeaderboard} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>/</li>
            <li>
              <Link
                href={`/provincie/${createStateSlug(province)}`}
                className="hover:text-foreground"
              >
                {province}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{city}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Elektricien in {city}
          </h1>
          <p className="text-lg text-muted-foreground">
            Er {facilities.length === 1 ? 'is' : 'zijn'} {facilities.length} {facilities.length === 1 ? 'elektricien' : 'elektriciens'} in {city}, {province}.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{facilities.length}</p>
                <p className="text-sm text-muted-foreground">Totaal</p>
              </div>
            </div>
          </div>
          {Object.entries(typeCount).slice(0, 3).map(([type, count]) => (
            <div key={type} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground capitalize">{type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inline Ad */}
        <InlineAd slot={AD_SLOTS.city.inFeed} />

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* Facility List */}
            <div className="space-y-6">
              {facilities.map((facility, index) => (
                <div key={facility.slug}>
                  <FacilityCard facility={facility} />
                  {/* Add inline ad after every 3rd facility */}
                  {(index + 1) % 3 === 0 && index !== facilities.length - 1 && (
                    <div className="mt-6">
                      <InlineAd slot={AD_SLOTS.city.inFeed} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <SidebarAd slot={AD_SLOTS.city.sidebar} sticky={false} />

              {/* Related Links */}
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Gerelateerde Pagina&apos;s</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/provincie/${createStateSlug(province)}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Alle elektriciens in {province}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/diensten/storingen-reparaties"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Storingsdienst {city}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/diensten/laadpaal-installatie"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Laadpaal installatie {city}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Info Box */}
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold mb-2">Over {city}</h3>
                <p className="text-sm text-muted-foreground">
                  {city} ligt in {province}. Op deze pagina vind je een overzicht van alle elektriciens in dit gebied met hun contactgegevens en specialisaties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Elektriciens in {city}</h2>
          <p>
            In {city} vind je diverse elektriciens, van installatiebedrijven tot gespecialiseerde storingsdiensten.
            Elke elektricien biedt specifieke diensten aan, zoals installaties, reparaties en keuringen.
          </p>

          <h3>Wanneer heb je een elektricien nodig?</h3>
          <p>
            Een elektricien in {city} kan je helpen bij:
          </p>
          <ul>
            <li>Elektrische storingen en kortsluiting</li>
            <li>Vervanging of uitbreiding van de meterkast</li>
            <li>Installatie van laadpalen voor elektrische auto&apos;s</li>
            <li>Plaatsing van zonnepanelen</li>
            <li>Smart home en domotica installaties</li>
            <li>NEN-keuringen en veiligheidsinspecties</li>
          </ul>

          <h3>Tips voor het kiezen van een elektricien</h3>
          <p>
            Bij het kiezen van een elektricien in {city} is het belangrijk om te letten op certificeringen (zoals Erkend of VCA),
            reviews van eerdere klanten, en of de elektricien ervaring heeft met jouw specifieke vraag.
            Vraag altijd om een offerte voordat je een opdracht geeft.
          </p>
        </div>
      </div>
    </>
  );
}
