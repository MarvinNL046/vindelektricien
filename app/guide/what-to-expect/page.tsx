import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ClipboardList, Heart, Users, Clock, ArrowRight, CheckCircle, Brain, Pill, Home, Phone, AlertCircle, Sun, Moon, Coffee, Dumbbell, BookOpen, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineAd from '@/components/ads/InlineAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import { SITE_STATS } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'What to Expect During Rehab Treatment: Complete Guide | RehabNearMe',
  description: 'Learn what happens during addiction treatment including intake, detox, therapy types, daily schedules, and aftercare planning. Prepare for your recovery journey.',
  keywords: 'what to expect in rehab, addiction treatment process, detox timeline, rehab daily schedule, therapy in rehab, aftercare planning, recovery journey',
  openGraph: {
    title: 'What to Expect During Rehab Treatment: Complete Guide',
    description: 'Everything you need to know about what happens during addiction treatment from intake to aftercare.',
    type: 'article',
    siteName: 'RehabNearMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What to Expect During Addiction Treatment',
    description: 'Complete guide to the treatment process from start to finish.',
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide/what-to-expect',
  },
};

const treatmentPhases = [
  {
    phase: 1,
    title: 'Intake & Assessment',
    duration: '1-2 days',
    icon: <ClipboardList className="w-6 h-6" />,
    description: 'Your treatment begins with a comprehensive evaluation to create your personalized care plan.',
    details: [
      'Medical history and physical examination',
      'Mental health and substance use assessment',
      'Insurance verification and financial arrangements',
      'Personal belongings check and orientation',
      'Introduction to staff and facility rules',
      'Initial treatment goal setting',
    ],
  },
  {
    phase: 2,
    title: 'Medical Detoxification',
    duration: '3-10 days',
    icon: <Pill className="w-6 h-6" />,
    description: 'If needed, medical detox safely manages withdrawal symptoms under 24/7 supervision.',
    details: [
      'Continuous vital sign monitoring',
      'Medication to manage withdrawal symptoms',
      'Nutritional support and hydration',
      'Emotional support from clinical staff',
      'Sleep monitoring and comfort measures',
      'Gradual stabilization process',
    ],
  },
  {
    phase: 3,
    title: 'Active Treatment',
    duration: '21-90+ days',
    icon: <Brain className="w-6 h-6" />,
    description: 'The core of treatment focuses on understanding addiction and developing recovery skills.',
    details: [
      'Individual therapy sessions',
      'Group therapy and peer support',
      'Family therapy (if applicable)',
      'Educational workshops on addiction',
      'Skill-building activities',
      'Holistic therapies and wellness activities',
    ],
  },
  {
    phase: 4,
    title: 'Aftercare Planning',
    duration: 'Final 1-2 weeks',
    icon: <Home className="w-6 h-6" />,
    description: 'Preparing for life after treatment with a comprehensive continuing care plan.',
    details: [
      'Relapse prevention planning',
      'Outpatient treatment referrals',
      'Support group connections (AA, NA, etc.)',
      'Sober living arrangements if needed',
      'Employment and education resources',
      'Ongoing therapy scheduling',
    ],
  },
];

const therapyTypes = [
  {
    name: 'Cognitive Behavioral Therapy (CBT)',
    description: 'Helps identify and change negative thought patterns and behaviors that contribute to addiction.',
    benefits: ['Identifies triggers', 'Develops coping skills', 'Changes negative thinking'],
  },
  {
    name: 'Dialectical Behavior Therapy (DBT)',
    description: 'Combines CBT with mindfulness to help manage emotions and improve relationships.',
    benefits: ['Emotional regulation', 'Distress tolerance', 'Interpersonal skills'],
  },
  {
    name: 'Motivational Interviewing (MI)',
    description: 'A collaborative approach that strengthens your motivation and commitment to change.',
    benefits: ['Resolves ambivalence', 'Builds motivation', 'Supports autonomy'],
  },
  {
    name: 'Group Therapy',
    description: 'Provides peer support, shared experiences, and accountability in a safe environment.',
    benefits: ['Peer connection', 'Shared learning', 'Social skills'],
  },
  {
    name: 'Family Therapy',
    description: 'Addresses family dynamics, improves communication, and rebuilds relationships.',
    benefits: ['Heals relationships', 'Improves communication', 'Creates support system'],
  },
  {
    name: 'Trauma-Informed Care',
    description: 'Addresses underlying trauma that often contributes to substance use disorders.',
    benefits: ['Processes trauma', 'Reduces triggers', 'Promotes healing'],
  },
];

