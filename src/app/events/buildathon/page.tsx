"use client";

import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Target,
    Trophy,
    BookOpenCheck,
    CheckCircle,
    UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import SectionBackground from "@/components/ui/SectionBackground";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useAuth } from "@/contexts/AuthContext";

export default function BuildathonPage() {
    const { user, registerForEvent, isRegisteredForEvent } = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);
    const [, setIsRegistering] = useState(false);
    const [checkingRegistration, setCheckingRegistration] = useState(true);

    const eventId = "buildathon-2025";

    useEffect(() => {
        const checkRegistration = async () => {
            if (user) {
                try {
                    const registered = await isRegisteredForEvent(eventId);
                    setIsRegistered(registered);
                } catch (error) {
                    console.error("Error checking registration:", error);
                } finally {
                    setCheckingRegistration(false);
                }
            } else {
                setCheckingRegistration(false);
            }
        };

        checkRegistration();
    }, [user, isRegisteredForEvent]);

    const handleRegistration = async () => {
        if (!user) {
            // Redirect to login page with return URL
            window.location.href = `/auth/login?returnUrl=${encodeURIComponent(
                "/events/buildathon/register"
            )}`;
            return;
        }

        try {
            setIsRegistering(true);
            await registerForEvent(eventId);
            setIsRegistered(true);
            alert("Successfully registered for Build-A-Thon 2025!");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register for the event. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            {/* Hero */}
            <HeroSection
                title="Build-A-Thon 2025"
                subtitle="Where Agents Shape Tomorrow"
                height={600}
            >
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#a0aec0] max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5 text-[#3182ce]" />
                        <span>Sept 12–15, 2025</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5 text-[#3182ce]" />
                        <span>PCCOE, Akurdi, Pune</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Users className="w-5 h-5 text-[#3182ce]" />
                        <span>Teams of 1–4</span>
                    </div>
                </div>
                <div className="mt-8">
                    {checkingRegistration ? (
                        <div className="flex justify-center">
                            <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-lg font-medium text-white">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Checking Registration...
                            </div>
                        </div>
                    ) : isRegistered ? (
                        <div className="grid grid-cols-3 max-w-4xl mx-auto items-center">
                            <div></div>
                            <div className="flex justify-center">
                                <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-8 py-4 text-lg font-medium text-white">
                                    <CheckCircle className="w-5 h-5" />
                                    Already Registered
                                </div>
                            </div>
                            <div className="flex ml-4">
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            "/events/buildathon/edit")
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-all duration-200 font-body"
                                >
                                    Edit Registration
                                </button>
                            </div>
                        </div>
                    ) : user ? (
                        <div className="flex justify-center">
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        "/events/buildathon/register")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3182ce] to-[#4299e2] px-8 py-4 text-lg font-medium text-white hover:from-[#2c5aa0] hover:to-[#3182ce] transition-all duration-200 shadow-lg hover:shadow-xl font-body"
                            >
                                <UserPlus className="w-5 h-5" />
                                Register Now
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="text-center">
                                <button
                                    onClick={handleRegistration}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3182ce] to-[#4299e2] px-8 py-4 text-lg font-medium text-white hover:from-[#2c5aa0] hover:to-[#3182ce] transition-all duration-200 shadow-lg hover:shadow-xl font-body mb-4"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    Sign In to Register
                                </button>
                                <p className="text-white/60 text-sm mb-4">
                                    Sign in with your Google or GitHub account
                                    to register
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </HeroSection>

            {/* Event Details & Guidelines - Combined Section */}
            <section className="relative px-6 py-16 sm:py-20 bg-[#0a0e13] overflow-hidden">
                <div className="relative mx-auto max-w-7xl space-y-8">
                    {/* Process & Format with Rewards */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Left Column: Process & Format */}
                        <div className="lg:col-span-2">
                            <SpotlightCard className="p-8 h-full">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-8 font-heading text-white">
                                    Process & Format
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-[#3182ce]">
                                            Phase 1: Workshop (12th Sept 2025)
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-[#a0aec0] mb-2">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                                Duration: 8 hours (Offline
                                                Optional)
                                            </span>
                                        </div>
                                        <p className="text-[#a0aec0] font-body">
                                            Hands-on session on Decentralized AI
                                            tools, frameworks, and problem
                                            exploration.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-[#3182ce]">
                                            Phase 2: Hackathon (13th–14th Sept
                                            2025)
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-[#a0aec0] mb-2">
                                            <Clock className="w-4 h-4" />
                                            <span>Duration: 36 hours</span>
                                        </div>
                                        <p className="text-[#a0aec0] font-body">
                                            Teams will develop innovative
                                            prototypes on the theme of
                                            Decentralized AI.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-[#3182ce]">
                                            Phase 3: Presentations & Awards
                                            (15th Sept 2025)
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-[#a0aec0] mb-2">
                                            <Clock className="w-4 h-4" />
                                            <span>15-20 min presentations</span>
                                        </div>
                                        <p className="text-[#a0aec0] font-body">
                                            Shortlisted teams present to an
                                            expert panel. Judging focuses on
                                            innovation, feasibility, technical
                                            depth, and impact.
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Right Column: Rewards & Recognition */}
                        <div className="lg:col-span-1">
                            <SpotlightCard className="p-8 h-full">
                                <h2 className="text-3xl font-bold mb-6 font-heading flex items-center gap-3 text-white">
                                    <Trophy className="w-7 h-7" /> Rewards
                                </h2>
                                <ul className="list-disc pl-5 space-y-3 text-[#a0aec0] font-body">
                                    <li>Certificates for all participants.</li>
                                    <li>
                                        Trophies, prizes, and recognition for
                                        winning teams.
                                    </li>
                                    <li>
                                        Exclusive networking with experts from
                                        LF Decentralized Trust and IEEE
                                        Blockchain Pune.
                                    </li>
                                </ul>
                            </SpotlightCard>
                        </div>
                    </div>

                    {/* Guidelines & Rules */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <SpotlightCard className="p-8">
                                <h2 className="text-3xl font-bold mb-6 font-heading flex items-center gap-3 text-white">
                                    <BookOpenCheck className="w-7 h-7" />{" "}
                                    Guidelines
                                </h2>
                                <ul className="list-disc pl-5 space-y-3 text-[#a0aec0] font-body">
                                    <li>
                                        Deadlines for each phase must be
                                        followed strictly.
                                    </li>
                                    <li>
                                        Your application must follow standard
                                        development practices (README, etc.).
                                    </li>
                                    <li>
                                        A working prototype and documentation
                                        are required for submission.
                                    </li>
                                    <li>
                                        Teams must ensure stable internet for
                                        online participation.
                                    </li>
                                    <li>
                                        Judges&apos; decisions are final and
                                        binding.
                                    </li>
                                </ul>
                            </SpotlightCard>
                        </div>
                        <div>
                            <SpotlightCard className="p-8">
                                <h2 className="text-3xl font-bold mb-6 font-heading flex items-center gap-3 text-white">
                                    <Target className="w-7 h-7" /> Rules
                                </h2>
                                <ul className="list-disc pl-5 space-y-3 text-[#a0aec0] font-body">
                                    <li>Teams must be 1–4 members.</li>
                                    <li>
                                        No participant can join multiple teams.
                                    </li>
                                    <li>
                                        Any programming language, tools, or
                                        frameworks may be used.
                                    </li>
                                    <li>
                                        All solutions must be developed during
                                        the hackathon.
                                    </li>
                                    <li>Professional behavior is mandatory.</li>
                                    <li>
                                        Rule violations result in immediate
                                        disqualification.
                                    </li>
                                </ul>
                            </SpotlightCard>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
