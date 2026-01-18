import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Log requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Request for: ${url.pathname}`)
  }

  return NextResponse.next()
}

// Configure which paths middleware should check
export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|cache).*)',
  ],
}
