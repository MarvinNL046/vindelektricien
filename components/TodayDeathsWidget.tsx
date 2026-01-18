'use client';

import Link from 'next/link';
import { Heart, Users, ChevronRight, TrendingUp } from 'lucide-react';

// Recovery statistics and facts
const recoveryFacts = [
  {
    stat: '20.4M',
    label: 'Americans in recovery',
    description: 'Living proof that recovery is possible'
  },
  {
    stat: '75%',
    label: 'Success rate',
    description: 'With professional treatment and support'
  },
  {
    stat: '24/7',
    label: 'Support available',
    description: 'Help is available whenever you need it'
  }
];

export default function RecoveryStatsWidget() {
  return (
    <section className="bg-gradient-to-br from-primary/90 to-primary backdrop-blur-sm rounded-xl p-6 text-white border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-300" />
          <h3 className="font-serif text-lg font-bold">Recovery is Possible</h3>
        </div>
        <TrendingUp className="w-5 h-5 text-teal-300" />
      </div>

      <div className="space-y-3">
        {recoveryFacts.map((fact, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-2xl text-white">{fact.stat}</p>
                <p className="text-sm text-white/90">{fact.label}</p>
              </div>
            </div>
            <p className="text-xs text-white/70 mt-1">{fact.description}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          href="/guide"
          className="flex-1 flex items-center justify-center gap-1 bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2 rounded-lg transition-colors"
        >
          Treatment Guide
          <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          href="/search"
          className="flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Users className="w-4 h-4" />
          Find Help
        </Link>
      </div>
    </section>
  );
}
