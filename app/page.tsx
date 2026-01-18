'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Building2, Phone, Star, ArrowRight, Users, Award, Clock, Search, ChevronRight, Shield, Stethoscope, Home, Brain, CheckCircle2, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import FAQSection from '@/components/FAQSection';
import { SITE_STATS, getComprehensiveDataText } from '@/lib/stats-config';
import OptimizedAd from '@/components/ads/OptimizedAd';
import MultiplexAd from '@/components/ads/MultiplexAd';
import { AD_SLOTS } from '@/lib/ad-config';

// Unsplash images for rehab/recovery theme
const heroImages = {
  // Peaceful nature/recovery themed
  main: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  // Support/therapy
  therapy: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  // Peaceful setting
  peaceful: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
  // Group support
  group: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  // Medical/professional
  medical: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
  // Nature/recovery
  nature1: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  nature2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  nature3: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  nature4: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
  // Wellness
  wellness1: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  wellness2: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  wellness3: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
  wellness4: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
};

interface Stats {
  totalFacilities: number;
  totalStates: number;
  totalCities: number;
  totalCounties: number;
}

// Featured states (highest need for addiction treatment)
const featuredStates = [
  {
    name: 'California',
    slug: 'california',
    abbr: 'CA',
    highlight: 'Los Angeles, San Francisco, San Diego'
  },
  {
    name: 'Florida',
    slug: 'florida',
    abbr: 'FL',
    highlight: 'Miami, Orlando, Tampa'
  },
  {
    name: 'Texas',
    slug: 'texas',
    abbr: 'TX',
    highlight: 'Houston, Dallas, Austin'
  },
  {
    name: 'New York',
    slug: 'new-york',
    abbr: 'NY',
    highlight: 'New York City, Buffalo, Rochester'
  },
  {
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    abbr: 'PA',
    highlight: 'Philadelphia, Pittsburgh, Allentown'
  },
  {
    name: 'Ohio',
    slug: 'ohio',
    abbr: 'OH',
    highlight: 'Columbus, Cleveland, Cincinnati'
  }
];

const facilityCategories = [
  {
    title: 'Inpatient Rehab',
    description: 'Residential treatment programs with 24/7 medical supervision and support',
    icon: Building2,
    href: '/type/inpatient-rehab',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    title: 'Outpatient Programs',
    description: 'Flexible treatment allowing you to maintain work and family responsibilities',
    icon: Heart,
    href: '/type/outpatient-treatment',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    title: 'Detox Centers',
    description: 'Medical detoxification services for safe withdrawal management',
    icon: Stethoscope,
    href: '/type/detox-center',
    color: 'bg-teal-50 text-teal-600'
  }
];

