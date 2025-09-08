"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback,
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      setShowFallback(true);
    } else {
      setShowFallback(false);
    }
  }, [user, loading, requireAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (showFallback) {
    return fallback || (
      <div className="flex items-center justify-center min-h-[400px] px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Sign In Required
          </h2>
          <p className="text-white/70 mb-6">
            You need to sign in to access this content. Please use the sign-in button in the navigation bar.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-white/60">
              <strong>Note:</strong> You can sign in using your Google or GitHub account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
