import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
  decimal,
  boolean,
  index,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ==========================================
// FACILITIES TABLE - Treatment Centers
// ==========================================
export const facilities = pgTable('facilities', {
  id: serial('id').primaryKey(),

  // Core identifiers
  name: varchar('name', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),

  // Location - US geography
  address: text('address'),
  city: varchar('city', { length: 255 }).notNull(),
  county: varchar('county', { length: 255 }),
  state: varchar('state', { length: 255 }).notNull(),
  stateAbbr: varchar('state_abbr', { length: 10 }).notNull(),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 100 }).notNull().default('United States'),
  latitude: decimal('latitude', { precision: 10, scale: 7 }),
  longitude: decimal('longitude', { precision: 10, scale: 7 }),

  // Classification
  type: varchar('type', { length: 255 }).notNull().default('Treatment Center'),
  typeSlug: varchar('type_slug', { length: 255 }),
  facilityTypes: jsonb('facility_types').$type<string[]>().default([]),
  treatmentTypes: jsonb('treatment_types').$type<string[]>().default([]),
  insuranceAccepted: jsonb('insurance_accepted').$type<string[]>().default([]),

  // Contact
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: text('website'),

  // Details
  description: text('description'),
  openingHours: text('opening_hours'),
  amenities: jsonb('amenities').$type<string[]>().default([]),
  yearEstablished: varchar('year_established', { length: 10 }),
  bedCount: integer('bed_count'),
  accreditations: jsonb('accreditations').$type<string[]>().default([]),
  languages: jsonb('languages').$type<string[]>().default([]),

  // Google data
  googlePlaceId: varchar('google_place_id', { length: 255 }),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  reviewCount: integer('review_count'),
  photoUrl: text('photo_url'),
  photos: jsonb('photos').$type<string[]>().default([]),
  reviews: jsonb('reviews').$type<Array<{
    reviewer_name: string;
    rating: number;
    review_text: string;
    review_date: string;
    reviewer_image?: string;
  }>>().default([]),

  // Generated/enriched content
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  enrichedContent: text('enriched_content'),
  generatedSummary: text('generated_summary'),
  generatedAbout: text('generated_about'),
  generatedFeatures: jsonb('generated_features').$type<string[]>().default([]),
  generatedAmenities: jsonb('generated_amenities').$type<string[]>().default([]),
  generatedVisitorTips: jsonb('generated_visitor_tips').$type<string[]>().default([]),
  generatedDirections: text('generated_directions'),
  generatedLocalContext: text('generated_local_context'),
  enrichedAt: timestamp('enriched_at'),

  // Ownership/claiming
  claimed: boolean('claimed').default(false),
  claimedBy: integer('claimed_by'),
  claimedAt: timestamp('claimed_at'),
  verified: boolean('verified').default(false),
  verifiedAt: timestamp('verified_at'),

  // Metadata
  status: varchar('status', { length: 50 }).default('active'),
  featured: boolean('featured').default(false),
  source: varchar('source', { length: 100 }),
  sourceUrl: text('source_url'),
  discoveredAt: timestamp('discovered_at'),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  // Performance indexes
  uniqueIndex('facilities_slug_idx').on(table.slug),
  index('facilities_city_idx').on(table.city),
  index('facilities_state_idx').on(table.state),
  index('facilities_state_abbr_idx').on(table.stateAbbr),
  index('facilities_county_idx').on(table.county),
  index('facilities_type_idx').on(table.type),
  index('facilities_type_slug_idx').on(table.typeSlug),
  index('facilities_zip_code_idx').on(table.zipCode),
  index('facilities_rating_idx').on(table.rating),
  index('facilities_status_idx').on(table.status),
  index('facilities_featured_idx').on(table.featured),
  index('facilities_claimed_idx').on(table.claimed),
  // Composite indexes for common queries
  index('facilities_city_state_idx').on(table.city, table.stateAbbr),
  index('facilities_county_state_idx').on(table.county, table.stateAbbr),
]);

// ==========================================
// USERS TABLE - Authentication
// ==========================================
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: text('password_hash'),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  avatar: text('avatar'),
  phone: varchar('phone', { length: 50 }),
  emailVerified: timestamp('email_verified'),
  verificationCode: varchar('verification_code', { length: 6 }),
  verificationExpires: timestamp('verification_expires'),
  resetToken: varchar('reset_token', { length: 255 }),
  resetTokenExpires: timestamp('reset_token_expires'),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  uniqueIndex('users_email_idx').on(table.email),
  index('users_role_idx').on(table.role),
]);

// ==========================================
// CLAIMS TABLE - Facility ownership claims
// ==========================================
export const claims = pgTable('claims', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  facilitySlug: varchar('facility_slug', { length: 500 }).notNull(),
  businessRole: varchar('business_role', { length: 100 }).notNull(),
  claimantName: varchar('claimant_name', { length: 255 }).notNull(),
  claimantPhone: varchar('claimant_phone', { length: 50 }),
  verificationEmail: varchar('verification_email', { length: 255 }).notNull(),
  verificationCode: varchar('verification_code', { length: 6 }),
  verificationExpires: timestamp('verification_expires'),
  emailVerified: boolean('email_verified').default(false),
  notes: text('notes'),
  adminNotes: text('admin_notes'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  reviewedBy: integer('reviewed_by').references(() => users.id),
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  index('claims_user_id_idx').on(table.userId),
  index('claims_facility_slug_idx').on(table.facilitySlug),
  index('claims_status_idx').on(table.status),
]);

