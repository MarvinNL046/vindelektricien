import { promises as fs } from 'fs';
import path from 'path';
import { db, facilities } from './db';
import { eq, ilike, or, desc, asc, sql, and, count } from 'drizzle-orm';

// Dutch Electrician Interface
export interface Facility {
  // Core identifiers
  id: string;
  name: string;
  slug: string;

  // Location - Dutch geography
  address?: string;
  city: string;
  municipality?: string;  // Gemeente
  province: string;       // Provincie (was state)
  province_abbr: string;  // Afkorting
  postalCode?: string;
  country: string;
  gps_coordinates?: string;
  latitude?: number;
  longitude?: number;

  // Classification - Electrician specific
  type: string;
  type_slug: string;
  service_types: string[];     // storingen, installatie, laadpaal, etc.
  specializations: string[];   // particulier, zakelijk, industrieel
  certifications: string[];    // Erkend, VCA, NEN, KOMO

  // Contact
  phone?: string;
  email?: string;
  website?: string;

  // Details
  description?: string;
  opening_hours?: string;
  services?: string[];
  year_established?: string;
  has_emergency_service?: boolean;  // 24/7 spoed
  work_area?: string[];            // Werkgebied

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
  services: string[];
  accessibility: string;
  amenities: string[];
  visitor_tips: string[];
  local_context?: string;
  province_info?: string;
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

// Province interface (Dutch)
export interface Province {
  name: string;
  abbr: string;
  slug: string;
  municipalities?: number;
  capital?: string;
  major_cities?: string[];
}

// Alias for backwards compatibility
export type State = Province;

// Service type interface
export interface ServiceType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
}

// Alias for backwards compatibility
export type TreatmentType = ServiceType;

// Electrician type interface
export interface ElectricianType {
  slug: string;
  name: string;
  description?: string;
  search_terms?: string[];
}

// Alias for backwards compatibility
export type FacilityType = ElectricianType;

// Cache for static data (provinces and types only)
let provincesCache: Province[] | null = null;
let serviceTypesCache: ServiceType[] | null = null;
let electricianTypesCache: ElectricianType[] | null = null;

// ===== HELPER: Map database row to Facility interface =====

function mapRowToFacility(row: typeof facilities.$inferSelect): Facility {
  return {
    id: row.id.toString(),
    name: row.name,
    slug: row.slug,
    address: row.address || undefined,
    city: row.city,
    municipality: row.municipality || undefined,
    province: row.province,
    province_abbr: row.provinceAbbr,
    postalCode: row.postalCode || undefined,
    country: row.country,
    latitude: row.latitude ? parseFloat(row.latitude) : undefined,
    longitude: row.longitude ? parseFloat(row.longitude) : undefined,
    type: row.type,
    type_slug: row.typeSlug || row.type.toLowerCase().replace(/\s+/g, '-'),
    service_types: row.serviceTypes || [],
    specializations: row.specializations || [],
    certifications: row.certifications || [],
    phone: row.phone || undefined,
    email: row.email || undefined,
    website: row.website || undefined,
    description: row.description || undefined,
    opening_hours: row.openingHours || undefined,
    services: row.services || undefined,
    year_established: row.yearEstablished || undefined,
    has_emergency_service: row.hasEmergencyService || false,
    work_area: row.workArea || undefined,
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
      services: row.generatedServices || [],
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

// ===== PROVINCE FUNCTIONS =====

export async function getAllStates(): Promise<Province[]> {
  return getAllProvinces();
}

export async function getAllProvinces(): Promise<Province[]> {
  if (provincesCache) return provincesCache;

  try {
    const provincesPath = path.join(process.cwd(), 'data', 'states.json');
    const content = await fs.readFile(provincesPath, 'utf-8');
    const data = JSON.parse(content);
    provincesCache = data.states as Province[];
    return provincesCache;
  } catch (error) {
    console.error('Error loading provinces:', error);
    return [];
  }
}

export async function getStateBySlug(slug: string): Promise<Province | null> {
  return getProvinceBySlug(slug);
}

export async function getProvinceBySlug(slug: string): Promise<Province | null> {
  const provinces = await getAllProvinces();
  return provinces.find(s => s.slug === slug) || null;
}

export async function getStateByAbbr(abbr: string): Promise<Province | null> {
  return getProvinceByAbbr(abbr);
}

export async function getProvinceByAbbr(abbr: string): Promise<Province | null> {
  const provinces = await getAllProvinces();
  return provinces.find(s => s.abbr.toLowerCase() === abbr.toLowerCase()) || null;
}

export async function getFacilitiesByState(province: string): Promise<Facility[]> {
  return getFacilitiesByProvince(province);
}

export async function getFacilitiesByProvince(province: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        or(
          ilike(facilities.province, province),
          ilike(facilities.provinceAbbr, province)
        )
      );
    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by province:', error);
    return [];
  }
}

