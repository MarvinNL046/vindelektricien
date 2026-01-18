import { Metadata } from 'next';
import Link from 'next/link';
import {
  Flag,
  Trees,
  Building2,
  Cross,
  Star,
  Heart,
  ChevronRight,
  MapPin,
  Users,
  Leaf,
  History,
  Church,
  Shield,
  PawPrint,
  Flame,
  Building,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_STATS } from '@/lib/stats-config';

const publishDate = '2025-01-18';

// Treatment types data
const treatmentTypesData = {
  types: [
    { slug: 'inpatient-rehab', name: 'Inpatient Rehabilitation' },
    { slug: 'outpatient-treatment', name: 'Outpatient Treatment' },
    { slug: 'detox-centers', name: 'Detox Centers' },
    { slug: 'sober-living', name: 'Sober Living Homes' },
    { slug: 'dual-diagnosis', name: 'Dual Diagnosis Treatment' },
    { slug: 'luxury-rehab', name: 'Luxury Rehab Centers' },
    { slug: 'adolescent-programs', name: 'Adolescent Programs' },
    { slug: 'veterans-programs', name: 'Veterans Programs' },
    { slug: 'holistic-treatment', name: 'Holistic Treatment' },
    { slug: 'faith-based', name: 'Faith-Based Programs' },
    { slug: 'medication-assisted', name: 'Medication-Assisted Treatment' },
    { slug: 'residential-treatment', name: 'Residential Treatment' },
  ]
};

export const metadata: Metadata = {
  title: 'Complete Guide to Addiction Treatment Types | RehabNearMe.com',
  description: 'Comprehensive guide to types of addiction treatment programs in the United States. Learn about inpatient rehab, outpatient treatment, detox centers, and specialized programs.',
  keywords: ['treatment types', 'addiction treatment', 'inpatient rehab', 'outpatient treatment', 'detox centers', 'dual diagnosis', 'sober living'],
  openGraph: {
    title: 'Complete Guide to Addiction Treatment Types in America',
    description: 'Discover different types of treatment programs - from inpatient rehabilitation to specialized veterans programs.',
    type: 'article',
    publishedTime: publishDate,
    authors: ['RehabNearMe Editorial Team'],
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide/types',
  },
};

// Sub-pillar pages for the grid
const subPillarPages = [
  {
    title: 'Inpatient Rehabilitation',
    description: 'Residential programs with 24/7 care and support',
    href: '/guide/types/inpatient-rehab',
    icon: Building2,
    color: 'bg-teal-100 text-teal-700',
    count: SITE_STATS.inpatientCentersCount,
  },
  {
    title: 'Outpatient Treatment',
    description: 'Flexible programs allowing you to live at home during treatment',
    href: '/guide/types/outpatient-treatment',
    icon: Users,
    color: 'bg-green-100 text-green-700',
    count: SITE_STATS.outpatientCentersCount,
  },
  {
    title: 'Detox Centers',
    description: 'Medical supervision during withdrawal and detoxification',
    href: '/guide/types/detox-centers',
    icon: Heart,
    color: 'bg-coral-100 text-coral-700',
    count: SITE_STATS.detoxCentersCount,
  },
  {
    title: 'Sober Living Homes',
    description: 'Transitional housing for maintaining sobriety after treatment',
    href: '/guide/types/sober-living',
    icon: Building,
    color: 'bg-purple-100 text-purple-700',
    count: SITE_STATS.soberLivingCount,
  },
  {
    title: 'Dual Diagnosis Programs',
    description: 'Treatment for addiction and co-occurring mental health disorders',
    href: '/guide/types/dual-diagnosis',
    icon: Shield,
    color: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Veterans Programs',
    description: 'Specialized treatment designed for military veterans',
    href: '/guide/veterans',
    icon: Flag,
    color: 'bg-rose-100 text-rose-700',
  },
  {
    title: 'Luxury Rehab Centers',
    description: 'High-end facilities with premium amenities and services',
    href: '/guide/types/luxury-rehab',
    icon: Star,
    color: 'bg-slate-100 text-slate-700',
  },
];

