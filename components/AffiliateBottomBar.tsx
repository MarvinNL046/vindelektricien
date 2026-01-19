'use client';

import { useState, useEffect } from 'react';
import { X, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AffiliateBottomBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('affiliateBarDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after scrolling 30% of the page
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 30 && !isDismissed) {
        setIsVisible(true);
      }
    };

    // Also show after 5 seconds
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('affiliateBarDismissed', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-300">
      {/* Mobile version */}
      <div className="sm:hidden bg-navy-900 text-white p-3 shadow-lg border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              Gratis offerte aanvragen
            </p>
            <p className="text-xs text-white/70">
              Vergelijk elektriciens in uw regio
            </p>
          </div>
          <a
            href="/zoeken"
            className="flex-shrink-0"
          >
            <Button variant="accent" size="sm" className="gap-1 bg-yellow-500 text-navy-900 hover:bg-yellow-400">
              Zoeken
              <ArrowRight className="w-3 h-3" />
            </Button>
          </a>
          <button
            onClick={handleDismiss}
            className="p-1 text-white/70 hover:text-white transition-colors flex-shrink-0"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:block bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white shadow-lg border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="font-semibold">
                  Op zoek naar een elektricien?
                </p>
                <p className="text-sm text-white/80">
                  Vind de beste elektriciens bij u in de buurt. Vergelijk reviews, prijzen en diensten.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="/zoeken"
              >
                <Button variant="accent" className="gap-2 bg-yellow-500 text-navy-900 hover:bg-yellow-400">
                  Zoek Elektricien
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <button
                onClick={handleDismiss}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Sluiten"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
