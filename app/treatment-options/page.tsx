'use client';

import Link from 'next/link';
import { Shield, CheckCircle, Phone, Mail, ExternalLink, TrendingUp, Clock, FileText, Heart, Brain, Building2, Users, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import InlineAd from '@/components/ads/InlineAd';

interface TreatmentOption {
  name: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  features: string[];
  duration?: string;
  bestFor?: string;
}

const treatmentOptions: TreatmentOption[] = [
  {
    name: 'Inpatient Rehabilitation',
    icon: <Building2 className="w-6 h-6 text-accent" />,
    description: 'Residential treatment programs where you live at the facility and receive around-the-clock care and support.',
    href: '/type/inpatient-rehab',
    features: [
      '24/7 medical supervision and support',
      'Structured daily schedule',
      'Individual and group therapy',
      'Removal from triggers and stressors'
    ],
    duration: '30-90 days typical',
    bestFor: 'Severe addiction, co-occurring disorders, or failed outpatient attempts'
  },
  {
    name: 'Outpatient Programs',
    icon: <Clock className="w-6 h-6 text-accent" />,
    description: 'Treatment programs that allow you to continue living at home while attending scheduled therapy sessions.',
    href: '/type/outpatient-program',
    features: [
      'Maintain work and family obligations',
      'Apply skills in real-world setting',
      'Lower cost than inpatient',
      'Flexible scheduling options'
    ],
    duration: '3-6 months typical',
    bestFor: 'Mild to moderate addiction, strong support system at home'
  },
  {
    name: 'Medical Detox',
    icon: <Activity className="w-6 h-6 text-accent" />,
    description: 'Medically supervised withdrawal management to safely clear substances from your body.',
    href: '/type/detox-center',
    features: [
      'Medical monitoring 24/7',
      'Medication to ease withdrawal',
      'Safe and comfortable environment',
      'Prepares for ongoing treatment'
    ],
    duration: '3-10 days typical',
    bestFor: 'Physical dependence on alcohol, opioids, or benzodiazepines'
  },
  {
    name: 'Dual Diagnosis Treatment',
    icon: <Brain className="w-6 h-6 text-accent" />,
    description: 'Integrated treatment for both addiction and co-occurring mental health conditions like depression, anxiety, or PTSD.',
    href: '/type/dual-diagnosis',
    features: [
      'Treats root causes of addiction',
      'Psychiatric care and counseling',
      'Medication management',
      'Higher success rates long-term'
    ],
    duration: 'Varies by individual needs',
    bestFor: 'Those with mental health conditions alongside addiction'
  },
  {
    name: 'Sober Living Homes',
    icon: <Heart className="w-6 h-6 text-accent" />,
    description: 'Transitional housing that provides a structured, substance-free environment while you rebuild your life.',
    href: '/type/sober-living',
    features: [
      'Peer support community',
      'Accountability and structure',
      'Bridge between treatment and home',
      'Develop life skills'
    ],
    duration: '3-12 months typical',
    bestFor: 'After completing primary treatment, transitioning back to independence'
  },
  {
    name: 'Intensive Outpatient (IOP)',
    icon: <Users className="w-6 h-6 text-accent" />,
    description: 'A higher level of outpatient care with more frequent sessions, typically 9-20 hours per week.',
    href: '/type/intensive-outpatient',
    features: [
      'More intensive than standard outpatient',
      'Group and individual therapy',
      'Evening and weekend options',
      'Step-down from inpatient'
    ],
    duration: '8-12 weeks typical',
    bestFor: 'Those needing more support than traditional outpatient'
  }
];

const faqs = [
  {
    category: 'Understanding Treatment Options',
    questions: [
      {
        q: 'How do I know which treatment level is right for me?',
        a: 'The right level of care depends on several factors: the severity of your addiction, whether you have co-occurring mental health conditions, your home environment, previous treatment attempts, and your support system. A professional assessment can help determine the appropriate level. Generally, more severe addictions or unstable living situations benefit from inpatient care, while milder cases with strong support may do well in outpatient settings.'
      },
      {
        q: 'What is the difference between inpatient and outpatient treatment?',
        a: 'Inpatient (residential) treatment requires you to live at the facility full-time, providing 24/7 care and a completely structured environment. Outpatient treatment allows you to live at home while attending scheduled therapy sessions, typically a few hours per week. Intensive Outpatient (IOP) falls in between, with more hours than standard outpatient but less than residential care.'
      },
      {
        q: 'How long does addiction treatment typically last?',
        a: 'Treatment duration varies by individual needs. Medical detox usually takes 3-10 days. Inpatient programs commonly last 30, 60, or 90 days. Outpatient programs typically run 3-6 months. However, recovery is a lifelong journey, and many people benefit from ongoing support groups and aftercare for years after primary treatment.'
      }
    ]
  },
  {
    category: 'Practical Considerations',
    questions: [
      {
        q: 'How much does addiction treatment cost?',
        a: 'Costs vary widely based on the type of treatment, location, and amenities. Medical detox can cost $1,000-$5,000. Inpatient rehab ranges from $6,000-$30,000 or more per month. Outpatient programs are generally $5,000-$10,000 for a complete program. Many insurance plans cover addiction treatment, and facilities often offer financing options or sliding scale fees.'
      },
      {
        q: 'Does insurance cover addiction treatment?',
        a: 'Most health insurance plans, including Medicaid and Medicare, are required to cover addiction treatment thanks to the Mental Health Parity Act and the Affordable Care Act. Coverage levels vary by plan. We recommend contacting your insurance provider directly or asking treatment facilities about insurance verification services.'
      },
      {
        q: 'Can I work while in treatment?',
        a: 'It depends on the level of care. Inpatient treatment requires full-time residence at the facility. However, many outpatient and intensive outpatient programs offer evening and weekend sessions specifically designed for working adults. Sober living homes also allow residents to work while maintaining a recovery-focused living environment.'
      }
    ]
  }
];

const tips = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Get a professional assessment',
    description: 'A trained addiction specialist can evaluate your situation and recommend the appropriate level of care.'
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Verify insurance coverage',
    description: 'Contact your insurance provider or ask facilities about coverage before committing to a program.'
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Consider all factors',
    description: 'Think about your work, family obligations, and support system when choosing between inpatient and outpatient.'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Plan for aftercare',
    description: 'Recovery does not end when treatment ends. Plan for ongoing support like therapy, support groups, or sober living.'
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Involve your support system',
    description: 'Include family members or loved ones in your treatment planning when possible for better outcomes.'
  }
];

