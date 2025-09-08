"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowLeft, Users, Phone, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function BuildathonRegisterPage() {
    const {} = useRouter();
    const { user, userData, createEventRegistration, isRegisteredForEvent, getEventRegistration } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [checkingRegistration, setCheckingRegistration] = useState(true);
    
    const eventId = "buildathon-2025";
    
    const [formData, setFormData] = useState({
        teamName: '',
        memberCount: 1,
        phone: '',
        driveFolderUrl: ''
    });

    useEffect(() => {
        const checkExistingRegistration = async () => {
            if (user) {
                try {
                    const isRegistered = await isRegisteredForEvent(eventId);
                    if (isRegistered) {
                        setIsAlreadyRegistered(true);
                        // Get existing registration data
                        const existingRegistration = await getEventRegistration(eventId);
                        if (existingRegistration) {
                            setFormData({
                                teamName: existingRegistration.team.teamName || '',
                                memberCount: existingRegistration.team.memberCount || 1,
                                phone: existingRegistration.contact.phone || '',
                                driveFolderUrl: existingRegistration.driveFolderUrl || ''
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error checking registration:', error);
                } finally {
                    setCheckingRegistration(false);
                }
            } else {
                setCheckingRegistration(false);
            }
        };

        checkExistingRegistration();
    }, [user, isRegisteredForEvent, getEventRegistration]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'memberCount' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.teamName || !formData.phone) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.phone.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            await createEventRegistration(eventId, {
                team: {
                    teamName: formData.teamName,
                    memberCount: formData.memberCount
                },
                contact: {
                    phone: formData.phone
                },
                driveFolderUrl: formData.driveFolderUrl || undefined
            });

            setSuccess(true);
        } catch (error: any) {
            console.error('Registration error:', error);
            setError(error.message || 'Failed to register. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (checkingRegistration) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70">Checking registration status...</p>
                </div>
            </main>
        );
    }

    if (success) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title="Registration Complete!"
                    subtitle="You have successfully registered for Build-A-Thon 2025"
                    height={500}
                />
                <section className="relative px-6 py-16">
                    <div className="mx-auto max-w-md">
                        <SpotlightCard className="p-8 text-center">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Welcome to Build-A-Thon 2025!
                            </h2>
                            <p className="text-white/70 mb-6">
                                Your registration has been confirmed. You&apos;ll receive further details about the event soon.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="/events/buildathon"
                                    className="block w-full py-3 px-6 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors"
                                >
                                    Back to Event Details
                                </Link>
                                <Link
                                    href="/profile"
                                    className="block w-full py-3 px-6 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                                >
                                    View Profile
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title={isAlreadyRegistered ? "Update Registration" : "Register for Build-A-Thon 2025"}
                    subtitle={isAlreadyRegistered ? "Update your team details and information" : "Complete your registration as team leader"}
                    height={400}
                />

                <section className="relative px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-2xl">
                        <SpotlightCard className="p-8">
                            {/* User Info */}
                            {user && (
                                <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                                    <h3 className="text-lg font-semibold text-white mb-2">Registration Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-white/60">Name:</span>
                                            <p className="text-white font-medium">{user.displayName || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <span className="text-white/60">Email:</span>
                                            <p className="text-white font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                    {!userData?.profileComplete && (
                                        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/50 rounded-lg">
                                            <p className="text-yellow-300 text-sm flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Consider completing your profile for better experience
                                                <Link href="/profile" className="text-yellow-200 underline ml-1">
                                                    Complete Profile
                                                </Link>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-300">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Registration Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Team Information
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Team Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="teamName"
                                            value={formData.teamName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your team name"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Team Size
                                        </label>
                                        <select
                                            name="memberCount"
                                            value={formData.memberCount}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting}
                                        >
                                            <option value={1}>1 Member (Solo)</option>
                                            <option value={2}>2 Members</option>
                                            <option value={3}>3 Members</option>
                                            <option value={4}>4 Members</option>
                                        </select>
                                        <p className="text-white/50 text-sm mt-1">
                                            You can add other team members later
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        Contact Information
                                    </h3>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Phone Number <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting}
                                            required
                                        />
                                        <p className="text-white/50 text-sm mt-1">
                                            We&apos;ll use this for event updates and coordination
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FolderOpen className="w-5 h-5" />
                                        Project Submission (Optional)
                                    </h3>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Google Drive Folder URL
                                        </label>
                                        <input
                                            type="url"
                                            name="driveFolderUrl"
                                            value={formData.driveFolderUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://drive.google.com/drive/folders/..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting}
                                        />
                                        <p className="text-white/50 text-sm mt-1">
                                            You can add this later when you start working on your project
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href="/events/buildathon"
                                        className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.teamName || !formData.phone}
                                        className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <CheckCircle className="w-5 h-5" />
                                        )}
                                        {isAlreadyRegistered ? 'Update Registration' : 'Complete Registration'}
                                    </button>
                                </div>
                            </form>
                        </SpotlightCard>
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}
