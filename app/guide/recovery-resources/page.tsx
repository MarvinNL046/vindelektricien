import { Metadata } from 'next';
import Link from 'next/link';
import { Star, MapPin, Users, Phone, BookOpen, Calendar, ArrowRight, Clock, CheckCircle, Heart, Shield, Award, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineAd from '@/components/ads/InlineAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import { SITE_STATS } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'Recovery Resources: Support & Information for Addiction Treatment | RehabNearMe',
  description: 'Comprehensive recovery resources including support groups, hotlines, insurance information, and treatment guides. Find help for addiction recovery across America.',
  keywords: 'recovery resources, addiction help, treatment support, AA meetings, NA meetings, SAMHSA hotline, addiction treatment guide, recovery support groups',
  openGraph: {
    title: 'Recovery Resources: Complete Guide to Addiction Treatment Support',
    description: 'Access comprehensive recovery resources, support groups, hotlines, and treatment information.',
    type: 'article',
    siteName: 'RehabNearMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recovery Resources & Treatment Support',
    description: 'Find comprehensive resources for addiction recovery and treatment.',
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide/recovery-resources',
  },
};

const resourceCategories = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Crisis Hotlines',
    description: '24/7 support lines for immediate help',
    examples: [
      'SAMHSA National Helpline: 1-800-662-4357',
      'Crisis Text Line: Text "HELLO" to 741741',
      'Suicide Prevention Lifeline: 988',
      'Substance Abuse Treatment Locator: findtreatment.gov'
    ],
    count: 'Available 24/7',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Support Groups',
    description: 'Peer-led recovery communities nationwide',
    examples: [
      'Alcoholics Anonymous (AA)',
      'Narcotics Anonymous (NA)',
      'SMART Recovery',
      'Celebrate Recovery'
    ],
    count: '100,000+ meetings',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Insurance & Financial Aid',
    description: 'Coverage options and financial assistance',
    examples: [
      'Medicaid Coverage',
      'Medicare Part A & B',
      'Private Insurance Verification',
      'Sliding Scale Payment Options'
    ],
    count: 'Most insurances accepted',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Educational Resources',
    description: 'Information about addiction and recovery',
    examples: [
      'Understanding Addiction Science',
      'Family Education Programs',
      'Relapse Prevention Strategies',
      'Medication-Assisted Treatment Info'
    ],
    count: '1,000+ articles',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Family Support',
    description: 'Resources for loved ones of those in recovery',
    examples: [
      'Al-Anon Family Groups',
      'Nar-Anon Family Groups',
      'Family Therapy Options',
      'Intervention Services'
    ],
    count: 'Support for families',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Recovery Tools',
    description: 'Apps and tools for maintaining sobriety',
    examples: [
      'Sobriety Calculators',
      'Meeting Finders',
      'Relapse Prevention Apps',
      'Online Support Communities'
    ],
    count: '50+ digital tools',
  },
];

const nationalOrganizations = [
  {
    name: 'SAMHSA (Substance Abuse and Mental Health Services Administration)',
    description: 'Federal agency providing treatment referrals, information about mental health and substance use disorders, and resources for families and professionals.',
    contact: '1-800-662-HELP (4357)',
    website: 'samhsa.gov',
    services: ['Treatment Locator', 'National Helpline', 'Prevention Resources', 'Recovery Resources'],
  },
  {
    name: 'National Institute on Drug Abuse (NIDA)',
    description: 'Leading federal agency supporting scientific research on drug use and addiction, providing evidence-based resources and educational materials.',
    contact: 'Information available online',
    website: 'nida.nih.gov',
    services: ['Research Publications', 'Treatment Information', 'Educational Materials', 'Statistics & Data'],
  },
  {
    name: 'National Council on Alcoholism and Drug Dependence (NCADD)',
    description: 'Advocacy organization providing education, information, and assistance to the public regarding alcoholism and drug dependence.',
    contact: '1-800-NCA-CALL (622-2255)',
    website: 'ncadd.org',
    services: ['Intervention Services', 'Education Programs', 'Advocacy', 'Local Affiliate Network'],
  },
  {
    name: 'Partnership to End Addiction',
    description: 'Non-profit organization dedicated to helping families struggling with substance use disorders through education and support.',
    contact: '1-855-DRUGFREE',
    website: 'drugfree.org',
    services: ['Parent Helpline', 'Family Support', 'Educational Resources', 'Treatment Guidance'],
  },
];

