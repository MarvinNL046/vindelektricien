import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Heart, Target, Shield, Clock, ArrowRight, Sparkles, TreePine, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import InlineAd from '@/components/ads/InlineAd';

export const metadata: Metadata = {
  title: 'About Us | Rehab Near Me',
  description: 'Learn about Rehab Near Me, the most comprehensive directory of addiction treatment centers and rehabilitation facilities in the United States.',
  openGraph: {
    title: 'About Rehab Near Me',
    description: 'Your trusted guide for finding addiction treatment centers across the United States',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">About Us</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            About Rehab Near Me
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            The most comprehensive and reliable directory of addiction treatment centers in the United States,
            carefully curated to help you find the right path to recovery.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 shadow-soft mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Rehab Near Me was created to provide a complete, reliable, and accessible
              database of addiction treatment centers across the United States. We believe everyone
              deserves access to information that can help them find the right treatment facility.
            </p>
          </Card>

          <InlineAd />

          {/* Mission Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Our Mission</h2>
            </div>
            <Card className="p-6 shadow-soft bg-gradient-to-br from-teal-50 to-coral-50/50 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800">
              <p className="text-muted-foreground leading-relaxed">
                We strive to be the most complete and user-friendly resource for addiction treatment
                information in the United States. Whether you&apos;re seeking help for yourself,
                supporting a loved one, or researching treatment options - we&apos;re here to help
                guide you toward recovery.
              </p>
            </Card>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">What We Offer</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Comprehensive Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Thousands of treatment centers with up-to-date information including
                      services, insurance accepted, and contact details.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Carefully Curated</h3>
                    <p className="text-sm text-muted-foreground">
                      Each facility is carefully documented with respect for the
                      sensitive nature of addiction treatment.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Always Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      We continuously work to keep information such as services,
                      insurance, and contact details current.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      We respect your privacy and strictly follow data protection
                      guidelines when processing information.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Respect</h3>
                <p className="text-sm text-muted-foreground">
                  We treat this subject with the respect and dignity it deserves.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Information should be easy to find and understand for everyone.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Reliability</h3>
                <p className="text-sm text-muted-foreground">
                  We strive for 100% accurate and up-to-date information.
                </p>
              </Card>
            </div>
          </section>

          <InlineAd />

          {/* Quote Section */}
          <Card className="p-8 shadow-soft bg-gradient-to-r from-teal-50 to-coral-50/30 dark:from-teal-900/20 dark:to-coral-900/10 border-teal-100 dark:border-teal-800 mb-16">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-accent shrink-0" />
              <div>
                <p className="text-lg font-medium text-foreground mb-4 italic">
                  &quot;Making addiction treatment information accessible to everyone across America&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  - Rehab Near Me Team
                </p>
              </div>
            </div>
          </Card>

          {/* Future Vision Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Future Vision</h2>
            </div>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-6">
                We continue to work on improving our services. In the future, we plan to:
              </p>
              <ul className="space-y-3">
                {[
                  'Add interactive maps for better navigation',
                  'Expand insurance verification tools',
                  'Provide a platform for sharing recovery stories',
                  'Partner with healthcare professionals',
                  'Add virtual facility tours',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <TreePine className="w-3 h-3 text-teal-700" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Collaboration Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Collaboration</h2>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-4">
                Do you manage a treatment facility or have additional information to share?
                We&apos;re always open to collaboration to improve and expand our database.
              </p>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out via{' '}
                <Link href="/contact" className="text-accent hover:underline font-medium">
                  our contact form
                </Link>{' '}
                or send an email to{' '}
                <a href="mailto:info@rehabnearbyme.com" className="text-accent hover:underline font-medium">
                  info@rehabnearbyme.com
                </a>.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Start Your Search
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Find addiction treatment centers across the United States and take the first step toward recovery.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Search Treatment Centers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
