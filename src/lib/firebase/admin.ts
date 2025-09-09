import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc, Timestamp, orderBy } from 'firebase/firestore';
import { db } from './config';
import { EventRegistration } from './auth';

export interface TeamWithUser {
  registration: EventRegistration;
  userData: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    createdAt: any;
  };
  isShortlisted: boolean;
}

export interface ShortlistedTeam {
  eventId: string;
  userId: string;
  userEmail: string;
  teamName: string;
  shortlistedAt: Timestamp;
  shortlistedBy: string;
  registrationId: string;
}

// Get all buildathon registrations with user data
export async function getAllBuildathonRegistrations(): Promise<TeamWithUser[]> {
  try {
    const eventId = 'buildathon-2025';
    
    // Get all event registrations for buildathon
    const registrationsQuery = query(
      collection(db, 'eventRegistrations'),
      where('eventId', '==', eventId)
    );
    const registrationsSnapshot = await getDocs(registrationsQuery);
    
    // Get shortlisted teams
    const shortlistedQuery = query(
      collection(db, 'shortlistedTeams'),
      where('eventId', '==', eventId)
    );
    const shortlistedSnapshot = await getDocs(shortlistedQuery);
    
    const shortlistedUserIds = new Set(
      shortlistedSnapshot.docs.map(doc => doc.data().userId)
    );
    
    const teams: TeamWithUser[] = [];
    
    for (const docSnapshot of registrationsSnapshot.docs) {
      const registration = docSnapshot.data() as EventRegistration;
      
      // Get user data
      const userDocRef = doc(db, 'users', registration.userId);
      const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', registration.userId)));
      
      let userData = null;
      if (!userDoc.empty) {
        userData = userDoc.docs[0].data();
      }
      
      if (userData) {
        teams.push({
          registration,
          userData: {
            uid: userData.uid,
            email: userData.email,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            createdAt: userData.createdAt,
          },
          isShortlisted: shortlistedUserIds.has(registration.userId),
        });
      }
    }
    
    return teams.sort((a, b) => {
      const aTime = a.registration.createdAt?.toDate?.()?.getTime() || 0;
      const bTime = b.registration.createdAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime; // Most recent first
    });
  } catch (error) {
    console.error('Error getting buildathon registrations:', error);
    throw new Error('Failed to fetch registrations');
  }
}

// Shortlist a team
export async function shortlistTeam(userId: string, adminEmail: string): Promise<void> {
  try {
    const eventId = 'buildathon-2025';
    const registrationId = `${eventId}_${userId}`;
    
    // Get the registration data
    const registrationDoc = await adminDb
      .collection('eventRegistrations')
      .doc(registrationId)
      .get();
    
    if (!registrationDoc.exists) {
      throw new Error('Registration not found');
    }
    
    const registration = registrationDoc.data() as EventRegistration;
    
    // Create shortlisted team entry
    const shortlistedData: ShortlistedTeam = {
      eventId,
      userId,
      userEmail: registration.userEmail,
      teamName: registration.team.teamName,
      shortlistedAt: new Date() as any,
      shortlistedBy: adminEmail,
      registrationId,
    };
    
    const shortlistedId = `${eventId}_${userId}`;
    await adminDb
      .collection('shortlistedTeams')
      .doc(shortlistedId)
      .set(shortlistedData);
    
    // Update user profile to indicate shortlisted status
    await adminDb
      .collection('users')
      .doc(userId)
      .update({
        shortlistedForBuildathon: true,
        shortlistedAt: new Date(),
      });
      
  } catch (error) {
    console.error('Error shortlisting team:', error);
    throw new Error('Failed to shortlist team');
  }
}

// Remove team from shortlist
export async function removeFromShortlist(userId: string): Promise<void> {
  try {
    const eventId = 'buildathon-2025';
    const shortlistedId = `${eventId}_${userId}`;
    
    // Remove from shortlisted teams
    await adminDb
      .collection('shortlistedTeams')
      .doc(shortlistedId)
      .delete();
    
    // Update user profile
    await adminDb
      .collection('users')
      .doc(userId)
      .update({
        shortlistedForBuildathon: false,
        shortlistedAt: null,
      });
      
  } catch (error) {
    console.error('Error removing from shortlist:', error);
    throw new Error('Failed to remove from shortlist');
  }
}

// Get all shortlisted teams
export async function getShortlistedTeams(): Promise<TeamWithUser[]> {
  try {
    const eventId = 'buildathon-2025';
    
    const shortlistedSnapshot = await adminDb
      .collection('shortlistedTeams')
      .where('eventId', '==', eventId)
      .orderBy('shortlistedAt', 'desc')
      .get();
    
    const teams: TeamWithUser[] = [];
    
    for (const doc of shortlistedSnapshot.docs) {
      const shortlistedData = doc.data() as ShortlistedTeam;
      
      // Get the original registration
      const registrationDoc = await adminDb
        .collection('eventRegistrations')
        .doc(shortlistedData.registrationId)
        .get();
      
      // Get user data
      const userDoc = await adminDb
        .collection('users')
        .doc(shortlistedData.userId)
        .get();
      
      if (registrationDoc.exists && userDoc.exists) {
        const registration = registrationDoc.data() as EventRegistration;
        const userData = userDoc.data();
        
        teams.push({
          registration,
          userData: {
            uid: userData!.uid,
            email: userData!.email,
            displayName: userData!.displayName,
            photoURL: userData!.photoURL,
            createdAt: userData!.createdAt,
          },
          isShortlisted: true,
        });
      }
    }
    
    return teams;
  } catch (error) {
    console.error('Error getting shortlisted teams:', error);
    throw new Error('Failed to fetch shortlisted teams');
  }
}

// Check if user is shortlisted (for waiting page logic)
export async function isUserShortlisted(userId: string): Promise<boolean> {
  try {
    const eventId = 'buildathon-2025';
    const shortlistedId = `${eventId}_${userId}`;
    
    const doc = await adminDb
      .collection('shortlistedTeams')
      .doc(shortlistedId)
      .get();
    
    return doc.exists;
  } catch (error) {
    console.error('Error checking shortlisted status:', error);
    return false;
  }
}

// Export data to CSV format
export function formatTeamsForCSV(teams: TeamWithUser[], shortlistedOnly: boolean = false): string {
  const filteredTeams = shortlistedOnly ? teams.filter(t => t.isShortlisted) : teams;
  
  const headers = [
    'Team Name',
    'Team Leader',
    'Email',
    'Phone',
    'Member Count',
    'Status',
    'Drive Folder URL',
    'Registration Date',
    'Shortlisted'
  ];
  
  const rows = filteredTeams.map(team => [
    team.registration.team.teamName,
    team.userData.displayName || 'N/A',
    team.userData.email || 'N/A',
    team.registration.contact.phone,
    team.registration.team.memberCount.toString(),
    team.registration.status,
    team.registration.driveFolderUrl || 'N/A',
    team.registration.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A',
    team.isShortlisted ? 'Yes' : 'No'
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
    
  return csvContent;
}
