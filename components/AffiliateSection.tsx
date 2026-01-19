import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, Shield, Zap } from 'lucide-react';

interface AffiliatePartner {
  name: string;
  description: string;
  icon: React.ReactNode;
  ctaText: string;
  href: string;
  tag?: string;
}

const partners: AffiliatePartner[] = [
  {
    name: 'Offerte Aanvragen',
    description: 'Vraag vrijblijvend offertes aan bij meerdere elektriciens in uw regio',
    icon: <Shield className="w-6 h-6" />,
    ctaText: 'Offerte aanvragen',
    href: '/zoeken',
    tag: 'Gratis'
  },
  {
    name: 'Storingsdienst 24/7',
    description: 'Heeft u een elektrische storing? Vind direct een elektricien voor spoedhulp',
    icon: <Zap className="w-6 h-6" />,
    ctaText: 'Vind storingsdienst',
    href: '/dienst/storingen',
    tag: 'Spoed'
  },
  {
    name: 'Hulp nodig?',
    description: 'Neem contact op met ons team voor advies over het vinden van de juiste elektricien',
    icon: <Phone className="w-6 h-6" />,
    ctaText: 'Contact',
    href: '/contact',
  }
];

export default function AffiliateSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Hulp Nodig?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Of u nu een storing heeft, een nieuwe installatie wilt of gewoon advies nodig heeft -
            wij helpen u de juiste elektricien te vinden.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg text-yellow-700">
                  {partner.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{partner.name}</h3>
                  {partner.tag && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {partner.tag}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {partner.description}
              </p>

              <Button
                variant="outline"
                className="w-full group border-yellow-200 hover:bg-yellow-50"
                asChild
              >
                <Link href={partner.href}>
                  {partner.ctaText}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            VindElektricien.nl - De betrouwbare gids voor het vinden van elektriciens in Nederland.
          </p>
        </div>
      </div>
    </section>
  );
}
