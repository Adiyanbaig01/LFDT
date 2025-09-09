import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { getAllBuildathonRegistrations, formatTeamsForCSV } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAdminAuth();

    const { searchParams } = new URL(request.url);
    const shortlistedOnly = searchParams.get('shortlistedOnly') === 'true';

    const teams = await getAllBuildathonRegistrations();
    const csvContent = formatTeamsForCSV(teams, shortlistedOnly);

    const filename = `buildathon-teams${shortlistedOnly ? '-shortlisted' : ''}.csv`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    
    if (error instanceof Error && error.message.includes('redirect')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