export default function TreatmentOptionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-accent" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Addiction Treatment Options</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Understanding your treatment options is the first step toward recovery.
          This guide explains the different levels of care available and helps you
          find the right fit for your situation and needs.
        </p>
      </div>

      <LeaderboardAd />

      {/* Treatment Options Section */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Types of Treatment Programs</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Addiction treatment is not one-size-fits-all. Explore different program types to understand
            which might be right for you or your loved one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentOptions.map((option) => (
              <Card key={option.name} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      {option.icon}
                    </div>
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                  </div>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-4 flex-1">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {option.duration && (
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Typical duration:</span> {option.duration}
                    </p>
                  )}
                  {option.bestFor && (
                    <p className="text-sm text-muted-foreground mb-4">
                      <span className="font-medium">Best for:</span> {option.bestFor}
                    </p>
                  )}
                  <Button asChild className="w-full mt-auto">
                    <Link href={option.href}>
                      Find {option.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <InlineAd />

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get answers to common questions about addiction treatment options and what to expect.
          </p>

          <div className="space-y-8">
            {faqs.map((category, categoryIdx) => (
              <div key={categoryIdx}>
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <AccordionItem key={idx} value={`${categoryIdx}-${idx}`} className="border rounded-lg px-6">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-left">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Take the Next Step?</CardTitle>
            <CardDescription className="text-lg">
              Our team can help you find the right treatment center for your specific needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Button asChild variant="outline" size="lg">
                <Link href="mailto:info@rehabnearbyme.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email us
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact us
                </Link>
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              We typically respond within 24 hours. All inquiries are confidential.
            </p>
          </CardContent>
        </Card>
      </section>

      <InlineAd />

      {/* Tips Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Choosing Treatment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <Card key={idx} className="border-l-4 border-l-accent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {tip.icon}
                    </div>
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center">
        <Card className="p-8 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-200 dark:border-teal-800">
          <h2 className="text-2xl font-bold mb-4">Find Treatment Centers Near You</h2>
          <p className="text-muted-foreground mb-6">
            Search our database of treatment facilities to find the right program for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/search">
                Search Treatment Centers
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/state">
                Browse by State
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