const supportGroups = [
  {
    name: 'Alcoholics Anonymous (AA)',
    focus: 'Alcohol addiction recovery',
    description: 'International fellowship using a 12-step program for recovery from alcoholism. Free meetings available worldwide.',
    website: 'aa.org',
    meetingLocator: 'aa.org/find-aa',
  },
  {
    name: 'Narcotics Anonymous (NA)',
    focus: 'Drug addiction recovery',
    description: 'Global community-based organization for recovering addicts following a 12-step program. Open to anyone with a desire to stop using drugs.',
    website: 'na.org',
    meetingLocator: 'na.org/meetingsearch',
  },
  {
    name: 'SMART Recovery',
    focus: 'Science-based addiction recovery',
    description: 'Self-empowering addiction recovery support group using cognitive behavioral therapy and motivational interviewing techniques.',
    website: 'smartrecovery.org',
    meetingLocator: 'smartrecovery.org/local',
  },
  {
    name: 'Celebrate Recovery',
    focus: 'Faith-based recovery',
    description: 'Christ-centered 12-step recovery program for anyone struggling with hurts, habits, and hang-ups.',
    website: 'celebraterecovery.com',
    meetingLocator: 'locator.crgroups.info',
  },
  {
    name: 'Al-Anon & Alateen',
    focus: 'Family members of alcoholics',
    description: 'Support groups for families and friends of alcoholics, providing strength and hope through shared experiences.',
    website: 'al-anon.org',
    meetingLocator: 'al-anon.org/al-anon-meetings',
  },
  {
    name: 'Nar-Anon',
    focus: 'Family members affected by drug addiction',
    description: 'Worldwide organization for those affected by someone else\'s addiction, based on the 12-step program.',
    website: 'nar-anon.org',
    meetingLocator: 'nar-anon.org/find-a-meeting',
  },
];

const treatmentGuidelines = [
  {
    title: 'Know Your Treatment Options',
    description: 'Understand the different types of treatment available including inpatient, outpatient, detox, and medication-assisted treatment.',
  },
  {
    title: 'Verify Insurance Coverage',
    description: 'Contact your insurance provider to understand what addiction treatment services are covered under your plan.',
  },
  {
    title: 'Consider Treatment Setting',
    description: 'Choose between residential (inpatient) or outpatient treatment based on the severity of addiction and personal circumstances.',
  },
  {
    title: 'Look for Accreditation',
    description: 'Ensure the facility is accredited by organizations like JCAHO, CARF, or state licensing boards.',
  },
  {
    title: 'Ask About Evidence-Based Practices',
    description: 'Verify that the program uses proven treatment methods like CBT, DBT, or medication-assisted treatment.',
  },
  {
    title: 'Plan for Aftercare',
    description: 'Ensure the program includes or recommends continuing care, support groups, and relapse prevention planning.',
  },
];

