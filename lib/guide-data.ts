// Guide data types and loading functions for SEO pillar pages

// ===== INTERFACES =====

export interface FAQ {
  question: string;
  answer: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface PillarGuide {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  introduction: string;
  sections: GuideSection[];
  faqs: FAQ[];
  relatedGuides: string[];
  lastUpdated?: string;
  author?: string;
}

export interface GuideCard {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ===== GUIDE CARDS DATA =====

export const pillarGuideCards: GuideCard[] = [
  {
    slug: 'treatment-types',
    title: 'Types of Treatment',
    description: 'Explore the different types of addiction treatment in America, from inpatient rehab to outpatient programs.',
    icon: 'building',
    color: 'forest',
  },
  {
    slug: 'choosing-rehab',
    title: 'Choosing a Rehab Center',
    description: 'A comprehensive guide to selecting the right rehabilitation facility for your needs.',
    icon: 'star',
    color: 'gold',
  },
  {
    slug: 'insurance-coverage',
    title: 'Insurance & Payment Guide',
    description: 'Understanding insurance coverage for addiction treatment and financing options.',
    icon: 'clipboard',
    color: 'slate',
  },
  {
    slug: 'veterans',
    title: 'Veterans Treatment Programs',
    description: 'Learn about specialized treatment options and VA benefits for veterans.',
    icon: 'flag',
    color: 'navy',
  },
  {
    slug: 'detox-guide',
    title: 'Medical Detox Guide',
    description: 'What to expect during detoxification and why medical supervision is important.',
    icon: 'leaf',
    color: 'green',
  },
];

// ===== PILLAR GUIDE CONTENT =====

// Content will be loaded from JSON files or defined here
// This provides the structure for future content expansion

export const pillarGuides: Record<string, PillarGuide> = {
  'treatment-types': {
    slug: 'treatment-types',
    title: 'Types of Addiction Treatment in America',
    seoTitle: 'Types of Addiction Treatment in America: Complete Guide | Rehab Near Me',
    seoDescription: 'Explore the different types of addiction treatment including inpatient rehab, outpatient programs, detox centers, and sober living. Find the right type for your needs.',
    introduction: 'Understanding the different types of addiction treatment can help individuals and families make informed decisions during this important time. From intensive inpatient rehabilitation to flexible outpatient programs, each type offers unique benefits, approaches, and levels of care.',
    sections: [],
    faqs: [
      {
        question: 'What is the difference between inpatient and outpatient treatment?',
        answer: 'Inpatient treatment involves living at the facility for the duration of your program, typically 30-90 days, with 24/7 support. Outpatient treatment allows you to live at home while attending therapy sessions several times per week.',
      },
      {
        question: 'How long does rehab typically last?',
        answer: 'Treatment length varies based on individual needs. Detox typically takes 5-10 days, while inpatient programs range from 28 days to 90 days or longer. Outpatient programs can last several months.',
      },
      {
        question: 'What is a partial hospitalization program (PHP)?',
        answer: 'PHP is a step-down from inpatient care that provides intensive treatment during the day (5-7 days per week) while allowing patients to return home in the evenings.',
      },
    ],
    relatedGuides: ['veterans', 'detox-guide', 'insurance-coverage'],
    lastUpdated: '2025-01-18',
    author: 'Rehab Near Me Editorial Team',
  },
  'choosing-rehab': {
    slug: 'choosing-rehab',
    title: 'How to Choose a Rehab Center',
    seoTitle: 'How to Choose a Rehab Center: Complete Guide | Rehab Near Me',
    seoDescription: 'Learn how to choose the right rehabilitation center. Understand accreditation, treatment approaches, costs, and key questions to ask treatment facilities.',
    introduction: 'Choosing the right rehabilitation center is a critical step in the recovery journey. With thousands of treatment facilities across the United States, this guide will help you understand what to look for and how to evaluate your options.',
    sections: [],
    faqs: [
      {
        question: 'What credentials should a rehab center have?',
        answer: 'Look for facilities accredited by JCAHO (Joint Commission), CARF, or state licensing boards. Staff should include licensed counselors, therapists, and medical professionals with addiction treatment experience.',
      },
      {
        question: 'Should I choose a rehab close to home or far away?',
        answer: 'Both options have benefits. Local treatment allows family involvement, while distant treatment removes you from triggers and provides a fresh start. Consider your support system and personal circumstances.',
      },
      {
        question: 'What questions should I ask a treatment center?',
        answer: 'Ask about their treatment approach, staff qualifications, daily schedule, family involvement policies, aftercare planning, and success rates. Request a facility tour if possible.',
      },
    ],
    relatedGuides: ['treatment-types', 'insurance-coverage'],
    lastUpdated: '2025-01-18',
    author: 'Rehab Near Me Editorial Team',
  },
  'insurance-coverage': {
    slug: 'insurance-coverage',
    title: 'Insurance Coverage for Addiction Treatment',
    seoTitle: 'Insurance Coverage for Addiction Treatment: Complete Guide | Rehab Near Me',
    seoDescription: 'Understand your insurance coverage for addiction treatment. Learn about the Mental Health Parity Act, how to verify benefits, and alternative payment options.',
    introduction: 'Understanding insurance coverage for addiction treatment can be confusing, but federal laws require most insurance plans to cover substance abuse treatment. This guide explains your rights and how to maximize your benefits.',
    sections: [],
    faqs: [
      {
        question: 'Does insurance cover addiction treatment?',
        answer: 'Yes, under the Mental Health Parity and Addiction Equity Act, most insurance plans must cover addiction treatment at the same level as physical health care. The Affordable Care Act also requires coverage as an essential health benefit.',
      },
      {
        question: 'What if I don\'t have insurance?',
        answer: 'Options include state-funded treatment programs, sliding scale payment plans, treatment center scholarships, Medicaid, and nonprofit organizations that help cover costs.',
      },
      {
        question: 'How do I verify my insurance benefits?',
        answer: 'Call the member services number on your insurance card and ask specifically about substance abuse treatment coverage. Ask about in-network vs out-of-network benefits, deductibles, copays, and prior authorization requirements.',
      },
    ],
    relatedGuides: ['treatment-types', 'choosing-rehab'],
    lastUpdated: '2025-01-18',
    author: 'Rehab Near Me Editorial Team',
  },
  'veterans': {
    slug: 'veterans',
    title: 'Veterans Addiction Treatment Guide',
    seoTitle: 'Veterans Addiction Treatment: VA Benefits & Programs | Rehab Near Me',
    seoDescription: 'Complete guide to addiction treatment for veterans. Learn about VA benefits, specialized programs, PTSD treatment, and how to access care.',
    introduction: 'Veterans face unique challenges when it comes to substance abuse, often related to combat trauma, PTSD, and difficulty transitioning to civilian life. Specialized treatment programs and VA benefits are available to help veterans recover.',
    sections: [],
    faqs: [
      {
        question: 'Does the VA cover addiction treatment?',
        answer: 'Yes, the VA provides comprehensive addiction treatment services including detox, inpatient and outpatient programs, medication-assisted treatment, and mental health counseling at no cost to eligible veterans.',
      },
      {
        question: 'What specialized programs are available for veterans?',
        answer: 'Many facilities offer veteran-specific programs that address combat trauma, PTSD, military sexual trauma, and the unique challenges of transitioning to civilian life. Peer support from fellow veterans is often integrated.',
      },
      {
        question: 'Can veterans use private rehab facilities?',
        answer: 'Yes, veterans can use the VA Community Care program to access treatment at approved private facilities if VA services are not available or accessible. Veterans may also use private insurance or pay out-of-pocket.',
      },
    ],
    relatedGuides: ['treatment-types', 'choosing-rehab', 'insurance-coverage'],
    lastUpdated: '2025-01-18',
    author: 'Rehab Near Me Editorial Team',
  },
  'detox-guide': {
    slug: 'detox-guide',
    title: 'Medical Detox Guide',
    seoTitle: 'Medical Detox Guide: What to Expect | Rehab Near Me',
    seoDescription: 'Everything you need to know about medical detoxification. Understand the process, timeline, and why professional supervision is important for safe withdrawal.',
    introduction: 'Medical detoxification is often the first step in addiction treatment. This guide explains what detox involves, why medical supervision is important, and what to expect during the withdrawal process.',
    sections: [],
    faqs: [
      {
        question: 'What is medical detox?',
        answer: 'Medical detox is the supervised process of allowing the body to eliminate substances while managing withdrawal symptoms. It typically takes 5-10 days and includes 24/7 monitoring and medication to ensure safety and comfort.',
      },
      {
        question: 'Is detox dangerous?',
        answer: 'Withdrawal from certain substances, particularly alcohol and benzodiazepines, can be life-threatening without medical supervision. Opioid withdrawal is rarely dangerous but extremely uncomfortable. Medical detox ensures safety.',
      },
      {
        question: 'Is detox enough to recover from addiction?',
        answer: 'No, detox alone is not treatment for addiction. It addresses physical dependence but not the psychological, behavioral, and social aspects of addiction. Detox should be followed by comprehensive treatment.',
      },
    ],
    relatedGuides: ['treatment-types', 'choosing-rehab'],
    lastUpdated: '2025-01-18',
    author: 'Rehab Near Me Editorial Team',
  },
};

// ===== DATA LOADING FUNCTIONS =====

/**
 * Get all pillar guide cards for the index page
 */
export function getAllGuideCards(): GuideCard[] {
  return pillarGuideCards;
}

/**
 * Get a specific pillar guide by slug
 */
export function getGuideBySlug(slug: string): PillarGuide | null {
  return pillarGuides[slug] || null;
}

/**
 * Get all pillar guide slugs for static generation
 */
export function getAllGuideSlugs(): string[] {
  return Object.keys(pillarGuides);
}

/**
 * Get related guides for a specific guide
 */
export function getRelatedGuides(slug: string): GuideCard[] {
  const guide = pillarGuides[slug];
  if (!guide) return [];

  return guide.relatedGuides
    .map(relatedSlug => pillarGuideCards.find(card => card.slug === relatedSlug))
    .filter((card): card is GuideCard => card !== undefined);
}

/**
 * Get guide card by slug
 */
export function getGuideCardBySlug(slug: string): GuideCard | null {
  return pillarGuideCards.find(card => card.slug === slug) || null;
}

// ===== AUTHOR INFO =====

export const GUIDE_AUTHOR = {
  name: 'Rehab Near Me Editorial Team',
  description: 'Our editorial team consists of addiction specialists, counselors, and writers dedicated to providing accurate, helpful information about addiction treatment across America.',
  expertise: ['Addiction Treatment', 'Recovery Support', 'Insurance Navigation', 'Treatment Options'],
};
