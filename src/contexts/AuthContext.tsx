"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { 
  signInWithGoogle, 
  signInWithGitHub, 
  signOutUser, 
  UserData,
  getUserData,
  registerForEvent,
  isRegisteredForEvent
} from '@/lib/firebase/auth';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
  isRegisteredForEvent: (eventId: string) => Promise<boolean>;
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

  const value: AuthContextType = {
    user,
    userData,
    loading,
    signInWithGoogle: handleGoogleSignIn,
    signInWithGitHub: handleGitHubSignIn,
    signOut: handleSignOut,
    registerForEvent: handleRegisterForEvent,
    isRegisteredForEvent: handleIsRegisteredForEvent,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
