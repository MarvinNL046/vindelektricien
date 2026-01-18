import { NextResponse } from 'next/server';
import { getCurrentUser, AuthUser } from './auth';

type AdminCheckResult =
  | { authorized: false; response: NextResponse; user: null }
  | { authorized: true; response: null; user: AuthUser };

export async function requireAdmin(): Promise<AdminCheckResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Not logged in' }, { status: 401 }),
      user: null,
    };
  }

  if (user.role !== 'admin') {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Access denied - admin rights required' }, { status: 403 }),
      user: null,
    };
  }

  return {
    authorized: true,
    response: null,
    user,
  };
}
