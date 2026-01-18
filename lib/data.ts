import { promises as fs } from 'fs';
import path from 'path';
import { db, facilities } from './db';
import { eq, ilike, or, desc, asc, sql, and, count } from 'drizzle-orm';

// US Treatment Facility Interface
export interface Facility {
  // Core identifiers
  id: string;
  name: string;
  slug: string;

  // Location - US geography
  address?: string;
  city: string;
  county?: string;
  state: string;
  state_abbr: string;
  zipCode?: string;
  country: string;
  gps_coordinates?: string;
  latitude?: number;
  longitude?: number;

  // Classification
  type: string;
  type_slug: string;
  facility_types: string[];
  treatment_types: string[];
  insurance_accepted: string[];

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Details
  description?: string;
  opening_hours?: string;
  amenities?: string[];
  year_established?: string;

  // Google data
  rating?: number;
  review_count?: number;
  photo?: string;
  photo_url?: string;
  photos?: string[];

  // Reviews
  reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
    reviewer_image?: string;
  }>;

  // Metadata
  status?: string;
  source?: string;
  discovered_at?: string;
  updated_at?: string;
}

// Generated content for SEO
export interface GeneratedContent {
  summary: string;
  about: string;
  features: string[];
  accessibility: string;
  amenities: string[];
  visitor_tips: string[];
  treatment_approach?: string;
  success_stories?: string;
  local_context?: string;
  state_info?: string;
  type_info?: string;
  practical_info?: string;
  directions?: string;
}

// Enriched facility with generated content
export interface EnrichedFacilityData {
  website_url?: string;
  website_content?: string;
  website_scraped_at?: string;

  google_rating?: number;
  google_review_count?: number;
  google_reviews?: Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
  }>;
  google_photo?: string;
  google_photos?: string[];

  generated?: GeneratedContent;
  generated_at?: string;

  enriched: boolean;
  enriched_at?: string;
  last_updated?: string;

  seoTitle?: string;
  seoDescription?: string;
  enrichedContent?: string;
}

export interface FacilityWithContent extends Facility, EnrichedFacilityData {}

// State interface
export interface State {
  name: string;
  abbr: string;
  slug: string;
  counties?: number;
  capital?: string;
  major_cities?: string[];
}

// Treatment type interface
export interface TreatmentType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
}

// Facility type interface
export interface FacilityType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
}

// Cache for static data (states and types only)
let statesCache: State[] | null = null;
let treatmentTypesCache: TreatmentType[] | null = null;
let facilityTypesCache: FacilityType[] | null = null;

// ===== HELPER: Map database row to Facility interface =====

function mapRowToFacility(row: typeof facilities.$inferSelect): Facility {
  return {
    id: row.id.toString(),
    name: row.name,
    slug: row.slug,
    address: row.address || undefined,
    city: row.city,
    county: row.county || undefined,
    state: row.state,
    state_abbr: row.stateAbbr,
    zipCode: row.zipCode || undefined,
    country: row.country,
    latitude: row.latitude ? parseFloat(row.latitude) : undefined,
    longitude: row.longitude ? parseFloat(row.longitude) : undefined,
    type: row.type,
    type_slug: row.typeSlug || row.type.toLowerCase().replace(/\s+/g, '-'),
    facility_types: row.facilityTypes || [],
    treatment_types: row.treatmentTypes || [],
    insurance_accepted: row.insuranceAccepted || [],
    phone: row.phone || undefined,
    email: row.email || undefined,
    website: row.website || undefined,
    description: row.description || undefined,
    opening_hours: row.openingHours || undefined,
    amenities: row.amenities || undefined,
    year_established: row.yearEstablished || undefined,
    rating: row.rating ? parseFloat(row.rating) : undefined,
    review_count: row.reviewCount || undefined,
    photo_url: row.photoUrl || undefined,
    photos: row.photos || undefined,
    status: row.status || undefined,
    source: row.source || undefined,
    discovered_at: row.discoveredAt?.toISOString() || undefined,
    updated_at: row.updatedAt?.toISOString() || undefined,
  };
}