const userTestimonials = [
  {
    name: 'Michael R.',
    location: 'Los Angeles, CA',
    quote: 'This website helped me find the right treatment center when I was at my lowest. The detailed information made choosing a facility so much easier.',
    rating: 5
  },
  {
    name: 'Jennifer S.',
    location: 'Chicago, IL',
    quote: 'As a family member looking for help for my brother, this resource was invaluable. We found a great program that accepts his insurance.',
    rating: 5
  },
  {
    name: 'David M.',
    location: 'Houston, TX',
    quote: 'The search filters helped me find an outpatient program that fits my work schedule. Two years sober now!',
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
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
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
                <Shield className="w-4 h-4 text-orange-400" />
                <span>Trusted by 50,000+ families seeking treatment</span>
              </div>
            </div>

            <div className="text-center text-white">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Your Journey to Recovery
                <span className="block mt-2 bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Find compassionate, evidence-based addiction treatment near you.
                We connect you with verified rehab centers, detox facilities, and recovery programs
                across all 50 states.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter city, state, or zip code..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
                    />
                  </div>
                  <Button size="lg" type="submit" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl hover:shadow-orange-500/40">
                    <Search className="w-5 h-5 mr-2" />
                    Find Treatment
                  </Button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 text-sm mb-12">
                <Link href="/state" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Browse by State
                </Link>
                <Link href="/type/inpatient-rehab" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Inpatient Rehab
                </Link>
                <Link href="/type/detox-center" className="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all text-white border border-white/20 hover:border-white/40">
                  Detox Centers
                </Link>
                <Link href="/guide" className="px-5 py-2.5 bg-orange-500/20 backdrop-blur-sm rounded-full hover:bg-orange-500/30 transition-all text-orange-200 border border-orange-400/30 hover:border-orange-400/50">
                  Treatment Guide
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stats.totalFacilities > 0 ? stats.totalFacilities.toLocaleString('en-US') : '15,000+'}
                  </div>
                  <div className="text-sm text-white/70">Treatment Centers</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">50</div>
                  <div className="text-sm text-white/70">States Covered</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/70">Support Available</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/70">Free to Search</div>
                </div>
              </div>

              {/* SAMHSA Helpline Banner */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-teal-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 font-medium">SAMHSA National Helpline</p>
                    <p className="text-xs text-gray-500">Free, confidential, 24/7 support</p>
                  </div>
                </div>
                <a
                  href="tel:1-800-662-4357"
                  className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  1-800-662-4357
                </a>
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

      {/* Why Choose Section - New */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-teal-700 text-sm font-medium mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  Trusted Resource
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Finding the Right Treatment Shouldn&apos;t Be Hard
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We believe everyone deserves access to quality addiction treatment.
                  Our comprehensive directory makes it simple to find, compare, and connect
                  with verified treatment centers that match your needs.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-gray-700">Verified facility information and contact details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-gray-700">Filter by treatment type, insurance, and location</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-gray-700">No registration or fees - completely free service</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/search">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                      Start Your Search
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/guide">
                    <Button variant="outline" size="lg" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                      Read Treatment Guide
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
                        src={heroImages.therapy}
                        alt="Professional therapy session"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.peaceful}
                        alt="Peaceful treatment environment"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.group}
                        alt="Group support session"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={heroImages.medical}
                        alt="Medical professionals"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200/50 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl" />
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

      {/* Featured Category - Inpatient Rehab */}
      <section className="py-16 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                Most Effective Treatment
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Inpatient Rehabilitation
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Residential treatment programs provide the highest level of care for addiction recovery.
                With 24/7 medical supervision, structured therapy, and a supportive community,
                inpatient rehab gives you the best chance at lasting recovery.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-orange-300" />
                  </div>
                  30, 60, or 90-day program options
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-orange-300" />
                  </div>
                  Medical detox and withdrawal management
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-orange-300" />
                  </div>
                  Individual and group therapy sessions
                </li>
              </ul>
              <Link href="/type/inpatient-rehab">
                <Button size="lg" className="group bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30">
                  Find Inpatient Programs
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
                      src={heroImages.therapy}
                      alt="Professional therapy session"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.peaceful}
                      alt="Peaceful treatment environment"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.group}
                      alt="Group support session"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImages.medical}
                      alt="Medical professionals"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured States */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Browse by State
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find addiction treatment centers in your state or search our entire database.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {featuredStates.map((state) => (
              <Link key={state.slug} href={`/state/${state.slug}`} className="group">
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                      <MapPin className="w-6 h-6 text-teal-700 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{state.abbr}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-teal-600 transition-colors">
                    {state.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {state.highlight}
                  </p>
                  <span className="text-sm font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View treatment centers
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/state">
              <Button variant="outline" size="lg" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                View All 50 States
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Category - Outpatient Treatment */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.wellness1}
                      alt="Wellness and recovery"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.wellness2}
                      alt="Meditation and mindfulness"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.wellness3}
                      alt="Yoga and healing"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.wellness4}
                      alt="Exercise and recovery"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-100 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-100 rounded-full blur-2xl" />
            </div>

            {/* Right - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Flexible Treatment
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Outpatient Programs
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Continue your recovery while maintaining work, school, or family responsibilities.
                Outpatient programs offer flexible scheduling with intensive therapy options
                including Partial Hospitalization (PHP) and Intensive Outpatient (IOP).
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </div>
                  Flexible day and evening schedules
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </div>
                  Individual, group, and family therapy
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </div>
                  Often covered by insurance
                </li>
              </ul>
              <Link href="/type/outpatient-treatment">
                <Button size="lg" className="group bg-teal-600 hover:bg-teal-700">
                  Find Outpatient Programs
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Category - Detox Centers */}
      <section className="py-16 bg-teal-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-6">
                <Stethoscope className="w-4 h-4" />
                Medical Supervision
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Detox Centers
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Safe, medically-supervised detoxification is the crucial first step in recovery.
                Professional detox centers provide 24/7 medical care to manage withdrawal symptoms
                and prepare you for the next phase of treatment.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </div>
                  Medical staff available 24/7
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </div>
                  Medication-assisted treatment (MAT) available
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-teal-700" />
                  </div>
                  Seamless transition to rehab programs
                </li>
              </ul>
              <Link href="/type/detox-center">
                <Button size="lg" className="group bg-orange-500 hover:bg-orange-600 shadow-lg">
                  Find Detox Centers
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
                      src={heroImages.nature1}
                      alt="Peaceful nature setting"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.nature2}
                      alt="Serene landscape"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.nature3}
                      alt="Mountain recovery setting"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={heroImages.nature4}
                      alt="Forest path to recovery"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200/50 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200/40 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Types of Treatment
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Different levels of care for different stages of recovery. Find the right treatment for your needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {facilityCategories.map((category) => (
              <Link key={category.href} href={category.href} className="group">
                <Card className="p-8 h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-teal-600 transition-colors">
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
            <Link href="/type">
              <Button variant="outline" size="lg" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                View All Treatment Types
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
              Recovery Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from people who found help through our directory.
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
              Why Use RehabNearMe.com?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-teal-700" />
              </div>
              <h3 className="font-semibold mb-2">Comprehensive Database</h3>
              <p className="text-sm text-muted-foreground">
                Thousands of verified treatment centers across all 50 states.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Verified Information</h3>
              <p className="text-sm text-muted-foreground">
                Accurate details including services, insurance, and contact info.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Free</h3>
              <p className="text-sm text-muted-foreground">
                Search, compare, and connect with no cost or registration.
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
            title="Related Resources"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Take the First Step Today
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Recovery is possible. Search our directory to find the right treatment center for you or your loved one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30">
                Find Treatment Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/guide">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Learn About Treatment
              </Button>
            </Link>
          </div>

          {/* Crisis Line */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-white/60 mb-2">Need to talk to someone now?</p>
            <a href="tel:1-800-662-4357" className="text-xl font-bold text-orange-300 hover:text-orange-200">
              SAMHSA Helpline: 1-800-662-4357
            </a>
            <p className="text-white/60 text-sm mt-1">Free, confidential, 24/7 support</p>
          </div>
        </div>
      </section>
    </main>
  );
}