// FAQ items for this page
const faqItems = [
  {
    question: 'What is the difference between inpatient and outpatient treatment?',
    answer: 'Inpatient (residential) treatment requires living at the facility 24/7 for intensive care, typically 30-90 days. It provides structured environment, medical supervision, and removes you from triggering environments. Outpatient treatment allows you to live at home while attending therapy sessions several times per week. Outpatient is often used after inpatient or for those with less severe addictions and strong support systems.',
  },
  {
    question: 'How long does addiction treatment typically last?',
    answer: 'Treatment duration varies based on individual needs and severity of addiction. Detox typically lasts 5-10 days. Inpatient programs commonly run 30, 60, or 90 days. Outpatient programs can last 3-6 months or longer. Research shows longer treatment durations (90+ days) produce better long-term outcomes. Many people continue aftercare and support groups for years.',
  },
  {
    question: 'What is dual diagnosis treatment?',
    answer: 'Dual diagnosis treatment addresses both addiction and co-occurring mental health disorders simultaneously. Many people with substance use disorders also struggle with depression, anxiety, PTSD, or bipolar disorder. Integrated treatment programs treat both conditions together, recognizing they often influence each other. This comprehensive approach leads to better recovery outcomes.',
  },
  {
    question: 'Does insurance cover addiction treatment?',
    answer: 'Most health insurance plans cover addiction treatment services thanks to the Mental Health Parity and Addiction Equity Act. Coverage varies by plan but typically includes detox, inpatient rehab, outpatient therapy, and medication-assisted treatment. Many facilities accept multiple insurance providers. Contact facilities directly to verify your specific coverage and out-of-pocket costs.',
  },
  {
    question: 'What is medication-assisted treatment (MAT)?',
    answer: 'MAT combines FDA-approved medications with counseling and behavioral therapies for substance use disorders. Common medications include methadone, buprenorphine, and naltrexone for opioid addiction, and naltrexone or acamprosate for alcohol use disorder. MAT is proven effective for reducing cravings, preventing relapse, and supporting long-term recovery.',
  },
  {
    question: 'What happens in a sober living home?',
    answer: 'Sober living homes provide structured, alcohol and drug-free housing for people in recovery. Residents typically have completed primary treatment and need transitional support before fully independent living. Rules include maintaining sobriety, attending meetings, paying rent, completing chores, and following house guidelines. Many residents work or attend school while living there.',
  },
  {
    question: 'Are there treatment programs specifically for veterans?',
    answer: 'Yes, many facilities offer specialized programs for military veterans addressing combat trauma, PTSD, and military sexual trauma alongside addiction. The VA also provides addiction treatment services through VA medical centers. Specialized veteran programs understand military culture and the unique challenges veterans face in recovery.',
  },
];