function mapRowToFacilityWithContent(row: typeof facilities.$inferSelect): FacilityWithContent {
  const base = mapRowToFacility(row);
  return {
    ...base,
    enriched: !!row.enrichedContent || !!row.generatedSummary,
    enriched_at: row.enrichedAt?.toISOString() || undefined,
    seoTitle: row.seoTitle || undefined,
    seoDescription: row.seoDescription || undefined,
    enrichedContent: row.enrichedContent || undefined,
    generated: row.generatedSummary ? {
      summary: row.generatedSummary || '',
      about: row.generatedAbout || '',
      features: row.generatedFeatures || [],
      accessibility: '',
      amenities: row.generatedAmenities || [],
      visitor_tips: row.generatedVisitorTips || [],
      directions: row.generatedDirections || undefined,
      local_context: row.generatedLocalContext || undefined,
    } : undefined,
  };
}

// ===== CORE DATA FUNCTIONS =====

export async function getAllFacilities(): Promise<Facility[]> {
  try {
    const results = await db.select().from(facilities);
    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities from database:', error);
    return [];
  }
}

export async function getFacilityBySlug(slug: string): Promise<FacilityWithContent | null> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(eq(facilities.slug, slug))
      .limit(1);

    if (results.length === 0) return null;

    return mapRowToFacilityWithContent(results[0]);
  } catch (error) {
    console.error('Error loading facility:', error);
    return null;
  }
}

// ===== STATE FUNCTIONS =====

export async function getAllStates(): Promise<State[]> {
  if (statesCache) return statesCache;

  try {
    const statesPath = path.join(process.cwd(), 'data', 'states.json');
    const content = await fs.readFile(statesPath, 'utf-8');
    const data = JSON.parse(content);
    statesCache = data.states as State[];
    return statesCache;
  } catch (error) {
    console.error('Error loading states:', error);
    return [];
  }
}

export async function getStateBySlug(slug: string): Promise<State | null> {
  const states = await getAllStates();
  return states.find(s => s.slug === slug) || null;
}

export async function getStateByAbbr(abbr: string): Promise<State | null> {
  const states = await getAllStates();
  return states.find(s => s.abbr.toLowerCase() === abbr.toLowerCase()) || null;
}

export async function getFacilitiesByState(state: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        or(
          ilike(facilities.state, state),
          ilike(facilities.stateAbbr, state)
        )
      );
    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by state:', error);
    return [];
  }
}

// ===== COUNTY FUNCTIONS =====

export async function getAllCounties(): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ county: facilities.county })
      .from(facilities)
      .where(sql`${facilities.county} IS NOT NULL AND ${facilities.county} != ''`)
      .orderBy(asc(facilities.county));

    return results.map(r => r.county!).filter(Boolean);
  } catch (error) {
    console.error('Error loading counties:', error);
    return [];
  }
}

export async function getCountiesByState(state: string): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ county: facilities.county })
      .from(facilities)
      .where(
        and(
          sql`${facilities.county} IS NOT NULL AND ${facilities.county} != ''`,
          or(
            ilike(facilities.state, state),
            ilike(facilities.stateAbbr, state)
          )
        )
      )
      .orderBy(asc(facilities.county));

    return results.map(r => r.county!).filter(Boolean);
  } catch (error) {
    console.error('Error loading counties by state:', error);
    return [];
  }
}

export async function getFacilitiesByCounty(county: string, state?: string): Promise<Facility[]> {
  try {
    let whereClause = ilike(facilities.county, county);

    if (state) {
      whereClause = and(
        whereClause,
        or(
          ilike(facilities.state, state),
          ilike(facilities.stateAbbr, state)
        )
      )!;
    }

    const results = await db.select()
      .from(facilities)
      .where(whereClause);

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by county:', error);
    return [];
  }
}

// ===== CITY FUNCTIONS =====

export async function getAllCities(): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ city: facilities.city })
      .from(facilities)
      .where(sql`${facilities.city} IS NOT NULL AND ${facilities.city} != ''`)
      .orderBy(asc(facilities.city));

    return results.map(r => r.city).filter(Boolean);
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

