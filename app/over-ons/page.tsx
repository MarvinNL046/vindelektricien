import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Zap, Target, Shield, Clock, ArrowRight, Sparkles, CheckCircle, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import InlineAd from '@/components/ads/InlineAd';

export const metadata: Metadata = {
  title: 'Over Ons | VindElektricien.nl',
  description: 'Leer meer over VindElektricien.nl, het meest complete platform voor het vinden van elektriciens in Nederland.',
  openGraph: {
    title: 'Over VindElektricien.nl',
    description: 'Uw betrouwbare gids voor het vinden van elektriciens in heel Nederland',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-navy-900 text-white py-16">
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
            Het meest complete en betrouwbare platform voor het vinden van elektriciens in Nederland,
            zorgvuldig samengesteld om u te helpen de juiste vakman te vinden.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 shadow-soft mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              VindElektricien.nl is opgericht om een complete, betrouwbare en toegankelijke
              database van elektriciens in heel Nederland te bieden. Wij geloven dat iedereen
              toegang verdient tot informatie die hen helpt de juiste elektricien te vinden.
            </p>
          </Card>

          <InlineAd />

          {/* Mission Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500 text-navy-900 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Onze Missie</h2>
            </div>
            <Card className="p-6 shadow-soft bg-gradient-to-br from-yellow-50 to-navy-50/50 dark:from-yellow-900/20 dark:to-navy-900/10 border-yellow-100 dark:border-yellow-800">
              <p className="text-muted-foreground leading-relaxed">
                Wij streven ernaar het meest complete en gebruiksvriendelijke platform te zijn voor
                informatie over elektriciens in Nederland. Of u nu een storing heeft, een nieuwe
                installatie nodig heeft, of een laadpaal wilt laten plaatsen - wij helpen u de
                juiste vakman te vinden.
              </p>
            </Card>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold mb-6">Wat Wij Bieden</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-400/30 transition-all duration-300">
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

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Alle Diensten</h3>
                    <p className="text-sm text-muted-foreground">
                      Van storingen en installaties tot laadpalen en zonnepanelen -
                      vind de specialist voor elke klus.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Altijd Actueel</h3>
                    <p className="text-sm text-muted-foreground">
                      Wij werken continu aan het actueel houden van informatie zoals
                      diensten, certificeringen en contactgegevens.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-soft border-2 border-transparent hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2">Privacy Eerst</h3>
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
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Kwaliteit</h3>
                <p className="text-sm text-muted-foreground">
                  Wij tonen alleen geverifieerde en betrouwbare elektriciens.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Toegankelijkheid</h3>
                <p className="text-sm text-muted-foreground">
                  Informatie moet makkelijk te vinden en begrijpen zijn voor iedereen.
                </p>
              </Card>

              <Card className="p-6 shadow-soft text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-yellow-600" />
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
          <Card className="p-8 shadow-soft bg-gradient-to-r from-yellow-50 to-navy-50/30 dark:from-yellow-900/20 dark:to-navy-900/10 border-yellow-100 dark:border-yellow-800 mb-16">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-yellow-600 shrink-0" />
              <div>
                <p className="text-lg font-medium text-foreground mb-4 italic">
                  &quot;Het vinden van de juiste elektricien toegankelijk maken voor iedereen in Nederland&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  - VindElektricien.nl Team
                </p>
              </div>
            </div>
          </Card>

          {/* Future Vision Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500 text-navy-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-2xl font-bold">Toekomstvisie</h2>
            </div>
            <Card className="p-6 shadow-soft">
              <p className="text-muted-foreground mb-6">
                We blijven werken aan het verbeteren van onze diensten. In de toekomst plannen we:
              </p>
              <ul className="space-y-3">
                {[
                  'Interactieve kaarten voor betere navigatie',
                  'Direct offertes aanvragen bij meerdere elektriciens',
                  'Platform voor het delen van ervaringen',
                  'Samenwerking met erkende installateurs',
                  'Realtime beschikbaarheid van elektriciens',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 text-yellow-700" />
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
                Bent u een elektricien of installatietbedrijf en wilt u uw gegevens toevoegen of bijwerken?
                Wij staan altijd open voor samenwerking om onze database te verbeteren en uit te breiden.
              </p>
              <p className="text-muted-foreground mb-6">
                Neem contact op via{' '}
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
                Neem Contact Op
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </section>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold mb-4">
              Start met Zoeken
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Vind elektriciens in heel Nederland en neem vandaag nog contact op voor uw elektrische klus.
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
