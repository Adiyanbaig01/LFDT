import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { getAllBuildathonRegistrations } from '@/lib/firebase/admin';

export async function GET() {
  try {
    console.log('[ADMIN API] Fetching teams - verifying admin auth...');
    // Verify admin authentication
    await requireAdminAuth();
    console.log('[ADMIN API] Admin auth verified, fetching teams...');

    const teams = await getAllBuildathonRegistrations();
    console.log(`[ADMIN API] Found ${teams.length} teams`);
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    
    if (error instanceof Error && error.message.includes('redirect')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}
