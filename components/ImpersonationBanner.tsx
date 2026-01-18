'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, UserCheck } from 'lucide-react';

export default function ImpersonationBanner() {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if impersonation cookie exists
    const checkImpersonation = () => {
      const cookies = document.cookie.split(';');
      const impersonating = cookies.some(c => c.trim().startsWith('is_impersonating='));
      setIsImpersonating(impersonating);
    };

    checkImpersonation();
    // Re-check periodically
    const interval = setInterval(checkImpersonation, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStopImpersonating = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/impersonate', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setIsImpersonating(false);
        router.push('/admin/users');
      }
    } catch (error) {
      console.error('Error stopping impersonation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isImpersonating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-orange-500 text-white py-2 px-4 flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <UserCheck className="w-4 h-4" />
        <span className="text-sm font-medium">
          You are viewing the site as another user
        </span>
      </div>
      <button
        onClick={handleStopImpersonating}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1 bg-white text-orange-600 rounded-md text-sm font-medium hover:bg-orange-50 transition-colors disabled:opacity-50"
      >
        <X className="w-4 h-4" />
        Back to admin
      </button>
    </div>
  );
}
