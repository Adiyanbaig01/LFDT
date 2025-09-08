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
}

// Sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createOrUpdateUser(result.user, 'google');
    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign in with GitHub
export const signInWithGitHub = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    await createOrUpdateUser(result.user, 'github');
    return result;
  } catch (error) {
    console.error('Error signing in with GitHub:', error);
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
  };

  if (!userSnap.exists()) {
    // Create new user document
    userData.createdAt = serverTimestamp();
    userData.events = [];
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
    const userData = await getUserData(uid);
    return userData?.events?.includes(eventId) || false;
  } catch (error) {
    console.error('Error checking event registration:', error);
    return false;
  }
};
