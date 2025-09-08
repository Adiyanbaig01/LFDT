"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogIn, User, Github, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const AuthButton: React.FC = () => {
  const { user, loading, signInWithGoogle, signInWithGitHub } = useAuth();
  const router = useRouter();
  const [showSignInOptions, setShowSignInOptions] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      await signInWithGoogle();
      setShowSignInOptions(false);
    } catch (error: any) {
      console.error('Sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
      await signInWithGitHub();
      setShowSignInOptions(false);
    } catch (error: any) {
      console.error('Sign-in error:', error);
      setError(error.message || 'Failed to sign in with GitHub');
    } finally {
      setIsSigningIn(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center w-12 h-12">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return (
      <Link
        href="/profile"
        className="flex items-center gap-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/10"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="User profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
        <span className="text-white text-sm font-medium hidden md:block">
          {user.displayName || 'User'}
        </span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSignInOptions(!showSignInOptions)}
        disabled={isSigningIn}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3182ce] to-[#4299e2] hover:from-[#2c5aa0] hover:to-[#3182ce] text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSigningIn ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <LogIn className="w-4 h-4" />
        )}
        Sign In
      </button>

      {/* Error Message */}
      {error && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-red-900/20 border border-red-500/50 rounded-lg p-3 z-50">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Sign In Options Dropdown */}
      {showSignInOptions && !isSigningIn && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] rounded-lg shadow-xl border border-white/10 py-2 z-50">
          <button
            onClick={handleGoogleSignIn}
            className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            Continue with Google
          </button>
          <button
            onClick={handleGitHubSignIn}
            className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {showSignInOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSignInOptions(false)}
        />
      )}
    </div>
  );
};

export default AuthButton;