const faqs = [
  {
    question: 'How do I know if I need addiction treatment?',
    answer: 'Signs that you may need treatment include: inability to control substance use, continued use despite negative consequences, withdrawal symptoms when not using, tolerance requiring more of the substance, neglecting responsibilities, and failed attempts to quit on your own. If substance use is affecting your health, relationships, work, or daily life, professional treatment can help.',
  },
  {
    question: 'What is the difference between inpatient and outpatient treatment?',
    answer: 'Inpatient (residential) treatment requires living at a treatment facility 24/7, typically for 30-90 days, with intensive therapy and medical supervision. Outpatient treatment allows you to live at home while attending scheduled treatment sessions, offering more flexibility but requiring strong personal commitment. Inpatient is recommended for severe addictions, while outpatient works well for those with stable living situations and mild to moderate addiction.',
  },
  {
    question: 'Does insurance cover addiction treatment?',
    answer: 'Most health insurance plans are required to cover substance abuse treatment under the Affordable Care Act (ACA) and Mental Health Parity Act. Coverage varies by plan but typically includes detox, inpatient treatment, outpatient services, and medication-assisted treatment. Contact your insurance provider to verify coverage details, copays, and in-network facilities. Many facilities offer financial assistance for those without insurance.',
  },
  {
    question: 'What happens during detox?',
    answer: 'Medical detox is the process of safely removing substances from your body under medical supervision. The detox timeline and symptoms vary based on the substance, duration of use, and individual health. Medical staff monitor vital signs, manage withdrawal symptoms with medication when appropriate, and ensure your safety and comfort. Detox typically lasts 3-10 days and is often the first step before entering a treatment program.',
  },
  {
    question: 'Can I visit my loved one in treatment?',
    answer: 'Most treatment centers have scheduled visiting hours and family programs. Many facilities encourage family involvement through family therapy sessions, educational workshops, and designated visiting times. Policies vary by facility - some allow visits after an initial adjustment period, while others have strict schedules. Contact the specific facility for their visitation policy and family program offerings.',
  },
  {
    question: 'What is medication-assisted treatment (MAT)?',
    answer: 'MAT combines behavioral therapy with FDA-approved medications to treat substance use disorders. Common medications include methadone, buprenorphine (Suboxone), and naltrexone for opioid addiction, and naltrexone or acamprosate for alcohol use disorder. MAT is proven to reduce cravings, prevent relapse, normalize brain chemistry, and improve treatment retention. It\'s considered the gold standard for treating opioid use disorder.',
  },
  {
    question: 'How long does treatment take?',
    answer: 'Treatment duration varies based on individual needs and addiction severity. Research shows that 90 days of treatment is generally more effective than shorter programs. Typical programs include: detox (3-10 days), inpatient residential (30-90 days), partial hospitalization (2-6 weeks), intensive outpatient (8-12 weeks), and continuing care/aftercare (ongoing). Long-term success often requires extended support through outpatient programs and support groups.',
  },
  {
    question: 'What should I bring to treatment?',
    answer: 'Most facilities provide a specific packing list. Generally bring: comfortable clothing for a week, toiletries (alcohol-free), any prescribed medications with documentation, identification and insurance cards, notebook and pen, and photos of loved ones. Do NOT bring: alcohol, drugs, weapons, valuable items, revealing clothing, or large amounts of cash. Many facilities restrict electronic devices. Contact the facility for their specific guidelines.',
  },
];