const dailyScheduleItems = [
  { time: '6:30 AM', activity: 'Wake up and personal hygiene', icon: <Sun className="w-4 h-4" /> },
  { time: '7:00 AM', activity: 'Morning meditation or yoga', icon: <Heart className="w-4 h-4" /> },
  { time: '7:30 AM', activity: 'Breakfast', icon: <Coffee className="w-4 h-4" /> },
  { time: '8:30 AM', activity: 'Morning group therapy', icon: <Users className="w-4 h-4" /> },
  { time: '10:00 AM', activity: 'Individual therapy session', icon: <MessageCircle className="w-4 h-4" /> },
  { time: '11:00 AM', activity: 'Educational workshop', icon: <BookOpen className="w-4 h-4" /> },
  { time: '12:00 PM', activity: 'Lunch', icon: <Coffee className="w-4 h-4" /> },
  { time: '1:00 PM', activity: 'Rest or quiet time', icon: <Moon className="w-4 h-4" /> },
  { time: '2:00 PM', activity: 'Specialty group (trauma, anger, etc.)', icon: <Brain className="w-4 h-4" /> },
  { time: '3:30 PM', activity: 'Recreation or exercise', icon: <Dumbbell className="w-4 h-4" /> },
  { time: '5:00 PM', activity: 'Dinner', icon: <Coffee className="w-4 h-4" /> },
  { time: '6:00 PM', activity: '12-step meeting or evening group', icon: <Users className="w-4 h-4" /> },
  { time: '7:30 PM', activity: 'Free time or journaling', icon: <BookOpen className="w-4 h-4" /> },
  { time: '9:00 PM', activity: 'Evening check-in', icon: <ClipboardList className="w-4 h-4" /> },
  { time: '10:00 PM', activity: 'Lights out', icon: <Moon className="w-4 h-4" /> },
];

const whatToBring = [
  {
    category: 'Recommended',
    items: [
      'Comfortable, modest clothing for one week',
      'Toiletries (no alcohol-based products)',
      'Prescription medications with documentation',
      'Insurance cards and ID',
      'Journal and pen',
      'Photos of loved ones',
      'Books (recovery-related encouraged)',
      'Small amount of cash for incidentals',
    ],
  },
  {
    category: 'Do Not Bring',
    items: [
      'Alcohol or drugs',
      'Weapons of any kind',
      'Valuables or expensive jewelry',
      'Revealing or inappropriate clothing',
      'Electronics (varies by facility)',
      'Large amounts of cash',
      'Outside food or snacks',
      'Mouthwash or products with alcohol',
    ],
  },
];

const aftercareComponents = [
  {
    title: 'Outpatient Treatment',
    description: 'Continued therapy sessions while living at home, ranging from intensive outpatient (9+ hours/week) to regular outpatient (1-2 sessions/week).',
  },
  {
    title: 'Support Groups',
    description: 'Regular attendance at 12-step meetings (AA, NA) or alternative groups (SMART Recovery) provides ongoing peer support.',
  },
  {
    title: 'Sober Living',
    description: 'Transitional housing that provides a structured, substance-free environment while you rebuild independence.',
  },
  {
    title: 'Individual Therapy',
    description: 'Continued one-on-one counseling to address ongoing challenges and maintain progress.',
  },
  {
    title: 'Medication Management',
    description: 'For those on MAT, ongoing medication and monitoring to support long-term recovery.',
  },
  {
    title: 'Alumni Programs',
    description: 'Many facilities offer alumni groups, events, and check-ins to maintain connections with your recovery community.',
  },
];

