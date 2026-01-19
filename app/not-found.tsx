import Link from 'next/link'
import { Search, Home, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Pagina Niet Gevonden</h2>
        <p className="text-lg text-muted-foreground mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
          Geen zorgen, we helpen u graag verder!
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <Link href="/">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Homepage
            </Button>
          </Link>
          <Link href="/zoeken">
            <Button variant="default" className="w-full bg-yellow-500 hover:bg-yellow-400 text-navy-900">
              <Search className="mr-2 h-4 w-4" />
              Zoek Elektricien
            </Button>
          </Link>
          <Link href="/provincie">
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Provincies
            </Button>
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-semibold mb-3">Populaire Provincies</h3>
          <div className="grid gap-2 text-sm">
            <Link href="/provincie/noord-holland" className="text-yellow-600 hover:underline">
              Elektriciens in Noord-Holland
            </Link>
            <Link href="/provincie/zuid-holland" className="text-yellow-600 hover:underline">
              Elektriciens in Zuid-Holland
            </Link>
            <Link href="/provincie/noord-brabant" className="text-yellow-600 hover:underline">
              Elektriciens in Noord-Brabant
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Een kapotte link gevonden? Laat het ons weten via</p>
          <a href="mailto:info@vindelektricien.nl" className="text-yellow-600 hover:underline">
            info@vindelektricien.nl
          </a>
        </div>
      </div>
    </div>
  )
}
