import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, DollarSign, CheckCircle, Phone, ArrowRight, Clock, FileText, HelpCircle, AlertCircle, Building2, Heart, CreditCard, Users, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineAd from '@/components/ads/InlineAd';
import LeaderboardAd from '@/components/ads/LeaderboardAd';
import { SITE_STATS } from '@/lib/stats-config';

export const metadata: Metadata = {
  title: 'Insurance Coverage for Addiction Treatment: Complete Guide | RehabNearMe',
  description: 'Understand your insurance options for rehab treatment. Learn about Medicaid, Medicare, private insurance coverage, sliding scale options, and financial assistance programs.',
  keywords: 'insurance for rehab, addiction treatment coverage, Medicaid rehab, Medicare addiction treatment, sliding scale rehab, affordable rehab, insurance verification',
  openGraph: {
    title: 'Insurance Coverage for Addiction Treatment: Complete Guide',
    description: 'Everything you need to know about insurance coverage and payment options for addiction treatment.',
    type: 'article',
    siteName: 'RehabNearMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Coverage for Addiction Treatment',
    description: 'Complete guide to paying for rehab treatment.',
  },
  alternates: {
    canonical: 'https://www.rehabnearbyme.com/guide/insurance',
  },
};

const insuranceTypes = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Private Health Insurance',
    description: 'Employer-sponsored and marketplace plans are required to cover addiction treatment as an essential health benefit under the ACA.',
    coverage: [
      'Inpatient detox and residential treatment',
      'Outpatient therapy and counseling',
      'Medication-assisted treatment (MAT)',
      'Mental health services for co-occurring disorders',
    ],
    tips: 'Contact your insurer to verify in-network facilities and pre-authorization requirements.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Medicaid',
    description: 'State-federal program providing free or low-cost health coverage for low-income individuals. Coverage varies by state.',
    coverage: [
      'Detoxification services',
      'Inpatient and outpatient treatment',
      'Counseling and therapy',
      'Prescription medications',
    ],
    tips: 'Medicaid expansion states offer broader coverage. Check eligibility at your state Medicaid office.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Medicare',
    description: 'Federal health insurance for people 65+ and certain younger people with disabilities. Parts A and B cover addiction treatment.',
    coverage: [
      'Part A: Inpatient hospital and detox',
      'Part B: Outpatient therapy and doctor visits',
      'Part D: Prescription medications for addiction',
      'Medication-assisted treatment',
    ],
    tips: 'Medicare Advantage plans may offer additional benefits. Check your specific plan coverage.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'TRICARE (Military)',
    description: 'Health care program for active duty, retired service members, and their families. Comprehensive addiction treatment coverage.',
    coverage: [
      'Inpatient and residential treatment',
      'Intensive outpatient programs',
      'Substance use disorder counseling',
      'Mental health treatment',
    ],
    tips: 'Contact your regional TRICARE contractor to verify coverage and find authorized providers.',
  },
];

const paymentOptions = [
  {
    title: 'Sliding Scale Fees',
    description: 'Many treatment centers adjust their fees based on your income and ability to pay, making treatment more affordable.',
    icon: <Scale className="w-5 h-5" />,
  },
  {
    title: 'Payment Plans',
    description: 'Facilities often offer monthly payment plans that spread the cost of treatment over time with little to no interest.',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    title: 'State-Funded Programs',
    description: 'Every state offers free or low-cost addiction treatment through state-funded facilities for those who qualify.',
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    title: 'Scholarships & Grants',
    description: 'Many treatment centers and non-profit organizations offer scholarships to help cover the cost of treatment.',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: 'Healthcare Credit',
    description: 'Medical financing options like CareCredit offer special financing for healthcare expenses including addiction treatment.',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    title: 'Crowdfunding',
    description: 'Platforms like GoFundMe can help raise money for treatment costs from friends, family, and supporters.',
    icon: <Users className="w-5 h-5" />,
  },
];

const verificationSteps = [
  {
    step: 1,
    title: 'Gather Your Insurance Information',
    description: 'Have your insurance card ready with your member ID, group number, and the customer service phone number.',
  },
  {
    step: 2,
    title: 'Call Your Insurance Provider',
    description: 'Contact the member services number on your card and ask specifically about substance abuse and mental health benefits.',
  },
  {
    step: 3,
    title: 'Ask Key Questions',
    description: 'Inquire about covered services, in-network facilities, deductibles, copays, out-of-pocket maximums, and pre-authorization requirements.',
  },
  {
    step: 4,
    title: 'Contact Treatment Facilities',
    description: 'Many facilities offer free insurance verification. They can check your benefits and explain your coverage in detail.',
  },
  {
    step: 5,
    title: 'Get Pre-Authorization if Required',
    description: 'Some plans require pre-approval before treatment. The treatment center can often help with this process.',
  },
];

