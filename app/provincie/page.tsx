import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getAllStates, getAllFacilities, Facility } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Alle Provincies | VindElektricien.nl',
  description: 'Vind elektriciens in alle 12 Nederlandse provincies. Zoek per provincie naar erkende elektriciens, storingsdiensten en installateurs bij u in de buurt.',
  openGraph: {
    title: 'Alle Provincies | VindElektricien.nl',
    description: 'Vind elektriciens in alle 12 Nederlandse provincies.',
    url: 'https://vindelektricien.nl/provincie',
  }
};

// Revalidate every 24 hours
export const revalidate = 86400;

export default async function ProvincesPage() {
  const [provincesData, facilitiesData] = await Promise.all([
    getAllStates(),
    getAllFacilities()
  ]);
  const facilities = facilitiesData;

  // Get facility count for each province
  const provincesWithCounts = provincesData.map((province) => {
    const provinceFacilities = facilities.filter((c: Facility) =>
      c.province === province.abbr || c.province === province.name ||
      (c as unknown as { state?: string; state_abbr?: string }).state === province.abbr ||
      (c as unknown as { state?: string; state_abbr?: string }).state === province.name ||
      (c as unknown as { state?: string; state_abbr?: string }).state_abbr === province.abbr
    );
    const uniqueCities = [...new Set(provinceFacilities.map(c => c.city).filter(Boolean))];

    return {
      ...province,
      facilityCount: provinceFacilities.length,
      cityCount: uniqueCities.length,
    };
  });

  // Sort by facility count (provinces with data first) then alphabetically
  const sortedProvinces = provincesWithCounts.sort((a, b) => {
    if (b.facilityCount !== a.facilityCount) {
      return b.facilityCount - a.facilityCount;
    }
    return a.name.localeCompare(b.name);
  });

  const activeProvinces = sortedProvinces.filter(s => s.facilityCount > 0);
  const pendingProvinces = sortedProvinces.filter(s => s.facilityCount === 0);
  const totalFacilities = activeProvinces.reduce((sum, s) => sum + s.facilityCount, 0);
  const totalCities = activeProvinces.reduce((sum, s) => sum + s.cityCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">Provincies</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Elektriciens per Provincie
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Vind elektriciens in alle 12 Nederlandse provincies. Selecteer een provincie om
            lokale elektriciens, storingsdiensten en installateurs te ontdekken.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-yellow-400">{provincesData.length}</div>
              <div className="text-white/70 text-sm">Provincies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">{totalFacilities.toLocaleString('nl-NL')}</div>
              <div className="text-white/70 text-sm">Elektriciens</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">{totalCities.toLocaleString('nl-NL')}</div>
              <div className="text-white/70 text-sm">Steden</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Active Provinces Grid */}
          {activeProvinces.length > 0 && (
            <>
              <h2 className="font-serif text-2xl font-semibold mb-6">
                Provincies met Elektriciens
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {activeProvinces.map((province) => (
                  <Link
                    key={province.abbr}
                    href={`/provincie/${province.slug}`}
                    className="group"
                  >
                    <Card className="h-full p-6 border-2 border-transparent hover:border-yellow-400 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                          <MapPin className="w-6 h-6 text-yellow-700 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">{province.abbr}</span>
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-yellow-700 transition-colors" />
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-yellow-600 transition-colors">
                        {province.name}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Elektriciens</span>
                          <span className="font-semibold text-yellow-600">{province.facilityCount.toLocaleString('nl-NL')}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Steden</span>
                          <span className="font-medium">{province.cityCount}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <span className="text-sm font-medium text-yellow-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Bekijk elektriciens
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* All Provinces Grid */}
          <h2 className="font-serif text-2xl font-semibold mb-6">
            {activeProvinces.length > 0 ? 'Alle Provincies' : 'Zoek per Provincie'}
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {sortedProvinces.map((province) => (
              <Link
                key={province.abbr}
                href={`/provincie/${province.slug}`}
                className={`group p-4 rounded-lg border transition-all ${
                  province.facilityCount > 0
                    ? 'hover:border-yellow-400 hover:bg-yellow-50'
                    : 'border-dashed opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium group-hover:text-yellow-700 transition-colors">
                      {province.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {province.facilityCount > 0
                        ? `${province.facilityCount} elektriciens`
                        : 'Binnenkort'
                      }
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{province.abbr}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          {pendingProvinces.length > 0 && activeProvinces.length > 0 && (
            <div className="mt-16">
              <Card className="p-8 bg-secondary/30 border-dashed">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold mb-2">Meer Provincies Binnenkort</h2>
                    <p className="text-muted-foreground mb-3">
                      We breiden onze database continu uit met meer elektriciens in heel Nederland.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Momenteel voegen we data toe voor {pendingProvinces.length} provincies waaronder {pendingProvinces.slice(0, 3).map(s => s.name).join(', ')}.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Weet u niet waar u moet zoeken?
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
  );
}