const faqs = [
  {
    question: 'How long does rehab treatment last?',
    answer: 'Treatment length varies based on individual needs and the severity of addiction. Detox typically takes 3-10 days. Inpatient residential programs range from 28 days (short-term) to 60-90 days (long-term). Research shows that treatment lasting at least 90 days produces the best outcomes. Outpatient programs usually run 8-16 weeks. Your treatment team will recommend a duration based on your specific situation.',
  },
  {
    question: 'Can I leave treatment if I want to?',
    answer: 'In most cases, treatment is voluntary and you can leave if you choose. However, leaving early significantly increases the risk of relapse. If you feel the urge to leave, talk to your treatment team first - they can address your concerns and adjust your program if needed. Some situations (court-ordered treatment, minors, medical instability) may have different rules.',
  },
  {
    question: 'What happens during detox?',
    answer: 'Medical detox involves 24/7 monitoring as your body clears substances. Staff will track vital signs, provide medications to manage withdrawal symptoms (which can include anxiety, nausea, sweating, tremors, and in severe cases, seizures), ensure proper nutrition and hydration, and provide emotional support. The process varies by substance but typically lasts 3-10 days. Detox addresses physical dependence but is just the first step - comprehensive treatment follows.',
  },
  {
    question: 'Will I have access to my phone?',
    answer: 'Policies vary by facility. Many inpatient programs restrict phone and electronic use, especially during the first weeks, to help you focus on recovery without outside distractions. Some facilities allow scheduled phone calls with approved contacts. Outpatient programs typically do not restrict phone use. Ask the facility about their specific policy before admission.',
  },
  {
    question: 'Can my family visit me during treatment?',
    answer: 'Most facilities encourage family involvement and have designated visiting hours, typically on weekends. Many programs also include family therapy sessions and family education programs. Some facilities restrict visitors during the initial adjustment period (first 1-2 weeks). Family members may need to be pre-approved. Contact the facility for their specific visitation policy.',
  },
  {
    question: 'What is a typical day like in rehab?',
    answer: 'Days are structured with a mix of therapy, education, and activities. A typical day includes: wake-up and breakfast, morning meditation or yoga, group therapy, individual counseling, educational workshops, lunch, recreation or exercise, specialty groups, dinner, evening support meetings, and personal time before lights out. The structured schedule helps establish healthy routines and keeps you engaged in recovery.',
  },
  {
    question: 'What therapies are used in addiction treatment?',
    answer: 'Evidence-based therapies commonly used include: Cognitive Behavioral Therapy (CBT) to change negative thought patterns, Dialectical Behavior Therapy (DBT) for emotion regulation, Motivational Interviewing to build commitment to change, Group Therapy for peer support, Family Therapy to repair relationships, and trauma-informed approaches like EMDR. Many facilities also offer holistic therapies such as yoga, meditation, art therapy, and equine therapy.',
  },
  {
    question: 'What should I pack for rehab?',
    answer: 'Bring comfortable, modest clothing for about a week, basic toiletries (no alcohol-based products), any prescription medications with documentation, your ID and insurance cards, a journal, and photos of loved ones. Do NOT bring: any substances, weapons, valuables, revealing clothing, or large amounts of cash. Many facilities restrict electronics. Contact the facility for their specific packing list before arrival.',
  },
  {
    question: 'What happens after I complete treatment?',
    answer: 'Treatment continues after inpatient care through aftercare planning. Your team will help arrange: step-down to outpatient treatment, connections to local support groups (AA, NA, SMART Recovery), sober living housing if needed, ongoing individual therapy, medication management if applicable, and employment or educational resources. A strong aftercare plan is crucial for maintaining long-term sobriety.',
  },
  {
    question: 'Will treatment be confidential?',
    answer: 'Yes. Federal law (42 CFR Part 2) provides special protections for substance abuse treatment records, which are stronger than standard HIPAA protections. Your treatment cannot be disclosed to employers, law enforcement, or others without your written consent, with very limited exceptions. Facilities take confidentiality seriously to ensure you can focus on recovery without fear.',
  },
];

