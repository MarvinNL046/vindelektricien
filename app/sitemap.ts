import { MetadataRoute } from 'next'
import { getAllFacilities, getAllStates, getAllCities, createCitySlug, Facility } from '@/lib/data'
import { blogPosts } from '@/lib/blog-data'

// Maximum URLs per sitemap file (Google limit is 50k, we use 10k for better performance)
const MAX_URLS_PER_SITEMAP = 10000

const baseUrl = 'https://www.vindelektricien.nl'

// Electrician service types for dienst pages
const serviceTypes = [
  'storingen-reparaties',
  'installatie',
  'meterkast-groepenkast',
  'laadpaal-installatie',
  'zonnepanelen',
  'domotica-smart-home',
  'verlichting',
  'bedrijfsinstallaties',
  'spoed-24-7',
  'nen-keuringen',
]

// Static pages that don't change often
// Note: /zoeken, /compare are excluded (noindex utility pages)
const staticPages = [
  { path: '', priority: 1, changeFreq: 'daily' as const },
  { path: '/provincie', priority: 0.9, changeFreq: 'weekly' as const },
  { path: '/diensten', priority: 0.8, changeFreq: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFreq: 'daily' as const },
  { path: '/over-ons', priority: 0.5, changeFreq: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFreq: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
]

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

// Generate all sitemap entries
async function getAllSitemapEntries(): Promise<SitemapEntry[]> {
  const facilities: Facility[] = await getAllFacilities()
  const provinces = await getAllStates()
  const cities = await getAllCities()
  const now = new Date()

  const entries: SitemapEntry[] = []

  // Static pages
  staticPages.forEach(page => {
    entries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    })
  })

  // Service type pages (diensten)
  serviceTypes.forEach(type => {
    entries.push({
      url: `${baseUrl}/dienst/${type}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Province pages
  provinces.forEach(province => {
    entries.push({
      url: `${baseUrl}/provincie/${province.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // City pages
  cities.forEach(city => {
    entries.push({
      url: `${baseUrl}/stad/${createCitySlug(city)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Electrician pages (largest portion)
  facilities.forEach(facility => {
    entries.push({
      url: `${baseUrl}/elektricien/${facility.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Blog posts
  blogPosts.forEach(post => {
    entries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return entries
}

// This function tells Next.js how many sitemaps to generate
// It runs at build time and creates sitemap/0.xml, sitemap/1.xml, etc.
export async function generateSitemaps() {
  const entries = await getAllSitemapEntries()
  const totalSitemaps = Math.ceil(entries.length / MAX_URLS_PER_SITEMAP)

  // Return an array of sitemap IDs
  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }))
}

// Generate each individual sitemap
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllSitemapEntries()

  // Get the chunk for this sitemap ID
  const start = id * MAX_URLS_PER_SITEMAP
  const end = start + MAX_URLS_PER_SITEMAP
  const chunk = entries.slice(start, end)

  return chunk
}
