import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Flag, Medal, MapPin, Users, FileText, Phone, ArrowRight, CheckCircle, Clock, DollarSign, Home, Star, BookOpen, AlertCircle, HelpCircle, Brain, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineAd from '@/components/ads/InlineAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import { SITE_STATS } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'Veterans Addiction Treatment Programs: Complete Guide | RehabNearMe',
  description: 'Complete guide to addiction treatment for veterans. Learn about VA programs, specialized treatment for PTSD and trauma, eligibility requirements, and how to access care.',
  keywords: 'veterans addiction treatment, VA rehab programs, PTSD treatment, military addiction recovery, veterans substance abuse, VA benefits',
  openGraph: {
    title: 'Veterans Addiction Treatment Programs: Complete Guide',
    description: 'Everything veterans and families need to know about addiction treatment through VA and specialized programs.',
    type: 'article',
    siteName: 'RehabNearMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veterans Addiction Treatment Guide',
    description: 'Complete guide to addiction treatment programs for veterans.',
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide/veterans',
  },
};

const treatmentBenefits = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'VA Medical Center Treatment',
    description: 'Inpatient and outpatient addiction treatment at VA medical centers nationwide. Includes detox, residential rehab, and intensive outpatient programs.',
    eligibility: 'All enrolled VA healthcare recipients',
    cost: 'Low or no cost based on VA copay tier',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Specialized PTSD Treatment',
    description: 'Programs addressing combat trauma, PTSD, and co-occurring mental health conditions alongside addiction. Evidence-based therapies like CPT and PE.',
    eligibility: 'Veterans with service-connected conditions',
    cost: 'Covered by VA healthcare',
  },
  {
    icon: <Flag className="w-6 h-6" />,
    title: 'Community Care Programs',
    description: 'Access to private addiction treatment facilities through VA Community Care when VA facilities are not available or accessible.',
    eligibility: 'Eligible veterans when criteria met',
    cost: 'Covered by VA',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Peer Support Services',
    description: 'Veteran-to-veteran peer support specialists who understand military culture and provide ongoing recovery support.',
    eligibility: 'All veterans in treatment',
    cost: 'No cost',
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: 'Housing and Employment Support',
    description: 'Assistance with housing, vocational rehabilitation, and job training to support long-term recovery and reintegration.',
    eligibility: 'Veterans in recovery programs',
    cost: 'No cost through VA programs',
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Medication-Assisted Treatment',
    description: 'Access to medications like buprenorphine, naltrexone, and methadone combined with counseling for opioid and alcohol use disorders.',
    eligibility: 'All eligible veterans',
    cost: 'VA pharmacy copays apply',
  },
];

const eligibilityGroups = [
  {
    group: 'Veterans',
    requirements: [
      'Discharged or separated under conditions other than dishonorable',
      'Served on active duty',
      'Members of Reserve and National Guard who were entitled to retirement pay, or would have been but for age',
      'Commissioned officers of NOAA and USPHS',
    ],
  },
  {
    group: 'Family Members',
    requirements: [
      'Spouse or surviving spouse of an eligible veteran (CHAMPVA)',
      'Dependents of veterans with 100% service-connected disability',
      'Family members may access counseling and support services',
      'Some family therapy programs available through VA',
    ],
  },
];

const treatmentStats = [
  { label: 'VA Medical Centers', value: '170+', description: 'Offering addiction treatment nationwide' },
  { label: 'Veterans Served', value: '9+ Million', description: 'Enrolled in VA healthcare' },
  { label: 'Outpatient Clinics', value: '1,100+', description: 'Community-based care locations' },
  { label: 'Specialized Programs', value: '300+', description: 'PTSD and substance abuse programs' },
];

