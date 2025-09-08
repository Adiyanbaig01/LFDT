"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserPlus, Github, AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";

function RegisterContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, loading, signInWithGoogle, signInWithGitHub, createAccountWithEmail } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const returnUrl = searchParams.get("returnUrl") || "/events";

    useEffect(() => {
        // If already logged in, redirect to return URL
        if (user && !loading) {
            router.push(returnUrl);
        }
    }, [user, loading, router, returnUrl]);

    const handleGoogleSignIn = async () => {
        try {
            setIsRegistering(true);
            setError(null);
            await signInWithGoogle();
            router.push(returnUrl);
        } catch (error: any) {
            console.error("Google sign-in error:", error);
            setError(error.message || "Failed to sign in with Google. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            setIsRegistering(true);
            setError(null);
            await signInWithGitHub();
            router.push(returnUrl);
        } catch (error: any) {
            console.error("GitHub sign-in error:", error);
            setError(error.message || "Failed to sign in with GitHub. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleEmailRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.displayName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        try {
            setIsRegistering(true);
            setError(null);
            await createAccountWithEmail(formData.email, formData.password, formData.displayName);
            router.push(returnUrl);
        } catch (error: any) {
            console.error("Email registration error:", error);
            setError(error.message || "Failed to create account. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            <HeroSection
                title="Create Account"
                subtitle="Join our community to register for events and track your progress"
                height={400}
            />

            <section className="relative px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-md">
                    <SpotlightCard className="p-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Create Your Account
                            </h2>
                            <p className="text-white/60">
                                Get started with your preferred method
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-300">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Email/Password Form */}
                        {showEmailForm ? (
                            <form onSubmit={handleEmailRegistration} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="displayName"
                                        placeholder="Full Name"
                                        value={formData.displayName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                        disabled={isRegistering}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                        disabled={isRegistering}
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password (min. 6 characters)"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce] pr-12"
                                        disabled={isRegistering}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                        disabled={isRegistering}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isRegistering || !formData.displayName || !formData.email || !formData.password || !formData.confirmPassword}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isRegistering ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <UserPlus className="w-5 h-5" />
                                    )}
                                    Create Account
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowEmailForm(false)}
                                    className="w-full text-white/60 hover:text-white text-sm"
                                >
                                    ← Back to other options
                                </button>
                            </form>
                        ) : (
                            <>
                                {/* Email Registration Button */}
                                <button
                                    onClick={() => setShowEmailForm(true)}
                                    disabled={isRegistering}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    Create Account with Email
                                </button>

                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex-1 h-px bg-white/20"></div>
                                    <span className="text-white/40 text-sm">or</span>
                                    <div className="flex-1 h-px bg-white/20"></div>
                                </div>

                                {/* Social Sign-up Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleGoogleSignIn}
                                        disabled={isRegistering}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isRegistering ? (
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        ) : (
                                            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                                        )}
                                        Continue with Google
                                    </button>

                                    <button
                                        onClick={handleGitHubSignIn}
                                        disabled={isRegistering}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#24292e] text-white rounded-lg font-medium hover:bg-[#1a1f23] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isRegistering ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <Github className="w-5 h-5" />
                                        )}
                                        Continue with GitHub
                                    </button>
                                </div>
                            </>
                        )}

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="text-center mb-4">
                                <p className="text-white/60 text-sm">
                                    Already have an account?{' '}
                                    <Link href={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`} className="text-[#3182ce] hover:text-[#4299e2] font-medium">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                            <p className="text-center text-white/60 text-sm">
                                By creating an account, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>

                        {/* Back to Events */}
                        <div className="mt-6">
                            <Link
                                href="/events"
                                className="flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Events
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>
            </section>
        </main>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#0a0e13] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70">Loading...</p>
                </div>
            </main>
        }>
            <RegisterContent />
        </Suspense>
    );
}
