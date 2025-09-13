"use client";

import { useState, useEffect } from "react";
import {
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Users,
    Phone,
    FolderOpen,
    MessageCircle,
    Eye,
    Youtube,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dialog from "@/components/ui/Dialog";

export default function BuildathonSubmitPage() {
    const { user, userData, createEventRegistration, updateEventRegistration, getEventRegistration } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loadingExistingData, setLoadingExistingData] = useState(true);

    const eventId = "buildathon-2025";

    const [formData, setFormData] = useState({
        teamName: "",
        memberCount: 1,
        phone: userData?.profile?.phone || "",
        driveFolderUrl: "",
        githubLink: "",
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    // Load existing registration data on mount
    useEffect(() => {
        const loadExistingRegistration = async () => {
            if (user) {
                try {
                    const existingRegistration = await getEventRegistration(eventId);
                    if (existingRegistration) {
                        setIsEditing(true);
                        setFormData({
                            teamName: existingRegistration.team.teamName,
                            memberCount: existingRegistration.team.memberCount,
                            phone: existingRegistration.contact.phone,
                            driveFolderUrl: existingRegistration.driveFolderUrl,
                            githubLink: existingRegistration.githubLink,
                        });
                    } else {
                        // Auto-fill phone number from user profile for new registrations
                        if (userData?.profile?.phone) {
                            setFormData((prev) => ({
                                ...prev,
                                phone: userData.profile.phone || "",
                            }));
                        }
                    }
                } catch (error) {
                    console.error('Error loading existing registration:', error);
                } finally {
                    setLoadingExistingData(false);
                }
            } else {
                setLoadingExistingData(false);
            }
        };

        loadExistingRegistration();
    }, [user, getEventRegistration, eventId, userData]);

    // Auto-fill phone number from user profile when userData changes (for new users only)
    useEffect(() => {
        if (userData?.profile?.phone && !formData.phone && !isEditing) {
            setFormData((prev) => ({
                ...prev,
                phone: userData.profile.phone || "",
            }));
        }
    }, [userData, formData.phone, isEditing]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "memberCount" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (
            !formData.teamName ||
            !formData.phone ||
            !formData.driveFolderUrl ||
            !formData.githubLink
        ) {
            setError("Please fill in all required fields");
            return;
        }

        // Validate team name
        if (formData.teamName.trim().length < 2) {
            setError("Team name must be at least 2 characters long");
            return;
        }

        // Validate phone number (basic validation for 10 digits)
        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ""))) {
            setError("Please enter a valid phone number (at least 10 digits)");
            return;
        }

        // Validate drive URL (required)
        if (!formData.driveFolderUrl.startsWith("http")) {
            setError("Please enter a valid URL for the Google Drive folder");
            return;
        }

        // Validate GitHub URL (required)
        if (!formData.githubLink.startsWith("http")) {
            setError("Please enter a valid GitHub repository URL");
            return;
        }

        // Basic GitHub URL validation
        if (!formData.githubLink.includes("github.com")) {
            setError("Please enter a valid GitHub repository URL");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const registrationData = {
                team: {
                    teamName: formData.teamName.trim(),
                    memberCount: formData.memberCount,
                },
                contact: {
                    phone: formData.phone.replace(/[\s-]/g, ""), // Remove spaces and dashes
                },
                driveFolderUrl: formData.driveFolderUrl?.trim() || "",
                githubLink: formData.githubLink?.trim() || "",
            };

            if (isEditing) {
                await updateEventRegistration(eventId, {
                    ...registrationData,
                    status: 'submitted'
                });
            } else {
                await createEventRegistration(eventId, {
                    ...registrationData,
                    status: 'submitted'
                });
            }

            setShowSuccessDialog(true);
        } catch (error: any) {
            console.error("Registration error:", error);

            // Provide more specific error messages
            if (error.message?.includes("permission")) {
                setError(
                    "Permission denied. Please make sure you are signed in and try again."
                );
            } else if (error.message?.includes("already exists") && !isEditing) {
                setError("You have already registered for this event.");
            } else {
                setError(
                    error.message ||
                        `Failed to ${isEditing ? 'update' : 'register'}. Please try again later.`
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title={isEditing ? "Update Complete!" : "Registration Complete!"}
                    subtitle={isEditing ? "You have successfully updated your Build-A-Thon 2025 submission" : "You have successfully registered for Build-A-Thon 2025"}
                    height={500}
                />
                <section className="relative px-6 py-16">
                    <div className="mx-auto max-w-5xl">
                        <SpotlightCard className="p-8 lg:p-12">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                    {isEditing ? "Project Updated!" : "Welcome to Build-A-Thon 2025!"}
                                </h2>
                                <p className="text-lg lg:text-xl text-white/70 mb-4 max-w-3xl mx-auto">
                                    Your project has been successfully
                                    {isEditing ? ' updated' : ' submitted'}! Here&apos;s what happens next:
                                </p>
                                <p className="text-sm lg:text-base text-white/60 max-w-2xl mx-auto">
                                    You will be notified if you&apos;re
                                    shortlisted on WhatsApp community as well as
                                    through email.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <MessageCircle className="w-6 h-6 text-[#25D366]" />
                                        <h3 className="text-lg font-semibold text-white">
                                            Join WhatsApp Community
                                        </h3>
                                    </div>
                                    <p className="text-white/70 text-sm mb-4">
                                        Get real-time updates and coordinate
                                        with other participants.
                                    </p>
                                    <button
                                        onClick={() =>
                                            window.open(
                                                "https://chat.whatsapp.com/ECe5WdmWWYXJidNw2SXucj",
                                                "_blank"
                                            )
                                        }
                                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#25D366] text-[#25D366] rounded-lg text-sm font-medium hover:bg-[#25D366] hover:text-white transition-all duration-200"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Join WhatsApp Group
                                    </button>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Eye className="w-6 h-6 text-[#3182ce]" />
                                        <h3 className="text-lg font-semibold text-white">
                                            Check Shortlist Status
                                        </h3>
                                    </div>
                                    <p className="text-white/70 text-sm mb-4">
                                        Visit the shortlisted page to see if
                                        your team made it to the next phase.
                                    </p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Youtube className="w-6 h-6 text-[#FF0000]" />
                                        <h3 className="text-lg font-semibold text-white">
                                            Live Presentations
                                        </h3>
                                    </div>
                                    <p className="text-white/70 text-sm mb-4">
                                        Shortlisted teams will present live.
                                        Watch the presentations here.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            "/events/buildathon")
                                    }
                                    className="px-8 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors"
                                >
                                    Back to Event Details
                                </button>
                                <button
                                    onClick={() =>
                                        (window.location.href = "/profile")
                                    }
                                    className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                                >
                                    View Profile
                                </button>
                            </div>
                        </SpotlightCard>
                    </div>
                </section>
            </main>
        );
    }

    // Show loading state while existing data is being loaded
    if (loadingExistingData) {
        return (
            <ProtectedRoute>
                <main className="min-h-screen bg-[#0a0e13] text-white">
                    <HeroSection
                        title="Loading..."
                        subtitle="Loading your registration data"
                        height={400}
                    />
                    <section className="relative px-6 py-16">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-white/70">Loading your registration data...</p>
                        </div>
                    </section>
                </main>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title={isEditing ? "Edit Project Submission" : "Submit Project for Build-A-Thon 2025"}
                    subtitle={isEditing ? "Update your team details and project information" : "Register your team and submit your project"}
                    height={400}
                >                    
                    {isEditing && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-600/50 rounded-lg text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span>Editing existing submission</span>
                        </div>
                    )}
                </HeroSection>

                <section className="relative px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-2xl">
                        <SpotlightCard className="p-8">
                            {/* User Info */}
                            {user && (
                                <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Registration Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-white/60">
                                                Name:
                                            </span>
                                            <p className="text-white font-medium">
                                                {user.displayName ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-white/60">
                                                Email:
                                            </span>
                                            <p className="text-white font-medium">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    {!userData?.profileComplete && (
                                        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/50 rounded-lg">
                                            <p className="text-yellow-300 text-sm flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Consider completing your profile
                                                for better experience
                                                <Link
                                                    href="/profile"
                                                    className="text-yellow-200 underline ml-1"
                                                >
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
                                        <p className="text-sm text-red-300">
                                            {error}
                                        </p>
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
                                            Team Name{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
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
                                            <option value={1}>
                                                1 Member (Solo)
                                            </option>
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
                                            Phone Number{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
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
                                            We&apos;ll use this for event
                                            updates and coordination
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <FolderOpen className="w-5 h-5" />
                                        Project Submission
                                    </h3>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            Google Drive Folder URL{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="url"
                                            name="driveFolderUrl"
                                            value={formData.driveFolderUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://drive.google.com/drive/folders/..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting}
                                            required
                                        />
                                        <p className="text-white/50 text-sm mt-1">
                                            Provide your Google Drive folder
                                            link for project submission. Make
                                            sure it has view access for
                                            organizers.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                                            />
                                        </svg>
                                        GitHub Repository
                                    </h3>

                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                            GitHub Repository URL{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="url"
                                            name="githubLink"
                                            value={formData.githubLink}
                                            onChange={handleInputChange}
                                            placeholder="https://github.com/username/repository"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                            disabled={isSubmitting}
                                            required
                                        />
                                        <p className="text-white/50 text-sm mt-1">
                                            Provide the GitHub repository link
                                            for your project. Make sure
                                            it&apos;s public and accessible to
                                            judges.
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
                                        disabled={
                                            isSubmitting ||
                                            !formData.teamName ||
                                            !formData.phone ||
                                            !formData.driveFolderUrl ||
                                            !formData.githubLink
                                        }
                                        className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <CheckCircle className="w-5 h-5" />
                                        )}
                                        {isEditing ? 'Update Project' : 'Submit Project'}
                                    </button>
                                </div>
                            </form>
                        </SpotlightCard>
                    </div>
                </section>

                {/* Success Dialog */}
                <Dialog
                    isOpen={showSuccessDialog}
                    onClose={() => {
                        setShowSuccessDialog(false);
                        setSuccess(true);
                    }}
                    title={isEditing ? "Project Updated!" : "Project Submitted!"}
                    message={isEditing ? "Your Build-A-Thon 2025 project has been successfully updated!" : "Your Build-A-Thon 2025 project has been successfully submitted!"}
                    type="success"
                />
            </main>
        </ProtectedRoute>
    );
}
