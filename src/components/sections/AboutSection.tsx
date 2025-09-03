import SectionBackground from "../ui/SectionBackground";
import SpotlightCard from "../ui/SpotlightCard";
import { Wrench, Globe, GraduationCap } from "lucide-react";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative px-6 py-20 sm:py-32 bg-[#0a0e13] overflow-hidden"
        >
            <SectionBackground variant="about" />

            <div className="relative mx-auto max-w-7xl">
                {/* Top row - 2 containers */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-6">
                    {/* Top Left: Main content block */}
                    <SpotlightCard className="relative p-8 backdrop-blur-xl">
                        {/* Random corner accent - top-right */}
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#3182ce] rounded-tr-2xl"></div>
                        {/* Transparent bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>

                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                            Empowering Tomorrow&apos;s{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                Decentralized Leaders
                            </span>
                        </h2>

                        <p className="text-[#a0aec0] text-lg leading-relaxed mb-4">
                            The Linux Foundation Decentralized Trust (LFDT) is a
                            collaborative ecosystem for open-source projects in
                            blockchain, distributed ledgers, and decentralized
                            systems.
                        </p>

                        <p className="text-[#a0aec0] leading-relaxed">
                            Our student-run initiative acts as a local hub for
                            learning and contributing to this global mission,
                            bridging academia and industry through structured
                            pathways and real-world contributions.
                        </p>
                    </SpotlightCard>

                    {/* Top Right: Core Values vertical list */}
                    <SpotlightCard className="relative p-8 backdrop-blur-xl">
                        {/* Random corner accent - bottom-left */}
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#4299e2] rounded-bl-2xl"></div>
                        {/* Transparent bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 bg-[#3182ce] rounded-full"></div>
                            <h3 className="text-xl font-bold text-white">
                                Core Values
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {[
                                "Openness and collaboration",
                                "Transparency and trust",
                                "Innovation through contribution",
                                "Professionalism and community ethics",
                            ].map((value, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 hover:border-[#3182ce]/50 transition-all cursor-pointer"
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                </div>

                {/* Bottom row - 2 containers */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
                    {/* Bottom Left: Impact Metrics */}
                    <SpotlightCard className="relative p-8 backdrop-blur-xl">
                        {/* Random corner accent - top-left */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#3182ce] rounded-tl-2xl"></div>
                        {/* Transparent bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-[#3182ce] rounded-full"></div>
                            <h3 className="text-xl font-bold text-white">
                                Impact Metrics
                            </h3>
                        </div>

                        <p className="text-[#a0aec0] text-sm mb-8">
                            Your data-driven guide to making informed decisions
                            about decentralized technologies.
                        </p>

                        {/* Horizontal metrics layout */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-center group cursor-pointer">
                                <div className="text-5xl font-bold text-[#3182ce] mb-1 group-hover:text-[#4299e2] transition-colors">
                                    100+
                                </div>
                                <div className="text-xs text-[#a0aec0]">
                                    Students
                                </div>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="text-5xl font-bold text-[#3182ce] mb-1 group-hover:text-[#4299e2] transition-colors">
                                    25+
                                </div>
                                <div className="text-xs text-[#a0aec0]">
                                    Open Source Projects
                                </div>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="text-5xl font-bold text-[#3182ce] mb-1 group-hover:text-[#4299e2] transition-colors">
                                    50+
                                </div>
                                <div className="text-xs text-[#a0aec0]">
                                    Active Members
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Bottom Right: Focus Areas */}
                    <SpotlightCard className="relative p-8 backdrop-blur-xl">
                        {/* Random corner accent - bottom-right */}
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#4299e2] rounded-br-2xl"></div>
                        {/* Transparent bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-transparent to-transparent pointer-events-none"></div>

                        <h3 className="text-xl font-bold text-white mb-4">
                            Focus Areas
                        </h3>
                        <p className="text-[#a0aec0] text-sm mb-6">
                            Convert more students with targeted learning
                            strategies and smarter collaboration tools.
                        </p>

                        {/* Rounded rectangle button grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "Blockchain Technology",
                                "Distributed Systems",
                                "Digital Trust",
                                "Community Ethics",
                            ].map((area, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-[#a0aec0] text-sm text-center hover:bg-white/15 hover:border-[#3182ce]/50 hover:text-white transition-all cursor-pointer"
                                >
                                    {area}
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                </div>

                {/* What We Do Section Content - Now part of the same section */}
                <div className="mt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            What We{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                Deliver
                            </span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                            Empowering students through hands-on experience with
                            cutting-edge decentralized technologies
                        </p>
                    </div>

                    {/* Three feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Learn & Experiment */}
                        <SpotlightCard className="group p-8 backdrop-blur-xl">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#3182ce] to-[#4299e2] text-white shadow-lg shadow-[#3182ce]/25">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Learn & Experiment
                            </h3>
                            <p className="text-[#a0aec0] leading-relaxed">
                                Hands-on experience with real-world open-source
                                projects hosted by LFDT. Work directly with
                                blockchain technologies, smart contracts, and
                                decentralized systems.
                            </p>
                        </SpotlightCard>

                        {/* Global Collaboration */}
                        <SpotlightCard className="group p-8 backdrop-blur-xl">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#3182ce] to-[#4299e2] text-white shadow-lg shadow-[#3182ce]/25">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Global Collaboration
                            </h3>
                            <p className="text-[#a0aec0] leading-relaxed">
                                Connect with international developer communities
                                and industry experts
                            </p>
                        </SpotlightCard>

                        {/* Workshops & Events */}
                        <SpotlightCard className="group p-8 backdrop-blur-xl">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#3182ce] to-[#4299e2] text-white shadow-lg shadow-[#3182ce]/25">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Workshops & Events
                            </h3>
                            <p className="text-[#a0aec0] leading-relaxed">
                                Organize workshops, hackathons, and seminars on
                                decentralized trust technologies
                            </p>
                        </SpotlightCard>
                    </div>

                    {/* Bottom tech chips */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
                        {[
                            "Hyperledger Fabric",
                            "Ethereum",
                            "Web3.js",
                            "Solidity",
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[#a0aec0]"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
