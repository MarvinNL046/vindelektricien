import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import {
  MapPin,
  Star,
  ChevronRight,
  ArrowRight,
  BookOpen,
  History,
  CheckCircle,
  Search,
  Eye,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
// import { getAllFacilities, Facility } from '@/lib/data';

// Placeholder type until we have real facility data
interface Facility {
  slug: string;
  name: string;
  city: string;
  state: string;
  rating?: number;
  review_count?: number;
  type?: string;
}

// Type definitions
interface TypeGuideSection {
  title: string;
  content?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
}

interface TypeGuideFAQ {
  question: string;
  answer: string;
}

interface TypeGuide {
  slug: string;
  typeSlug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  sections: {
    introduction: TypeGuideSection;
    history: TypeGuideSection;
    characteristics: TypeGuideSection;
    howToFind: TypeGuideSection;
    visiting: TypeGuideSection;
  };
  faqs: TypeGuideFAQ[];
}

interface TypeGuidesData {
  types: TypeGuide[];
}

// Cache for type guides data
let typeGuidesCache: TypeGuidesData | null = null;

async function getTypeGuides(): Promise<TypeGuidesData> {
  if (typeGuidesCache) return typeGuidesCache;

  const filePath = path.join(process.cwd(), 'data', 'guides', 'type-guides.json');
  const content = await fs.readFile(filePath, 'utf-8');
  typeGuidesCache = JSON.parse(content);
  return typeGuidesCache!;
}

async function getTypeGuide(slug: string): Promise<TypeGuide | null> {
  const data = await getTypeGuides();
  return data.types.find((t) => t.slug === slug) || null;
}

// Generate static params for all type guides
// Revalidate pages every week (static guide content)
export const revalidate = 604800;

export async function generateStaticParams() {
  const slugs = [
    'inpatient-rehab',
    'outpatient-programs',
    'detox-centers',
    'sober-living',
    'dual-diagnosis',
    'luxury-rehab',
    'veterans-programs',
  ];

  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getTypeGuide(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  const baseUrl = 'https://www.rehabnearbyme.com';

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${baseUrl}/guide/types/${guide.slug}`,
      type: 'article',
      images: [
        {
          url: guide.heroImage,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
    alternates: {
      canonical: `${baseUrl}/guide/types/${guide.slug}`,
    },
  };
}

// Get featured facilities of this type - placeholder until we have real data
async function getFeaturedFacilitiesOfType(
  typeSlug: string,
  limit: number = 6
): Promise<Facility[]> {
  // TODO: Replace with actual facility data once available
  return [];
}

// Get state distribution for this type - placeholder
async function getStateDistribution(
  typeSlug: string
): Promise<Array<{ state: string; count: number }>> {
  // TODO: Replace with actual facility data once available
  return [];
}

// Get total count for this type - placeholder
async function getTypeCount(typeSlug: string): Promise<number> {
  // TODO: Replace with actual facility data once available
  return 0;
}

export default async function TypeGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getTypeGuide(slug);

  if (!guide) {
    notFound();
  }

  const [featuredFacilities, stateDistribution, totalCount] = await Promise.all([
    getFeaturedFacilitiesOfType(guide.typeSlug),
    getStateDistribution(guide.typeSlug),
    getTypeCount(guide.typeSlug),
  ]);

  const baseUrl = 'https://www.rehabnearbyme.com';

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${baseUrl}/guide/types/${guide.slug}#article`,
        headline: guide.metaTitle,
        description: guide.metaDescription,
        author: {
          '@type': 'Organization',
          name: 'RehabNearMe',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'RehabNearMe',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/guide/types/${guide.slug}`,
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/guide/types/${guide.slug}#faq`,
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/guide/types/${guide.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guides',
            item: `${baseUrl}/guide`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Treatment Types',
            item: `${baseUrl}/guide/types`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: guide.title,
            item: `${baseUrl}/guide/types/${guide.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/guide" className="hover:text-white transition-colors">
                    Guides
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/guide/types" className="hover:text-white transition-colors">
                    Treatment Types
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white">{guide.title}</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
Treatment Type Guide
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
                {guide.title}
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                {guide.subtitle}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-coral-300">
                    {totalCount.toLocaleString()}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">
                    Locations in Database
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-coral-300">
                    {stateDistribution.length}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">States Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Table of Contents */}
            <Card className="mb-12 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <BookOpen className="w-5 h-5 text-accent" />
                  In This Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="grid gap-2 sm:grid-cols-2">
                  <a
                    href="#introduction"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>{guide.sections.introduction.title}</span>
                  </a>
                  <a
                    href="#history"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>{guide.sections.history.title}</span>
                  </a>
                  <a
                    href="#characteristics"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>{guide.sections.characteristics.title}</span>
                  </a>
                  <a
                    href="#how-to-find"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>{guide.sections.howToFind.title}</span>
                  </a>
                  <a
                    href="#visiting"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>{guide.sections.visiting.title}</span>
                  </a>
                  <a
                    href="#featured"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>Featured {guide.title}</span>
                  </a>
                  <a
                    href="#faq"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-accent" />
                    <span>Frequently Asked Questions</span>
                  </a>
                </nav>
              </CardContent>
            </Card>

            {/* Introduction Section */}
            <section id="introduction" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">
                  {guide.sections.introduction.title}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                {guide.sections.introduction.content
                  ?.split('\n\n')
                  .map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </section>

            {/* History Section */}
            <section id="history" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <History className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">
                  {guide.sections.history.title}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                {guide.sections.history.content?.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Characteristics Section */}
            <section id="characteristics" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">
                  {guide.sections.characteristics.title}
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {guide.sections.characteristics.items?.map((item, idx) => (
                  <Card key={idx} className="shadow-soft">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How to Find Section */}
            <section id="how-to-find" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">
                  {guide.sections.howToFind.title}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                {guide.sections.howToFind.content?.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* State Distribution */}
              {stateDistribution.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">
                    Top States with {guide.title}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {stateDistribution.slice(0, 6).map((item) => (
                      <Link
                        key={item.state}
                        href={`/state/${item.state
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between p-3 rounded-lg border hover:border-accent/50 hover:bg-muted/50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="font-medium">{item.state}</span>
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {item.count} locations
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Visiting Section */}
            <section id="visiting" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">
                  {guide.sections.visiting.title}
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                {guide.sections.visiting.content?.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Featured Facilities Section */}
            <section id="featured" className="mb-16 scroll-mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold">
                    Featured {guide.title}
                  </h2>
                </div>
                <Link
                  href={`/type/${guide.typeSlug}`}
                  className="hidden sm:flex items-center gap-2 text-accent hover:underline"
                >
                  View all {totalCount.toLocaleString()}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {featuredFacilities.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {featuredFacilities.map((facility) => (
                    <Link
                      key={facility.slug}
                      href={`/facility/${facility.slug}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                            {facility.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">
                              {facility.city}, {facility.state}
                            </span>
                          </div>
                          {facility.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium">{facility.rating}</span>
                              {facility.review_count && (
                                <span className="text-muted-foreground text-sm">
                                  ({facility.review_count} reviews)
                                </span>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Featured {guide.title.toLowerCase()} coming soon to our database.
                  </p>
                </Card>
              )}

              <div className="mt-6 text-center sm:hidden">
                <Link
                  href={`/type/${guide.typeSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  View All {totalCount.toLocaleString()} {guide.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-serif text-3xl font-bold">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {guide.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* CTA Section */}
            <div className="bg-muted/50 rounded-2xl p-8 text-center">
              <h2 className="font-serif text-2xl font-bold mb-4">
                Find {guide.title} Near You
              </h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Use our comprehensive directory to find {guide.title.toLowerCase()} in
                your area. Search by location, view details, and get directions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/type/${guide.typeSlug}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Browse All {guide.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search All Treatment Centers
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-bold mb-6">
                Explore More Treatment Types
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    slug: 'inpatient-rehab',
                    title: 'Inpatient Rehab',
                    count: 2500,
                  },
                  { slug: 'outpatient-programs', title: 'Outpatient Programs', count: 3200 },
                  { slug: 'detox-centers', title: 'Detox Centers', count: 1800 },
                  { slug: 'sober-living', title: 'Sober Living', count: 2100 },
                  {
                    slug: 'dual-diagnosis',
                    title: 'Dual Diagnosis',
                    count: 1500,
                  },
                  {
                    slug: 'luxury-rehab',
                    title: 'Luxury Rehab',
                    count: 450,
                  },
                  { slug: 'veterans-programs', title: 'Veterans Programs', count: 620 },
                ]
                  .filter((item) => item.slug !== guide.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      href={`/guide/types/${item.slug}`}
                      className="flex items-center justify-between p-4 rounded-lg border hover:border-accent/50 hover:bg-muted/50 transition-colors group"
                    >
                      <div>
                        <h3 className="font-semibold group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.count} locations
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/guide/types"
                  className="inline-flex items-center gap-2 text-accent hover:underline"
                >
                  View All Treatment Type Guides
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