const keyQuestions = [
  'Does my plan cover substance abuse treatment?',
  'What levels of care are covered (detox, inpatient, outpatient)?',
  'What is my deductible and how much have I met?',
  'What are my copays or coinsurance amounts?',
  'What is my out-of-pocket maximum?',
  'Do I need pre-authorization for treatment?',
  'How many days of inpatient treatment are covered?',
  'Are there in-network treatment facilities near me?',
  'What medications for addiction are covered?',
  'Does coverage include mental health treatment for dual diagnosis?',
];

const faqs = [
  {
    question: 'Is addiction treatment covered by insurance?',
    answer: 'Yes. Under the Affordable Care Act (ACA) and Mental Health Parity and Addiction Equity Act, most health insurance plans must cover substance abuse treatment as an essential health benefit. This includes employer-sponsored plans, marketplace plans, Medicaid, and Medicare. Coverage typically includes detox, inpatient treatment, outpatient programs, and medication-assisted treatment.',
  },
  {
    question: 'What is the Mental Health Parity Act?',
    answer: 'The Mental Health Parity and Addiction Equity Act (MHPAEA) requires insurance plans that cover mental health and substance use disorder services to provide coverage that is no more restrictive than coverage for medical/surgical services. This means insurers cannot impose higher copays, deductibles, or visit limits for addiction treatment than for physical health conditions.',
  },
  {
    question: 'What if I do not have insurance?',
    answer: 'Options include: applying for Medicaid (eligibility varies by state and income), seeking treatment at state-funded facilities, looking for sliding scale payment programs, applying for treatment scholarships, using healthcare financing options, or contacting SAMHSA at 1-800-662-4357 for referrals to low-cost treatment options in your area.',
  },
  {
    question: 'How much does rehab cost without insurance?',
    answer: 'Treatment costs vary widely based on the type of care and facility. Outpatient programs may cost $1,000-$10,000 for a 3-month program. Inpatient residential treatment typically ranges from $6,000-$30,000 for 30 days, with luxury facilities costing $30,000-$100,000+. However, state-funded programs and facilities with sliding scale fees can significantly reduce these costs.',
  },
  {
    question: 'What does Medicaid cover for addiction treatment?',
    answer: 'Medicaid coverage varies by state but typically includes: screening and assessment, detoxification services, inpatient and residential treatment, outpatient therapy and counseling, medication-assisted treatment (MAT), case management, and peer support services. Medicaid expansion states generally offer more comprehensive coverage.',
  },
  {
    question: 'Does Medicare cover addiction treatment?',
    answer: 'Yes. Medicare Part A covers inpatient hospital stays including detox. Part B covers outpatient treatment, doctor visits, and some medications. Part D covers prescription drugs for addiction including some MAT medications. Medicare covers both inpatient and outpatient substance abuse treatment when medically necessary.',
  },
  {
    question: 'Can I be denied treatment due to pre-existing conditions?',
    answer: 'No. Under the ACA, insurance companies cannot deny coverage or charge more due to pre-existing conditions, including addiction. This protection applies to marketplace plans, employer plans, and Medicaid. You cannot be denied treatment coverage because you have sought addiction help in the past.',
  },
  {
    question: 'What is a sliding scale payment program?',
    answer: 'Sliding scale programs adjust treatment costs based on your income and ability to pay. If you earn below a certain threshold, you may pay significantly reduced fees or even receive free treatment. Many non-profit treatment centers and state-funded facilities offer sliding scale options. Ask about income-based fees when contacting treatment centers.',
  },
  {
    question: 'How do I verify my insurance benefits for rehab?',
    answer: 'Call the member services number on your insurance card and ask about substance abuse treatment benefits. Key questions include: coverage for detox, inpatient, and outpatient care; in-network facilities; deductibles and copays; pre-authorization requirements; and coverage limits. Many treatment facilities offer free insurance verification services.',
  },
  {
    question: 'What if my insurance claim is denied?',
    answer: 'You have the right to appeal insurance denials. First, request a written explanation of the denial. Then file an internal appeal with your insurance company, providing additional documentation from your treatment provider. If the internal appeal fails, you can request an external review by an independent third party. Many treatment centers have staff who can help navigate the appeals process.',
  },
];

