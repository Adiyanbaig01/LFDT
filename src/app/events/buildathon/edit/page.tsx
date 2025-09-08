"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowLeft, Users, Phone, FolderOpen, Edit } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { EventRegistration } from "@/lib/firebase/auth";
import Dialog from "@/components/ui/Dialog";

export default function BuildathonEditPage() {
    const router = useRouter();
    const { user, updateEventRegistration, getEventRegistration, isRegisteredForEvent } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [existingRegistration, setExistingRegistration] = useState<EventRegistration | null>(null);
    
    const eventId = "buildathon-2025";
    
    const [formData, setFormData] = useState({
        teamName: '',
        memberCount: 1,
        phone: '',
        driveFolderUrl: '',
        status: 'registered' as 'registered' | 'submitted' | 'withdrawn'
    });
    
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        type: 'info' as 'info' | 'success' | 'error' | 'confirm',
        title: '',
        message: '',
        onConfirm: () => {}
    });

    useEffect(() => {
        const loadRegistrationData = async () => {
            if (user) {
                try {
                    const isRegistered = await isRegisteredForEvent(eventId);
                    if (!isRegistered) {
                        router.push('/events/buildathon/register');
                        return;
                    }

                    const registration = await getEventRegistration(eventId);
                    if (registration) {
                        setExistingRegistration(registration);
                        setFormData({
                            teamName: registration.team.teamName || '',
                            memberCount: registration.team.memberCount || 1,
                            phone: registration.contact.phone || '',
                            driveFolderUrl: registration.driveFolderUrl || '',
                            status: registration.status || 'registered'
                        });
                    }
                } catch (error) {
                    console.error('Error loading registration:', error);
                    setError('Failed to load your registration data');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        loadRegistrationData();
    }, [user, isRegisteredForEvent, getEventRegistration, router]);

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

            await updateEventRegistration(eventId, {
                team: {
                    teamName: formData.teamName,
                    memberCount: formData.memberCount
                },
                contact: {
                    phone: formData.phone
                },
                driveFolderUrl: formData.driveFolderUrl || '',
                status: formData.status
            });

            setSuccess(true);
        } catch (error: any) {
            console.error('Update error:', error);
            setError(error.message || 'Failed to update registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWithdraw = async () => {
        setDialogState({
            isOpen: true,
            type: 'confirm',
            title: 'Withdraw Registration',
            message: 'Are you sure you want to withdraw from Build-A-Thon 2025? You can resubmit your registration later if needed.',
            onConfirm: async () => {
                setDialogState(prev => ({ ...prev, isOpen: false }));

                try {
                    setIsSubmitting(true);
                    setError(null);

                    await updateEventRegistration(eventId, {
                        status: 'withdrawn'
                    });

                    setFormData(prev => ({ ...prev, status: 'withdrawn' }));
                    setDialogState({
                        isOpen: true,
                        type: 'info',
                        title: 'Registration Withdrawn',
                        message: 'Your registration has been withdrawn. You can resubmit anytime before the deadline.',
                        onConfirm: () => {
                            setDialogState(prev => ({ ...prev, isOpen: false }));
                        }
                    });
                } catch (error: any) {
                    console.error('Withdraw error:', error);
                    setError(error.message || 'Failed to withdraw. Please try again.');
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    const handleResubmit = async () => {
        setDialogState({
            isOpen: true,
            type: 'confirm',
            title: 'Resubmit Registration',
            message: 'Do you want to reactivate your registration for Build-A-Thon 2025?',
            onConfirm: async () => {
                setDialogState(prev => ({ ...prev, isOpen: false }));

                try {
                    setIsSubmitting(true);
                    setError(null);

                    await updateEventRegistration(eventId, {
                        status: 'registered'
                    });

                    setFormData(prev => ({ ...prev, status: 'registered' }));
                    setSuccess(true);
                } catch (error: any) {
                    console.error('Resubmit error:', error);
                    setError(error.message || 'Failed to resubmit. Please try again.');
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    const handleSubmitProject = async () => {
        if (!formData.driveFolderUrl) {
            setError('Please provide a Google Drive folder URL before submitting');
            return;
        }

        setDialogState({
            isOpen: true,
            type: 'confirm',
            title: 'Submit Project',
            message: 'Are you ready to submit your project? Make sure your Google Drive folder contains all required files.',
            onConfirm: async () => {
                setDialogState(prev => ({ ...prev, isOpen: false }));

                try {
                    setIsSubmitting(true);
                    setError(null);

                    await updateEventRegistration(eventId, {
                        driveFolderUrl: formData.driveFolderUrl,
                        status: 'submitted'
                    });

                    setFormData(prev => ({ ...prev, status: 'submitted' }));
                    setDialogState({
                        isOpen: true,
                        type: 'success',
                        title: 'Project Submitted!',
                        message: 'Your project has been successfully submitted for Build-A-Thon 2025.',
                        onConfirm: () => {
                            setSuccess(true);
                        }
                    });
                } catch (error: any) {
                    console.error('Submit project error:', error);
                    setError(error.message || 'Failed to submit project. Please try again.');
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70">Loading your registration...</p>
                </div>
            </main>
        );
    }

    if (success) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title="Registration Updated!"
                    subtitle="Your Build-A-Thon 2025 registration has been successfully updated"
                    height={400}
                />
                <section className="relative px-6 py-16">
                    <div className="mx-auto max-w-md">
                        <SpotlightCard className="p-8 text-center">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Changes Saved!
                            </h2>
                            <p className="text-white/70 mb-6">
                                Your registration details have been updated successfully.
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
                    title="Edit Registration"
                    subtitle="Update your Build-A-Thon 2025 registration details"
                    height={400}
                />

                <section className="relative px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-2xl">
                        <SpotlightCard className="p-8">
                            {/* Registration Status */}
                            {existingRegistration && (
                                <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Registration Status</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            existingRegistration.status === 'registered' 
                                                ? 'bg-blue-900/50 text-blue-300'
                                                : existingRegistration.status === 'submitted'
                                                ? 'bg-green-900/50 text-green-300'
                                                : 'bg-red-900/50 text-red-300'
                                        }`}>
                                            {existingRegistration.status.charAt(0).toUpperCase() + existingRegistration.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-white/60">Registered:</span>
                                            <p className="text-white font-medium">
                                                {existingRegistration.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-white/60">Last Updated:</span>
                                            <p className="text-white font-medium">
                                                {existingRegistration.updatedAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                                            </p>
                                        </div>
                                    </div>
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

                            {/* Edit Form */}
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
                                            disabled={isSubmitting || formData.status === 'submitted' || formData.status === 'withdrawn'}
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
                                            disabled={isSubmitting || formData.status === 'submitted' || formData.status === 'withdrawn'}
                                        >
                                            <option value={1}>1 Member (Solo)</option>
                                            <option value={2}>2 Members</option>
                                            <option value={3}>3 Members</option>
                                            <option value={4}>4 Members</option>
                                        </select>
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
                                            disabled={isSubmitting || formData.status === 'withdrawn'}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FolderOpen className="w-5 h-5" />
                                        Project Submission
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
                                            disabled={isSubmitting || formData.status === 'withdrawn'}
                                        />
                                        {formData.status === 'submitted' && (
                                            <p className="text-green-300 text-sm mt-1 flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                Project submitted successfully
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons - Improved Layout */}
                                <div className="pt-6 border-t border-white/10">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Back button - Left aligned */}
                                        <Link
                                            href="/events/buildathon"
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Back to Event
                                        </Link>

                                        {/* Save Changes - Center */}
                                        {formData.status !== 'submitted' && formData.status !== 'withdrawn' && (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !formData.teamName || !formData.phone}
                                                className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <Edit className="w-5 h-5" />
                                                )}
                                                Save Changes
                                            </button>
                                        )}

                                        {/* Resubmit button for withdrawn status */}
                                        {formData.status === 'withdrawn' && (
                                            <button
                                                type="button"
                                                onClick={handleResubmit}
                                                disabled={isSubmitting}
                                                className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <CheckCircle className="w-5 h-5" />
                                                )}
                                                Resubmit Registration
                                            </button>
                                        )}

                                        {/* Submit Project - Right aligned */}
                                        {formData.status === 'registered' && (
                                            <button
                                                type="button"
                                                onClick={handleSubmitProject}
                                                disabled={isSubmitting || !formData.driveFolderUrl}
                                                className="flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                                Submit Project
                                            </button>
                                        )}
                                    </div>

                                    {/* Withdraw button - Full width below */}
                                    {formData.status === 'registered' && (
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                onClick={handleWithdraw}
                                                disabled={isSubmitting}
                                                className="w-full px-6 py-3 bg-red-600/20 border border-red-500/50 text-red-300 rounded-lg font-medium hover:bg-red-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Withdraw Registration
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </SpotlightCard>
                    </div>
                </section>
                
                {/* Dialog Component */}
                <Dialog
                    isOpen={dialogState.isOpen}
                    onClose={() => setDialogState(prev => ({ ...prev, isOpen: false }))}
                    title={dialogState.title}
                    message={dialogState.message}
                    type={dialogState.type}
                    onConfirm={dialogState.onConfirm}
                    confirmText={dialogState.type === 'confirm' ? 'Confirm' : 'OK'}
                    cancelText="Cancel"
                />
            </main>
        </ProtectedRoute>
    );
}
