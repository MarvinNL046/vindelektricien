import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, Shield, Heart } from 'lucide-react';

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
    name: 'Verify Insurance Coverage',
    description: 'Check if your insurance covers addiction treatment at no cost to you',
    icon: <Shield className="w-6 h-6" />,
    ctaText: 'Check coverage',
    href: '/insurance-verification',
    tag: 'Free'
  },
  {
    name: '24/7 Helpline',
    description: 'Speak with a treatment specialist who can help you find the right program',
    icon: <Phone className="w-6 h-6" />,
    ctaText: 'Call now',
    href: 'tel:1-800-662-4357',
    tag: 'Confidential'
  },
  {
    name: 'Family Support Resources',
    description: 'Resources and guidance for families of those struggling with addiction',
    icon: <Heart className="w-6 h-6" />,
    ctaText: 'Learn more',
    href: '/guide/family-support',
  }
];

export default function AffiliateSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Get Help Today</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Taking the first step toward recovery can be overwhelming.
            These resources can help you or your loved one start the journey to healing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {partner.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{partner.name}</h3>
                  {partner.tag && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
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
                className="w-full group"
                asChild
              >
                <Link href={partner.href} target={partner.href.startsWith('tel:') ? undefined : '_blank'} rel="noopener noreferrer">
                  {partner.ctaText}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            All calls are confidential. If you are in crisis, please call 988 for the Suicide & Crisis Lifeline.
          </p>
        </div>
      </div>
    </section>
  );
}
