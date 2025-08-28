"use client";
import Orb from "@/components/Orb";
import InteractiveBackground from "@/components/InteractiveBackground";
import {
    Github,
    Layers,
    Database,
    Globe,
    ArrowRight,
    Play,
} from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0f1419] text-white">
            {/* Hero Section */}
            <section className="relative px-6 py-20 sm:py-32 min-h-screen overflow-hidden flex items-center">
                {/* Interactive 3D cubes and ripple background (behind everything) */}
                <InteractiveBackground />
                {/* Large Orb encompassing hero content */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[1000px] h-[1000px] opacity-100">
                        <Orb
                            hue={15} // Blue hue matching website theme
                            hoverIntensity={0.4}
                            rotateOnHover={true}
                            forceHoverState={false}
                        />
                    </div>
                </div>

                <div className="relative z-0 mx-auto max-w-7xl w-full text-center">
                    {/* Version Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                        <div className="w-2 h-2 bg-[#3182ce] rounded-full animate-pulse"></div>
                        <span className="text-sm text-white/70">
                            New chapter launched, join us!
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-3xl lg:max-w-4xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                            Revolutionize Trust
                            <br />
                            with{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                LFDT
                            </span>
                            .
                        </h1>
                        <p className="text-lg sm:text-xl text-[#a0aec0] leading-relaxed mb-8 max-w-2xl mx-auto">
                            Expertly crafted blockchain experiences that
                            captivate, connect with innovative minds, and leave
                            a lasting impact on decentralized systems.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-2 flex items-center gap-3 justify-center">
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                aria-label="Join LFDT"
                            >
                                <Play className="w-4 h-4" />
                                <span>Join Us</span>
                            </a>
                            <a
                                href="#about"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
                                aria-label="Learn more about LFDT"
                            >
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </div>
                    </div>

                    {/* Brand Logos */}
                    <div className="mt-20 max-w-7xl mx-auto">
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

            {/* About Section */}
            <section id="about" className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                                About{" "}
                                <span className="text-[#3182ce]">LFDT</span>
                            </h2>
                            <p className="text-lg text-[#a0aec0] leading-relaxed mb-8">
                                The Linux Foundation Decentralized Trust (LFDT)
                                is a collaborative ecosystem for open-source
                                projects in blockchain, distributed ledgers, and
                                decentralized systems. Its mission is to enable
                                innovation, adoption, and standardization in
                                digital trust technologies across industries.
                            </p>
                            <p className="text-lg text-[#a0aec0] leading-relaxed">
                                Our student-run initiative acts as a local hub
                                for learning and contributing to this global
                                mission, bridging academia and industry through
                                structured pathways and real-world
                                contributions.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6 text-[#3182ce]">
                                Core Values
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Openness and collaboration
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Transparency and trust
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Innovation through contribution
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Professionalism and community ethics
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            What We Do
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                            Empowering students through hands-on experience with
                            cutting-edge decentralized technologies
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-[#1a365d] p-8 rounded-xl hover:bg-[#2d3748] transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center mb-6">
                                <span className="text-white font-bold">🔧</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Learn & Experiment
                            </h3>
                            <p className="text-[#a0aec0]">
                                Hands-on experience with real-world open-source
                                projects hosted by LFDT
                            </p>
                        </div>
                        <div className="bg-[#1a365d] p-8 rounded-xl hover:bg-[#2d3748] transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center mb-6">
                                <span className="text-white font-bold">🎓</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Workshops & Events
                            </h3>
                            <p className="text-[#a0aec0]">
                                Organize workshops, hackathons, and seminars on
                                decentralized trust technologies
                            </p>
                        </div>
                        <div className="bg-[#1a365d] p-8 rounded-xl hover:bg-[#2d3748] transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center mb-6">
                                <span className="text-white font-bold">🌐</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Global Collaboration
                            </h3>
                            <p className="text-[#a0aec0]">
                                Connect with international developer communities
                                and industry experts
                            </p>
                        </div>
                        <div className="bg-[#1a365d] p-8 rounded-xl hover:bg-[#2d3748] transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center mb-6">
                                <span className="text-white font-bold">🚀</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                Innovation Hub
                            </h3>
                            <p className="text-[#a0aec0]">
                                Encourage peer-to-peer learning and drive
                                innovation in decentralized systems
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            Our Events
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                            Regular activities to engage and grow our community
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#3182ce]">
                                Workshops
                            </h3>
                            <p className="text-[#a0aec0] mb-4">
                                Hands-on sessions on blockchain basics,
                                Hyperledger Fabric, Besu, Cactus, FireFly, and
                                more.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#3182ce]">
                                Hackathons
                            </h3>
                            <p className="text-[#a0aec0] mb-4">
                                Build innovative decentralized applications,
                                collaborate in teams, and showcase your
                                solutions.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#3182ce]">
                                Guest Talks
                            </h3>
                            <p className="text-[#a0aec0] mb-4">
                                Hear from LFDT community experts, project
                                maintainers, and industry professionals.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#3182ce]">
                                Study Circles
                            </h3>
                            <p className="text-[#a0aec0] mb-4">
                                Regular discussions on technical papers, new
                                projects, and case studies from LFDT.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#3182ce]">
                                Open Source Projects
                            </h3>
                            <p className="text-[#a0aec0] mb-4">
                                Student-led contributions to open-source
                                projects hosted under LFDT.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-4 text-[#3182ce]">
                                Webinars
                            </h3>
                            <p className="text-[#a0aec0] mb-4">
                                Online sessions covering the latest trends and
                                developments in decentralized technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            Our Impact
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                            Building real impact within and beyond the college
                            community
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#3182ce] mb-4">
                                100+
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Students Reached
                            </h3>
                            <p className="text-[#a0aec0]">
                                Through our workshops and seminars on
                                decentralized systems
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#3182ce] mb-4">
                                25+
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Open Source Contributions
                            </h3>
                            <p className="text-[#a0aec0]">
                                Pull requests to LFDT projects like Hyperledger
                                Fabric and Besu
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#3182ce] mb-4">
                                10+
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Events Organized
                            </h3>
                            <p className="text-[#a0aec0]">
                                Hackathons, workshops, and community meetups
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#3182ce] mb-4">
                                5+
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Industry Partnerships
                            </h3>
                            <p className="text-[#a0aec0]">
                                Collaborations with tech companies and developer
                                communities
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#3182ce] mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Global Hackathons
                            </h3>
                            <p className="text-[#a0aec0]">
                                Participation in LFDT hackathons and global
                                meetups
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#3182ce] mb-4">
                                50+
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Active Members
                            </h3>
                            <p className="text-[#a0aec0]">
                                Dedicated students contributing to our mission
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-r from-[#1a365d] to-[#3182ce]">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                        Ready to Join Our Community?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Be part of the future of decentralized technologies.
                        Connect with like-minded students, contribute to
                        open-source projects, and build your career in
                        blockchain and distributed systems.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#1a365d] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Join the Club
                        </a>
                        <a
                            href="https://instagram.com/pccoe_lfdt"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white hover:bg-white hover:text-[#1a365d] transition-all duration-200"
                        >
                            Follow Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer moved to RootLayout */}
        </main>
    );
}
