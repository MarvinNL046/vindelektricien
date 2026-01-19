import { Metadata } from 'next';
import Link from 'next/link';
import { getAllFacilityTypes, getFacilitiesByFacilityType, getFacilityTypeBySlug, FacilityType, Facility } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Zap, MapPin, ChevronRight, ArrowRight, Clock, Shield, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

const typeDescriptions: Record<string, string> = {
  'storingen-reparaties': 'Elektriciens gespecialiseerd in storingen en reparaties kunnen snel ter plaatse zijn bij elektrische problemen. Ze lossen kortsluiting, stroomuitval en defecte bedrading op.',
  'installatie': 'Installatie-elektriciens verzorgen complete elektrische installaties voor nieuwbouw en verbouwingen. Van bekabeling tot stopcontacten en aansluitingen.',
  'meterkast-groepenkast': 'Specialisten in meterkasten en groepenkast kunnen je verouderde zekeringkast vervangen of uitbreiden met moderne aardlekschakelaars en automaten.',
  'laadpaal-installatie': 'Laadpaal installateurs zorgen voor een professionele aansluiting van je laadpaal voor elektrische auto. Inclusief verzwaring van de aansluiting indien nodig.',
  'zonnepanelen': 'Zonnepanelen installateurs monteren PV-panelen op je dak en zorgen voor de aansluiting op je elektrische installatie en het net.',
  'domotica-smart-home': 'Domotica specialisten maken je huis slim met automatisering van verlichting, verwarming, zonwering en beveiligingssystemen.',
  'verlichting': 'Verlichtingsspecialisten adviseren en installeren binnen- en buitenverlichting. Van sfeerverlichting tot functionele werkverlichting.',
  'bedrijfsinstallaties': 'Elektriciens voor bedrijven verzorgen installaties voor kantoren, winkels, horeca en industrie. Inclusief noodverlichting en databekabeling.',
  'spoed-24-7': '24/7 storingsdiensten zijn dag en nacht bereikbaar voor acute elektrische problemen. Snelle hulp bij gevaarlijke situaties.',
  'nen-keuringen': 'NEN-keuringsinstanties voeren officiele veiligheidsinspecties uit volgens NEN 1010 en NEN 3140 normen. Verplicht voor veel bedrijfspanden.',
};

export async function generateStaticParams() {
  const types = await getAllFacilityTypes();
  return types.map(type => ({
    type: type.slug,
  }));
}

// Revalidate pages every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type: typeSlug } = await params;
  const type = await getFacilityTypeBySlug(typeSlug);

  if (!type) {
    return { title: 'Dienst niet gevonden' };
  }

  return {
    title: `${type.name} - Elektriciens in Nederland | VindElektricien.nl`,
    description: `Vind elektriciens gespecialiseerd in ${type.name.toLowerCase()} door heel Nederland. Bekijk locaties, reviews en contactgegevens.`,
    openGraph: {
      title: `${type.name} - Elektriciens`,
      description: `Alle ${type.name.toLowerCase()} specialisten in Nederland`,
      type: 'website',
    },
  };
}

export default async function TypePage({ params }: PageProps) {
  const { type: typeSlug } = await params;
  const type = await getFacilityTypeBySlug(typeSlug);

  if (!type) {
    notFound();
  }

  const facilities = await getFacilitiesByFacilityType(type.slug);
  const description = typeDescriptions[typeSlug] || type.description;

  // Group by province
  const facilitiesByProvince = facilities.reduce((acc, facility) => {
    const province = facility.state || 'Onbekend';
    if (!acc[province]) {
      acc[province] = [];
    }
    acc[province].push(facility);
    return acc;
  }, {} as Record<string, Facility[]>);

  const provinceCount = Object.keys(facilitiesByProvince).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link></li>
              <li>/</li>
              <li className="text-white">{type.name}</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            {type.name}
          </h1>

          {description && (
            <p className="text-white/90 text-lg max-w-3xl mb-8">
              {description}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-bold text-yellow-200">{facilities.length}</div>
              <div className="text-white/70 text-sm">Elektriciens</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-200">{provinceCount}</div>
              <div className="text-white/70 text-sm">Provincies</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {facilities.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(facilitiesByProvince)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([province, provinceFacilities]) => (
                  <div key={province}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500 text-white flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-bold">{province}</h2>
                        <p className="text-sm text-muted-foreground">
                          {provinceFacilities.length} {provinceFacilities.length !== 1 ? 'elektriciens' : 'elektricien'}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {provinceFacilities.map((facility) => (
                        <Link
                          key={facility.slug}
                          href={`/elektricien/${facility.slug}`}
                          className="group"
                        >
                          <Card className="h-full p-4 border-2 border-transparent hover:border-yellow-300 transition-all duration-300">
                            <h3 className="font-semibold mb-2 group-hover:text-yellow-600 transition-colors">
                              {facility.name}
                            </h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span>{facility.city}</span>
                              </p>
                              {facility.phone && (
                                <p className="text-xs">{facility.phone}</p>
                              )}
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity">
                              Bekijk
                              <ChevronRight className="w-4 h-4" />
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
                Nog geen {type.name.toLowerCase()} elektriciens gevonden. We voegen continue nieuwe locaties toe.
              </p>
              <Link
                href="/zoeken"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Zoek Elektriciens
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          )}

          {/* Info Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card className="p-6 shadow-soft">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Snel Contact</h3>
              <p className="text-sm text-muted-foreground">
                De meeste elektriciens reageren binnen 24 uur op je aanvraag.
                Bel direct voor spoedgevallen.
              </p>
            </Card>
            <Card className="p-6 shadow-soft">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Info className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Gratis Offerte</h3>
              <p className="text-sm text-muted-foreground">
                Vraag altijd een vrijblijvende offerte aan voordat je een elektricien inschakelt.
                Vergelijk meerdere aanbieders.
              </p>
            </Card>
            <Card className="p-6 shadow-soft">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Erkende Vaklui</h3>
              <p className="text-sm text-muted-foreground">
                Kies voor een erkende elektricien met de juiste certificeringen
                voor een veilige installatie.
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Op zoek naar een specifieke elektricien?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Gebruik onze zoekfunctie om elektriciens te vinden op naam, locatie of specialisatie.
            </p>
            <Link
              href="/zoeken"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Zoek Elektriciens
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
