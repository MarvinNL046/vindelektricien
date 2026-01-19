import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.vindelektricien.nl';

  // Common disallowed paths
  const commonDisallow = [
    '/api/',
    '/cache/',
    '/admin/',
    '/_next/',
    '/search',
    '/compare',
    '/calendar',
    '/today',
    '/dashboard/',
    '/login',
    '/register',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...commonDisallow, '/*.json$'],
      },
      {
        // Google bot specific rules
        userAgent: 'Googlebot',
        allow: '/',
        disallow: commonDisallow,
      },
      {
        // Bing bot specific rules
        userAgent: 'Bingbot',
        allow: '/',
        disallow: commonDisallow,
      },
    ],
    // Reference sitemap index - Next.js auto-generates at /sitemap.xml
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
