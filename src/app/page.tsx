"use client";
import Orb from "@/components/Orb";
import InteractiveBackground from "@/components/InteractiveBackground";
import AboutSection from "@/components/sections/AboutSection";
import EventsSection from "@/components/sections/EventsSection";
import CTASection from "@/components/sections/CTASection";
import {
    Github,
    Layers,
    Database,
    Globe,
    ArrowRight,
    Rocket,
} from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0a0e13] text-white home-merged">
            {/* Hero Section */}
            <section className="relative px-6 py-20 sm:py-32 min-h-screen  overflow-hidden flex items-center">
                {/* Interactive 3D cubes and ripple background (behind everything) */}
                <InteractiveBackground />
                {/* Large Orb encompassing hero content */}
                <div className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-none">
                    <div className="w-[1000px] h-[1000px] opacity-100">
                        <Orb
                            hoverIntensity={0.4}
                            rotateOnHover={true}
                            forceHoverState={false}
                        />
                    </div>
                </div>

                {/* Readability overlay above orb, below content */}
                <div className="absolute inset-0 z-[20] pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.15)_0%,_rgba(10,14,19,0.25)_55%,_rgba(10,14,19,0.45)_100%)]" />

                <div className="relative z-[30] mx-auto max-w-4xl w-full text-center">
                    {/* Version Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                        <div className="w-2 h-2 bg-[#3182ce] rounded-full animate-pulse"></div>
                        <Rocket className="w-4 h-4 text-[#3182ce]" />
                        <span className="text-sm text-white/70">
                            Build-A-Thon 2025 is Here!
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-3xl lg:max-w-4xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                            Where{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                Agents
                            </span>
                            <br />
                            Shape Tomorrow
                        </h1>
                        <h2 className="text-xl sm:text-2xl text-[#a0aec0] leading-relaxed mb-4 max-w-3xl mx-auto font-medium">
                            Join us for PCCoE&apos;s first-ever{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                LF
                            </span>
                            <span className="text-white">DT </span>
                            Club Hackathon!
                        </h2>
                        <p className="text-base sm:text-lg text-[#a0aec0] leading-relaxed mb-8 max-w-2xl mx-auto">
                            An unforgettable journey into Decentralized AI,
                            innovation, and community collaboration. Kickstart
                            your blockchain & AI journey with a hands-on
                            workshop, dive into a 36-hour hackathon, and
                            showcase your talent in front of industry experts.
                            Whether you&apos;re a beginner or a pro, this is
                            your chance to build, learn, and leave your mark.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-2 flex items-center gap-3 justify-center">
                            <button
                                onClick={() => {
                                    window.location.href = "/events";
                                }}
                                className="group inline-flex items-center gap-2 px-7 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
                                aria-label="Explore our events"
                            >
                                <span>Explore Events</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                            <button
                                onClick={() => {
                                    window.location.href = "/events/buildathon";
                                }}
                                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                aria-label="Register for Build-A-Thon 2025"
                            >
                                <span>Register Now</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>

                    {/* Brand Logos */}
                    <div className="mt-10 max-w-7xl mx-auto">
                        <p className="text-sm text-center text-white/40 mb-8 font-medium">
                            Trusted by leading blockchain projects
                        </p>
                        <div className="flex items-center justify-center gap-16 opacity-60">
                            <div className="flex flex-col items-center gap-2">
                                <Github className="w-8 h-8 text-white/60" />
                                <span className="text-sm font-medium text-white/40">
                                    GitHub
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Layers className="w-8 h-8 text-white/60" />
                                <span className="text-sm font-medium text-white/40">
                                    Hyperledger
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Database className="w-8 h-8 text-white/60" />
                                <span className="text-sm font-medium text-white/40">
                                    Ethereum
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Globe className="w-8 h-8 text-white/60" />
                                <span className="text-sm font-medium text-white/40">
                                    FireFly
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Combined About + What We Do Section */}
            <AboutSection />

            {/* Combined Events + Impact Section */}
            <EventsSection />

            {/* Merged CTA + Footer (shared background) */}
            <CTASection />

            {/* Footer moved to RootLayout */}
        </main>
    );
}