export default function InsuranceGuidePage() {
  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Insurance Coverage for Addiction Treatment: Complete Guide',
    description: 'Comprehensive guide to understanding insurance coverage, Medicaid, Medicare, and payment options for addiction treatment.',
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
      '@id': 'https://www.rehabnearbyme.com/guide/insurance',
    },
    about: [
      { '@type': 'Thing', name: 'Insurance coverage for addiction treatment' },
      { '@type': 'Thing', name: 'Medicaid and Medicare for rehab' },
      { '@type': 'Thing', name: 'Payment options for treatment' },
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
        name: 'Insurance Coverage',
        item: 'https://www.rehabnearbyme.com/guide/insurance',
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
                <li className="text-white">Insurance Coverage</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-coral-400" />
              <span className="text-coral-400 font-medium">Complete Guide</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 max-w-4xl">
              Insurance Coverage for Addiction Treatment
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mb-6">
              Understanding your insurance options, including Medicaid, Medicare, private insurance,
              and alternative payment options for addiction treatment across America.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                ACA Coverage Required
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Sliding Scale Options
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Free Verification Available
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Paying for addiction treatment is a major concern for many individuals and families seeking help.
                The good news is that federal law now requires most health insurance plans to cover substance abuse
                treatment, and there are many financial assistance options available for those without adequate coverage.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This guide explains your insurance rights, breaks down coverage options including Medicaid and Medicare,
                and provides information about alternative payment methods so cost does not stand in the way of getting
                the treatment you or your loved one needs.
              </p>
            </div>

            {/* Key Laws Banner */}
            <Card className="p-6 mb-12 bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-2">Your Rights Under Federal Law</h3>
                  <p className="text-muted-foreground mb-4">
                    Two important federal laws protect your right to addiction treatment coverage:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                      <span><strong>Affordable Care Act (ACA):</strong> Requires marketplace and Medicaid expansion plans to cover substance abuse treatment as an essential health benefit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                      <span><strong>Mental Health Parity Act:</strong> Requires insurers to cover addiction treatment at the same level as physical health conditions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <LeaderboardAd />

            {/* Insurance Types */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Types of Insurance Coverage</h2>
              <p className="text-muted-foreground mb-8">
                Different insurance programs offer varying levels of coverage for addiction treatment.
                Understanding your options helps you maximize your benefits.
              </p>

              <div className="space-y-6">
                {insuranceTypes.map((type) => (
                  <Card key={type.title} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif font-semibold text-xl mb-2">{type.title}</h3>
                        <p className="text-muted-foreground mb-4">{type.description}</p>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Typical Coverage Includes:</p>
                          <ul className="grid gap-1 md:grid-cols-2">
                            {type.coverage.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-sm text-muted-foreground">
                            <strong>Tip:</strong> {type.tips}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <InlineAd />

            {/* How to Verify */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">How to Verify Your Insurance Benefits</h2>
              <p className="text-muted-foreground mb-8">
                Verifying your insurance coverage before treatment helps you understand costs and avoid surprises.
                Follow these steps to check your benefits.
              </p>

              <div className="space-y-4 mb-8">
                {verificationSteps.map((step) => (
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

              {/* Questions to Ask */}
              <Card className="p-6 bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
                <h3 className="font-serif font-semibold text-lg mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  Key Questions to Ask Your Insurer
                </h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {keyQuestions.map((question) => (
                    <p key={question} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent">&#8226;</span>
                      {question}
                    </p>
                  ))}
                </div>
              </Card>
            </section>

            {/* Payment Options for Uninsured */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">Payment Options Without Insurance</h2>
              <p className="text-muted-foreground mb-8">
                If you do not have insurance or your coverage is limited, there are still ways to afford addiction treatment.
                Many options exist to make treatment accessible regardless of your financial situation.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paymentOptions.map((option) => (
                  <Card key={option.title} className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* SAMHSA Helpline */}
              <Card className="p-6 mt-8 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <Phone className="w-8 h-8 text-blue-600 shrink-0" />
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Need Help Finding Affordable Treatment?</h3>
                    <p className="text-muted-foreground mb-4">
                      SAMHSA&apos;s National Helpline provides free, confidential referrals to local treatment facilities,
                      support groups, and community-based organizations, including those offering sliding scale fees.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <p className="font-medium text-sm">SAMHSA Helpline</p>
                        <p className="text-blue-600 text-xl font-bold">1-800-662-4357</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Available</p>
                        <p className="text-blue-600 text-lg font-bold">24/7, 365 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <InlineAd />

            {/* Appeal Denials Section */}
            <section className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-6">If Your Insurance Claim Is Denied</h2>
              <p className="text-muted-foreground mb-8">
                Insurance denials for addiction treatment can be appealed. Knowing your rights and the appeals
                process can help you get the coverage you deserve.
              </p>

              <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-3">Steps to Appeal a Denial</h3>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-yellow-600">1.</span>
                        <span><strong>Request written explanation</strong> of why your claim was denied.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-yellow-600">2.</span>
                        <span><strong>File an internal appeal</strong> with your insurance company within 180 days.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-yellow-600">3.</span>
                        <span><strong>Provide supporting documentation</strong> from your doctor or treatment provider.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-yellow-600">4.</span>
                        <span><strong>Request external review</strong> if internal appeal is denied.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-yellow-600">5.</span>
                        <span><strong>Contact your state insurance commissioner</strong> if you believe the denial violates parity laws.</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </Card>
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
                  Find Treatment Centers That Accept Your Insurance
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Search our database of {SITE_STATS.totalFacilitiesDisplay}+ treatment centers. Filter by insurance
                  accepted to find facilities that work with your coverage.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Shield className="w-5 h-5" />
                    Search by Insurance
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/guide/what-to-expect"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    What to Expect in Treatment
                  </Link>
                </div>
              </Card>
            </section>

            {/* Author Attribution */}
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>About this guide:</strong> This insurance coverage guide is maintained by the
                RehabNearMe editorial team. We strive to provide accurate, helpful information about
                paying for addiction treatment. Information about insurance laws and coverage is general
                and may vary by state and plan. Always verify coverage directly with your insurer.
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