export async function getCitiesByState(state: string): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ city: facilities.city })
      .from(facilities)
      .where(
        and(
          sql`${facilities.city} IS NOT NULL AND ${facilities.city} != ''`,
          or(
            ilike(facilities.state, state),
            ilike(facilities.stateAbbr, state)
          )
        )
      )
      .orderBy(asc(facilities.city));

    return results.map(r => r.city).filter(Boolean);
  } catch (error) {
    console.error('Error loading cities by state:', error);
    return [];
  }
}

export async function getFacilitiesByCity(city: string, state?: string): Promise<Facility[]> {
  try {
    let whereClause = ilike(facilities.city, city);

    if (state) {
      whereClause = and(
        whereClause,
        or(
          ilike(facilities.state, state),
          ilike(facilities.stateAbbr, state)
        )
      )!;
    }

    const results = await db.select()
      .from(facilities)
      .where(whereClause);

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by city:', error);
    return [];
  }
}

// ===== TREATMENT TYPE FUNCTIONS =====

export async function getAllTreatmentTypes(): Promise<TreatmentType[]> {
  if (treatmentTypesCache) return treatmentTypesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'treatment-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    treatmentTypesCache = data.types as TreatmentType[];
    return treatmentTypesCache;
  } catch (error) {
    console.error('Error loading treatment types:', error);
    return [];
  }
}

export async function getTreatmentTypeBySlug(slug: string): Promise<TreatmentType | null> {
  const types = await getAllTreatmentTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getFacilitiesByTreatmentType(treatmentType: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        sql`${treatmentType} = ANY(${facilities.treatmentTypes})`
      );

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by treatment type:', error);
    return [];
  }
}

// ===== FACILITY TYPE FUNCTIONS =====

export async function getAllFacilityTypes(): Promise<FacilityType[]> {
  if (facilityTypesCache) return facilityTypesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'facility-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    facilityTypesCache = data.types as FacilityType[];
    return facilityTypesCache;
  } catch (error) {
    console.error('Error loading facility types:', error);
    return [];
  }
}

export async function getFacilityTypeBySlug(slug: string): Promise<FacilityType | null> {
  const types = await getAllFacilityTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getFacilitiesByFacilityType(facilityType: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        or(
          ilike(facilities.type, facilityType),
          ilike(facilities.typeSlug, facilityType),
          sql`${facilityType} = ANY(${facilities.facilityTypes})`
        )
      );

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by facility type:', error);
    return [];
  }
}

// ===== INSURANCE FUNCTIONS =====

export async function getFacilitiesByInsurance(insurance: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        sql`${insurance} = ANY(${facilities.insuranceAccepted})`
      );

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by insurance:', error);
    return [];
  }
}

// ===== SLUG UTILITIES =====

