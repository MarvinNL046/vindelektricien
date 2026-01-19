import { pgTable, serial, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  role: varchar('role', { length: 50 }).notNull().default('user'), // user, admin
  emailVerified: boolean('email_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Verification codes table
export const verificationCodes = pgTable('verification_codes', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  code: varchar('code', { length: 6 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'register', 'login', 'reset_password'
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Business claims table (Elektricien claims)
export const businessClaims = pgTable('business_claims', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  facilitySlug: varchar('facility_slug', { length: 255 }).notNull(),
  facilityName: varchar('facility_name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  jobTitle: varchar('job_title', { length: 255 }), // eigenaar, medewerker, manager
  companyName: varchar('company_name', { length: 255 }),
  message: text('message'), // Waarom claim
  verificationMethod: varchar('verification_method', { length: 50 }), // email, phone, document
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: integer('reviewed_by'),
  rejectionReason: text('rejection_reason'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Business edits - track changes made by claimed business owners
export const businessEdits = pgTable('business_edits', {
  id: serial('id').primaryKey(),
  claimId: integer('claim_id').notNull().references(() => businessClaims.id),
  userId: integer('user_id').notNull().references(() => users.id),
  facilitySlug: varchar('facility_slug', { length: 255 }).notNull(),
  fieldName: varchar('field_name', { length: 100 }).notNull(),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Sessions table for JWT refresh tokens
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  refreshToken: varchar('refresh_token', { length: 500 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// User-submitted electricians (Elektriciens)
export const userFacilities = pgTable('user_facilities', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),

  // Basic info
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  type: varchar('type', { length: 100 }).notNull().default('elektricien'),

  // Location - Dutch geography
  address: varchar('address', { length: 255 }),
  postalCode: varchar('postal_code', { length: 10 }),
  city: varchar('city', { length: 100 }).notNull(),
  municipality: varchar('municipality', { length: 100 }),  // Gemeente
  province: varchar('province', { length: 50 }).notNull(),  // Provincie
  gpsCoordinates: varchar('gps_coordinates', { length: 50 }),

  // Contact
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 500 }),

  // Details
  description: text('description'),
  openingHours: text('opening_hours'),
  serviceTypes: text('service_types'), // JSON array - storingen, installatie, laadpaal, etc.
  certifications: text('certifications'), // JSON array - Erkend, VCA, NEN
  yearEstablished: varchar('year_established', { length: 10 }),
  hasEmergencyService: boolean('has_emergency_service').default(false), // 24/7 spoed

  // Photos (JSON array of URLs)
  photos: text('photos'), // JSON array

  // Status
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, rejected
  rejectionReason: text('rejection_reason'),
  reviewedAt: timestamp('reviewed_at'),
  reviewedBy: integer('reviewed_by'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Feedback table
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull().default('rating'), // rating, comment
  rating: integer('rating'), // 1-5 stars
  feedback: text('feedback'), // comment text
  pageTitle: varchar('page_title', { length: 255 }),
  pageUrl: varchar('page_url', { length: 500 }),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, read, resolved
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type BusinessClaim = typeof businessClaims.$inferSelect;
export type NewBusinessClaim = typeof businessClaims.$inferInsert;
export type BusinessEdit = typeof businessEdits.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type UserFacility = typeof userFacilities.$inferSelect;
export type NewUserFacility = typeof userFacilities.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;
