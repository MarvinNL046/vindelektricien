'use client';

import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, ChevronDown, Zap } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Dutch provinces for footer
const provinces = [
  { name: 'Noord-Holland', slug: 'noord-holland' },
  { name: 'Zuid-Holland', slug: 'zuid-holland' },
  { name: 'Noord-Brabant', slug: 'noord-brabant' },
  { name: 'Gelderland', slug: 'gelderland' },
  { name: 'Utrecht', slug: 'utrecht' },
  { name: 'Limburg', slug: 'limburg' },
  { name: 'Overijssel', slug: 'overijssel' },
  { name: 'Friesland', slug: 'friesland' },
];

const services = [
  { name: 'Storingen & Reparaties', slug: 'storingen' },
  { name: 'Installatie', slug: 'installatie' },
  { name: 'Meterkast', slug: 'meterkast' },
  { name: 'Laadpaal', slug: 'laadpaal' },
  { name: 'Zonnepanelen', slug: 'zonnepanelen' },
  { name: 'Domotica', slug: 'domotica' },
  { name: 'Verlichting', slug: 'verlichting' },
  { name: 'NEN-keuring', slug: 'nen-keuring' },
];

const resources = [
  { href: '/informatie/elektricien-kiezen', label: 'Elektricien Kiezen' },
  { href: '/informatie/kosten', label: 'Kosten & Tarieven' },
  { href: '/informatie/certificeringen', label: 'Certificeringen' },
  { href: '/informatie/storingen', label: 'Storingen Oplossen' },
  { href: '/informatie/veiligheid', label: 'Elektrische Veiligheid' },
];

const company = [
  { href: '/over-ons', label: 'Over Ons' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'Veelgestelde Vragen' },
  { href: '/privacy', label: 'Privacybeleid' },
];

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

function FooterSection({ title, children, isOpen, onToggle, isMobile }: FooterSectionProps) {
  if (isMobile) {
    return (
      <div className="border-b border-white/10">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-4 text-left"
          aria-expanded={isOpen}
        >
          <h4 className="font-semibold text-yellow-400">{title}</h4>
          <ChevronDown
            className={`w-5 h-5 text-yellow-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-semibold mb-4 text-yellow-400">{title}</h4>
      {children}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setEmail('');
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderLinks = (items: Array<{ href?: string; slug?: string; label?: string; name?: string }>, type: 'province' | 'service' | 'resource' | 'company') => (
    <ul className="space-y-1">
      {items.map((item) => {
        const href = item.href || (type === 'province' ? `/provincie/${item.slug}` : `/dienst/${item.slug}`);
        const label = item.label || item.name;
        return (
          <li key={href}>
            <Link
              href={href}
              className="block py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
            >
              {label}
            </Link>
          </li>
        );
      })}
      {(type === 'province' || type === 'service') && (
        <li>
          <Link
            href={type === 'province' ? '/provincie' : '/diensten'}
            className="block py-1.5 text-yellow-400 hover:text-white transition-colors text-sm sm:text-base font-medium"
          >
            Bekijk Alles &rarr;
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <footer className="bg-navy-900 text-white">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-navy-900" />
              <div>
                <p className="text-navy-900/90 text-sm">Elektra storing? Vind direct hulp!</p>
                <Link href="/dienst/storingen" className="text-xl font-bold text-navy-900 hover:text-navy-800 transition-colors">
                  24/7 Storingsdienst
                </Link>
              </div>
            </div>
            <p className="text-navy-900/80 text-sm max-w-md">
              Onze elektriciens staan dag en nacht voor u klaar
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Tips & Nieuws over Elektra
            </h3>
            <p className="text-white/80 mb-6">
              Ontvang handige tips over elektrische installaties, energiebesparing en onderhoud.
            </p>
            {subscribed ? (
              <p className="text-yellow-400 font-medium">
                Bedankt voor uw aanmelding!
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Uw e-mailadres"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Button variant="default" type="submit" size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-navy-900">
                  Aanmelden
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Desktop Layout - 5 columns */}
        <div className="hidden md:grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="md" className="mb-4" />
            <p className="text-white/70 mb-6 text-sm">
              Uw betrouwbare platform voor het vinden van elektriciens in heel Nederland.
              Van storingen tot installaties, wij verbinden u met de juiste vakman.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/vindelektricien"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/vindelektricien"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/vindelektricien"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Diensten</h4>
            {renderLinks(services, 'service')}
          </div>

          {/* Provinces Column */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Provincies</h4>
            {renderLinks(provinces, 'province')}
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Informatie</h4>
            {renderLinks(resources, 'resource')}
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Over Ons</h4>
            {renderLinks(company, 'company')}
            <h4 className="font-semibold mt-6 mb-3 text-yellow-400">Contact</h4>
            <a
              href="mailto:info@vindelektricien.nl"
              className="flex items-center gap-2 py-1.5 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">info@vindelektricien.nl</span>
            </a>
          </div>
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="md:hidden">
          {/* Logo & Description - Always visible */}
          <div className="pb-6 mb-6 border-b border-white/10">
            <Logo variant="light" size="md" className="mb-4" />
            <p className="text-white/70 mb-6 text-sm">
              Uw betrouwbare platform voor het vinden van elektriciens in heel Nederland.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/vindelektricien"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/vindelektricien"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/vindelektricien"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Accordion Sections */}
          <FooterSection
            title="Diensten"
            isOpen={openSections['services']}
            onToggle={() => toggleSection('services')}
            isMobile={true}
          >
            {renderLinks(services, 'service')}
          </FooterSection>

          <FooterSection
            title="Provincies"
            isOpen={openSections['provinces']}
            onToggle={() => toggleSection('provinces')}
            isMobile={true}
          >
            {renderLinks(provinces, 'province')}
          </FooterSection>

          <FooterSection
            title="Informatie"
            isOpen={openSections['resources']}
            onToggle={() => toggleSection('resources')}
            isMobile={true}
          >
            {renderLinks(resources, 'resource')}
          </FooterSection>

          <FooterSection
            title="Over Ons"
            isOpen={openSections['company']}
            onToggle={() => toggleSection('company')}
            isMobile={true}
          >
            {renderLinks(company, 'company')}
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-sm font-medium text-yellow-400">Contact:</span>
              <a
                href="mailto:info@vindelektricien.nl"
                className="flex items-center gap-2 py-1.5 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">info@vindelektricien.nl</span>
              </a>
            </div>
          </FooterSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} VindElektricien.nl. Alle rechten voorbehouden.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacybeleid
              </Link>
              <Link href="/voorwaarden" className="hover:text-white transition-colors">
                Algemene Voorwaarden
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-white/50 mt-4">
            VindElektricien.nl is een informatief platform en biedt geen garanties op werkzaamheden.
            Controleer altijd de certificeringen en verzekeringen van de elektricien.
          </p>
        </div>
      </div>
    </footer>
  );
}