const applicationSteps = [
  {
    step: 1,
    title: 'Verify Your Eligibility',
    description: 'Confirm your eligibility for VA healthcare. Most veterans who served on active duty and were discharged under conditions other than dishonorable are eligible.',
  },
  {
    step: 2,
    title: 'Enroll in VA Healthcare',
    description: 'Apply for VA healthcare online at VA.gov, by phone at 1-877-222-8387, or in person at your local VA medical center.',
  },
  {
    step: 3,
    title: 'Request Addiction Treatment',
    description: 'Contact your VA primary care provider or call the VA addiction treatment referral line. Walk-in appointments are available for urgent needs.',
  },
  {
    step: 4,
    title: 'Complete Assessment',
    description: 'Meet with a VA addiction specialist for a comprehensive assessment to determine the appropriate level of care for your needs.',
  },
  {
    step: 5,
    title: 'Begin Treatment',
    description: 'Start your personalized treatment program, which may include detox, inpatient rehab, outpatient programs, or a combination.',
  },
];

const faqs = [
  {
    question: 'Who is eligible for VA addiction treatment?',
    answer: 'Eligibility for VA addiction treatment includes veterans who served on active duty, members of Reserve and National Guard with qualifying service, and some former service members with other-than-honorable discharges who can apply for a Character of Discharge review. You do not need to have a service-connected condition to receive addiction treatment through VA.',
  },
  {
    question: 'What types of addiction treatment does the VA offer?',
    answer: 'The VA offers a full continuum of addiction treatment including medical detoxification, inpatient residential treatment, intensive outpatient programs (IOP), regular outpatient counseling, medication-assisted treatment (MAT) for opioid and alcohol addiction, and specialized programs for co-occurring PTSD and substance use disorders.',
  },
  {
    question: 'Is VA addiction treatment free?',
    answer: 'Many veterans qualify for no-cost addiction treatment through VA. Copays depend on your priority group and income. Veterans with service-connected conditions, those who are indigent, or those who received a Purple Heart often qualify for free care. Contact your local VA to determine your copay status.',
  },
  {
    question: 'Can I get treatment for both PTSD and addiction at the same time?',
    answer: 'Yes, the VA offers specialized dual-diagnosis programs that treat PTSD and substance use disorders simultaneously. Research shows that treating both conditions together leads to better outcomes. Ask about integrated treatment programs at your VA medical center.',
  },
  {
    question: 'What if I received an other-than-honorable discharge?',
    answer: 'Veterans with other-than-honorable (OTH) discharges may still be eligible for VA mental health and addiction services. You can apply for a Character of Discharge review. Additionally, the VA has expanded access for veterans in crisis. Contact the Veterans Crisis Line at 988 (press 1) for immediate help regardless of discharge status.',
  },
  {
    question: 'Can I use VA benefits at a private treatment center?',
    answer: 'Yes, through the VA Community Care program, you may be able to receive addiction treatment at a private facility if VA services are not available within specific wait time or distance standards. Your VA provider can help determine if you qualify for Community Care.',
  },
  {
    question: 'Does VA offer medication-assisted treatment (MAT)?',
    answer: 'Yes, VA provides comprehensive medication-assisted treatment for opioid and alcohol use disorders. This includes medications like buprenorphine (Suboxone), naltrexone (Vivitrol), and methadone, combined with counseling and behavioral therapies for a whole-patient approach.',
  },
  {
    question: 'What support is available for veterans families?',
    answer: 'VA offers family support services including family therapy, education about addiction, and support groups. Through CHAMPVA, some family members of disabled veterans may also have access to their own mental health services. Vet Centers also provide family counseling.',
  },
  {
    question: 'How long are VA addiction treatment programs?',
    answer: 'Treatment length varies based on individual needs. Detox typically lasts 3-7 days. Inpatient residential programs range from 21-90 days. Intensive outpatient programs usually run 8-12 weeks. Ongoing outpatient support and aftercare are available indefinitely.',
  },
  {
    question: 'What is a Vet Center and how is it different from a VA Medical Center?',
    answer: 'Vet Centers are community-based counseling centers that provide readjustment counseling, including substance abuse assessment and referral. They offer a more informal, peer-focused environment and are available to combat veterans, drone crews, and military sexual trauma survivors regardless of VA enrollment.',
  },
];

