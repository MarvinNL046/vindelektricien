import { sql } from 'drizzle-orm';
import { db } from './index';

/**
 * Execute database operations with Row Level Security context
 *
 * This sets the current user ID in the PostgreSQL session,
 * allowing RLS policies to access it via auth.user_id()
 *
 * @example
 * // In an API route:
 * const user = await getCurrentUser();
 * const reviews = await withRLS(user?.id, async () => {
 *   return db.select().from(reviews);
 * });
 *
 * @example
 * // For admin operations:
 * const allData = await withRLS(adminUser.id, async () => {
 *   return db.select().from(users); // Admin can see all users
 * });
 */
export async function withRLS<T>(
  userId: number | null | undefined,
  operation: () => Promise<T>
): Promise<T> {
  if (userId) {
    // Set the user context for this session
    await db.execute(sql`SET LOCAL app.current_user_id = ${userId.toString()}`);
  } else {
    // Clear any existing user context (anonymous user)
    await db.execute(sql`SET LOCAL app.current_user_id = ''`);
  }

  return operation();
}

/**
 * Execute database operations as a specific user (for testing or impersonation)
 * Use with caution - only for admin/testing purposes
 */
export async function withRLSAsUser<T>(
  userId: number,
  operation: () => Promise<T>
): Promise<T> {
  await db.execute(sql`SET LOCAL app.current_user_id = ${userId.toString()}`);
  return operation();
}

/**
 * Execute database operations without RLS (bypass mode)
 * This requires the database connection to have appropriate privileges
 *
 * WARNING: This bypasses all RLS policies. Use only for:
 * - System operations (cron jobs, migrations)
 * - Admin tools with explicit authorization checks
 * - Background workers
 */
export async function withoutRLS<T>(
  operation: () => Promise<T>
): Promise<T> {
  // Clear user context to ensure no RLS context is set
  await db.execute(sql`SET LOCAL app.current_user_id = ''`);
  // Note: To fully bypass RLS, the database role needs BYPASSRLS privilege
  // or you need to use a service role connection
  return operation();
}

/**
 * Get the current user ID from the session context
 * Useful for debugging or in database functions
 */
export async function getCurrentRLSUserId(): Promise<number | null> {
  const result = await db.execute(sql`SELECT current_setting('app.current_user_id', true) as user_id`);
  const userId = (result as any)[0]?.user_id;
  return userId ? parseInt(userId, 10) : null;
}

/**
 * Check if the current session is admin
 * Uses the auth.is_admin() function defined in the database
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const result = await db.execute(sql`SELECT auth.is_admin() as is_admin`);
  return (result as any)[0]?.is_admin === true;
}
