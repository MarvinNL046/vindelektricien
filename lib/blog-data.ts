export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'signs-of-addiction-when-to-seek-help',
    title: 'Recognizing the Signs of Addiction: When to Seek Help',
    excerpt: 'Learn to identify the warning signs of substance abuse in yourself or a loved one. Understanding these signals is the first step toward recovery.',
    author: 'Rehab Near Me Team',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'Education',
    image: '/images/blog/signs-of-addiction.jpg',
  },
  {
    id: 2,
    slug: 'how-to-choose-the-right-rehab-center',
    title: 'How to Choose the Right Rehab Center: A Complete Guide',
    excerpt: 'Selecting the right rehabilitation facility is crucial for successful recovery. Here\'s what to look for when evaluating treatment options.',
    author: 'Rehab Near Me Team',
    date: '2025-01-10',
    readTime: '10 min',
    category: 'Guide',
    image: '/images/blog/choosing-rehab.jpg',
  },
  {
    id: 3,
    slug: 'what-to-expect-in-drug-rehab',
    title: 'What to Expect in Drug Rehab: A Day-by-Day Overview',
    excerpt: 'Nervous about entering treatment? Learn what a typical day looks like in an inpatient rehabilitation program to ease your concerns.',
    author: 'Rehab Near Me Team',
    date: '2025-01-05',
    readTime: '7 min',
    category: 'Treatment',
    image: '/images/blog/treatment-overview.jpg',
  },
  {
    id: 4,
    slug: 'supporting-a-loved-one-through-addiction',
    title: 'Supporting a Loved One Through Addiction: A Family Guide',
    excerpt: 'Watching someone you love struggle with addiction is heartbreaking. Here\'s how you can help while taking care of yourself.',
    author: 'Rehab Near Me Team',
    date: '2024-12-28',
    readTime: '9 min',
    category: 'Family',
    image: '/images/blog/family-support.jpg',
  },
  {
    id: 5,
    slug: 'inpatient-vs-outpatient-rehab',
    title: 'Inpatient vs Outpatient Rehab: Which Is Right for You?',
    excerpt: 'Understanding the differences between inpatient and outpatient treatment can help you make the best decision for your recovery journey.',
    author: 'Rehab Near Me Team',
    date: '2024-12-20',
    readTime: '6 min',
    category: 'Guide',
    image: '/images/blog/inpatient-outpatient.jpg',
  },
  {
    id: 6,
    slug: 'insurance-coverage-for-addiction-treatment',
    title: 'Understanding Insurance Coverage for Addiction Treatment',
    excerpt: 'Navigating insurance for rehab can be confusing. Learn about your rights and how to maximize your benefits for treatment.',
    author: 'Rehab Near Me Team',
    date: '2024-12-15',
    readTime: '8 min',
    category: 'Financial',
    image: '/images/blog/insurance-coverage.jpg',
  },
  {
    id: 7,
    slug: 'opioid-addiction-treatment-options',
    title: 'Opioid Addiction Treatment: Understanding Your Options',
    excerpt: 'From medication-assisted treatment to behavioral therapy, explore the evidence-based approaches to overcoming opioid addiction.',
    author: 'Rehab Near Me Team',
    date: '2025-01-20',
    readTime: '10 min',
    category: 'Treatment',
    image: '/images/blog/opioid-treatment.jpg',
  },
  {
    id: 8,
    slug: 'alcohol-detox-what-to-expect',
    title: 'Alcohol Detox: What to Expect and How to Prepare',
    excerpt: 'Alcohol withdrawal can be dangerous. Learn about the detox process, timeline, and why medical supervision is important.',
    author: 'Rehab Near Me Team',
    date: '2025-01-18',
    readTime: '7 min',
    category: 'Treatment',
    image: '/images/blog/alcohol-detox.jpg',
  },
  {
    id: 9,
    slug: 'dual-diagnosis-treatment-explained',
    title: 'Dual Diagnosis: Treating Addiction and Mental Health Together',
    excerpt: 'Many people struggling with addiction also have mental health conditions. Discover why integrated treatment is so effective.',
    author: 'Rehab Near Me Team',
    date: '2025-01-16',
    readTime: '8 min',
    category: 'Treatment',
    image: '/images/blog/dual-diagnosis.jpg',
  },
  {
    id: 10,
    slug: 'relapse-prevention-strategies',
    title: 'Relapse Prevention: Strategies for Long-Term Recovery',
    excerpt: 'Recovery doesn\'t end after rehab. Learn proven strategies to maintain sobriety and handle triggers in everyday life.',
    author: 'Rehab Near Me Team',
    date: '2025-01-14',
    readTime: '9 min',
    category: 'Recovery',
    image: '/images/blog/relapse-prevention.jpg',
  },
  {
    id: 11,
    slug: 'benefits-of-holistic-addiction-treatment',
    title: 'The Benefits of Holistic Addiction Treatment',
    excerpt: 'From yoga to art therapy, holistic approaches can complement traditional treatment and support whole-person healing.',
    author: 'Rehab Near Me Team',
    date: '2025-01-12',
    readTime: '7 min',
    category: 'Treatment',
    image: '/images/blog/holistic-treatment.jpg',
  },
  {
    id: 12,
    slug: 'teen-substance-abuse-parents-guide',
    title: 'Teen Substance Abuse: A Guide for Parents',
    excerpt: 'Discovering your teenager is using drugs or alcohol is frightening. Here\'s how to approach the situation and find help.',
    author: 'Rehab Near Me Team',
    date: '2025-01-08',
    readTime: '10 min',
    category: 'Family',
    image: '/images/blog/teen-addiction.jpg',
  },
  {
    id: 13,
    slug: 'aftercare-programs-importance',
    title: 'Why Aftercare Programs Are Essential for Lasting Recovery',
    excerpt: 'Completing rehab is just the beginning. Learn how aftercare programs provide the ongoing support needed to stay sober.',
    author: 'Rehab Near Me Team',
    date: '2025-01-06',
    readTime: '6 min',
    category: 'Recovery',
    image: '/images/blog/aftercare.jpg',
  },
  {
    id: 14,
    slug: 'medication-assisted-treatment-mat',
    title: 'Medication-Assisted Treatment (MAT): Facts and Myths',
    excerpt: 'MAT is highly effective for treating opioid and alcohol addiction, yet it\'s often misunderstood. Here\'s what you should know.',
    author: 'Rehab Near Me Team',
    date: '2025-01-04',
    readTime: '8 min',
    category: 'Treatment',
    image: '/images/blog/mat-treatment.jpg',
  },
  {
    id: 15,
    slug: 'sober-living-homes-guide',
    title: 'Sober Living Homes: A Bridge to Independent Recovery',
    excerpt: 'Sober living homes provide structure and support after rehab. Learn how they work and if they\'re right for you.',
    author: 'Rehab Near Me Team',
    date: '2025-01-02',
    readTime: '7 min',
    category: 'Guide',
    image: '/images/blog/sober-living.jpg',
  },
  {
    id: 16,
    slug: 'cost-of-rehab-paying-for-treatment',
    title: 'The Cost of Rehab: Options for Paying for Treatment',
    excerpt: 'Don\'t let cost be a barrier to recovery. Explore financing options, scholarships, and low-cost treatment alternatives.',
    author: 'Rehab Near Me Team',
    date: '2024-12-30',
    readTime: '9 min',
    category: 'Financial',
    image: '/images/blog/rehab-cost.jpg',
  },
  {
    id: 17,
    slug: 'interventions-how-they-work',
    title: 'Staging an Intervention: How to Help Someone Get Treatment',
    excerpt: 'An intervention can be a turning point for someone in denial about their addiction. Learn how to do it effectively and safely.',
    author: 'Rehab Near Me Team',
    date: '2024-12-25',
    readTime: '8 min',
    category: 'Family',
    image: '/images/blog/intervention.jpg',
  },
  {
    id: 18,
    slug: 'recovery-success-stories',
    title: 'Real Stories of Recovery: Finding Hope in Others\' Journeys',
    excerpt: 'Recovery is possible. Read inspiring stories from people who overcame addiction and rebuilt their lives.',
    author: 'Rehab Near Me Team',
    date: '2024-12-22',
    readTime: '10 min',
    category: 'Recovery',
    image: '/images/blog/success-stories.jpg',
  },
  {
    id: 19,
    slug: 'veterans-addiction-treatment',
    title: 'Addiction Treatment for Veterans: Special Programs and Resources',
    excerpt: 'Veterans face unique challenges with substance abuse. Discover specialized treatment programs and VA resources.',
    author: 'Rehab Near Me Team',
    date: '2024-12-18',
    readTime: '8 min',
    category: 'Treatment',
    image: '/images/blog/veterans-treatment.jpg',
  },
];

export const categories = [
  { name: 'All Articles', count: blogPosts.length },
  { name: 'Treatment', count: blogPosts.filter(p => p.category === 'Treatment').length },
  { name: 'Guide', count: blogPosts.filter(p => p.category === 'Guide').length },
  { name: 'Recovery', count: blogPosts.filter(p => p.category === 'Recovery').length },
  { name: 'Family', count: blogPosts.filter(p => p.category === 'Family').length },
  { name: 'Financial', count: blogPosts.filter(p => p.category === 'Financial').length },
  { name: 'Education', count: blogPosts.filter(p => p.category === 'Education').length },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}

export function getLatestPosts(limit: number = 6): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Helper functions for internal linking
export function getFacilityLink(name: string): string {
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/facility/${slug}`;
}

export function getStateLink(state: string): string {
  const slug = state.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/state/${slug}`;
}

export function getCityLink(city: string): string {
  const slug = city
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/city/${slug}`;
}

export function getTreatmentTypeLink(type: string): string {
  const slug = type.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `/treatment/${slug}`;
}
