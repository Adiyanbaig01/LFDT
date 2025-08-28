import { Calendar, Users, MapPin, Clock } from "lucide-react";

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
            title: "Hyperledger Fabric Workshop",
            date: "March 15, 2024",
            time: "2:00 PM - 5:00 PM",
            location: "Computer Lab 1, PCCoE",
            description:
                "Learn the fundamentals of Hyperledger Fabric and build your first blockchain network.",
            type: "Workshop",
            registrations: 45,
        },
        {
            title: "Blockchain Hackathon 2024",
            date: "March 22-24, 2024",
            time: "48 Hours",
            location: "Innovation Center, PCCoE",
            description:
                "Build innovative solutions using blockchain technology. Prizes worth ₹50,000!",
            type: "Hackathon",
            registrations: 120,
        },
        {
            title: "Guest Talk: Future of DeFi",
            date: "April 5, 2024",
            time: "4:00 PM - 5:30 PM",
            location: "Auditorium, PCCoE",
            description:
                "Industry expert discussion on the evolution and future of Decentralized Finance.",
            type: "Guest Talk",
            registrations: 200,
        },
    ];

    const pastEvents = [
        {
            title: "Introduction to Blockchain",
            date: "February 10, 2024",
            attendees: 85,
            type: "Workshop",
        },
        {
            title: "Web3 Development Bootcamp",
            date: "January 20-21, 2024",
            attendees: 60,
            type: "Bootcamp",
        },
        {
            title: "LFDT Community Meetup",
            date: "December 15, 2023",
            attendees: 40,
            type: "Meetup",
        },
    ];

    return (
        <main className="min-h-screen bg-[#0f1419] text-white pt-16">
            {/* Hero Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-b from-[#0f1419] via-[#1a202c] to-[#2d3748]">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-tight font-heading">
                        Our <span className="text-[#3182ce]">Events</span>
                    </h1>
                    <p className="mt-8 max-w-4xl mx-auto text-xl text-[#a0aec0] leading-relaxed font-body">
                        Join us for workshops, hackathons, guest talks, and
                        collaborative projects that will expand your knowledge
                        of decentralized technologies
                    </p>
                </div>
            </section>

            {/* Event Types Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Types of{" "}
                            <span className="text-[#3182ce]">Events</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            We regularly organize various events to engage and
                            grow our community
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {eventTypes.map((event, index) => (
                            <div
                                key={index}
                                className={`${event.color} p-8 rounded-xl hover:scale-105 transition-all duration-300`}
                            >
                                <div className="text-4xl mb-4">
                                    {event.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-[#3182ce] font-heading">
                                    {event.title}
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    {event.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Upcoming{" "}
                            <span className="text-[#3182ce]">Events</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Don&apos;t miss out on these exciting upcoming
                            events
                        </p>
                    </div>

                    <div className="space-y-8">
                        {upcomingEvents.map((event, index) => (
                            <div
                                key={index}
                                className="bg-[#1a365d] rounded-xl p-8 hover:bg-[#2d3748] transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="bg-[#3182ce] text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {event.type}
                                            </span>
                                            <span className="text-[#a0aec0] text-sm flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {event.registrations} registered
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 font-heading">
                                            {event.title}
                                        </h3>
                                        <p className="text-[#a0aec0] mb-4 font-body">
                                            {event.description}
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm text-[#a0aec0]">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 lg:mt-0 lg:ml-8">
                                        <button className="bg-[#3182ce] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#4299e2] transition-colors duration-200 w-full lg:w-auto">
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Past <span className="text-[#3182ce]">Events</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            A look at our successful events and community
                            engagement
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pastEvents.map((event, index) => (
                            <div
                                key={index}
                                className="bg-[#2d3748] p-6 rounded-xl"
                            >
                                <span className="bg-[#3182ce]/20 text-[#3182ce] px-3 py-1 rounded-full text-sm font-medium">
                                    {event.type}
                                </span>
                                <h3 className="text-xl font-bold mt-4 mb-2 font-heading">
                                    {event.title}
                                </h3>
                                <div className="flex items-center justify-between text-[#a0aec0] text-sm">
                                    <span>{event.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {event.attendees} attendees
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-r from-[#1a365d] to-[#3182ce]">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                        Stay Updated
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-body">
                        Don&apos;t miss out on our upcoming events. Follow us on
                        social media and join our community to stay informed
                        about all our activities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#1a365d] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-body"
                        >
                            Join Our Community
                        </a>
                        <a
                            href="https://instagram.com/pccoe_lfdt"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white hover:bg-white hover:text-[#1a365d] transition-all duration-200 font-body"
                        >
                            Follow Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
