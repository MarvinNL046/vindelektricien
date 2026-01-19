import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Zap, Target, Shield, Clock, ArrowRight, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import InlineAd from '@/components/ads/InlineAd';

export const metadata: Metadata = {
  title: 'Over Ons | VindElektricien.nl',
  description: 'Ontdek VindElektricien.nl, de meest complete gids voor het vinden van elektriciens in Nederland. Van storingen tot installaties.',
  openGraph: {
    title: 'Over VindElektricien.nl',
    description: 'Uw betrouwbare gids voor het vinden van elektriciens in heel Nederland',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-white">Over Ons</li>
            </ol>
          </nav>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            Over VindElektricien.nl
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            De meest complete en betrouwbare gids voor het vinden van elektriciens in Nederland,
            zorgvuldig samengesteld om u te helpen de juiste vakman te vinden.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 shadow-soft mb-12 border-yellow-100">
            <p className="text-lg text-muted-foreground leading-relaxed">
              VindElektricien.nl is opgericht om een complete, betrouwbare en toegankelijke
              gids te bieden voor het vinden van elektriciens in heel Nederland. Wij geloven dat iedereen
              toegang verdient tot informatie die helpt bij het vinden van de juiste vakman voor elke klus.
            </p>
          </Card>

          <InlineAd />

          {/* Mission Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Onze Missie</h2>
            </div>
            <Card className="p-6 shadow-soft bg-gradient-to-br from-yellow-50 to-navy-50/50 border-yellow-100">
              <p className="text-muted-foreground leading-relaxed">
                Wij streven ernaar de meest complete en gebruiksvriendelijke bron te zijn voor het vinden van
                elektriciens in Nederland. Of u nu hulp nodig heeft bij een storing, een nieuwe installatie,
                een laadpaal of zonnepanelen - wij helpen u de juiste professional te vinden.
              </p>
            </Card>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Wat Wij Bieden</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-200 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Uitgebreide Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Honderden elektriciens met actuele informatie over diensten,
                      certificeringen en contactgegevens.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-200 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Alle Diensten</h3>
                    <p className="text-sm text-muted-foreground">
                      Van storingen en reparaties tot laadpalen, zonnepanelen en
                      complete installaties voor particulier en zakelijk.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-200 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Altijd Actueel</h3>
                    <p className="text-sm text-muted-foreground">
                      We werken continu aan het bijhouden van gegevens zoals
                      diensten, certificeringen en beoordelingen.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-200 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Privacy Voorop</h3>
                    <p className="text-sm text-muted-foreground">
                      Wij respecteren uw privacy en volgen strikt de AVG-richtlijnen
                      bij het verwerken van gegevens.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Onze Waarden</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-yellow-700" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Kwaliteit</h3>
                <p className="text-sm text-muted-foreground">
                  Wij tonen alleen erkende en betrouwbare elektriciens met de juiste kwalificaties.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-yellow-700" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Toegankelijkheid</h3>
                <p className="text-sm text-muted-foreground">
                  Informatie moet eenvoudig te vinden en te begrijpen zijn voor iedereen.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-yellow-700" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Betrouwbaarheid</h3>
                <p className="text-sm text-muted-foreground">
                  Wij streven naar 100% accurate en actuele informatie.
                </p>
              </Card>
            </div>
          </section>

          <InlineAd />

          {/* Quote Section */}
          <Card className="p-8 shadow-soft bg-gradient-to-r from-yellow-50 to-navy-50/30 border-yellow-100 mb-16">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-yellow-600 shrink-0" />
              <div>
                <p className="text-lg font-medium text-foreground mb-4 italic">
                  &quot;De juiste elektricien vinden moet makkelijk zijn voor iedereen in Nederland&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  - Het VindElektricien.nl Team
                </p>
              </div>
            </div>
          </Card>

          {/* Future Vision Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Toekomstvisie</h2>
            </div>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-6">
                We blijven werken aan het verbeteren van onze diensten. In de toekomst willen we:
              </p>
              <ul className="space-y-3">
                {[
                  'Interactieve kaarten voor betere navigatie',
                  'Direct offertes aanvragen bij meerdere elektriciens',
                  'Meer reviews en beoordelingen van klanten',
                  'Uitgebreide informatie over certificeringen',
                  'Geavanceerde filters voor specifieke diensten',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-yellow-700" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Collaboration Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Samenwerking</h2>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-4">
                Bent u een elektricien of heeft u aanvullende informatie te delen?
                We staan altijd open voor samenwerking om onze database te verbeteren en uit te breiden.
              </p>
              <p className="text-muted-foreground mb-6">
                Neem gerust contact op via{' '}
                <Link href="/contact" className="text-yellow-600 hover:underline font-medium">
                  ons contactformulier
                </Link>{' '}
                of stuur een e-mail naar{' '}
                <a href="mailto:info@vindelektricien.nl" className="text-yellow-600 hover:underline font-medium">
                  info@vindelektricien.nl
                </a>.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-navy-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Contact Opnemen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Begin met Zoeken
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Vind elektriciens in heel Nederland voor elke klus, van kleine reparaties tot grote installaties.
            </p>
            <Link
              href="/zoeken"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
            >
              Zoek Elektricien
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
