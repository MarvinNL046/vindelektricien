'use client';

import Link from 'next/link';
import { Mail, Facebook, Twitter, Linkedin, ChevronDown, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import type { FooterState, FooterType, FooterGuide } from '@/lib/footer-data';

// Fallback data for client-side rendering
const fallbackStates = [
  { name: 'California', slug: 'california', count: 0 },
  { name: 'Texas', slug: 'texas', count: 0 },
  { name: 'Florida', slug: 'florida', count: 0 },
  { name: 'New York', slug: 'new-york', count: 0 },
  { name: 'Pennsylvania', slug: 'pennsylvania', count: 0 },
  { name: 'Ohio', slug: 'ohio', count: 0 },
  { name: 'Illinois', slug: 'illinois', count: 0 },
  { name: 'Georgia', slug: 'georgia', count: 0 },
];

const fallbackTypes = [
  { name: 'Inpatient Rehab', slug: 'inpatient', count: 0 },
  { name: 'Outpatient Treatment', slug: 'outpatient', count: 0 },
  { name: 'Detox Centers', slug: 'detox', count: 0 },
  { name: 'Sober Living', slug: 'sober-living', count: 0 },
  { name: 'Dual Diagnosis', slug: 'dual-diagnosis', count: 0 },
  { name: 'Luxury Rehab', slug: 'luxury-rehab', count: 0 },
  { name: 'Holistic Treatment', slug: 'holistic', count: 0 },
  { name: 'Faith-Based Rehab', slug: 'faith-based', count: 0 },
];

const resources: FooterGuide[] = [
  { href: '/guide/choosing-rehab', label: 'Choosing a Rehab' },
  { href: '/guide/insurance', label: 'Insurance & Payment' },
  { href: '/guide/what-to-expect', label: 'What to Expect' },
  { href: '/guide/family-support', label: 'Family Support' },
  { href: '/guide/aftercare', label: 'Aftercare Planning' },
];

const company = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy Policy' },
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
          <h4 className="font-semibold text-teal-300">{title}</h4>
          <ChevronDown
            className={`w-5 h-5 text-teal-300 transition-transform duration-200 ${
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
      <h4 className="font-semibold mb-4 text-teal-300">{title}</h4>
      {children}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [topStates, setTopStates] = useState<FooterState[]>(fallbackStates);
  const [topTypes, setTopTypes] = useState<FooterType[]>(fallbackTypes);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Fetch dynamic data on mount
  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await fetch('/api/footer-data');
        if (response.ok) {
          const data = await response.json();
          if (data.states?.length > 0) setTopStates(data.states);
          if (data.types?.length > 0) setTopTypes(data.types);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Keep fallback data on error
      }
    }
    fetchFooterData();
  }, []);

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

  const renderLinks = (items: Array<{ href: string; label: string }>, type: 'state' | 'type' | 'resource' | 'company') => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="block py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm sm:text-base"
          >
            {item.label}
          </Link>
        </li>
      ))}
      {(type === 'state' || type === 'type') && (
        <li>
          <Link
            href={type === 'state' ? '/states' : '/types'}
            className="block py-1.5 text-teal-300 hover:text-white transition-colors text-sm sm:text-base font-medium"
          >
            View All &rarr;
          </Link>
        </li>
      )}
    </ul>
  );

  const stateLinks = topStates.map(s => ({ href: `/state/${s.slug}`, label: s.name }));
  const typeLinks = topTypes.map(t => ({ href: `/type/${t.slug}`, label: t.name }));

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* SAMHSA Helpline Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Phone className="w-8 h-8 text-white" />
              <div>
                <p className="text-white/90 text-sm">Need Help Now? Call the SAMHSA National Helpline</p>
                <a href="tel:1-800-662-4357" className="text-2xl font-bold text-white hover:text-teal-200 transition-colors">
                  1-800-662-4357
                </a>
              </div>
            </div>
            <p className="text-white/80 text-sm max-w-md">
              Free, confidential, 24/7 treatment referral and information service
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Recovery Resources & Updates
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Receive helpful resources about addiction treatment, recovery support, and finding the right facility.
            </p>
            {subscribed ? (
              <p className="text-teal-300 font-medium">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <Button variant="default" type="submit" size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  Subscribe
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
            <p className="text-primary-foreground/70 mb-6 text-sm">
              Your trusted resource for finding addiction treatment centers and rehab facilities across the United States.
              Helping individuals and families find the path to recovery.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/rehabnearme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/rehabnearme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/rehabnearme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Treatment Types Column */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Treatment Types</h4>
            {renderLinks(typeLinks, 'type')}
          </div>

          {/* Popular States Column */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Popular States</h4>
            {renderLinks(stateLinks, 'state')}
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Resources</h4>
            {renderLinks(resources, 'resource')}
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4 text-teal-300">Company</h4>
            {renderLinks(company, 'company')}
            <h4 className="font-semibold mt-6 mb-3 text-teal-300">Contact</h4>
            <a
              href="mailto:info@rehabnearme.com"
              className="flex items-center gap-2 py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">info@rehabnearme.com</span>
            </a>
          </div>
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="md:hidden">
          {/* Logo & Description - Always visible */}
          <div className="pb-6 mb-6 border-b border-white/10">
            <Logo variant="light" size="md" className="mb-4" />
            <p className="text-primary-foreground/70 mb-6 text-sm">
              Your trusted resource for finding addiction treatment centers and rehab facilities.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/rehabnearme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/rehabnearme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/rehabnearme"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Accordion Sections */}
          <FooterSection
            title="Treatment Types"
            isOpen={openSections['types']}
            onToggle={() => toggleSection('types')}
            isMobile={true}
          >
            {renderLinks(typeLinks, 'type')}
          </FooterSection>

          <FooterSection
            title="Popular States"
            isOpen={openSections['states']}
            onToggle={() => toggleSection('states')}
            isMobile={true}
          >
            {renderLinks(stateLinks, 'state')}
          </FooterSection>

          <FooterSection
            title="Resources"
            isOpen={openSections['resources']}
            onToggle={() => toggleSection('resources')}
            isMobile={true}
          >
            {renderLinks(resources, 'resource')}
          </FooterSection>

          <FooterSection
            title="Company"
            isOpen={openSections['company']}
            onToggle={() => toggleSection('company')}
            isMobile={true}
          >
            {renderLinks(company, 'company')}
            <div className="mt-4 pt-4 border-t border-white/10">
              <span className="text-sm font-medium text-teal-300">Contact:</span>
              <a
                href="mailto:info@rehabnearme.com"
                className="flex items-center gap-2 py-1.5 text-primary-foreground/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">info@rehabnearme.com</span>
              </a>
            </div>
          </FooterSection>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} RehabNearMe.com. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-primary-foreground/50 mt-4">
            RehabNearMe.com is an informational resource and does not provide medical advice, diagnosis, or treatment.
            If you are experiencing a medical emergency, please call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