export function createSlug(name: string, city: string, state_abbr?: string): string {
  const base = state_abbr
    ? `${name}-${city}-${state_abbr}`
    : `${name}-${city}`;

  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createStateSlug(state: string): string {
  return state
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createCountySlug(county: string): string {
  return county
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createTypeSlug(type: string): string {
  return type
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ===== STATISTICS =====

export async function getStats() {
  try {
    const states = await getAllStates();
    const treatmentTypes = await getAllTreatmentTypes();
    const facilityTypes = await getAllFacilityTypes();

    // Use SQL aggregations for efficiency
    const [statsResult] = await db.select({
      totalFacilities: count(),
      statesWithFacilities: sql<number>`COUNT(DISTINCT ${facilities.state})`,
      citiesWithFacilities: sql<number>`COUNT(DISTINCT ${facilities.city})`,
      countiesWithFacilities: sql<number>`COUNT(DISTINCT ${facilities.county})`,
      withRatings: sql<number>`COUNT(*) FILTER (WHERE ${facilities.rating} IS NOT NULL)`,
      withPhotos: sql<number>`COUNT(*) FILTER (WHERE ${facilities.photoUrl} IS NOT NULL)`,
    }).from(facilities);

    return {
      total_facilities: Number(statsResult.totalFacilities),
      total_states: states.length,
      states_with_facilities: Number(statsResult.statesWithFacilities),
      cities_with_facilities: Number(statsResult.citiesWithFacilities),
      counties_with_facilities: Number(statsResult.countiesWithFacilities),
      total_treatment_types: treatmentTypes.length,
      total_facility_types: facilityTypes.length,
      with_ratings: Number(statsResult.withRatings),
      with_photos: Number(statsResult.withPhotos),
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      total_facilities: 0,
      total_states: 0,
      states_with_facilities: 0,
      cities_with_facilities: 0,
      counties_with_facilities: 0,
      total_treatment_types: 0,
      total_facility_types: 0,
      with_ratings: 0,
      with_photos: 0,
    };
  }
}

// ===== SEARCH =====

export async function searchFacilities(query: string, filters?: {
  state?: string;
  type?: string;
  city?: string;
  county?: string;
  treatmentType?: string;
  facilityType?: string;
  insurance?: string;
}): Promise<Facility[]> {
  try {
    // Build dynamic where conditions
    const conditions = [];

    if (filters?.state) {
      conditions.push(
        or(
          ilike(facilities.state, filters.state),
          ilike(facilities.stateAbbr, filters.state)
        )
      );
    }

    if (filters?.type) {
      conditions.push(
        or(
          ilike(facilities.type, `%${filters.type}%`),
          ilike(facilities.typeSlug, filters.type)
        )
      );
    }

    if (filters?.city) {
      conditions.push(ilike(facilities.city, filters.city));
    }

    if (filters?.county) {
      conditions.push(ilike(facilities.county, filters.county));
    }

    if (filters?.treatmentType) {
      conditions.push(
        sql`${filters.treatmentType} = ANY(${facilities.treatmentTypes})`
      );
    }

    if (filters?.facilityType) {
      conditions.push(
        sql`${filters.facilityType} = ANY(${facilities.facilityTypes})`
      );
    }

    if (filters?.insurance) {
      conditions.push(
        sql`${filters.insurance} = ANY(${facilities.insuranceAccepted})`
      );
    }

    // Add search query
    if (query && query.trim()) {
      const q = `%${query.trim()}%`;
      conditions.push(
        or(
          ilike(facilities.name, q),
          ilike(facilities.city, q),
          ilike(facilities.county, q),
          ilike(facilities.state, q),
          ilike(facilities.address, q),
          ilike(facilities.zipCode, q)
        )
      );
    }

    let dbQuery = db.select().from(facilities);

    if (conditions.length > 0) {
      dbQuery = dbQuery.where(and(...conditions)) as typeof dbQuery;
    }

    const results = await dbQuery
      .orderBy(desc(facilities.rating))
      .limit(100);

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error searching facilities:', error);
    return [];
  }
}

// ===== NEARBY FACILITIES =====

// Haversine distance calculation (fallback if no PostGIS)
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function getNearbyFacilities(
  lat: number,
  lon: number,
  radiusMiles: number = 25,
  limit: number = 20
): Promise<Array<Facility & { distance: number }>> {
  try {
    // Use database query with Haversine formula in SQL
    // This is more efficient than loading all facilities
    const results = await db.select()
      .from(facilities)
      .where(
        sql`${facilities.latitude} IS NOT NULL AND ${facilities.longitude} IS NOT NULL`
      )
      .limit(1000); // Get a reasonable number to filter

    // Calculate distances and filter client-side
    // TODO: Enable PostGIS for better performance
    const withDistance = results
      .map(row => ({
        ...mapRowToFacility(row),
        distance: haversineDistance(
          lat, lon,
          parseFloat(row.latitude!),
          parseFloat(row.longitude!)
        )
      }))
      .filter(c => c.distance <= radiusMiles)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);

    return withDistance;
  } catch (error) {
    console.error('Error loading nearby facilities:', error);
    return [];
  }
}

// ===== FEATURED/POPULAR =====

export async function getFeaturedFacilities(limit: number = 10): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        and(
          sql`${facilities.rating} IS NOT NULL`,
          sql`${facilities.reviewCount} > 0`
        )
      )
      .orderBy(
        desc(sql`${facilities.rating} * LOG(${facilities.reviewCount} + 1)`),
        desc(facilities.rating)
      )
      .limit(limit);

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading featured facilities:', error);
    return [];
  }
}

export async function getRecentlyUpdated(limit: number = 10): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(sql`${facilities.updatedAt} IS NOT NULL`)
      .orderBy(desc(facilities.updatedAt))
      .limit(limit);

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading recently updated facilities:', error);
    return [];
  }
}
