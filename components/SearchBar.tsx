'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  variant?: 'hero' | 'compact' | 'default';
  className?: string;
  defaultLocation?: string;
  defaultQuery?: string;
}

export default function SearchBar({
  variant = 'default',
  className,
  defaultLocation = '',
  defaultQuery = '',
}: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultLocation);
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };

  if (variant === 'hero') {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex flex-col sm:flex-row gap-0 bg-white rounded-2xl shadow-hover overflow-hidden',
          className
        )}
      >
        {/* Location Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-border/50">
          <MapPin className="w-5 h-5 text-accent shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or ZIP code"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground min-w-0"
          />
        </div>

        {/* Search Query Input - hidden on small screens for cleaner look */}
        <div className="hidden md:flex flex-1 items-center gap-3 px-4 py-3 border-r border-border/50">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name (optional)"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground min-w-0"
          />
        </div>

        {/* Search Button - integrated in the bar */}
        <Button
          variant="accent"
          size="lg"
          type="submit"
          className="rounded-none sm:rounded-r-xl m-0 px-6 py-3 shrink-0"
        >
          <Search className="w-5 h-5 md:mr-2" />
          <span className="hidden md:inline">Search</span>
        </Button>
      </form>
    );
  }

  if (variant === 'compact') {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex items-center gap-2 p-1.5 bg-white rounded-xl shadow-soft border',
          className
        )}
      >
        <div className="flex-1 flex items-center gap-2 px-3">
          <MapPin className="w-4 h-4 text-accent shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="accent" size="sm" type="submit">
          <Search className="w-4 h-4" />
        </Button>
      </form>
    );
  }

  // Default variant
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-xl shadow-soft border',
        className
      )}
    >
      {/* Location Input */}
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-background rounded-lg">
        <MapPin className="w-5 h-5 text-accent shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or ZIP code"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Search Query Input */}
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-background rounded-lg">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name (optional)"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Search Button */}
      <Button variant="accent" size="lg" type="submit">
        <Search className="w-5 h-5 sm:mr-2" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
}
