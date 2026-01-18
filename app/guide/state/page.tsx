import { Metadata } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { ArrowRight, MapPin, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StateGuide {
  slug: string;
  name: string;
  abbr: string;
  totalFacilities: number;
  title: string;
  heroSubtitle: string;
}

interface StateGuidesData {
  stateGuides: StateGuide[];
}

async function getStateGuidesData(): Promise<StateGuidesData> {
  const filePath = path.join(process.cwd(), 'data', 'guides', 'state-guides.json');
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

export const metadata: Metadata = {
  title: 'State Treatment Guides | Rehab Near Me',
  description: 'Comprehensive guides to treatment centers in each state. Learn about treatment laws, famous treatment centers, and treatment options across America.',
  keywords: 'state treatment guide, treatment centers by state, treatment laws by state, US treatment directory',
  openGraph: {
    title: 'State Treatment Guides | Rehab Near Me',
    description: 'Comprehensive guides to treatment centers in each state. Learn about treatment laws, famous treatment centers, and treatment options across America.',
    type: 'website',
    url: 'https://www.rehabnearbyme.com/guide/state',
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide/state',
  },
};

export default async function StateGuidesPage() {
  const data = await getStateGuidesData();
  const stateGuides = data.stateGuides;

  // Breadcrumb structured data
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.rehabnearbyme.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://www.rehabnearbyme.com/guide',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'State Guides',
        item: 'https://www.rehabnearbyme.com/guide/state',
      },
    ],
  };

  // Collection page structured data
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'State Treatment Guides',
    description: 'Comprehensive guides to treatment centers in each state across America.',
    url: 'https://www.rehabnearbyme.com/guide/state',
    publisher: {
      '@type': 'Organization',
      name: 'Rehab Near Me',
      url: 'https://www.rehabnearbyme.com',
    },
  };

  // Calculate total treatment centers across all guides
  const totalFacilities = stateGuides.reduce((sum, guide) => sum + guide.totalFacilities, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              State Guides
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              State Treatment
              <span className="block text-coral-300">Guides</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Comprehensive guides to treatment centers across America. Learn about licensing requirements,
              top treatment centers, and recovery options in each state.
            </p>
            <div className="flex justify-center gap-8">
              <div>
                <div className="text-3xl font-bold text-coral-300">{stateGuides.length}</div>
                <div className="text-white/70 text-sm">State Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral-300">{totalFacilities.toLocaleString()}</div>
                <div className="text-white/70 text-sm">Treatment Centers Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative mt-8">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" className="fill-secondary/20"/>
          </svg>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li className="text-muted-foreground/50">/</li>
          <li>
            <Link href="/guide" className="hover:text-accent transition-colors">
              Guides
            </Link>
          </li>
          <li className="text-muted-foreground/50">/</li>
          <li className="text-foreground font-medium" aria-current="page">
            State Guides
          </li>
        </ol>
      </nav>

      {/* State Guides Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-2">Browse State Guides</h2>
            <p className="text-muted-foreground">
              Select a state to learn about its treatment centers, licensing requirements, and top facilities.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {stateGuides.map((guide) => (
              <Link key={guide.slug} href={`/guide/state/${guide.slug}`} className="group">
                <Card className="p-6 h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-100 group-hover:bg-teal-200 flex items-center justify-center transition-colors">
                        <MapPin className="w-6 h-6 text-teal-700" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                          {guide.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          {guide.heroSubtitle}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-accent font-semibold">
                            {guide.totalFacilities.toLocaleString()} treatment centers
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-2" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="p-8 bg-secondary/50">
            <h2 className="font-serif text-2xl font-bold mb-4">More State Guides Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re working on comprehensive guides for all 50 states.
              Check back soon for more detailed information about treatment centers across America.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/state">
                <Button variant="default" size="lg">
                  Browse All States
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" size="lg">
                  Search Treatment Centers
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Other Guides Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Explore More Guides</h2>
          <p className="text-muted-foreground mb-8">
            Learn about different aspects of addiction treatment and recovery.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guide/types" className="px-6 py-3 bg-secondary hover:bg-accent hover:text-white rounded-lg font-medium transition-colors">
              Treatment Types
            </Link>
            <Link href="/guide/veterans" className="px-6 py-3 bg-secondary hover:bg-accent hover:text-white rounded-lg font-medium transition-colors">
              Veterans Programs
            </Link>
            <Link href="/guide/insurance" className="px-6 py-3 bg-secondary hover:bg-accent hover:text-white rounded-lg font-medium transition-colors">
              Insurance Coverage
            </Link>
            <Link href="/guide/what-to-expect" className="px-6 py-3 bg-secondary hover:bg-accent hover:text-white rounded-lg font-medium transition-colors">
              What to Expect
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
