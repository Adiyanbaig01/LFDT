import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { shortlistTeam, removeFromShortlist } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const adminSession = await requireAdminAuth();

    const { userId, action } = await request.json();

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'User ID and action are required' },
        { status: 400 }
      );
    }

    if (action === 'add') {
      await shortlistTeam(userId, adminSession.email);
    } else if (action === 'remove') {
      await removeFromShortlist(userId);
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Must be "add" or "remove"' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating shortlist:', error);
    
    if (error instanceof Error && error.message.includes('redirect')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return NextResponse.json(
      { error: 'Failed to update shortlist' },
      { status: 500 }
    );
  }
}
