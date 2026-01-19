'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Zap, Building2, Phone, Star, ArrowRight, Users, Award, Clock, Search, ChevronRight, Shield, Wrench, Home, Sun, CheckCircle2, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FAQSection from '@/components/FAQSection';
import { SITE_STATS, getComprehensiveDataText } from '@/lib/stats-config';
import OptimizedAd from '@/components/ads/OptimizedAd';
import MultiplexAd from '@/components/ads/MultiplexAd';
import { AD_SLOTS } from '@/lib/ad-config';

// Unsplash images for electrician/electrical theme
const heroImages = {
  // Electrical work themed
  main: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80',
  // Electrician at work
  work1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  // Electrical panel
  panel: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80',
  // Solar panels
  solar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
  // EV charging
  charging: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
  // Smart home
  smarthome: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
  // Lighting
  lighting: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&q=80',
  // Tools
  tools: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
};

interface Stats {
  totalFacilities: number;
  totalStates: number;
  totalCities: number;
  totalCounties: number;
}

// Featured provinces (Dutch provinces)
const featuredProvinces = [
  {
    name: 'Noord-Holland',
    slug: 'noord-holland',
    highlight: 'Amsterdam, Haarlem, Alkmaar'
  },
  {
    name: 'Zuid-Holland',
    slug: 'zuid-holland',
    highlight: 'Rotterdam, Den Haag, Leiden'
  },
  {
    name: 'Noord-Brabant',
    slug: 'noord-brabant',
    highlight: 'Eindhoven, Tilburg, Breda'
  },
  {
    name: 'Gelderland',
    slug: 'gelderland',
    highlight: 'Nijmegen, Arnhem, Apeldoorn'
  },
  {
    name: 'Utrecht',
    slug: 'utrecht',
    highlight: 'Utrecht, Amersfoort, Nieuwegein'
  },
  {
    name: 'Limburg',
    slug: 'limburg',
    highlight: 'Maastricht, Heerlen, Venlo'
  }
];

const serviceCategories = [
  {
    title: 'Storingen & Reparaties',
    description: '24/7 storingsdienst voor al uw elektrische problemen en spoedklussen',
    icon: Zap,
    href: '/dienst/storingen',
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    title: 'Installatie',
    description: 'Nieuwe elektrische installaties voor particulier en zakelijk',
    icon: Wrench,
    href: '/dienst/installatie',
    color: 'bg-navy-100 text-navy-700'
  },
  {
    title: 'Meterkast & Groepenkast',
    description: 'Vervanging en uitbreiding van uw meterkast of groepenkast',
    icon: Building2,
    href: '/dienst/meterkast',
    color: 'bg-yellow-50 text-yellow-600'
  }
];