export default function RecoveryResourcesPage() {
  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Recovery Resources: Complete Guide to Addiction Treatment Support',
    description: 'Comprehensive guide to recovery resources including support groups, hotlines, insurance information, and treatment guidelines.',
    author: {
      '@type': 'Organization',
      name: 'RehabNearMe',
      url: 'https://www.rehabnearbyme.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RehabNearMe',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.rehabnearbyme.com/logo.png',
      },
    },
    datePublished: '2025-01-18',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.rehabnearbyme.com/guide/recovery-resources',
    },
    about: [
      { '@type': 'Thing', name: 'Addiction recovery resources' },
      { '@type': 'Thing', name: 'Treatment support' },
      { '@type': 'Thing', name: 'Recovery support groups' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
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
        name: 'Recovery Resources',
        item: 'https://www.rehabnearbyme.com/guide/recovery-resources',
      },
    ],
  };

  return (
    <>
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

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link href="/guide" className="hover:text-white transition-colors">Guide</Link></li>
                <li>/</li>
                <li className="text-white">Recovery Resources</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-coral-400" />
              <span className="text-coral-400 font-medium">Resource Guide</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
              Recovery Resources & Treatment Support
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mb-6">
              Access comprehensive resources for addiction recovery including 24/7 hotlines, support groups,
              insurance information, and treatment guidance. Help is available across all {SITE_STATS.totalStates} states.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                24/7 Support Available
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {SITE_STATS.totalFacilitiesDisplay} Treatment Centers
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Immediate Help Available
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">

            {/* Emergency Help Banner */}
            <Card className="p-6 mb-12 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Need Immediate Help?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you or someone you know is in crisis, help is available 24/7:
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">
                      <Phone className="w-4 h-4 inline mr-2" />
                      SAMHSA National Helpline: <a href="tel:1-800-662-4357" className="text-accent hover:underline">1-800-662-HELP (4357)</a>
                    </p>
                    <p className="font-medium">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Crisis & Suicide Prevention: <a href="tel:988" className="text-accent hover:underline">Call or Text 988</a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Recovery from addiction is a journey that requires support, resources, and guidance. Whether you&apos;re seeking
                treatment for yourself or helping a loved one, having access to reliable information and support systems is crucial
                for successful recovery.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This comprehensive resource guide provides information about national organizations, support groups, treatment options,
                and practical tools to help navigate the recovery process. All resources listed are evidence-based and widely recognized
                in the addiction treatment community.
              </p>
            </div>

            <LeaderboardAd />

            {/* Resource Categories */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Recovery Resource Categories</h2>
              <p className="text-muted-foreground mb-8">
                Access comprehensive support across multiple categories designed to help every stage of the recovery journey.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {resourceCategories.map((category) => (
                  <Card key={category.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <span className="text-xs text-muted-foreground">{category.count}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                      <div className="space-y-1">
                        {category.examples.slice(0, 3).map((example) => (
                          <p key={example} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-accent">•</span>
                            {example}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <InlineAd />

            {/* National Organizations */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">National Organizations & Resources</h2>
              <p className="text-muted-foreground mb-8">
                Leading federal agencies and non-profit organizations providing treatment referrals, education, and support services.
              </p>

              <div className="space-y-6">
                {nationalOrganizations.map((org) => (
                  <Card key={org.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold mb-2">{org.name}</h3>
                      <p className="text-muted-foreground mb-4">{org.description}</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-accent" />
                          <span>{org.contact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <ExternalLink className="w-4 h-4 text-accent" />
                          <a href={`https://${org.website}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            {org.website}
                          </a>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {org.services.map((service) => (
                            <span key={service} className="text-xs bg-secondary px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Support Groups */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Support Groups & Peer Recovery</h2>
              <p className="text-muted-foreground mb-8">
                Peer support groups offer community, accountability, and shared experiences that are invaluable for long-term recovery.
                All groups listed are free or low-cost and available nationwide.
              </p>

              <div className="space-y-6">
                {supportGroups.map((group) => (
                  <Card key={group.name} className="p-6 bg-white border-l-4 border-l-accent">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-1">{group.name}</h3>
                        <p className="text-sm text-accent font-medium mb-3">{group.focus}</p>
                        <p className="text-muted-foreground mb-4">{group.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 text-sm md:text-right">
                        <a href={`https://${group.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline md:justify-end">
                          <ExternalLink className="w-4 h-4" />
                          <span>{group.website}</span>
                        </a>
                        <a href={`https://${group.meetingLocator}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent md:justify-end">
                          <MapPin className="w-4 h-4" />
                          <span>Find Meetings</span>
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <InlineAd />

            {/* Treatment Guidelines */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Choosing the Right Treatment</h2>
              <p className="text-muted-foreground mb-8">
                Selecting an appropriate treatment program is crucial for successful recovery. Consider these important factors
                when evaluating treatment options.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {treatmentGuidelines.map((guideline) => (
                  <Card key={guideline.title} className="p-5 border-l-4 border-l-accent">
                    <h3 className="font-serif font-semibold mb-2">{guideline.title}</h3>
                    <p className="text-sm text-muted-foreground">{guideline.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-6">
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <InlineAd />

            {/* CTA Section */}
            <section className="text-center">
              <Card className="p-8 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Find Treatment Centers Near You
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Search our comprehensive database of {SITE_STATS.totalFacilitiesDisplay} addiction treatment centers
                  across all {SITE_STATS.totalStates} states. Find the right facility for your recovery journey.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    Search Treatment Centers
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/guide"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    Browse Treatment Guides
                  </Link>
                </div>
              </Card>
            </section>

            {/* Author Attribution */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>About this guide:</strong> This comprehensive recovery resources guide is maintained by the
                RehabNearMe editorial team. We strive to provide accurate, helpful information for those seeking
                addiction treatment and recovery support. Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
