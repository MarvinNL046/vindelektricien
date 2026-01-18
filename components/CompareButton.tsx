'use client';

import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CompareItem {
  id: string;
  name: string;
}

interface CompareButtonProps {
  facilityId: string;
  facilityName: string;
}

export default function CompareButton({ facilityId, facilityName }: CompareButtonProps) {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Load compare list from localStorage
    const saved = localStorage.getItem('compareList');
    if (saved) {
      const list = JSON.parse(saved);
      setCompareList(list);
      setIsAdded(list.some((item: CompareItem) => item.id === facilityId));
    }
  }, [facilityId]);

  const toggleCompare = () => {
    const saved = localStorage.getItem('compareList');
    let list = saved ? JSON.parse(saved) : [];

    if (isAdded) {
      // Remove from list
      list = list.filter((item: CompareItem) => item.id !== facilityId);
    } else {
      // Add to list (max 3)
      if (list.length < 3) {
        list.push({ id: facilityId, name: facilityName });
      } else {
        alert('You can compare up to 3 facilities');
        return;
      }
    }

    localStorage.setItem('compareList', JSON.stringify(list));
    setCompareList(list);
    setIsAdded(!isAdded);

    // Trigger storage event for other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={toggleCompare}
        variant={isAdded ? "default" : "outline"}
        size="sm"
        className="gap-2"
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4" />
            Added to comparison
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Compare
          </>
        )}
      </Button>

      {compareList.length > 0 && (
        <Link href="/compare">
          <Button variant="secondary" size="sm">
            View comparison ({compareList.length})
          </Button>
        </Link>
      )}
    </div>
  );
}
