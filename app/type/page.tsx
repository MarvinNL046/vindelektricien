import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Heart, Users, Clock, Shield, Brain, Pill, Activity, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Treatment Types - Find by Category | RehabNearMe.com',
  description: 'Browse treatment centers by type: inpatient rehab, outpatient programs, detox centers, sober living, and more across the United States.',
  openGraph: {
    title: 'Treatment Types - Find by Category',
    description: 'Find the right type of treatment center for your needs.',
  }
};

const categoryIcons: Record<string, any> = {
  'inpatient-rehab': Building2,
  'outpatient-program': Clock,
  'detox-center': Activity,
  'sober-living': Heart,
  'dual-diagnosis': Brain,
  'luxury-rehab': Shield,
  'veterans-program': Shield,
  'adolescent-program': Users,
};

const categories = [
  {
    title: 'Residential Treatment',
    types: ['inpatient-rehab', 'residential-treatment', 'luxury-rehab', 'long-term-rehab']
  },
  {
    title: 'Outpatient Programs',
    types: ['outpatient-program', 'intensive-outpatient', 'partial-hospitalization', 'day-treatment']
  },
  {
    title: 'Detox & Medical',
    types: ['detox-center', 'medical-detox', 'medication-assisted-treatment', 'hospital-based']
  },
  {
    title: 'Specialized Programs',
    types: ['dual-diagnosis', 'mental-health', 'trauma-informed', 'holistic-treatment']
  },
  {
    title: 'Demographics',
    types: ['veterans-program', 'adolescent-program', 'womens-program', 'mens-program', 'lgbtq-friendly']
  },
  {
    title: 'Addiction Types',
    types: ['alcohol-rehab', 'drug-rehab', 'opioid-treatment', 'cocaine-treatment', 'meth-treatment']
  },
  {
    title: 'Aftercare & Support',
    types: ['sober-living', 'halfway-house', 'aftercare-program', 'support-groups']
  }
];

// Treatment type definitions
const treatmentTypes: Record<string, { name: string; description: string }> = {
  'inpatient-rehab': {
    name: 'Inpatient Rehabilitation',
    description: 'Residential treatment programs where patients live at the facility while receiving intensive care.'
  },
  'residential-treatment': {
    name: 'Residential Treatment',
    description: 'Long-term live-in programs providing structured recovery environments.'
  },
  'luxury-rehab': {
    name: 'Luxury Rehab Centers',
    description: 'High-end treatment facilities offering premium amenities and personalized care.'
  },
  'long-term-rehab': {
    name: 'Long-Term Rehab',
    description: 'Extended treatment programs lasting 90 days or more for comprehensive recovery.'
  },
  'outpatient-program': {
    name: 'Outpatient Programs',
    description: 'Treatment programs allowing patients to live at home while attending scheduled sessions.'
  },
  'intensive-outpatient': {
    name: 'Intensive Outpatient (IOP)',
    description: 'Structured outpatient programs with multiple weekly sessions.'
  },
  'partial-hospitalization': {
    name: 'Partial Hospitalization (PHP)',
    description: 'Day programs providing hospital-level care without overnight stays.'
  },
  'day-treatment': {
    name: 'Day Treatment Programs',
    description: 'Full-day treatment programs that allow patients to return home each evening.'
  },
  'detox-center': {
    name: 'Detox Centers',
    description: 'Medical facilities specializing in safe withdrawal management.'
  },
  'medical-detox': {
    name: 'Medical Detox',
    description: 'Medically supervised detoxification with 24/7 medical support.'
  },
  'medication-assisted-treatment': {
    name: 'Medication-Assisted Treatment',
    description: 'Programs combining medications with counseling for opioid and alcohol addiction.'
  },
  'hospital-based': {
    name: 'Hospital-Based Treatment',
    description: 'Treatment programs within hospital settings for complex medical needs.'
  },
  'dual-diagnosis': {
    name: 'Dual Diagnosis Treatment',
    description: 'Programs treating both addiction and co-occurring mental health disorders.'
  },
  'mental-health': {
    name: 'Mental Health Programs',
    description: 'Integrated treatment addressing mental health alongside addiction.'
  },
  'trauma-informed': {
    name: 'Trauma-Informed Care',
    description: 'Treatment approaches that recognize and address trauma in recovery.'
  },
  'holistic-treatment': {
    name: 'Holistic Treatment',
    description: 'Programs incorporating alternative therapies like yoga, meditation, and nutrition.'
  },
  'veterans-program': {
    name: 'Veterans Programs',
    description: 'Specialized treatment programs designed for military veterans.'
  },
  'adolescent-program': {
    name: 'Adolescent Programs',
    description: 'Age-appropriate treatment programs for teens and young adults.'
  },
  'womens-program': {
    name: "Women's Programs",
    description: 'Gender-specific treatment addressing unique needs of women in recovery.'
  },
  'mens-program': {
    name: "Men's Programs",
    description: 'Gender-specific treatment programs designed for men.'
  },
  'lgbtq-friendly': {
    name: 'LGBTQ+ Friendly Programs',
    description: 'Inclusive treatment programs welcoming LGBTQ+ individuals.'
  },
  'alcohol-rehab': {
    name: 'Alcohol Rehabilitation',
    description: 'Treatment programs specializing in alcohol use disorder recovery.'
  },
  'drug-rehab': {
    name: 'Drug Rehabilitation',
    description: 'Comprehensive treatment for various substance use disorders.'
  },
  'opioid-treatment': {
    name: 'Opioid Treatment',
    description: 'Specialized programs for opioid and heroin addiction recovery.'
  },
  'cocaine-treatment': {
    name: 'Cocaine Treatment',
    description: 'Treatment programs focused on cocaine and stimulant addiction.'
  },
  'meth-treatment': {
    name: 'Methamphetamine Treatment',
    description: 'Specialized treatment for methamphetamine addiction recovery.'
  },
  'sober-living': {
    name: 'Sober Living Homes',
    description: 'Transitional housing providing structured, substance-free living environments.'
  },
  'halfway-house': {
    name: 'Halfway Houses',
    description: 'Transitional residences bridging treatment and independent living.'
  },
  'aftercare-program': {
    name: 'Aftercare Programs',
    description: 'Ongoing support services following primary treatment completion.'
  },
  'support-groups': {
    name: 'Support Groups',
    description: 'Peer-based recovery groups and 12-step programs.'
  },
};

export default function TreatmentTypesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Treatment Types
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Find the right treatment program for your needs. We categorize treatment centers by type,
            from inpatient rehab to outpatient programs and specialized care.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => (
          <section key={category.title} className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              {category.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.types.map((typeSlug) => {
                const type = treatmentTypes[typeSlug];
                if (!type) return null;
                const Icon = categoryIcons[typeSlug] || Building2;

                return (
                  <Link key={typeSlug} href={`/type/${typeSlug}`}>
                    <Card className="p-5 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-teal-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1 truncate">
                            {type.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {type.description.substring(0, 80)}...
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Full List */}
        <section className="mt-12 bg-secondary/50 rounded-xl p-6">
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            All Treatment Types
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(treatmentTypes).map(([slug, type]) => (
              <Link
                key={slug}
                href={`/type/${slug}`}
                className="px-3 py-1 bg-white rounded-full text-sm hover:bg-accent hover:text-white transition-colors"
              >
                {type.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
