import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

githubProvider.setCustomParameters({
  prompt: 'consent',
});

// User data interface
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  createdAt?: any;
  lastLogin?: any;
  events?: string[];
  role: 'member' | 'admin';
  profile: {
    phone?: string;
    gender?: string;
    country?: string;
    department?: string;
    courseStream?: string;
    specialization?: string;
    workExperience?: string;
    program?: string;
    yearOfGraduation?: number;
    organizationName?: string;
  };
  profileComplete: boolean;
}

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createOrUpdateUser(result.user, 'google');
    return result;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed. Please try again.');
    }
    if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Another sign-in popup is already open.');
    }
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email address but different sign-in credentials.');
    }
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please allow popups and try again.');
    }
    throw new Error('Failed to sign in with Google. Please try again.');
  }
};

// Sign in with GitHub
export const signInWithGitHub = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    await createOrUpdateUser(result.user, 'github');
    return result;
  } catch (error: any) {
    console.error('Error signing in with GitHub:', error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-in popup was closed. Please try again.');
    }
    if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Another sign-in popup is already open.');
    }
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email address but different sign-in credentials.');
    }
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Sign-in popup was blocked by your browser. Please allow popups and try again.');
    }
    throw new Error('Failed to sign in with GitHub. Please try again.');
  }
};


// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Create or update user document in Firestore
export const createOrUpdateUser = async (user: User, provider: string): Promise<void> => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  const userData: UserData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider,
    lastLogin: serverTimestamp(),
    events: [],
    role: 'member',
    profile: {},
    profileComplete: false,
  };

  if (!userSnap.exists()) {
    // Create new user document
    userData.createdAt = serverTimestamp();
    await setDoc(userRef, userData);
  } else {
    // Update existing user's last login
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
  }
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Register user for an event
export const registerForEvent = async (uid: string, eventId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as UserData;
      const currentEvents = userData.events || [];
      
      if (!currentEvents.includes(eventId)) {
        await updateDoc(userRef, {
          events: [...currentEvents, eventId],
        });
      }
    }
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

// Check if user is registered for an event
export const isRegisteredForEvent = async (uid: string, eventId: string): Promise<boolean> => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${uid}`);
    const registrationSnap = await getDoc(registrationRef);
    return registrationSnap.exists();
  } catch (error) {
    console.error('Error checking event registration:', error);
    return false;
  }
};

// Update user profile
export const updateUserProfile = async (uid: string, profileData: Partial<UserData['profile']>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      profile: profileData,
      profileComplete: Object.keys(profileData).length >= 5, // Consider profile complete if 5+ fields filled
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Event Registration Interface
export interface EventRegistration {
  eventId: string;
  userId: string;
  userEmail: string;
  userDisplayName: string; // cached leader name for admin display/export
  team: {
    teamName: string;
    memberCount: number;
    members?: string[];
  };
  contact: {
    phone: string;
  };
  driveFolderUrl: string; // Make it required but can be empty string
  githubLink: string; // GitHub link for the project
  status: 'registered' | 'submitted' | 'withdrawn';
  createdAt: any;
  updatedAt: any;
}

// Create event registration
export const createEventRegistration = async (uid: string, userEmail: string, eventId: string, registrationData: Partial<EventRegistration>): Promise<void> => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${uid}`);
    
    // Check if registration already exists
    const existingDoc = await getDoc(registrationRef);
    if (existingDoc.exists()) {
      throw new Error('You have already registered for this event.');
    }
    
    // Try to pick a good display name for caching with multiple fallbacks
    let leaderName: string | null = null;
    
    // 1. Try from Firestore user document
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as any;
        leaderName = userData.displayName;
      }
    } catch {}

    // 2. Try from current Firebase Auth user
    if (!leaderName && auth.currentUser) {
      leaderName = auth.currentUser.displayName;
    }

    // 3. Extract name from email if still no display name
    if (!leaderName && userEmail) {
      const emailUsername = userEmail.split('@')[0];
      // Convert email username to a more readable format
      leaderName = emailUsername
        .replace(/[._-]/g, ' ') // Replace dots, underscores, hyphens with spaces
        .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
    }

    // 4. Last resort fallback
    if (!leaderName) {
      leaderName = 'Team Leader';
    }

    const registration: EventRegistration = {
      eventId,
      userId: uid,
      userEmail,
      userDisplayName: leaderName, // Will always have a meaningful value now
      team: registrationData.team || { teamName: '', memberCount: 1 },
      contact: registrationData.contact || { phone: '' },
      driveFolderUrl: registrationData.driveFolderUrl || '', // Ensure it's not undefined
      githubLink: registrationData.githubLink || '', // Ensure it's not undefined
      status: 'registered',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    // Create the registration document
    await setDoc(registrationRef, registration);
    
    // Update user's events array
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      const currentEvents = userData.events || [];
      
      if (!currentEvents.includes(eventId)) {
        await updateDoc(userRef, {
          events: [...currentEvents, eventId]
        });
      }
    }
  } catch (error: any) {
    console.error('Error creating event registration:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please ensure you are signed in and try again.');
    }
    throw error;
  }
};

// Update event registration
export const updateEventRegistration = async (uid: string, eventId: string, updateData: Partial<EventRegistration>): Promise<void> => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${uid}`);
    
    // Ensure driveFolderUrl and githubLink are not undefined if provided
    const safeUpdateData = { ...updateData };
    if ('driveFolderUrl' in safeUpdateData && safeUpdateData.driveFolderUrl === undefined) {
      safeUpdateData.driveFolderUrl = '';
    }
    if ('githubLink' in safeUpdateData && safeUpdateData.githubLink === undefined) {
      safeUpdateData.githubLink = '';
    }
    
    await updateDoc(registrationRef, {
      ...safeUpdateData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating event registration:', error);
    throw error;
  }
};

// Get event registration
export const getEventRegistration = async (uid: string, eventId: string): Promise<EventRegistration | null> => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${uid}`);
    const registrationSnap = await getDoc(registrationRef);
    
    if (registrationSnap.exists()) {
      return registrationSnap.data() as EventRegistration;
    }
    return null;
  } catch (error) {
    console.error('Error getting event registration:', error);
    return null;
  }
};