export default function WhatToExpectPage() {
  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What to Expect During Rehab Treatment: Complete Guide',
    description: 'Comprehensive guide to understanding the addiction treatment process including intake, detox, therapy types, daily schedules, and aftercare planning.',
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
      '@id': 'https://www.rehabnearbyme.com/guide/what-to-expect',
    },
    about: [
      { '@type': 'Thing', name: 'Addiction treatment process' },
      { '@type': 'Thing', name: 'Rehab daily schedule' },
      { '@type': 'Thing', name: 'Recovery journey' },
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
        name: 'What to Expect',
        item: 'https://www.rehabnearbyme.com/guide/what-to-expect',
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
                <li className="text-white">What to Expect</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-coral-400" />
              <span className="text-coral-400 font-medium">Treatment Guide</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
              What to Expect During Treatment
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mb-6">
              A comprehensive guide to the addiction treatment process, from your first day through
              aftercare. Know what to expect so you can focus on your recovery.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Step-by-Step Process
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Daily Schedule
              </span>
              <span className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Therapy Types Explained
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Entering addiction treatment is a courageous decision, and knowing what to expect can help
                ease anxiety about the process. While every facility and individual experience is different,
                this guide covers the common elements of treatment so you can prepare for your recovery journey.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From your initial assessment through aftercare planning, understanding each phase of treatment
                helps you engage fully in the process and get the most out of your time in recovery.
              </p>
            </div>

            {/* Reassurance Banner */}
            <Card className="p-6 mb-12 bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800">
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-2">You Are Not Alone</h3>
                  <p className="text-muted-foreground">
                    Millions of people have successfully completed addiction treatment and are living fulfilling
                    lives in recovery. The treatment team is there to support you every step of the way, and
                    you will be surrounded by others who understand what you are going through.
                  </p>
                </div>
              </div>
            </Card>

            <LeaderboardAd />

            {/* Treatment Phases */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">The Treatment Process</h2>
              <p className="text-muted-foreground mb-8">
                Treatment typically progresses through several phases, each building on the previous one
                to create a strong foundation for long-term recovery.
              </p>

              <div className="space-y-6">
                {treatmentPhases.map((phase) => (
                  <Card key={phase.phase} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-accent text-accent-foreground rounded-xl flex items-center justify-center shrink-0">
                        {phase.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-accent">Phase {phase.phase}</span>
                          <h3 className="font-serif font-semibold text-xl">{phase.title}</h3>
                          <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4">{phase.description}</p>
                        <div className="grid gap-2 md:grid-cols-2">
                          {phase.details.map((detail) => (
                            <p key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <InlineAd />

            {/* Types of Therapy */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Types of Therapy in Treatment</h2>
              <p className="text-muted-foreground mb-8">
                Evidence-based therapies form the core of addiction treatment. You will likely participate
                in multiple types of therapy during your stay.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {therapyTypes.map((therapy) => (
                  <Card key={therapy.name} className="p-5 border-l-4 border-l-accent">
                    <h3 className="font-serif font-semibold mb-2">{therapy.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{therapy.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {therapy.benefits.map((benefit) => (
                        <span key={benefit} className="text-xs bg-secondary px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Daily Schedule */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Sample Daily Schedule</h2>
              <p className="text-muted-foreground mb-8">
                Treatment facilities follow a structured schedule to help establish healthy routines.
                While schedules vary, here is an example of what a typical day might look like.
              </p>

              <Card className="p-6 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <div className="space-y-3">
                  {dailyScheduleItems.map((item) => (
                    <div key={item.time} className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
                      <div className="w-16 text-sm font-medium text-accent">{item.time}</div>
                      <div className="w-8 h-8 bg-white dark:bg-background rounded-lg flex items-center justify-center text-muted-foreground">
                        {item.icon}
                      </div>
                      <div className="flex-1 text-sm">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <p className="text-sm text-muted-foreground mt-4 italic">
                Note: Actual schedules vary by facility and may include different activities, therapy types,
                and timing based on individual treatment plans.
              </p>
            </section>

            <InlineAd />

            {/* What to Bring */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">What to Pack for Treatment</h2>
              <p className="text-muted-foreground mb-8">
                Knowing what to bring (and what to leave at home) helps you prepare for your stay.
                Always check with your specific facility for their packing guidelines.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {whatToBring.map((category) => (
                  <Card key={category.category} className={`p-6 ${category.category === 'Do Not Bring' ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'}`}>
                    <h3 className={`font-serif font-semibold text-lg mb-4 flex items-center gap-2 ${category.category === 'Do Not Bring' ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                      {category.category === 'Do Not Bring' ? (
                        <AlertCircle className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className={category.category === 'Do Not Bring' ? 'text-red-500' : 'text-green-500'}>
                            {category.category === 'Do Not Bring' ? '×' : '•'}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>

            {/* Aftercare */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">After Treatment: Continuing Care</h2>
              <p className="text-muted-foreground mb-8">
                Recovery does not end when you leave treatment. A strong aftercare plan is essential for
                maintaining sobriety and continuing your progress.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {aftercareComponents.map((component) => (
                  <Card key={component.title} className="p-5">
                    <h3 className="font-semibold mb-2">{component.title}</h3>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </Card>
                ))}
              </div>
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

            {/* Crisis Resources */}
            <Card className="p-6 mb-12 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-2">Ready to Start Treatment?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you or a loved one is ready to begin the journey to recovery, help is available.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="font-medium text-sm">SAMHSA Helpline</p>
                      <p className="text-blue-600 text-xl font-bold">1-800-662-4357</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Available</p>
                      <p className="text-blue-600 text-lg font-bold">24/7, Free & Confidential</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA Section */}
            <section className="text-center">
              <Card className="p-8 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Find Treatment Centers Near You
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Search our database of {SITE_STATS.totalFacilitiesDisplay}+ addiction treatment centers.
                  Filter by location, treatment type, and insurance to find the right fit for your recovery.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                    Search Treatment Centers
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/guide/insurance"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    Insurance Coverage Guide
                  </Link>
                </div>
              </Card>
            </section>

            {/* Author Attribution */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>About this guide:</strong> This treatment guide is maintained by the
                RehabNearMe editorial team. We strive to provide accurate, helpful information about
                the addiction treatment process. Individual experiences may vary - always consult with
                treatment providers for specific guidance.
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
