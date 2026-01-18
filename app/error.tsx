'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw, Search } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Something Went Wrong</h1>

        <p className="text-muted-foreground mb-8">
          We apologize, an error occurred while loading this page.
          Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Or search for a treatment center directly:
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-xs text-muted-foreground">
            Error code: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