const userTestimonials = [
  {
    name: 'Jan de Vries',
    location: 'Amsterdam, NH',
    quote: 'Via deze website snel een betrouwbare elektricien gevonden voor onze meterkast. Binnen een dag geholpen!',
    rating: 5
  },
  {
    name: 'Maria Jansen',
    location: 'Rotterdam, ZH',
    quote: 'Uitstekende service! De elektricien was vakkundig en heeft onze laadpaal perfect geinstalleerd.',
    rating: 5
  },
  {
    name: 'Peter Bakker',
    location: 'Utrecht, UT',
    quote: 'Fijne vergelijkingssite. Kon makkelijk offertes opvragen bij meerdere elektriciens in mijn regio.',
    rating: 5
  }
];

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    totalFacilities: 0,
    totalStates: 0,
    totalCities: 0,
    totalCounties: 0
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load stats from API
    async function loadStats() {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    loadStats();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/zoeken?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Background Gradient - Navy Blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:32px_32px]" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20">
                <Shield className="w-4 h-4 text-yellow-400" />
                <span>Vind erkende elektriciens in heel Nederland</span>
              </div>
            </div>

            <div className="text-center text-white">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Vind een Elektricien
                <span className="block mt-2 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  bij jou in de Buurt
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Zoek en vergelijk betrouwbare elektriciens in jouw regio.
                Van storingen en installaties tot laadpalen en zonnepanelen.
                Vind de juiste vakman voor elke klus.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-600" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Voer je plaats of postcode in..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg"
                    />
                  </div>
                  <Button size="lg" type="submit" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-navy-900 font-semibold rounded-xl shadow-lg shadow-yellow-500/30 transition-all hover:shadow-xl hover:shadow-yellow-500/40">
                    <Search className="w-5 h-5 mr-2" />
                    Zoek Elektricien
                  </Button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 text-sm mb-12">
                <Link href="/provincie" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Zoek op Provincie
                </Link>
                <Link href="/dienst/storingen" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Storingen
                </Link>
                <Link href="/dienst/laadpaal" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Laadpaal
                </Link>
                <Link href="/diensten" className="px-5 py-2.5 bg-yellow-500/20 backdrop-blur-sm rounded-full hover:bg-yellow-500/30 transition-all text-yellow-200 border border-yellow-400/30 hover:border-yellow-400/50">
                  Alle Diensten
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stats.totalFacilities > 0 ? stats.totalFacilities.toLocaleString('nl-NL') : '1.500+'}
                  </div>
                  <div className="text-sm text-white/70">Elektriciens</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">12</div>
                  <div className="text-sm text-white/70">Provincies</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/70">Storingsdienst</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/70">Gratis Zoeken</div>
                </div>
              </div>

              {/* Emergency Contact Banner */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-medium">Elektra Storing?</p>
                    <p className="text-xs text-gray-500">24/7 spoedhulp beschikbaar</p>
                  </div>
                </div>
                <Link
                  href="/dienst/storingen"
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-navy-900 font-bold rounded-xl transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Vind Storingsdienst
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full text-yellow-700 text-sm font-medium mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  Betrouwbaar Platform
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  De Juiste Elektricien Vinden Hoeft Niet Moeilijk te Zijn
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Wij verbinden u met vakbekwame elektriciens in uw regio.
                  Of het nu gaat om een kleine reparatie of een complete installatie,
                  vind de juiste professional voor de klus.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700">Geverifieerde elektriciens met erkende kwalificaties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700">Filter op dienst, locatie en specialisatie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700">Gratis en vrijblijvend - geen registratie nodig</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/zoeken">
                    <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white">
                      Start met Zoeken
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/diensten">
                    <Button variant="outline" size="lg" className="border-yellow-400 text-navy-900 hover:bg-yellow-50">
                      Bekijk Diensten
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Image Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.work1}
                        alt="Elektricien aan het werk"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.panel}
                        alt="Meterkast installatie"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.charging}
                        alt="Laadpaal installatie"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.solar}
                        alt="Zonnepanelen"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200/50 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy-200/50 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad after intro section */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <OptimizedAd
            slot={AD_SLOTS.home.heroBelow}
            format="horizontal"
            priority={true}
            minHeight={90}
            className="max-w-[728px] mx-auto"
          />
        </div>
      </div>

      {/* Featured Service - Laadpaal */}
      <section className="py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300 text-sm font-medium mb-6">
                <Car className="w-4 h-4" />
                Populaire Dienst
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Laadpaal Installatie
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Rijd je elektrisch of overweeg je een elektrische auto?
                Laat een laadpaal thuis installeren door een erkende elektricien.
                Veilig, snel en volgens alle normen.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-300" />
                  </div>
                  Erkende installateurs met VIAG-certificering
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-300" />
                  </div>
                  Alle merken: Tesla, Alfen, EVBox en meer
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-300" />
                  </div>
                  Inclusief aanpassing groepenkast indien nodig
                </li>
              </ul>
              <Link href="/dienst/laadpaal">
                <Button size="lg" className="group bg-yellow-500 hover:bg-yellow-400 text-navy-900 shadow-lg shadow-yellow-500/30">
                  Vind Laadpaal Installateur
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right - Image Grid */}
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.charging}
                      alt="Laadpaal voor elektrische auto"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.panel}
                      alt="Elektrische installatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.work1}
                      alt="Elektricien aan het werk"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.smarthome}
                      alt="Moderne installatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy-500/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Provinces */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Zoek per Provincie
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vind elektriciens in uw provincie of zoek in heel Nederland.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {featuredProvinces.map((province) => (
              <Link key={province.slug} href={`/provincie/${province.slug}`} className="group">
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                      <MapPin className="w-6 h-6 text-yellow-700 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-navy-700 transition-colors">
                    {province.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {province.highlight}
                  </p>
                  <span className="text-sm font-medium text-yellow-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Bekijk elektriciens
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/provincie">
              <Button variant="outline" size="lg" className="border-yellow-400 text-navy-900 hover:bg-yellow-50">
                Alle 12 Provincies
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Service - Zonnepanelen */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.solar}
                      alt="Zonnepanelen installatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.panel}
                      alt="Groepenkast uitbreiding"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.smarthome}
                      alt="Smart home integratie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.tools}
                      alt="Professioneel gereedschap"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-navy-100 rounded-full blur-2xl" />
            </div>

            {/* Right - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-yellow-700 text-sm font-medium mb-6">
                <Sun className="w-4 h-4" />
                Duurzame Energie
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Zonnepanelen Installatie
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Bespaar op uw energiekosten met zonnepanelen.
                Onze elektriciens verzorgen de complete installatie inclusief
                aansluiting op uw groepenkast en eventuele uitbreiding.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-700" />
                  </div>
                  Complete installatie van A tot Z
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-700" />
                  </div>
                  Uitbreiding groepenkast indien nodig
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-700" />
                  </div>
                  Advies over thuisbatterij en teruglevering
                </li>
              </ul>
              <Link href="/dienst/zonnepanelen">
                <Button size="lg" className="group bg-navy-900 hover:bg-navy-800 text-white">
                  Vind Zonnepanelen Installateur
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service - Storingen */}
      <section className="py-16 bg-yellow-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-full text-yellow-800 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                24/7 Beschikbaar
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Storingsdienst Elektra
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Heeft u een stroomstoring of kortsluiting? Onze aangesloten
                elektriciens bieden 24/7 spoedservice voor al uw elektrische
                storingen en noodgevallen.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-800" />
                  </div>
                  Snelle responstijd, ook in avond en weekend
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-800" />
                  </div>
                  Kortsluiting, aardlek en stroomuitval
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-yellow-800" />
                  </div>
                  Erkende vakmensen met spoedtarief
                </li>
              </ul>
              <Link href="/dienst/storingen">
                <Button size="lg" className="group bg-yellow-500 hover:bg-yellow-400 text-navy-900 shadow-lg">
                  Vind Storingsdienst
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right - Image Grid */}
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.panel}
                      alt="Meterkast controle"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.tools}
                      alt="Gereedschap elektricien"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.work1}
                      alt="Elektricien spoedreparatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.lighting}
                      alt="Verlichting reparatie"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200/50 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy-200/40 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Diensten
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vind de juiste elektricien voor elke klus. Van kleine reparaties tot grote installaties.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {serviceCategories.map((category) => (
              <Link key={category.href} href={category.href} className="group">
                <Card className="p-8 h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-navy-700 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/diensten">
              <Button variant="outline" size="lg" className="border-yellow-400 text-navy-900 hover:bg-yellow-50">
                Alle Diensten Bekijken
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ad before testimonials */}
      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <OptimizedAd
            slot={AD_SLOTS.home.afterStats}
            format="horizontal"
            lazy={true}
            minHeight={90}
            className="max-w-[728px] mx-auto"
          />
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ervaringen van Klanten
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lees wat anderen vonden van de elektriciens die zij via ons platform hebben gevonden.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {userTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Waarom VindElektricien.nl?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-yellow-700" />
              </div>
              <h3 className="font-semibold mb-2">Groot Netwerk</h3>
              <p className="text-sm text-muted-foreground">
                Honderden elektriciens door heel Nederland, van Groningen tot Maastricht.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-navy-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-navy-700" />
              </div>
              <h3 className="font-semibold mb-2">Erkende Vakmensen</h3>
              <p className="text-sm text-muted-foreground">
                Geverifieerde elektriciens met de juiste certificeringen en verzekeringen.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-yellow-50 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Gratis</h3>
              <p className="text-sm text-muted-foreground">
                Zoek, vergelijk en neem contact op zonder kosten of registratie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Multiplex Ad */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <MultiplexAd
            slot={AD_SLOTS.home.beforeFooter}
            title="Gerelateerde Informatie"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Vind Vandaag Nog een Elektricien
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Of het nu gaat om een storing, installatie of advies - vind de juiste elektricien voor uw klus.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/zoeken">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-navy-900 shadow-lg shadow-yellow-500/30">
                Start met Zoeken
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/diensten">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Bekijk Diensten
              </Button>
            </Link>
          </div>

          {/* Quick Contact */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-white/60 mb-2">Heeft u een spoedeisende storing?</p>
            <Link href="/dienst/storingen" className="text-xl font-bold text-yellow-400 hover:text-yellow-300">
              Vind direct een storingsdienst
            </Link>
            <p className="text-white/60 text-sm mt-1">24 uur per dag, 7 dagen per week</p>
          </div>
        </div>
      </section>
    </main>
  );
}
