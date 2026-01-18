'use client';

import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <WifiOff className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          No Internet Connection
        </h1>

        <p className="text-muted-foreground mb-6">
          It looks like you&apos;re offline. Check your internet connection and try again.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Try Again
          </button>

          <p className="text-sm text-muted-foreground">
            Previously visited pages may still be available.
          </p>
        </div>
      </div>
    </div>
  );
}
