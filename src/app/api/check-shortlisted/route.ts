import { NextRequest, NextResponse } from 'next/server';
import { isUserShortlisted } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const isShortlisted = await isUserShortlisted(userId);
    
    return NextResponse.json({ isShortlisted });
  } catch (error) {
    console.error('Error checking shortlisted status:', error);
    return NextResponse.json(
      { error: 'Failed to check shortlisted status' },
      { status: 500 }
    );
  }
}