// ===== MUNICIPALITY FUNCTIONS =====

export async function getAllCounties(): Promise<string[]> {
  return getAllMunicipalities();
}

export async function getAllMunicipalities(): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ municipality: facilities.municipality })
      .from(facilities)
      .where(sql`${facilities.municipality} IS NOT NULL AND ${facilities.municipality} != ''`)
      .orderBy(asc(facilities.municipality));

    return results.map(r => r.municipality!).filter(Boolean);
  } catch (error) {
    console.error('Error loading municipalities:', error);
    return [];
  }
}

export async function getCountiesByState(province: string): Promise<string[]> {
  return getMunicipalitiesByProvince(province);
}

export async function getMunicipalitiesByProvince(province: string): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ municipality: facilities.municipality })
      .from(facilities)
      .where(
        and(
          sql`${facilities.municipality} IS NOT NULL AND ${facilities.municipality} != ''`,
          or(
            ilike(facilities.province, province),
            ilike(facilities.provinceAbbr, province)
          )
        )
      )
      .orderBy(asc(facilities.municipality));

    return results.map(r => r.municipality!).filter(Boolean);
  } catch (error) {
    console.error('Error loading municipalities by province:', error);
    return [];
  }
}

export async function getFacilitiesByCounty(municipality: string, province?: string): Promise<Facility[]> {
  return getFacilitiesByMunicipality(municipality, province);
}

export async function getFacilitiesByMunicipality(municipality: string, province?: string): Promise<Facility[]> {
  try {
    let whereClause = ilike(facilities.municipality, municipality);

    if (province) {
      whereClause = and(
        whereClause,
        or(
          ilike(facilities.province, province),
          ilike(facilities.provinceAbbr, province)
        )
      )!;
    }

    const results = await db.select()
      .from(facilities)
      .where(whereClause);

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by municipality:', error);
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

export async function getCitiesByState(province: string): Promise<string[]> {
  return getCitiesByProvince(province);
}

export async function getCitiesByProvince(province: string): Promise<string[]> {
  try {
    const results = await db.selectDistinct({ city: facilities.city })
      .from(facilities)
      .where(
        and(
          sql`${facilities.city} IS NOT NULL AND ${facilities.city} != ''`,
          or(
            ilike(facilities.province, province),
            ilike(facilities.provinceAbbr, province)
          )
        )
      )
      .orderBy(asc(facilities.city));

    return results.map(r => r.city).filter(Boolean);
  } catch (error) {
    console.error('Error loading cities by province:', error);
    return [];
  }
}

export async function getFacilitiesByCity(city: string, province?: string): Promise<Facility[]> {
  try {
    let whereClause = ilike(facilities.city, city);

    if (province) {
      whereClause = and(
        whereClause,
        or(
          ilike(facilities.province, province),
          ilike(facilities.provinceAbbr, province)
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

// ===== SERVICE TYPE FUNCTIONS =====

export async function getAllTreatmentTypes(): Promise<ServiceType[]> {
  return getAllServiceTypes();
}

export async function getAllServiceTypes(): Promise<ServiceType[]> {
  if (serviceTypesCache) return serviceTypesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'treatment-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    serviceTypesCache = data.types as ServiceType[];
    return serviceTypesCache;
  } catch (error) {
    console.error('Error loading service types:', error);
    return [];
  }
}

export async function getTreatmentTypeBySlug(slug: string): Promise<ServiceType | null> {
  return getServiceTypeBySlug(slug);
}

export async function getServiceTypeBySlug(slug: string): Promise<ServiceType | null> {
  const types = await getAllServiceTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getFacilitiesByTreatmentType(serviceType: string): Promise<Facility[]> {
  return getFacilitiesByServiceType(serviceType);
}

export async function getFacilitiesByServiceType(serviceType: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        sql`${serviceType} = ANY(${facilities.serviceTypes})`
      );

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by service type:', error);
    return [];
  }
}

// ===== ELECTRICIAN TYPE FUNCTIONS =====

export async function getAllFacilityTypes(): Promise<ElectricianType[]> {
  return getAllElectricianTypes();
}

export async function getAllElectricianTypes(): Promise<ElectricianType[]> {
  if (electricianTypesCache) return electricianTypesCache;

  try {
    const typesPath = path.join(process.cwd(), 'data', 'facility-types.json');
    const content = await fs.readFile(typesPath, 'utf-8');
    const data = JSON.parse(content);
    electricianTypesCache = data.types as ElectricianType[];
    return electricianTypesCache;
  } catch (error) {
    console.error('Error loading electrician types:', error);
    return [];
  }
}

export async function getFacilityTypeBySlug(slug: string): Promise<ElectricianType | null> {
  return getElectricianTypeBySlug(slug);
}

export async function getElectricianTypeBySlug(slug: string): Promise<ElectricianType | null> {
  const types = await getAllElectricianTypes();
  return types.find(t => t.slug === slug) || null;
}

export async function getFacilitiesByFacilityType(electricianType: string): Promise<Facility[]> {
  return getFacilitiesByElectricianType(electricianType);
}

export async function getFacilitiesByElectricianType(electricianType: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        or(
          ilike(facilities.type, electricianType),
          ilike(facilities.typeSlug, electricianType),
          sql`${electricianType} = ANY(${facilities.specializations})`
        )
      );

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by electrician type:', error);
    return [];
  }
}

// ===== CERTIFICATION FUNCTIONS =====

export async function getFacilitiesByCertification(certification: string): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        sql`${certification} = ANY(${facilities.certifications})`
      );

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading facilities by certification:', error);
    return [];
  }
}

