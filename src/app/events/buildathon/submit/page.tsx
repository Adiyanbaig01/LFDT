"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowLeft, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dialog from "@/components/ui/Dialog";

export default function BuildathonSubmitPage() {
    const router = useRouter();
    const { user, updateEventRegistration, getEventRegistration, isRegisteredForEvent } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const eventId = "buildathon-2025";

    const [formData, setFormData] = useState({
        driveFolderUrl: '',
        status: 'registered' as 'registered' | 'submitted' | 'withdrawn'
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!user) { setLoading(false); return; }
            try {
                const registered = await isRegisteredForEvent(eventId);
                if (!registered) {
                    router.push('/events/buildathon/register');
                    return;
                }
                const registration = await getEventRegistration(eventId);
                if (registration) {
                    setFormData({
                        driveFolderUrl: registration.driveFolderUrl || '',
                        status: (registration.status as any) || 'registered'
                    });
                }
            } catch (e) {
                console.error('Error loading data:', e);
                setError('Failed to load your registration');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [user, isRegisteredForEvent, getEventRegistration, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.driveFolderUrl || !formData.driveFolderUrl.startsWith('http')) {
            setError('Please provide a valid Google Drive folder URL before submitting');
            return;
        }
        try {
            setIsSubmitting(true);
            setError(null);
            await updateEventRegistration(eventId, {
                driveFolderUrl: formData.driveFolderUrl.trim(),
                status: 'submitted'
            });
            setShowSuccessDialog(true);
            // Redirect to main buildathon page after a short delay
            setTimeout(() => {
                router.push('/events/buildathon');
            }, 2000);
        } catch (error: any) {
            console.error('Submit project error:', error);
            setError(error.message || 'Failed to submit project. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
        <ProtectedRoute>
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title="Submit Project"
                    subtitle="Provide your Google Drive folder and submit your Build-A-Thon 2025 project"
                    height={400}
                />

                <section className="relative px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-2xl">
                        <SpotlightCard className="p-8">
                            {/* Status banner */}
                            <div className="mb-6">
                                {formData.status === 'submitted' ? (
                                    <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Project already submitted
                                    </div>
                                ) : (
                                    <div className="p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg text-blue-300">
                                        You are registered. Submit your project below when ready.
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-red-300">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmitProject} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FolderOpen className="w-5 h-5" />
                                        Project Submission
                                    </h3>
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Google Drive Folder URL <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="driveFolderUrl"
                                            value={formData.driveFolderUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://drive.google.com/drive/folders/..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting || formData.status === 'submitted'}
                                            required
                                        />
                                        <p className="text-white/50 text-sm mt-1">
                                            Make sure the folder has view access for the organizers.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Link
                                        href="/events/buildathon"
                                        className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </Link>
                                    {formData.status !== 'submitted' && (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.driveFolderUrl}
                                            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <CheckCircle className="w-5 h-5" />
                                            )}
                                            Submit Project
                                        </button>
                                    )}
                                </div>
                            </form>
                        </SpotlightCard>
                    </div>
                </section>

                <Dialog
                    isOpen={showSuccessDialog}
                    onClose={() => setShowSuccessDialog(false)}
                    title="Project Submitted!"
                    message="Your project has been successfully submitted for Build-A-Thon 2025."
                    type="success"
                />
            </main>
        </ProtectedRoute>
    );
}

