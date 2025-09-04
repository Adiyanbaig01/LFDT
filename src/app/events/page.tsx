import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBackground from "@/components/ui/SectionBackground";

export default function Events() {
    const eventTypes = [
        {
            title: "Workshops",
            description:
                "Hands-on sessions on blockchain basics, Hyperledger Fabric, Besu, Cactus, FireFly, and more.",
            icon: "🔧",
            color: "bg-[#1a365d]",
        },
        {
            title: "Hackathons & Challenges",
            description:
                "Build innovative decentralized applications, collaborate in teams, and showcase your solutions.",
            icon: "💻",
            color: "bg-[#2d3748]",
        },
        {
            title: "Guest Talks",
            description:
                "Hear from LFDT community experts, project maintainers, and industry professionals.",
            icon: "🎤",
            color: "bg-[#1a365d]",
        },
        {
            title: "Webinars & Study Circles",
            description:
                "Regular online/offline discussions on technical papers, new projects, and case studies from LFDT.",
            icon: "📚",
            color: "bg-[#2d3748]",
        },
        {
            title: "Collaborative Projects",
            description:
                "Student-led contributions to open-source projects hosted under LFDT.",
            icon: "🤝",
            color: "bg-[#1a365d]",
        },
        {
            title: "Community Meetups",
            description:
                "Regular networking sessions to connect with fellow developers and blockchain enthusiasts.",
            icon: "🌐",
            color: "bg-[#2d3748]",
        },
    ];

    const upcomingEvents = [
        {
            title: "Build-A-Thon 2025 — Where Agents Shape Tomorrow",
            date: "Sept 12–15, 2025",
            time: "Workshop, 36h Hackathon, Presentations",
            location: "PCCOE, Akurdi, Pune, Maharashtra",
            description:
                "A 3-phase event on Decentralized AI: hands-on workshop (Sept 12), 36-hour hackathon (Sept 13–14), and presentations & awards (Sept 15).",
            type: "Hackathon",
            registrations: 0,
        },
    ];

    // Past events removed per requirement

    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            <HeroSection
                title={"Our Events"}
                subtitle="Join us for workshops, hackathons, guest talks, and collaborative projects that will expand your knowledge of decentralized technologies"
                height={600}
            />

            <div className="relative overflow-hidden">
                <SectionBackground />
                {/* Upcoming Events Section */}
                <section className="relative px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                Upcoming{" "}
                                <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                    Event
                                </span>
                            </h2>
                            <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                                Don&apos;t miss out on this exciting upcoming
                                event.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            {upcomingEvents.map((event, index) => (
                                <SpotlightCard
                                    key={index}
                                    className="group p-8 backdrop-blur-xl"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    {event.type}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 text-white">
                                                {event.title}
                                            </h3>
                                            <p className="text-[#a0aec0] mb-4 font-body">
                                                {event.description}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-[#a0aec0]">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-[#3182ce]" />
                                                    {event.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-[#3182ce]" />
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-[#3182ce]" />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 lg:mt-0 lg:ml-8 flex-shrink-0">
                                            <Link
                                                href="/events/buildathon"
                                                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-black hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-body"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Event Types Section */}
                <section className="relative px-6 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                Types of{" "}
                                <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                    Events
                                </span>
                            </h2>
                            <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto">
                                We regularly organize various events to engage
                                and grow our community.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {eventTypes.map((event, index) => (
                                <SpotlightCard
                                    key={index}
                                    className="p-8 flex flex-col items-start"
                                >
                                    <div className="text-4xl mb-4">
                                        {event.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">
                                        {event.title}
                                    </h3>
                                    <p className="text-[#a0aec0] font-body flex-grow">
                                        {event.description}
                                    </p>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
