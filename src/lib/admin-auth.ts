import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AdminSession {
  email: string;
  loginTime: number;
  expiresAt: number;
}

// Session duration: 8 hours
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
const ADMIN_SESSION_COOKIE = 'admin-session';

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    console.error('Admin credentials not configured');
    return false;
  }
  
  return email === adminEmail && password === adminPassword;
}

export async function createAdminSession(email: string): Promise<void> {
  const now = Date.now();
  const session: AdminSession = {
    email,
    loginTime: now,
    expiresAt: now + SESSION_DURATION
  };
  
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/'
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);
    
    if (!sessionCookie?.value) {
      return null;
    }
    
    const session: AdminSession = JSON.parse(sessionCookie.value);
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      await clearAdminSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error parsing admin session:', error);
    await clearAdminSession();
    return null;
  }
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function requireAdminAuth(): Promise<AdminSession> {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/admin');
  }
  
  return session;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session !== null;
}
