import { NextRequest, NextResponse } from 'next/server';
import { getShortlistedTeams } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const teams = await getShortlistedTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching shortlisted teams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shortlisted teams' },
      { status: 500 }
    );
  }
}
