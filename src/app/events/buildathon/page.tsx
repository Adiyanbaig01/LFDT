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
    MessageCircle,
    Eye,
    Youtube,
} from "lucide-react";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useAuth } from "@/contexts/AuthContext";
import WaitingPage from "@/components/WaitingPage";

export default function BuildathonPage() {
    const { user, isRegisteredForEvent, getEventRegistration } = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);
    const [checkingRegistration, setCheckingRegistration] = useState(true);
    const [, setIsShortlisted] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [showWaitingPage, setShowWaitingPage] = useState(false);

    const eventId = "buildathon-2025";

    useEffect(() => {
        const checkRegistration = async () => {
            if (user) {
                try {
                    const registered = await isRegisteredForEvent(eventId);
                    setIsRegistered(registered);

                    if (registered) {
                        // Get registration details
                        const registration = await getEventRegistration(
                            eventId
                        );
                        if (registration) {
                            setTeamName(registration.team.teamName);
                        }

                        // Check if user is shortlisted
                        const shortlistResponse = await fetch(
                            `/api/check-shortlisted?userId=${user.uid}`
                        );
                        if (shortlistResponse.ok) {
                            const { isShortlisted } =
                                await shortlistResponse.json();
                            setIsShortlisted(isShortlisted);

                            // Show waiting page during hackathon period if shortlisted
                            const now = new Date();
                            const hackathonStart = new Date(
                                "2025-09-12T00:00:00"
                            );
                            const hackathonEnd = new Date(
                                "2025-09-16T00:00:00"
                            );

                            setShowWaitingPage(
                                isShortlisted &&
                                    now >= hackathonStart &&
                                    now <= hackathonEnd
                            );
                        }
                    }
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
    }, [user, isRegisteredForEvent, getEventRegistration]);

    // Show waiting page for shortlisted users during hackathon period
    if (showWaitingPage && user) {
        return (
            <WaitingPage
                teamName={teamName}
                userName={user.displayName || user.email || "Participant"}
            />
        );
    }

    // Remove handleRegistration function as we no longer redirect to auth pages

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
                        <div className="flex flex-row gap-3 justify-center">
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        "/events/buildathon/shortlisted")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors"
                            >
                                <Target className="w-4 h-4" />
                                View Shortlisted
                            </button>
                            <div className="group relative">
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            "/events/buildathon/submit")
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 transition-colors cursor-pointer"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Edit Submission
                                </button>
                            </div>
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        "/events/buildathon/phase-2")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3182ce] to-[#4299e2] px-6 py-3 text-base font-medium text-white hover:from-[#2c5aa0] hover:to-[#3182ce] transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <BookOpenCheck className="w-4 h-4" />
                                Go to Phase-2
                            </button>
                        </div>
                    ) : user ? (
                        <div className="flex justify-center">
                            <button
                                onClick={() =>
                                    (window.location.href =
                                        "/events/buildathon/submit")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3182ce] to-[#4299e2] px-8 py-4 text-lg font-medium text-white hover:from-[#2c5aa0] hover:to-[#3182ce] transition-all duration-200 shadow-lg hover:shadow-xl font-body"
                            >
                                <UserPlus className="w-5 h-5" />
                                Submit Project
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-8 py-4 text-lg font-medium text-white/70 mb-4">
                                    <UserPlus className="w-5 h-5" />
                                    Please sign in to submit your project
                                </div>
                                <p className="text-white/60 text-sm mb-4">
                                    Use the Sign In button in the navbar
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </HeroSection>

            {/* Instructions Section - Only show after submission */}
            {isRegistered && (
                <section className="relative px-6 py-12 bg-[#0a0e13]/50">
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-4 font-heading">
                                What You Need to Know
                            </h2>
                            <p className="text-white/70 max-w-2xl mx-auto">
                                Stay connected and informed about the
                                Build-A-Thon progress and upcoming
                                presentations.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            

                            <SpotlightCard className="p-6 flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <Eye className="w-6 h-6 text-[#3182ce]" />
                                    <h3 className="text-lg font-semibold text-white">
                                        Check Shortlist Status
                                    </h3>
                                </div>
                                <p className="text-white/70 text-sm flex-grow">
                                    Visit the shortlisted page to see if your
                                    team made it to the next phase.
                                </p>
                            </SpotlightCard>
<SpotlightCard className="p-6 flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                                    <h3 className="text-lg font-semibold text-white">
                                        Join WhatsApp Community
                                    </h3>
                                </div>
                                <p className="text-white/70 text-sm mb-4 flex-grow">
                                    Get real-time updates and coordinate with
                                    other participants.
                                </p>
                                <button
                                    onClick={() =>
                                        window.open(
                                            "https://chat.whatsapp.com/ECe5WdmWWYXJidNw2SXucj",
                                            "_blank"
                                        )
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#25D366] text-[#25D366] rounded-lg text-sm font-medium hover:bg-[#25D366] hover:text-white transition-all duration-200 mt-auto"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Join WhatsApp Group
                                </button>
                            </SpotlightCard>
                            <SpotlightCard className="p-6 flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <Youtube className="w-6 h-6 text-[#FF0000]" />
                                    <h3 className="text-lg font-semibold text-white">
                                        Live Presentations
                                    </h3>
                                </div>
                                <p className="text-white/70 text-sm flex-grow">
                                    Shortlisted teams will present live. Watch
                                    the presentations here.
                                </p>
                            </SpotlightCard>
                        </div>
                    </div>
                </section>
            )}

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
