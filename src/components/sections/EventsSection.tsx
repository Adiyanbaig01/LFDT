import Link from "next/link";
import Image from "next/image";
import SectionBackground from "../ui/SectionBackground";
import SpotlightCard from "../ui/SpotlightCard";
import {
    Target,
    Trophy,
    CircleDollarSign,
    CalendarDays,
    Clock,
    Users,
    MapPin,
} from "lucide-react";

export default function EventsSection() {
    return (
        <section className="relative px-6 py-20 sm:py-32 bg-[#0a0e13] overflow-hidden">
            <SectionBackground variant="events" />

            <div className="relative mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Our{" "}
                        <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                            Events
                        </span>
                    </h2>
                    <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                        Curated, high-impact experiences that align with our
                        mission.
                    </p>
                </div>

                {/* Two-card layout: Build-A-Thon + Explore more */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                    {/* Buildathon card */}
                    <SpotlightCard className="group p-8 backdrop-blur-xl">
                        <div className="flex items-start justify-between gap-6 mb-6">
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white text-xs font-semibold">
                                Featured
                            </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Build-A-Thon 2025
                        </h3>
                        <p className="text-[#a0aec0] leading-relaxed mb-6">
                            Where Agents Shape Tomorrow - A comprehensive
                            3-phase event featuring workshops, 36-hour
                            hackathon, and expert presentations on Decentralized
                            AI.
                        </p>

                        {/* Event details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-[#a0aec0]">
                                <Clock className="w-4 h-4 text-[#3182ce]" />
                                <span className="text-sm">
                                    Sept 12-15, 2025
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#a0aec0]">
                                <Users className="w-4 h-4 text-[#3182ce]" />
                                <span className="text-sm">Teams of 1-4</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#a0aec0]">
                                <MapPin className="w-4 h-4 text-[#3182ce]" />
                                <span className="text-sm">PCCOE, Pune</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm text-[#a0aec0] border border-white/10 inline-flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span>Decentralized AI</span>
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm text-[#a0aec0] border border-white/10 inline-flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                <span>Expert Judges</span>
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-lg text-sm text-[#a0aec0] border border-white/10 inline-flex items-center gap-2">
                                <CircleDollarSign className="w-4 h-4" />
                                <span>Prizes & Certificates</span>
                            </div>
                        </div>

                        {/* Event phases */}
                        <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">
                                Event Phases:
                            </h4>
                            <div className="space-y-3 text-sm text-[#a0aec0]">
                                <div>
                                    <span className="text-[#3182ce] font-semibold">
                                        Phase 1 (Sept 12):
                                    </span>{" "}
                                    8-hour workshop on Decentralized AI tools &
                                    frameworks
                                </div>
                                <div>
                                    <span className="text-[#3182ce] font-semibold">
                                        Phase 2 (Sept 13-14):
                                    </span>{" "}
                                    36-hour hackathon for prototype development
                                </div>
                                <div>
                                    <span className="text-[#3182ce] font-semibold">
                                        Phase 3 (Sept 15):
                                    </span>{" "}
                                    Team presentations to expert panel
                                </div>
                            </div>
                        </div>

                        {/* Additional highlights */}
                        <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                            <h4 className="text-white font-semibold mb-2">
                                What You&apos;ll Get:
                            </h4>
                            <ul className="text-sm text-[#a0aec0] space-y-1">
                                <li>• Certificates for all participants</li>
                                <li>• Trophies and prizes for winning teams</li>
                                <li>
                                    • Networking with LF Decentralized Trust &
                                    IEEE Blockchain Pune experts
                                </li>
                                <li>
                                    • Hands-on experience with cutting-edge AI
                                    tools
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-center gap-3 justify-end">
                            <button
                                onClick={() => {
                                    window.location.href = "/events/buildathon";
                                }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                <span>Register Now!</span>
                            </button>
                        </div>
                    </SpotlightCard>

                    {/* Explore more events card */}
                    <Link href="/events" className="block">
                        <SpotlightCard className="group p-6 backdrop-blur-xl bg-gradient-to-br from-[rgba(45,55,72,0.4)] to-[rgba(26,32,44,0.6)] hover:from-[rgba(45,55,72,0.5)] hover:to-[rgba(26,32,44,0.7)]">
                            {/* Event hero image */}
                            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/1.jpeg"
                                    alt="Build-A-Thon event"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex h-full flex-col items-start justify-between gap-4">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                                    <CalendarDays className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Explore more events
                                    </h3>
                                    <p className="text-[#a0aec0] leading-relaxed">
                                        Workshops, talks, study circles,
                                        open-source sprints, and more — all in
                                        one place.
                                    </p>
                                </div>
                                <div className="mt-2 inline-flex items-center gap-2 text-[#3182ce] font-semibold">
                                    <span>Go to events</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </Link>
                </div>
            </div>
        </section>
    );
}
