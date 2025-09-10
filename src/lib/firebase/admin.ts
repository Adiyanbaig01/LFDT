import { collection, query, where, getDocs, doc, getDoc, setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
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
    console.log('[FIREBASE] Getting buildathon registrations...');
    const eventId = 'buildathon-2025';
    
    // Get all event registrations for buildathon
    const registrationsQuery = query(
      collection(db, 'eventRegistrations'),
      where('eventId', '==', eventId)
    );
    console.log('[FIREBASE] Executing registrations query...');
    const registrationsSnapshot = await getDocs(registrationsQuery);
    console.log(`[FIREBASE] Found ${registrationsSnapshot.docs.length} registrations`);
    
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
      
      teams.push({
        registration,
        userData: {
          uid: registration.userId,
          email: registration.userEmail || null,
          displayName: registration.userDisplayName || null,
          photoURL: null,
          createdAt: registration.createdAt || null,
        },
        isShortlisted: shortlistedUserIds.has(registration.userId),
      });
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
    const registrationDocRef = doc(db, 'eventRegistrations', registrationId);
    const registrationDoc = await getDoc(registrationDocRef);
    
    if (!registrationDoc.exists()) {
      throw new Error('Registration not found');
    }
    
    const registration = registrationDoc.data() as EventRegistration;
    
    // Create shortlisted team entry
    const shortlistedData: ShortlistedTeam = {
      eventId,
      userId,
      userEmail: registration.userEmail,
      teamName: registration.team.teamName,
      shortlistedAt: Timestamp.now(),
      shortlistedBy: adminEmail,
      registrationId,
    };
    
    const shortlistedId = `${eventId}_${userId}`;
    const shortlistedDocRef = doc(db, 'shortlistedTeams', shortlistedId);
    await setDoc(shortlistedDocRef, shortlistedData);
      
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
    const shortlistedDocRef = doc(db, 'shortlistedTeams', shortlistedId);
    await deleteDoc(shortlistedDocRef);
      
  } catch (error) {
    console.error('Error removing from shortlist:', error);
    throw new Error('Failed to remove from shortlist');
  }
}

// Get all shortlisted teams
export async function getShortlistedTeams(): Promise<TeamWithUser[]> {
  try {
    const eventId = 'buildathon-2025';
    
    const shortlistedQuery = query(
      collection(db, 'shortlistedTeams'),
      where('eventId', '==', eventId)
    );
    const shortlistedSnapshot = await getDocs(shortlistedQuery);

    // Sort in-memory to avoid requiring a composite index
    const shortlistedDocs = [...shortlistedSnapshot.docs].sort((a, b) => {
      const ad = (a.data() as any).shortlistedAt?.toMillis?.() ?? 0;
      const bd = (b.data() as any).shortlistedAt?.toMillis?.() ?? 0;
      return bd - ad; // desc
    });
    
    const teams: TeamWithUser[] = [];
    
    for (const docSnapshot of shortlistedDocs) {
      const shortlistedData = docSnapshot.data() as ShortlistedTeam;
      
      // Get the original registration
      const registrationDocRef = doc(db, 'eventRegistrations', shortlistedData.registrationId);
      const registrationDoc = await getDoc(registrationDocRef);
      
      if (registrationDoc.exists()) {
        const registration = registrationDoc.data() as EventRegistration;
        
        teams.push({
          registration,
          userData: {
            uid: shortlistedData.userId,
            email: shortlistedData.userEmail || null,
            displayName: registration.userDisplayName || null,
            photoURL: null,
            createdAt: registration.createdAt || null,
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
    
    const shortlistedDocRef = doc(db, 'shortlistedTeams', shortlistedId);
    const shortlistedDoc = await getDoc(shortlistedDocRef);
    
    return shortlistedDoc.exists();
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
