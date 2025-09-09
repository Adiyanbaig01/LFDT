import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an admin route (but not the login page or API routes)
  if (pathname.startsWith('/admin') && pathname !== '/admin' && !pathname.startsWith('/admin/api')) {
    try {
      const session = await getAdminSession();
      
      if (!session) {
        // Redirect to admin login
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Check if admin is trying to access login page while already authenticated
  if (pathname === '/admin') {
    try {
      const session = await getAdminSession();
      
      if (session) {
        // Redirect to admin dashboard
        return NextResponse.redirect(new URL('/admin/buildathon', request.url));
      }
    } catch (error) {
      // Continue to login page if there's an error
      console.error('Middleware error on login check:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
