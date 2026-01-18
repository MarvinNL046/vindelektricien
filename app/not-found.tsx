import Link from 'next/link'
import { Search, Home, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry, we&apos;ll help you find what you need!
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <Link href="/">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Homepage
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="default" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Find Treatment
            </Button>
          </Link>
          <Link href="/state/california">
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Browse States
            </Button>
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-semibold mb-3">Popular Locations</h3>
          <div className="grid gap-2 text-sm">
            <Link href="/state/california" className="text-primary hover:underline">
              Treatment Centers in California
            </Link>
            <Link href="/state/texas" className="text-primary hover:underline">
              Treatment Centers in Texas
            </Link>
            <Link href="/state/florida" className="text-primary hover:underline">
              Treatment Centers in Florida
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Found a broken link? Let us know at</p>
          <a href="mailto:info@rehabnearbyme.com" className="text-primary hover:underline">
            info@rehabnearbyme.com
          </a>
        </div>
      </div>
    </div>
  )
}
