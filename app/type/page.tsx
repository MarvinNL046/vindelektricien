import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Wrench, Battery, Sun, Home, Lightbulb, Building2, Clock, Shield, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Diensten - Vind Elektriciens per Specialisatie | VindElektricien.nl',
  description: 'Zoek elektriciens op specialisatie: storingen, installaties, laadpalen, zonnepanelen, domotica en meer. Vind de juiste elektricien voor jouw klus.',
  openGraph: {
    title: 'Diensten - Elektriciens per Specialisatie',
    description: 'Vind de juiste elektricien voor jouw specifieke behoefte.',
  }
};

const categoryIcons: Record<string, any> = {
  'storingen-reparaties': Wrench,
  'installatie': Zap,
  'meterkast-groepenkast': Battery,
  'laadpaal-installatie': Battery,
  'zonnepanelen': Sun,
  'domotica-smart-home': Home,
  'verlichting': Lightbulb,
  'bedrijfsinstallaties': Building2,
  'spoed-24-7': Clock,
  'nen-keuringen': Shield,
};

const categories = [
  {
    title: 'Installatie & Aanleg',
    types: ['installatie', 'meterkast-groepenkast', 'verlichting', 'bedrijfsinstallaties']
  },
  {
    title: 'Storingen & Reparaties',
    types: ['storingen-reparaties', 'spoed-24-7']
  },
  {
    title: 'Duurzaam & Elektrisch Rijden',
    types: ['laadpaal-installatie', 'zonnepanelen']
  },
  {
    title: 'Smart Home & Keuringen',
    types: ['domotica-smart-home', 'nen-keuringen']
  }
];

// Service type definitions
const serviceTypes: Record<string, { name: string; description: string }> = {
  'storingen-reparaties': {
    name: 'Storingen & Reparaties',
    description: 'Snelle hulp bij elektrische storingen, kortsluiting, stroomuitval en reparatie van defecte apparatuur en bedrading.'
  },
  'installatie': {
    name: 'Elektrische Installatie',
    description: 'Complete elektrische installaties voor nieuwbouw, verbouwingen en uitbreidingen. Van stopcontacten tot complete bekabeling.'
  },
  'meterkast-groepenkast': {
    name: 'Meterkast / Groepenkast',
    description: 'Vervanging, uitbreiding en modernisering van meterkasten en groepenkast. Inclusief aardlekschakelaars en automatische zekeringen.'
  },
  'laadpaal-installatie': {
    name: 'Laadpaal Installatie',
    description: 'Professionele installatie van laadpalen en laadpunten voor elektrische auto\'s thuis of op het bedrijf.'
  },
  'zonnepanelen': {
    name: 'Zonnepanelen Installatie',
    description: 'Installatie van zonnepanelen (PV) en omvormers. Van dakinstallatie tot aansluiting op het elektriciteitsnet.'
  },
  'domotica-smart-home': {
    name: 'Domotica & Smart Home',
    description: 'Slimme huisautomatisering, van slimme verlichting tot complete smart home systemen en automatische zonwering.'
  },
  'verlichting': {
    name: 'Verlichting',
    description: 'Installatie en advies voor binnen- en buitenverlichting. LED-verlichting, spots, sfeerverlichting en tuinverlichting.'
  },
  'bedrijfsinstallaties': {
    name: 'Bedrijfsinstallaties',
    description: 'Zakelijke elektrische installaties voor kantoren, winkels, horeca en industrie. Inclusief noodverlichting en brandmeldinstallaties.'
  },
  'spoed-24-7': {
    name: 'Spoed / 24-7 Service',
    description: 'Noodservice voor acute elektrische problemen. 24 uur per dag, 7 dagen per week beschikbaar voor spoedgevallen.'
  },
  'nen-keuringen': {
    name: 'NEN-keuringen',
    description: 'Officiele NEN 1010 en NEN 3140 keuringen en inspecties. Veiligheidscertificaten voor woningen en bedrijfspanden.'
  },
};

export default function DienstenPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Elektricien Diensten
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Vind de juiste elektricien voor jouw specifieke klus. We categoriseren elektriciens
            op basis van hun specialisatie en expertise.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => (
          <section key={category.title} className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              {category.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.types.map((typeSlug) => {
                const type = serviceTypes[typeSlug];
                if (!type) return null;
                const Icon = categoryIcons[typeSlug] || Zap;

                return (
                  <Link key={typeSlug} href={`/diensten/${typeSlug}`}>
                    <Card className="p-5 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full border-2 border-transparent hover:border-yellow-300">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1 truncate">
                            {type.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {type.description.substring(0, 80)}...
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Full List */}
        <section className="mt-12 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Alle Diensten
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(serviceTypes).map(([slug, type]) => (
              <Link
                key={slug}
                href={`/diensten/${slug}`}
                className="px-3 py-1 bg-white rounded-full text-sm hover:bg-yellow-500 hover:text-white transition-colors border border-yellow-200"
              >
                {type.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-12 prose prose-lg max-w-none">
          <h2>Hoe kies je de juiste elektricien?</h2>
          <p>
            De keuze voor de juiste elektricien hangt af van het type werk dat je nodig hebt.
            Voor eenvoudige reparaties kun je terecht bij een algemene elektricien, maar voor
            specialistische werkzaamheden zoals laadpaal installaties of domotica is het verstandig
            om een specialist te kiezen.
          </p>
          <h3>Let op deze punten:</h3>
          <ul>
            <li>Controleer of de elektricien erkend of gecertificeerd is</li>
            <li>Vraag naar ervaring met jouw specifieke type project</li>
            <li>Vergelijk meerdere offertes</li>
            <li>Check reviews en beoordelingen van eerdere klanten</li>
            <li>Vraag naar garantie op het geleverde werk</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
