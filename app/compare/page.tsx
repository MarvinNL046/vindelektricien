'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Clock, X, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProxiedImage from '@/components/ProxiedImage';
import { Facility } from '@/lib/data';

interface CompareItem {
  id: string;
  name: string;
}

export default function ComparePage() {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load compare list from localStorage
    const saved = localStorage.getItem('compareList');
    if (saved) {
      const list = JSON.parse(saved);
      setCompareList(list);
      loadFacilities(list);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Listen for storage events
    const handleStorageChange = () => {
      const saved = localStorage.getItem('compareList');
      if (saved) {
        const list = JSON.parse(saved);
        setCompareList(list);
        loadFacilities(list);
      } else {
        setCompareList([]);
        setFacilities([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadFacilities = async (items: CompareItem[]) => {
    setLoading(true);
    try {
      const promises = items.map(item =>
        fetch(`/api/facility/${item.id}`).then(res => res.json())
      );
      const results = await Promise.all(promises);
      setFacilities(results.filter(Boolean));
    } catch (error) {
      console.error('Error loading facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCompare = (id: string) => {
    const newList = compareList.filter(item => item.id !== id);
    localStorage.setItem('compareList', JSON.stringify(newList));
    setCompareList(newList);
    setFacilities(facilities.filter(f => f.slug !== id));
    window.dispatchEvent(new Event('storage'));
  };

  const clearAll = () => {
    localStorage.removeItem('compareList');
    setCompareList([]);
    setFacilities([]);
    window.dispatchEvent(new Event('storage'));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p>Loading treatment centers...</p>
        </div>
      </div>
    );
  }

  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Compare Treatment Centers</h1>
          <p className="text-muted-foreground mb-8">
            You haven&apos;t selected any treatment centers to compare yet.
            Go to a facility page and click the &quot;Compare&quot; button.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Compare Treatment Centers</h1>
        <Button variant="outline" onClick={clearAll}>
          Clear all
        </Button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">Property</th>
              {facilities.map(facility => (
                <th key={facility.slug} className="p-4 min-w-[300px]">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2"
                      onClick={() => removeFromCompare(facility.slug)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                    <Link href={`/facility/${facility.slug}`}>
                      <Button variant="outline" size="sm">
                        View details
                      </Button>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Photo */}
            <tr className="border-b">
              <td className="p-4 font-medium">Photo</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  {facility.photo_url ? (
                    <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                      <ProxiedImage
                        src={facility.photo_url}
                        alt={facility.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">No photo available</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* Type */}
            <tr className="border-b bg-muted/30">
              <td className="p-4 font-medium">Facility Type</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <span className="inline-block px-3 py-1 bg-background rounded-full text-sm">
                    {facility.type}
                  </span>
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr className="border-b">
              <td className="p-4 font-medium">Location</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm">
                      <p>{facility.city}{facility.county ? `, ${facility.county}` : ''}</p>
                      <p className="text-muted-foreground">{facility.state}</p>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Address */}
            <tr className="border-b bg-muted/30">
              <td className="p-4 font-medium">Address</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <p className="text-sm">
                    {facility.address || '-'}<br />
                    {facility.city}, {facility.state_abbr} {facility.zipCode}
                  </p>
                </td>
              ))}
            </tr>

            {/* Opening hours */}
            <tr className="border-b">
              <td className="p-4 font-medium">Hours</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <p className="text-sm">{facility.opening_hours || 'Not available'}</p>
                  </div>
                </td>
              ))}
            </tr>

            {/* Phone */}
            <tr className="border-b bg-muted/30">
              <td className="p-4 font-medium">Phone</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <p className="text-sm">{facility.phone || 'Not available'}</p>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr className="border-b">
              <td className="p-4 font-medium">Rating</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  {facility.rating && facility.rating > 0 ? (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{facility.rating.toFixed(1)}</span>
                        <div className="text-yellow-500">
                          {'★'.repeat(Math.round(facility.rating))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {facility.review_count || 0} reviews
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No ratings yet</p>
                  )}
                </td>
              ))}
            </tr>

            {/* Treatment Types */}
            <tr className="border-b bg-muted/30">
              <td className="p-4 font-medium">Treatment Types</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <p className="text-sm">
                    {facility.treatment_types?.join(', ') || 'Not specified'}
                  </p>
                </td>
              ))}
            </tr>

            {/* Amenities */}
            <tr className="border-b">
              <td className="p-4 font-medium">Amenities</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <p className="text-sm">
                    {facility.amenities?.join(', ') || 'Not specified'}
                  </p>
                </td>
              ))}
            </tr>

            {/* Insurance */}
            <tr className="border-b bg-muted/30">
              <td className="p-4 font-medium">Insurance Accepted</td>
              {facilities.map(facility => (
                <td key={facility.slug} className="p-4">
                  <p className="text-sm">
                    {facility.insurance_accepted?.join(', ') || 'Not specified'}
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add more facilities */}
      {compareList.length < 3 && (
        <div className="mt-8 p-6 bg-muted rounded-lg text-center">
          <p className="text-muted-foreground mb-4">
            You can add {3 - compareList.length} more treatment center{3 - compareList.length > 1 ? 's' : ''} to your comparison
          </p>
          <Link href="/">
            <Button variant="outline">
              Find more treatment centers
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
