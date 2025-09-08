"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { 
  signInWithGoogle, 
  signInWithGitHub, 
  signInWithEmail,
  createAccountWithEmail,
  signOutUser, 
  UserData,
  getUserData,
  registerForEvent,
  isRegisteredForEvent,
  updateUserProfile,
  createEventRegistration,
  updateEventRegistration,
  getEventRegistration,
  EventRegistration
} from '@/lib/firebase/auth';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  createAccountWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
  isRegisteredForEvent: (eventId: string) => Promise<boolean>;
  updateProfile: (profileData: Partial<UserData['profile']>) => Promise<void>;
  createEventRegistration: (eventId: string, registrationData: Partial<EventRegistration>) => Promise<void>;
  updateEventRegistration: (eventId: string, updateData: Partial<EventRegistration>) => Promise<void>;
  getEventRegistration: (eventId: string) => Promise<EventRegistration | null>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const data = await getUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserData = async () => {
    if (user) {
      const data = await getUserData(user.uid);
      setUserData(data);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGitHub();
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Email sign-in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccountWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      await createAccountWithEmail(email, password, displayName);
    } catch (error) {
      console.error('Create account error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOutUser();
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterForEvent = async (eventId: string) => {
    if (!user) throw new Error('User must be authenticated to register for events');
    
    try {
      await registerForEvent(user.uid, eventId);
      await refreshUserData(); // Refresh user data after registration
    } catch (error) {
      console.error('Event registration error:', error);
      throw error;
    }
  };

  const handleIsRegisteredForEvent = async (eventId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      return await isRegisteredForEvent(user.uid, eventId);
    } catch (error) {
      console.error('Error checking event registration:', error);
      return false;
    }
  };

  const handleUpdateProfile = async (profileData: Partial<UserData['profile']>) => {
    if (!user) throw new Error('User must be authenticated to update profile');
    
    try {
      await updateUserProfile(user.uid, profileData);
      await refreshUserData();
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const handleCreateEventRegistration = async (eventId: string, registrationData: Partial<EventRegistration>) => {
    if (!user) throw new Error('User must be authenticated to register for events');
    
    try {
      await createEventRegistration(user.uid, user.email || '', eventId, registrationData);
    } catch (error) {
      console.error('Event registration error:', error);
      throw error;
    }
  };

  const handleUpdateEventRegistration = async (eventId: string, updateData: Partial<EventRegistration>) => {
    if (!user) throw new Error('User must be authenticated to update registration');
    
    try {
      await updateEventRegistration(user.uid, eventId, updateData);
    } catch (error) {
      console.error('Event registration update error:', error);
      throw error;
    }
  };

  const handleGetEventRegistration = async (eventId: string): Promise<EventRegistration | null> => {
    if (!user) return null;
    
    try {
      return await getEventRegistration(user.uid, eventId);
    } catch (error) {
      console.error('Error getting event registration:', error);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    userData,
    loading,
    signInWithGoogle: handleGoogleSignIn,
    signInWithGitHub: handleGitHubSignIn,
    signInWithEmail: handleEmailSignIn,
    createAccountWithEmail: handleCreateAccountWithEmail,
    signOut: handleSignOut,
    registerForEvent: handleRegisterForEvent,
    isRegisteredForEvent: handleIsRegisteredForEvent,
    updateProfile: handleUpdateProfile,
    createEventRegistration: handleCreateEventRegistration,
    updateEventRegistration: handleUpdateEventRegistration,
    getEventRegistration: handleGetEventRegistration,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