const vaPrograms = [
  {
    title: 'Substance Use Disorder Treatment',
    description: 'Comprehensive addiction treatment including detox, residential, and outpatient programs for all substance use disorders.',
  },
  {
    title: 'PTSD and SUD Programs',
    description: 'Integrated treatment addressing both post-traumatic stress disorder and substance use disorders simultaneously.',
  },
  {
    title: 'Domiciliary Care',
    description: 'Residential rehabilitation for veterans who need structured support while receiving addiction treatment.',
  },
  {
    title: 'Vet Centers',
    description: 'Community-based counseling centers offering readjustment services and substance abuse assessment.',
  },
];

export default function VeteransGuidePage() {
  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Veterans Addiction Treatment Programs: Complete Guide',
    description: 'Comprehensive guide to VA addiction treatment programs, eligibility requirements, and how to access care for veterans.',
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
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.rehabnearbyme.com/guide/veterans',
    },
    about: [
      { '@type': 'Thing', name: 'Veterans addiction treatment' },
      { '@type': 'Thing', name: 'VA healthcare' },
      { '@type': 'Thing', name: 'Military substance abuse' },
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
        name: 'Veterans Treatment',
        item: 'https://www.rehabnearbyme.com/guide/veterans',
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
                <li className="text-white">Veterans Treatment</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-coral-400" />
              <span className="text-coral-400 font-medium">Comprehensive Guide</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
              Veterans Addiction Treatment: Complete Guide
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mb-6">
              A comprehensive resource for understanding VA addiction treatment programs, eligibility requirements,
              specialized PTSD treatment, and how to access the care you have earned through your service.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Flag className="w-4 h-4" />
                170+ VA medical centers
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Serving 9+ million veterans
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Official VA.gov source
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Department of Veterans Affairs (VA) provides comprehensive addiction treatment services
                to eligible veterans at little or no cost. From medical detox to long-term residential programs,
                the VA offers evidence-based treatment that understands the unique challenges facing our nations
                service members.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether youre struggling with alcohol, opioids, or other substances, and whether or not your
                addiction is connected to military service, VA treatment programs are available to help you
                reclaim your life. This guide covers everything you need to know about accessing these benefits.
              </p>
            </div>

            {/* Crisis Resources */}
            <Card className="p-6 mb-12 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 text-red-600 shrink-0" />
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-2">Need Help Now?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you or a veteran you know is in crisis, help is available 24/7.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="font-medium text-sm">Veterans Crisis Line</p>
                      <p className="text-red-600 text-xl font-bold">988 (Press 1)</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Text Support</p>
                      <p className="text-red-600 text-xl font-bold">838255</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Chat Online</p>
                      <a href="https://www.veteranscrisisline.net/get-help/chat" target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold hover:underline">
                        VeteransCrisisLine.net
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <LeaderboardAd />

            {/* VA Treatment Statistics */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">VA Addiction Treatment Services</h2>
              <p className="text-muted-foreground mb-8">
                The VA operates one of the largest healthcare systems in the United States, with extensive
                addiction treatment programs designed specifically for veterans and their unique needs.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {treatmentStats.map((stat) => (
                  <Card key={stat.label} className="text-center p-6">
                    <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                    <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">VA Commitment to Veterans</h3>
                    <p className="text-muted-foreground italic">
                      The VA is committed to providing world-class addiction treatment that recognizes
                      the unique experiences and challenges of military service, including combat trauma,
                      military sexual trauma, and the transition to civilian life.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            <InlineAd />

            {/* Treatment Benefits */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">VA Treatment Programs and Benefits</h2>
              <p className="text-muted-foreground mb-8">
                Veterans have access to a wide range of addiction treatment services through the VA,
                often at little or no cost depending on your eligibility and income.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {treatmentBenefits.map((benefit) => (
                  <Card key={benefit.title} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                            {benefit.cost}
                          </span>
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            {benefit.eligibility}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Eligibility Section */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Eligibility Requirements</h2>
              <p className="text-muted-foreground mb-8">
                Most veterans who served on active duty are eligible for VA addiction treatment.
                You do not need to have a service-connected condition to receive substance abuse treatment.
              </p>

              <div className="space-y-6">
                {eligibilityGroups.map((group) => (
                  <Card key={group.group} className="p-6">
                    <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {group.group}
                    </h3>
                    <ul className="space-y-2">
                      {group.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-accent mt-1">&#8226;</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <Card className="p-6 mt-6 bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Other-Than-Honorable Discharges</h3>
                    <p className="text-sm text-muted-foreground">
                      Veterans with other-than-honorable (OTH) discharges may still be eligible for VA mental
                      health and addiction services, especially if in crisis. Contact the Veterans Crisis Line
                      at 988 (press 1) or apply for a Character of Discharge review at 1-800-827-1000.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            <InlineAd />

            {/* VA Programs */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Types of VA Treatment Programs</h2>
              <p className="text-muted-foreground mb-8">
                The VA offers multiple levels of care to meet veterans where they are in their recovery journey.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {vaPrograms.map((item) => (
                  <Card key={item.title} className="p-5 border-l-4 border-l-accent">
                    <h3 className="font-serif font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/type/veterans-program"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Find Veterans Programs
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Search All Treatment Centers
                </Link>
              </div>
            </section>

            {/* How to Apply */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">How to Access VA Treatment</h2>
              <p className="text-muted-foreground mb-8">
                Getting started with VA addiction treatment is straightforward. Follow these steps
                to access the care you have earned through your service.
              </p>

              <div className="space-y-4 mb-8">
                {applicationSteps.map((step) => (
                  <Card key={step.step} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center shrink-0 font-bold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  Key Contact Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="font-medium text-sm">VA Health Benefits Hotline</p>
                    <p className="text-accent text-lg font-bold">1-877-222-8387</p>
                    <p className="text-xs text-muted-foreground">Enrollment and eligibility questions</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">VA General Benefits</p>
                    <p className="text-accent text-lg font-bold">1-800-827-1000</p>
                    <p className="text-xs text-muted-foreground">All VA benefits and services</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Online Resources:</strong> Visit{' '}
                    <a href="https://www.va.gov/health-care/health-needs-conditions/substance-use-problems/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      VA.gov Substance Use Treatment
                    </a>{' '}
                    for more information and to find your nearest VA facility.
                  </p>
                </div>
              </Card>
            </section>

            <InlineAd />

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

            {/* Additional Resources */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Additional Resources</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">VA Healthcare Enrollment</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>VA Form 10-10EZ - Health Benefits Application</li>
                        <li>DD-214 - Discharge papers</li>
                        <li>Income verification documents</li>
                      </ul>
                      <a href="https://www.va.gov/health-care/apply/application/introduction" target="_blank" rel="noopener noreferrer" className="text-accent text-sm hover:underline mt-2 inline-block">
                        Apply online at VA.gov
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Veteran Service Organizations</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>American Legion</li>
                        <li>Veterans of Foreign Wars (VFW)</li>
                        <li>Disabled American Veterans (DAV)</li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        VSOs can assist with VA enrollment and claims
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Vet Centers</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Community-based counseling centers for combat veterans and military sexual trauma survivors.
                      </p>
                      <a href="https://www.vetcenter.va.gov/" target="_blank" rel="noopener noreferrer" className="text-accent text-sm hover:underline">
                        Find a Vet Center near you
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Find Treatment Centers</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Search our database of treatment centers including those specializing in veterans.
                      </p>
                      <Link href="/search" className="text-accent text-sm hover:underline">
                        Search {SITE_STATS.totalFacilitiesDisplay}+ treatment centers
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <Card className="p-8 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Find Veterans Treatment Programs Near You
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Search treatment centers that specialize in helping veterans recover from addiction
                  and co-occurring conditions like PTSD.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/type/veterans-program"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Flag className="w-5 h-5" />
                    Veterans Programs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/type/dual-diagnosis"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    <Brain className="w-5 h-5" />
                    PTSD & Addiction Treatment
                  </Link>
                </div>
              </Card>
            </section>

            {/* Author Attribution */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>About this guide:</strong> This veterans addiction treatment guide is maintained by the
                RehabNearMe editorial team using information from official VA sources (va.gov).
                We strive to provide accurate and helpful information for veterans and their families.
                Always verify current eligibility and benefits directly with the VA.
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
