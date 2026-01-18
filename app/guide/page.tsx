import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Building2, Star, ClipboardList, Flag, Leaf, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllGuideCards, GUIDE_AUTHOR } from '@/lib/guide-data';

export const metadata: Metadata = {
  title: 'Treatment Guides & Resources | Rehab Near Me',
  description: 'Expert guides on addiction treatment types, rehab options, insurance coverage, and recovery resources across America. Helpful resources for making informed decisions.',
  keywords: 'treatment guide, addiction treatment, rehab options, insurance coverage, recovery resources, inpatient rehab, outpatient treatment',
  openGraph: {
    title: 'Treatment Guides & Resources | Rehab Near Me',
    description: 'Expert guides on addiction treatment types, rehab options, insurance coverage, and recovery resources across America.',
    type: 'website',
    url: 'https://www.rehabnearbyme.com/guide',
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide',
  },
};

// Icon mapping for guide cards
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building2,
  star: Star,
  clipboard: ClipboardList,
  flag: Flag,
  leaf: Leaf,
};

// Color mapping for guide cards
const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
  forest: { bg: 'bg-teal-100', text: 'text-teal-700', hover: 'group-hover:bg-teal-200' },
  gold: { bg: 'bg-coral-100', text: 'text-coral-700', hover: 'group-hover:bg-coral-200' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', hover: 'group-hover:bg-slate-200' },
  navy: { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'group-hover:bg-blue-200' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-700', hover: 'group-hover:bg-emerald-200' },
};

export default function GuidePage() {
  const guideCards = getAllGuideCards();

  // JSON-LD structured data for breadcrumbs
  const breadcrumbJsonLd = {
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
    ],
  };

  // JSON-LD for the collection page
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Treatment Guides & Resources',
    description: 'Expert guides on addiction treatment types, rehab options, insurance coverage, and recovery resources across America.',
    url: 'https://www.rehabnearbyme.com/guide',
    publisher: {
      '@type': 'Organization',
      name: 'Rehab Near Me',
      url: 'https://www.rehabnearbyme.com',
    },
    author: {
      '@type': 'Organization',
      name: GUIDE_AUTHOR.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Expert Resources
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Treatment Guides
              <span className="block text-coral-300">&amp; Resources</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Expert guides to help you understand treatment options, navigate the recovery process,
              and find the right care for you or your loved one.
            </p>
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
          <li className="text-foreground font-medium" aria-current="page">
            Guides
          </li>
        </ol>
      </nav>

      {/* Guide Cards Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guideCards.map((guide) => {
              const IconComponent = iconMap[guide.icon] || BookOpen;
              const colors = colorMap[guide.color] || colorMap.forest;

              return (
                <Link key={guide.slug} href={`/guide/${guide.slug}`} className="group">
                  <Card className="p-6 h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-white">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.hover} flex items-center justify-center mb-5 transition-colors`}>
                      <IconComponent className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h2 className="font-serif text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {guide.description}
                    </p>
                    <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Guide
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Author/E-E-A-T Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-white">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-teal-700" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold mb-2">
                  {GUIDE_AUTHOR.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {GUIDE_AUTHOR.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {GUIDE_AUTHOR.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Ready to Find Treatment?
          </h2>
          <p className="text-muted-foreground mb-8">
            Use our comprehensive directory to search for treatment centers by location, type, or name.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search">
              <Button variant="default" size="lg">
                Search Treatment Centers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/state">
              <Button variant="outline" size="lg">
                Browse by State
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
