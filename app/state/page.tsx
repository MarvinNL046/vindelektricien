import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight, Building2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getAllStates, getAllFacilities, State, Facility } from '@/lib/data';
import { getStatesComingSoonText } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'All States | RehabNearMe',
  description: 'Find treatment centers in all 50 US states. Browse rehab facilities by state to find addiction treatment centers, detox facilities, and recovery programs near you.',
  openGraph: {
    title: 'All States | RehabNearMe',
    description: 'Find treatment centers in all 50 US states.',
    url: 'https://rehabnearbyme.com/state',
  }
};

// Revalidate every 24 hours
export const revalidate = 86400;

export default async function StatesPage() {
  const [statesData, facilitiesData] = await Promise.all([
    getAllStates(),
    getAllFacilities()
  ]);
  const facilities = facilitiesData;

  // Get facility count for each state
  const statesWithCounts = statesData.map((state) => {
    const stateFacilities = facilities.filter((c: Facility) =>
      c.state === state.abbr || c.state === state.name || c.state_abbr === state.abbr
    );
    const uniqueCounties = [...new Set(stateFacilities.map(c => c.county).filter(Boolean))];
    const uniqueCities = [...new Set(stateFacilities.map(c => c.city).filter(Boolean))];

    return {
      ...state,
      facilityCount: stateFacilities.length,
      countyCount: uniqueCounties.length,
      cityCount: uniqueCities.length,
    };
  });

  // Sort by facility count (states with data first) then alphabetically
  const sortedStates = statesWithCounts.sort((a, b) => {
    if (b.facilityCount !== a.facilityCount) {
      return b.facilityCount - a.facilityCount;
    }
    return a.name.localeCompare(b.name);
  });

  const activeStates = sortedStates.filter(s => s.facilityCount > 0);
  const pendingStates = sortedStates.filter(s => s.facilityCount === 0);
  const totalFacilities = activeStates.reduce((sum, s) => sum + s.facilityCount, 0);
  const totalCounties = activeStates.reduce((sum, s) => sum + s.countyCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">States</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Treatment Centers by State
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Explore treatment centers across all 50 US states. Select a state to discover
            local rehab facilities, detox centers, and recovery programs in your area.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-coral-300">{statesData.length}</div>
              <div className="text-primary-foreground/70 text-sm">States</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-coral-300">{totalFacilities.toLocaleString('en-US')}</div>
              <div className="text-primary-foreground/70 text-sm">Treatment Centers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-coral-300">{totalCounties.toLocaleString('en-US')}</div>
              <div className="text-primary-foreground/70 text-sm">Counties</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Active States Grid */}
          {activeStates.length > 0 && (
            <>
              <h2 className="font-serif text-2xl font-semibold mb-6">
                States with Treatment Center Data
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {activeStates.map((state) => (
                  <Link
                    key={state.abbr}
                    href={`/state/${state.slug}`}
                    className="group"
                  >
                    <Card className="h-full p-6 border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-accent transition-colors">
                          <MapPin className="w-6 h-6 text-teal-700 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">{state.abbr}</span>
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                          </div>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                        {state.name}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Treatment Centers</span>
                          <span className="font-semibold text-accent">{state.facilityCount.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Counties</span>
                          <span className="font-medium">{state.countyCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cities</span>
                          <span className="font-medium">{state.cityCount}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                          View treatment centers
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* All States Grid */}
          <h2 className="font-serif text-2xl font-semibold mb-6">
            {activeStates.length > 0 ? 'All States' : 'Browse by State'}
          </h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sortedStates.map((state) => (
              <Link
                key={state.abbr}
                href={`/state/${state.slug}`}
                className={`group p-4 rounded-lg border transition-all ${
                  state.facilityCount > 0
                    ? 'hover:border-accent/50 hover:bg-accent/5'
                    : 'border-dashed opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium group-hover:text-accent transition-colors">
                      {state.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {state.facilityCount > 0
                        ? `${state.facilityCount} treatment centers`
                        : 'Coming soon'
                      }
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{state.abbr}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          {pendingStates.length > 0 && activeStates.length > 0 && (
            <div className="mt-16">
              <Card className="p-8 bg-secondary/30 border-dashed">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold mb-2">More States Coming Soon</h2>
                    <p className="text-muted-foreground mb-3">
                      {getStatesComingSoonText()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Currently adding data for {pendingStates.length} more states including {pendingStates.slice(0, 3).map(s => s.name).join(', ')}, and more.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Not sure where to look?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Use our search feature to find treatment centers by name, city, zip code, or facility type.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Search Treatment Centers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
