import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
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
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email address but different sign-in credentials. Please sign in using the original provider.');
    }
    throw error;
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
    if (error.code === 'auth/account-exists-with-different-credential') {
      throw new Error('An account already exists with the same email address but different sign-in credentials. Please sign in using the original provider.');
    }
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createOrUpdateUser(result.user, 'email');
    return result;
  } catch (error: any) {
    console.error('Error signing in with email:', error);
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address.');
    }
    if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password.');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    }
    throw error;
  }
};

// Create account with email and password
export const createAccountWithEmail = async (email: string, password: string, displayName: string): Promise<UserCredential> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    await updateProfile(result.user, {
      displayName: displayName
    });
    
    await createOrUpdateUser(result.user, 'email');
    return result;
  } catch (error: any) {
    console.error('Error creating account with email:', error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account already exists with this email address.');
    }
    if (error.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters.');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    }
    throw error;
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
  team: {
    teamName: string;
    memberCount: number;
    members?: string[];
  };
  contact: {
    phone: string;
  };
  driveFolderUrl?: string;
  status: 'registered' | 'submitted' | 'withdrawn';
  createdAt: any;
  updatedAt: any;
}

// Create event registration
export const createEventRegistration = async (uid: string, userEmail: string, eventId: string, registrationData: Partial<EventRegistration>): Promise<void> => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${uid}`);
    
    const registration: EventRegistration = {
      eventId,
      userId: uid,
      userEmail,
      team: registrationData.team || { teamName: '', memberCount: 1 },
      contact: registrationData.contact || { phone: '' },
      driveFolderUrl: registrationData.driveFolderUrl,
      status: 'registered',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(registrationRef, registration);
  } catch (error) {
    console.error('Error creating event registration:', error);
    throw error;
  }
};

// Update event registration
export const updateEventRegistration = async (uid: string, eventId: string, updateData: Partial<EventRegistration>): Promise<void> => {
  try {
    const registrationRef = doc(db, 'eventRegistrations', `${eventId}_${uid}`);
    await updateDoc(registrationRef, {
      ...updateData,
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
