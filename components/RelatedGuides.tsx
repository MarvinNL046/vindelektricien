import Link from 'next/link';
import { BookOpen, Heart, Shield, Brain, Users, Stethoscope } from 'lucide-react';

interface GuideLink {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
}

// All available guides/pillar pages with their metadata
const allGuides: GuideLink[] = [
  {
    href: '/guide/types',
    label: 'Types of Treatment Centers',
    description: 'Learn about different treatment options, from inpatient to outpatient programs.',
    icon: BookOpen,
    keywords: ['type', 'types', 'category', 'kind', 'inpatient', 'outpatient']
  },
  {
    href: '/guide/addiction-treatment',
    label: 'Addiction Treatment Guide',
    description: 'Comprehensive guide to understanding addiction and treatment approaches.',
    icon: Heart,
    keywords: ['addiction', 'treatment', 'recovery', 'substance', 'abuse']
  },
  {
    href: '/guide/insurance',
    label: 'Insurance & Payment Options',
    description: 'Understanding insurance coverage and payment options for treatment.',
    icon: Shield,
    keywords: ['insurance', 'payment', 'cost', 'coverage', 'medicaid', 'medicare']
  },
  {
    href: '/guide/mental-health',
    label: 'Mental Health & Dual Diagnosis',
    description: 'Information about co-occurring mental health and addiction treatment.',
    icon: Brain,
    keywords: ['mental', 'health', 'dual', 'diagnosis', 'depression', 'anxiety']
  },
  {
    href: '/guide/family-support',
    label: 'Family Support Resources',
    description: 'How families can support their loved ones through recovery.',
    icon: Users,
    keywords: ['family', 'support', 'loved', 'ones', 'intervention']
  }
];

// Sub-pillar content for specific treatment types
const typeSubGuides: Record<string, GuideLink[]> = {
  'inpatient': [
    {
      href: '/guide/types#inpatient',
      label: 'Understanding Inpatient Treatment',
      description: 'What to expect from residential treatment programs.',
      icon: BookOpen,
      keywords: ['inpatient', 'residential']
    }
  ],
  'outpatient': [
    {
      href: '/guide/types#outpatient',
      label: 'Outpatient Treatment Options',
      description: 'Flexible treatment while maintaining daily responsibilities.',
      icon: Stethoscope,
      keywords: ['outpatient', 'iop', 'php']
    }
  ],
  'detox': [
    {
      href: '/guide/types#detox',
      label: 'Medical Detox Programs',
      description: 'Safe, medically supervised detoxification services.',
      icon: Shield,
      keywords: ['detox', 'withdrawal', 'medical']
    }
  ],
  'sober-living': [
    {
      href: '/guide/types#sober-living',
      label: 'Sober Living Homes',
      description: 'Transitional housing for continued recovery support.',
      icon: Users,
      keywords: ['sober', 'living', 'transitional', 'housing']
    }
  ],
  'dual-diagnosis': [
    {
      href: '/guide/mental-health',
      label: 'Dual Diagnosis Treatment',
      description: 'Treatment for co-occurring mental health and substance use disorders.',
      icon: Brain,
      keywords: ['dual', 'diagnosis', 'mental', 'health']
    }
  ]
};

interface RelatedGuidesProps {
  currentType?: string;
  currentState?: string;
  maxGuides?: number;
  className?: string;
  showDescription?: boolean;
  variant?: 'default' | 'compact' | 'card';
}

export default function RelatedGuides({
  currentType,
  currentState,
  maxGuides = 3,
  className = '',
  showDescription = true,
  variant = 'default'
}: RelatedGuidesProps) {
  // Calculate relevance score for each guide
  const scoredGuides = allGuides.map(guide => {
    let score = 0;

    // Boost score based on type match
    if (currentType) {
      const typeSlug = currentType.toLowerCase();
      if (guide.keywords.some(kw => typeSlug.includes(kw))) {
        score += 10;
      }

      // Check for specific type sub-guides
      if (typeSubGuides[typeSlug]) {
        score += 5;
      }
    }

    // Boost insurance guide for all pages (always relevant)
    if (guide.href === '/guide/insurance') {
      score = Math.max(score, 2);
    }

    // Always include the types guide at minimum score
    if (guide.href === '/guide/types') {
      score = Math.max(score, 1);
    }

    return { ...guide, score };
  });

  // Get type-specific sub-guides
  const specificGuides: GuideLink[] = currentType && typeSubGuides[currentType.toLowerCase()]
    ? typeSubGuides[currentType.toLowerCase()]
    : [];

  // Sort by score and take top guides
  const topGuides = scoredGuides
    .sort((a, b) => b.score - a.score)
    .slice(0, maxGuides - specificGuides.length);

  // Combine specific and general guides
  const guidesToShow = [...specificGuides, ...topGuides].slice(0, maxGuides);

  if (guidesToShow.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Helpful Resources
        </h3>
        <ul className="space-y-2">
          {guidesToShow.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="text-sm text-primary hover:underline flex items-center gap-2"
              >
                <guide.icon className="w-4 h-4 flex-shrink-0" />
                {guide.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-muted/50 rounded-lg p-6 ${className}`}>
        <h3 className="font-semibold text-lg mb-4">Related Guides</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guidesToShow.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-background rounded-lg p-4 border hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <guide.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {guide.label}
                </h4>
              </div>
              {showDescription && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {guide.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${className}`}>
      <h3 className="font-semibold text-lg mb-4">Related Guides</h3>
      <div className="space-y-4">
        {guidesToShow.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group flex items-start gap-4 p-4 rounded-lg border hover:border-primary hover:bg-muted/50 transition-all"
          >
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
              <guide.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium group-hover:text-primary transition-colors">
                {guide.label}
              </h4>
              {showDescription && (
                <p className="text-sm text-muted-foreground mt-1">
                  {guide.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
