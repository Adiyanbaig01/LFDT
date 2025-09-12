"use client";

import {
    Calendar,
    Clock,
    ArrowLeft,
    Play,
    MessageCircle,
    Eye,
    Youtube,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function BuildathonPhase2Page() {
    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            <HeroSection
                title="Build-A-Thon 2025 - Phase 2"
                subtitle="Live Presentations & Final Judging"
                height={500}
            >
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#a0aec0] max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5 text-[#3182ce]" />
                        <span>September 15, 2025</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-[#3182ce]" />
                        <span>Live Streaming</span>
                    </div>
                </div>
            </HeroSection>

            <section className="relative px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-4xl">
                    <SpotlightCard className="p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center mx-auto mb-8">
                            <Play className="w-12 h-12 text-white" />
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-6 font-heading">
                            Coming Soon!
                        </h2>

                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                            This page will be live on{" "}
                            <strong className="text-[#3182ce]">
                                14th September 2025
                            </strong>{" "}
                            as per the event timelines.
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                What to Expect
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div>
                                    <h4 className="text-lg font-medium text-[#3182ce] mb-2">
                                        Live Presentations
                                    </h4>
                                    <p className="text-white/70">
                                        Shortlisted teams will present their
                                        projects live to our expert panel of
                                        judges.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#3182ce] mb-2">
                                        Interactive Judging
                                    </h4>
                                    <p className="text-white/70">
                                        Watch as judges evaluate projects on
                                        innovation, technical depth, and
                                        real-world impact.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#3182ce] mb-2">
                                        Live Q&A
                                    </h4>
                                    <p className="text-white/70">
                                        Teams will answer questions from judges
                                        and demonstrate their working
                                        prototypes.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-[#3182ce] mb-2">
                                        Awards Ceremony
                                    </h4>
                                    <p className="text-white/70">
                                        Live announcement of winners and
                                        recognition of outstanding achievements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#3182ce]/10 to-[#4299e2]/10 border border-[#3182ce]/20 rounded-lg p-6 mb-8">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Calendar className="w-5 h-5 text-[#3182ce]" />
                                <h4 className="text-lg font-semibold text-white">
                                    Mark Your Calendar
                                </h4>
                            </div>
                            <p className="text-white/80">
                                Phase 2 presentations will begin on{" "}
                                <strong>September 15, 2025</strong>. Make sure
                                to check if your team is shortlisted and prepare
                                for the final showcase!
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/events/buildathon"
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Build-A-Thon
                            </Link>
                            <Link
                                href="/events/buildathon/shortlisted"
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors"
                            >
                                Check Shortlist Status
                            </Link>
                        </div>
                    </SpotlightCard>
                </div>
            </section>
        </main>
    );
}