export default function TreatmentTypesGuidePage() {
  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Complete Guide to Addiction Treatment Types in America',
    description: 'Comprehensive guide to types of addiction treatment programs in the United States, including inpatient rehab, outpatient treatment, detox centers, and specialized programs.',
    image: 'https://www.rehabnearbyme.com/images/treatment-types-guide.jpg',
    author: {
      '@type': 'Organization',
      name: 'RehabNearMe Editorial Team',
      url: 'https://www.rehabnearbyme.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RehabNearMe',
      url: 'https://www.rehabnearbyme.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.rehabnearbyme.com/logo.png',
      },
    },
    datePublished: publishDate,
    dateModified: publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.rehabnearbyme.com/guide/types',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

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
        name: 'Guide',
        item: 'https://www.rehabnearbyme.com/guide',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Treatment Types',
        item: 'https://www.rehabnearbyme.com/guide/types',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/guide" className="hover:text-white transition-colors">Guide</Link></li>
              <li>/</li>
              <li className="text-white">Treatment Types</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Complete Guide to Addiction Treatment Types
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8">
            Understanding different types of treatment programs helps you or your loved one make informed decisions
            about recovery. This comprehensive guide covers all major treatment types found across the United States.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>{SITE_STATS.totalFacilitiesDisplay}+ Treatment Centers Listed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Building className="w-4 h-4" />
              <span>{treatmentTypesData.types.length} Treatment Types</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="w-4 h-4" />
              <span>All 50 States + DC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              When seeking help for addiction, understanding the various types of treatment programs available
              is crucial for making informed decisions. The United States offers over {SITE_STATS.totalFacilitiesDisplay} addiction
              treatment facilities, ranging from intensive inpatient programs to flexible outpatient services.
              Each type serves different needs, severity levels, and personal circumstances.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This guide explores the major categories of treatment programs you will encounter across America,
              helping you understand what distinguishes each type, who they serve best, and what to expect
              from each program. Whether you are seeking treatment for yourself, helping a loved one, or
              researching options, this information will help you navigate the landscape of addiction recovery services.
            </p>
          </section>

          {/* Inpatient vs Outpatient Treatment */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-teal-700" />
              </div>
              Inpatient vs Outpatient Treatment
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The fundamental distinction in treatment types is between inpatient (residential) and outpatient programs. This
              classification affects everything from treatment intensity and duration to daily structure and cost.
              Understanding this difference is key to choosing the right level of care.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Inpatient Rehabilitation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Inpatient (residential) treatment provides 24/7 care in a structured facility environment. Patients
              live on-site for the duration of treatment, typically 30, 60, or 90 days. This intensive level of
              care includes medical supervision, individual therapy, group counseling, and structured activities
              designed to support recovery.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Inpatient rehab is recommended for severe addictions, those with co-occurring mental health disorders,
              people who have tried outpatient treatment without success, or anyone whose home environment poses
              risks to recovery. The residential setting removes patients from triggering environments and provides
              constant support during early recovery.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Outpatient Treatment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Outpatient programs allow individuals to continue living at home while attending therapy sessions
              several times per week. Programs range from intensive outpatient (IOP) with 9-20 hours per week to
              standard outpatient with fewer weekly hours. This flexibility allows people to maintain work, school,
              and family responsibilities during treatment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Outpatient treatment works best for those with less severe addictions, strong support systems at home,
              stable living situations, and high motivation for recovery. Many people transition to outpatient care
              after completing inpatient treatment as a step-down level of care.
            </p>
          </section>

          {/* Detoxification and Medical Support */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-teal-700" />
              </div>
              Detoxification Centers and Medical Support
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Detox centers provide medical supervision during the withdrawal process when stopping substance use.
              Withdrawal can be dangerous or even life-threatening for certain substances like alcohol and
              benzodiazepines. Medical detox offers 24/7 monitoring, medication management, and interventions to
              ensure safe and comfortable withdrawal.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Medical Detoxification</h3>
            <p className="text-muted-foreground leading-relaxed">
              Medical detox typically lasts 5-10 days and includes physician oversight, nursing care, and
              medications to manage withdrawal symptoms. Common medications include benzodiazepines for alcohol
              withdrawal, buprenorphine for opioid withdrawal, and various supportive medications for symptom relief.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Medication-Assisted Treatment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Medication-Assisted Treatment (MAT) combines FDA-approved medications with counseling and behavioral
              therapies. MAT is highly effective for opioid and alcohol use disorders. Medications include methadone,
              buprenorphine, and naltrexone for opioid addiction, and naltrexone and acamprosate for alcohol use disorder.
              MAT helps reduce cravings, prevent relapse, and support long-term recovery.
            </p>
          </section>

          {/* Specialized Treatment Programs */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-700" />
              </div>
              Specialized Treatment Programs
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Many treatment centers offer specialized programs designed for specific populations or conditions.
              These programs address unique needs and challenges that may require tailored approaches to treatment.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Dual Diagnosis Treatment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Dual diagnosis programs treat co-occurring mental health and substance use disorders simultaneously.
              Many people struggling with addiction also have depression, anxiety, PTSD, bipolar disorder, or other
              mental health conditions. Integrated treatment addresses both conditions together, recognizing how
              they influence each other and leading to better long-term outcomes.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Veterans Programs</h3>
            <p className="text-muted-foreground leading-relaxed">
              Specialized veteran programs address combat trauma, PTSD, military sexual trauma, and other issues
              unique to military service alongside addiction treatment. These programs understand military culture
              and the unique challenges veterans face. The VA also provides addiction treatment through VA medical
              centers and community providers.
            </p>

            <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">Adolescent Programs</h3>
            <p className="text-muted-foreground leading-relaxed">
              Teen and adolescent programs provide age-appropriate treatment for young people. These programs
              address developmental needs, family dynamics, education continuity, and peer relationships while
              treating substance use disorders. Family involvement is typically a key component.
            </p>
          </section>

          {/* Sober Living and Transitional Housing */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-coral-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-coral-700" />
              </div>
              Sober Living Homes and Transitional Support
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Sober living homes provide structured, alcohol and drug-free housing for people in recovery.
              These transitional residences bridge the gap between intensive treatment and independent living,
              offering peer support and accountability in a safe environment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Residents typically have completed primary treatment and need continued support while rebuilding
              their lives. Rules include maintaining sobriety, attending 12-step or support meetings, paying rent,
              completing household chores, and following house guidelines. Many residents work or attend school
              while living in sober housing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The length of stay varies from a few months to over a year, depending on individual needs and
              progress. Sober living helps people develop life skills, build supportive relationships, and
              establish routines that support long-term recovery before returning to fully independent living.
            </p>
          </section>

        </div>
      </article>

      {/* Sub-Pillar Grid */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Explore Treatment Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deeper into specific treatment program categories.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
            {subPillarPages.map((page) => (
              <Link key={page.href} href={page.href} className="group">
                <Card className="h-full hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl ${page.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <page.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="font-serif text-lg group-hover:text-accent transition-colors">
                      {page.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {page.description}
                    </p>
                    <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Treatment Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">
              All {treatmentTypesData.types.length} Treatment Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete directory of treatment program types.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-secondary/50 rounded-xl p-6">
            <div className="flex flex-wrap gap-2">
              {treatmentTypesData.types.map((type) => (
                <Link
                  key={type.slug}
                  href={`/guide/types/${type.slug}`}
                  className="px-3 py-2 bg-white rounded-lg text-sm hover:bg-accent hover:text-white transition-colors shadow-sm"
                >
                  {type.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Frequently Asked Questions About Treatment Types
            </h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-foreground pr-4">{item.question}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Find Treatment Centers Near You
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Search our comprehensive database of {SITE_STATS.totalFacilitiesDisplay}+ treatment facilities across all 50 states.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search">
              <Button variant="accent" size="lg" className="group">
                Search Treatment Centers
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/guide/types">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Browse by Type
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Author/Trust Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">About This Guide</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  This comprehensive guide was researched and written by the RehabNearMe Editorial Team.
                  Our team includes addiction counselors, healthcare professionals, and recovery advocates.
                  We are committed to providing accurate, compassionate information to assist individuals
                  and families seeking addiction treatment options.
                </p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