// ==========================================
// REVIEWS TABLE - User reviews
// ==========================================
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  facilitySlug: varchar('facility_slug', { length: 500 }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  reviewerName: varchar('reviewer_name', { length: 255 }).notNull(),
  reviewerEmail: varchar('reviewer_email', { length: 255 }),
  rating: integer('rating').notNull(),
  title: varchar('title', { length: 255 }),
  reviewText: text('review_text'),
  treatmentType: varchar('treatment_type', { length: 100 }),
  stayDuration: varchar('stay_duration', { length: 100 }),
  wouldRecommend: boolean('would_recommend'),
  helpful: integer('helpful').default(0),
  reported: boolean('reported').default(false),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  moderatedBy: integer('moderated_by').references(() => users.id),
  moderatedAt: timestamp('moderated_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('reviews_facility_slug_idx').on(table.facilitySlug),
  index('reviews_user_id_idx').on(table.userId),
  index('reviews_status_idx').on(table.status),
  index('reviews_rating_idx').on(table.rating),
]);

// ==========================================
// PHOTOS TABLE - User-submitted photos
// ==========================================
export const photos = pgTable('photos', {
  id: serial('id').primaryKey(),
  facilitySlug: varchar('facility_slug', { length: 500 }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  uploaderName: varchar('uploader_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  caption: text('caption'),
  altText: varchar('alt_text', { length: 500 }),
  width: integer('width'),
  height: integer('height'),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  moderatedBy: integer('moderated_by').references(() => users.id),
  moderatedAt: timestamp('moderated_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('photos_facility_slug_idx').on(table.facilitySlug),
  index('photos_user_id_idx').on(table.userId),
  index('photos_status_idx').on(table.status),
]);

// ==========================================
// FEEDBACK TABLE - Site feedback
// ==========================================
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  facilitySlug: varchar('facility_slug', { length: 500 }),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  type: varchar('type', { length: 50 }).default('general'),
  status: varchar('status', { length: 50 }).default('new'),
  respondedBy: integer('responded_by').references(() => users.id),
  respondedAt: timestamp('responded_at'),
  response: text('response'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('feedback_facility_slug_idx').on(table.facilitySlug),
  index('feedback_type_idx').on(table.type),
  index('feedback_status_idx').on(table.status),
]);

// ==========================================
// SAVED FACILITIES TABLE - User favorites
// ==========================================
export const savedFacilities = pgTable('saved_facilities', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  facilitySlug: varchar('facility_slug', { length: 500 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('saved_facilities_user_id_idx').on(table.userId),
  index('saved_facilities_facility_slug_idx').on(table.facilitySlug),
  uniqueIndex('saved_facilities_user_facility_idx').on(table.userId, table.facilitySlug),
]);

// ==========================================
// CONTACT REQUESTS TABLE - Facility inquiries
// ==========================================
export const contactRequests = pgTable('contact_requests', {
  id: serial('id').primaryKey(),
  facilitySlug: varchar('facility_slug', { length: 500 }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  message: text('message'),
  insuranceType: varchar('insurance_type', { length: 100 }),
  treatmentType: varchar('treatment_type', { length: 100 }),
  urgency: varchar('urgency', { length: 50 }),
  status: varchar('status', { length: 50 }).default('new'),
  forwardedToFacility: boolean('forwarded_to_facility').default(false),
  forwardedAt: timestamp('forwarded_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('contact_requests_facility_slug_idx').on(table.facilitySlug),
  index('contact_requests_status_idx').on(table.status),
]);

// ==========================================
// RELATIONS
// ==========================================

export const usersRelations = relations(users, ({ many }) => ({
  claims: many(claims),
  reviews: many(reviews),
  photos: many(photos),
  savedFacilities: many(savedFacilities),
  contactRequests: many(contactRequests),
}));

export const claimsRelations = relations(claims, ({ one }) => ({
  user: one(users, {
    fields: [claims.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [claims.reviewedBy],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  moderator: one(users, {
    fields: [reviews.moderatedBy],
    references: [users.id],
  }),
}));

export const photosRelations = relations(photos, ({ one }) => ({
  user: one(users, {
    fields: [photos.userId],
    references: [users.id],
  }),
  moderator: one(users, {
    fields: [photos.moderatedBy],
    references: [users.id],
  }),
}));

export const savedFacilitiesRelations = relations(savedFacilities, ({ one }) => ({
  user: one(users, {
    fields: [savedFacilities.userId],
    references: [users.id],
  }),
}));

export const contactRequestsRelations = relations(contactRequests, ({ one }) => ({
  user: one(users, {
    fields: [contactRequests.userId],
    references: [users.id],
  }),
}));

// ==========================================
// TYPE EXPORTS
// ==========================================

export type Facility = typeof facilities.$inferSelect;
export type NewFacility = typeof facilities.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Claim = typeof claims.$inferSelect;
export type NewClaim = typeof claims.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

export type Photo = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;

export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;

export type SavedFacility = typeof savedFacilities.$inferSelect;
export type NewSavedFacility = typeof savedFacilities.$inferInsert;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type NewContactRequest = typeof contactRequests.$inferInsert;