// Legacy compatibility
export async function getFacilitiesByInsurance(certification: string): Promise<Facility[]> {
  return getFacilitiesByCertification(certification);
}

// ===== EMERGENCY SERVICE FUNCTION =====

export async function getEmergencyElectricians(): Promise<Facility[]> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(eq(facilities.hasEmergencyService, true));

    return results.map(mapRowToFacility);
  } catch (error) {
    console.error('Error loading emergency electricians:', error);
    return [];
  }
}

// ===== SLUG UTILITIES =====

export function createSlug(name: string, city: string, province_abbr?: string): string {
  const base = province_abbr
    ? `${name}-${city}-${province_abbr}`
    : `${name}-${city}`;

  return base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createStateSlug(province: string): string {
  return createProvinceSlug(province);
}

export function createProvinceSlug(province: string): string {
  return province
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function createCountySlug(municipality: string): string {
  return createMunicipalitySlug(municipality);
}

export function createMunicipalitySlug(municipality: string): string {
  return municipality
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
    const provinces = await getAllProvinces();
    const serviceTypes = await getAllServiceTypes();
    const electricianTypes = await getAllElectricianTypes();

    // Use SQL aggregations for efficiency
    const [statsResult] = await db.select({
      totalFacilities: count(),
      provincesWithFacilities: sql<number>`COUNT(DISTINCT ${facilities.province})`,
      citiesWithFacilities: sql<number>`COUNT(DISTINCT ${facilities.city})`,
      municipalitiesWithFacilities: sql<number>`COUNT(DISTINCT ${facilities.municipality})`,
      withRatings: sql<number>`COUNT(*) FILTER (WHERE ${facilities.rating} IS NOT NULL)`,
      withPhotos: sql<number>`COUNT(*) FILTER (WHERE ${facilities.photoUrl} IS NOT NULL)`,
      withEmergencyService: sql<number>`COUNT(*) FILTER (WHERE ${facilities.hasEmergencyService} = true)`,
    }).from(facilities);

    return {
      total_facilities: Number(statsResult.totalFacilities),
      total_provinces: provinces.length,
      provinces_with_facilities: Number(statsResult.provincesWithFacilities),
      cities_with_facilities: Number(statsResult.citiesWithFacilities),
      municipalities_with_facilities: Number(statsResult.municipalitiesWithFacilities),
      total_service_types: serviceTypes.length,
      total_electrician_types: electricianTypes.length,
      with_ratings: Number(statsResult.withRatings),
      with_photos: Number(statsResult.withPhotos),
      with_emergency_service: Number(statsResult.withEmergencyService),
      // Legacy compatibility
      total_states: provinces.length,
      states_with_facilities: Number(statsResult.provincesWithFacilities),
      counties_with_facilities: Number(statsResult.municipalitiesWithFacilities),
      total_treatment_types: serviceTypes.length,
      total_facility_types: electricianTypes.length,
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    return {
      total_facilities: 0,
      total_provinces: 0,
      provinces_with_facilities: 0,
      cities_with_facilities: 0,
      municipalities_with_facilities: 0,
      total_service_types: 0,
      total_electrician_types: 0,
      with_ratings: 0,
      with_photos: 0,
      with_emergency_service: 0,
      total_states: 0,
      states_with_facilities: 0,
      counties_with_facilities: 0,
      total_treatment_types: 0,
      total_facility_types: 0,
    };
  }
}

// ===== SEARCH =====

export async function searchFacilities(query: string, filters?: {
  province?: string;
  type?: string;
  city?: string;
  municipality?: string;
  serviceType?: string;
  electricianType?: string;
  certification?: string;
  hasEmergencyService?: boolean;
  // Legacy compatibility
  state?: string;
  county?: string;
  treatmentType?: string;
  facilityType?: string;
  insurance?: string;
}): Promise<Facility[]> {
  try {
    // Build dynamic where conditions
    const conditions = [];

    // Province filter (also check state for backwards compat)
    const provinceFilter = filters?.province || filters?.state;
    if (provinceFilter) {
      conditions.push(
        or(
          ilike(facilities.province, provinceFilter),
          ilike(facilities.provinceAbbr, provinceFilter)
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

    // Municipality filter (also check county for backwards compat)
    const municipalityFilter = filters?.municipality || filters?.county;
    if (municipalityFilter) {
      conditions.push(ilike(facilities.municipality, municipalityFilter));
    }

    // Service type filter (also check treatmentType for backwards compat)
    const serviceTypeFilter = filters?.serviceType || filters?.treatmentType;
    if (serviceTypeFilter) {
      conditions.push(
        sql`${serviceTypeFilter} = ANY(${facilities.serviceTypes})`
      );
    }

    // Electrician type filter (also check facilityType for backwards compat)
    const electricianTypeFilter = filters?.electricianType || filters?.facilityType;
    if (electricianTypeFilter) {
      conditions.push(
        sql`${electricianTypeFilter} = ANY(${facilities.specializations})`
      );
    }

    // Certification filter (also check insurance for backwards compat)
    const certificationFilter = filters?.certification || filters?.insurance;
    if (certificationFilter) {
      conditions.push(
        sql`${certificationFilter} = ANY(${facilities.certifications})`
      );
    }

    if (filters?.hasEmergencyService) {
      conditions.push(eq(facilities.hasEmergencyService, true));
    }

    // Add search query
    if (query && query.trim()) {
      const q = `%${query.trim()}%`;
      conditions.push(
        or(
          ilike(facilities.name, q),
          ilike(facilities.city, q),
          ilike(facilities.municipality, q),
          ilike(facilities.province, q),
          ilike(facilities.address, q),
          ilike(facilities.postalCode, q)
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

// Haversine distance calculation (kilometers for Netherlands)
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
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
  radiusKm: number = 25,
  limit: number = 20
): Promise<Array<Facility & { distance: number }>> {
  try {
    const results = await db.select()
      .from(facilities)
      .where(
        sql`${facilities.latitude} IS NOT NULL AND ${facilities.longitude} IS NOT NULL`
      )
      .limit(1000);

    // Calculate distances and filter
    const withDistance = results
      .map(row => ({
        ...mapRowToFacility(row),
        distance: haversineDistance(
          lat, lon,
          parseFloat(row.latitude!),
          parseFloat(row.longitude!)
        )
      }))
      .filter(c => c.distance <= radiusKm)
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
