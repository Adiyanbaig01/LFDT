"use client";

import { useState, useEffect } from "react";
import { Users, Phone, Calendar, Star, Loader2, Trophy, CheckCircle } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBackground from "@/components/ui/SectionBackground";

interface TeamData {
    registration: {
        eventId: string;
        userId: string;
        userEmail: string;
        team: {
            teamName: string;
            memberCount: number;
        };
        contact: {
            phone: string;
        };
        driveFolderUrl: string;
        status: 'registered' | 'submitted' | 'withdrawn';
        createdAt: any;
    };
    userData: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
        createdAt: any;
    };
    isShortlisted: boolean;
}

export default function ShortlistedTeamsPage() {
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchShortlistedTeams();
    }, []);

    const fetchShortlistedTeams = async () => {
        try {
            const response = await fetch("/api/shortlisted-teams");
            if (response.ok) {
                const data = await response.json();
                setTeams(data);
            } else {
                throw new Error("Failed to fetch shortlisted teams");
            }
        } catch (error) {
            console.error("Error fetching shortlisted teams:", error);
            setError("Failed to load shortlisted teams");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p className="text-white/70">Loading shortlisted teams...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title="Error"
                    subtitle="Failed to load shortlisted teams"
                    height={400}
                />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            <HeroSection
                title="Shortlisted Teams"
                subtitle="Build-A-Thon 2025 - Congratulations to our selected teams!"
                height={500}
            >
                <div className="mt-8 flex items-center justify-center gap-2 text-[#a0aec0]">
                    <Trophy className="w-5 h-5 text-[#3182ce]" />
                    <span>{teams.length} teams shortlisted</span>
                </div>
            </HeroSection>

            <section className="relative px-6 py-16 sm:py-20 bg-[#0a0e13] overflow-hidden">
                <SectionBackground variant="events" />
                
                <div className="relative mx-auto max-w-7xl">
                    {teams.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-10 h-10 text-white/40" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                No Teams Shortlisted Yet
                            </h2>
                            <p className="text-white/60 max-w-md mx-auto">
                                The shortlisted teams for Build-A-Thon 2025 will be announced soon. 
                                Stay tuned for updates!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                    <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                        Congratulations!
                                    </span>
                                </h2>
                                <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                                    These exceptional teams have been selected to participate in the 
                                    Build-A-Thon 2025 main event. Get ready to innovate and create!
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teams.map((team, index) => (
                                    <SpotlightCard key={team.registration.userId} className="p-6 backdrop-blur-xl">
                                        {/* Header with rank indicator */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">
                                                        #{index + 1}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">
                                                        {team.registration.team.teamName}
                                                    </h3>
                                                    <p className="text-white/60 text-sm">
                                                        {team.userData.displayName || "Team Leader"}
                                                    </p>
                                                </div>
                                            </div>
                                            <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                                        </div>

                                        {/* Team Details */}
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-2 text-white/70">
                                                <Users className="w-4 h-4 text-[#3182ce]" />
                                                <span className="text-sm">
                                                    {team.registration.team.memberCount} member{team.registration.team.memberCount > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-white/70">
                                                <Calendar className="w-4 h-4 text-[#3182ce]" />
                                                <span className="text-sm">
                                                    Registered: {team.registration.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                    team.registration.status === "submitted" 
                                                        ? "bg-green-900/50 text-green-300"
                                                        : "bg-blue-900/50 text-blue-300"
                                                }`}>
                                                    {team.registration.status === "submitted" ? "Project Submitted" : "Registered"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="bg-green-900/20 border border-green-600/50 rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                <span className="text-green-300 font-medium text-sm">
                                                    Shortlisted for Build-A-Thon 2025
                                                </span>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>

                            {/* Info Section */}
                            <div className="mt-16 text-center">
                                <SpotlightCard className="p-8 max-w-4xl mx-auto">
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        What's Next?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                        <div className="space-y-2">
                                            <div className="w-12 h-12 bg-[#3182ce]/20 rounded-lg flex items-center justify-center mb-3">
                                                <Calendar className="w-6 h-6 text-[#3182ce]" />
                                            </div>
                                            <h4 className="font-semibold text-white">Event Details</h4>
                                            <p className="text-white/60 text-sm">
                                                Check your email for detailed event schedules and venue information.
                                            </p>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="w-12 h-12 bg-[#3182ce]/20 rounded-lg flex items-center justify-center mb-3">
                                                <Users className="w-6 h-6 text-[#3182ce]" />
                                            </div>
                                            <h4 className="font-semibold text-white">Team Preparation</h4>
                                            <p className="text-white/60 text-sm">
                                                Prepare your development environment and review the problem statements.
                                            </p>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <div className="w-12 h-12 bg-[#3182ce]/20 rounded-lg flex items-center justify-center mb-3">
                                                <Trophy className="w-6 h-6 text-[#3182ce]" />
                                            </div>
                                            <h4 className="font-semibold text-white">Bring Your A-Game</h4>
                                            <p className="text-white/60 text-sm">
                                                Get ready for 36 hours of intense innovation and collaboration!
                                            </p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
