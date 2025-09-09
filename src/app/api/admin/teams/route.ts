import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { getAllBuildathonRegistrations } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAdminAuth();

    const teams = await getAllBuildathonRegistrations();
    
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
