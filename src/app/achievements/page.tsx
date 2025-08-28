import { Trophy, Users, GitBranch, Award, Target, Globe } from "lucide-react";

export default function Achievements() {
    const stats = [
        {
            icon: Users,
            number: "100+",
            label: "Students Reached",
            description:
                "Through our workshops and seminars on decentralized systems",
        },
        {
            icon: GitBranch,
            number: "25+",
            label: "Open Source Contributions",
            description:
                "Pull requests to LFDT projects like Hyperledger Fabric and Besu",
        },
        {
            icon: Award,
            number: "10+",
            label: "Events Organized",
            description: "Hackathons, workshops, and community meetups",
        },
        {
            icon: Target,
            number: "5+",
            label: "Industry Partnerships",
            description:
                "Collaborations with tech companies and developer communities",
        },
        {
            icon: Trophy,
            number: "3",
            label: "Global Hackathons",
            description: "Participation in LFDT hackathons and global meetups",
        },
        {
            icon: Globe,
            number: "50+",
            label: "Active Members",
            description: "Dedicated students contributing to our mission",
        },
    ];

    const achievements = [
        {
            title: "Successful Workshop Series",
            description:
                "Conducted comprehensive workshops introducing over 100 students to blockchain fundamentals, Hyperledger Fabric, and other LFDT technologies.",
            date: "2023-2024",
            impact: "100+ students trained",
            category: "Education",
        },
        {
            title: "Open Source Contributions",
            description:
                "Our members have made significant contributions to various LFDT projects including Hyperledger Fabric, Besu, and Cactus through pull requests and issue resolutions.",
            date: "Ongoing",
            impact: "25+ contributions",
            category: "Development",
        },
        {
            title: "Hackathon Participation",
            description:
                "Active participation in global LFDT hackathons and local blockchain competitions, showcasing innovative solutions and representing PCCoE.",
            date: "2023-2024",
            impact: "3 global events",
            category: "Competition",
        },
        {
            title: "Industry Collaborations",
            description:
                "Established partnerships with leading blockchain companies and developer communities to provide real-world exposure to our members.",
            date: "2023-2024",
            impact: "5+ partnerships",
            category: "Partnership",
        },
        {
            title: "Technical Case Studies",
            description:
                "Developed and presented case studies showcasing practical applications of decentralized trust technologies in solving local challenges.",
            date: "2024",
            impact: "3 case studies",
            category: "Research",
        },
        {
            title: "Community Building",
            description:
                "Built a strong community of blockchain enthusiasts within PCCoE, fostering peer-to-peer learning and collaboration.",
            date: "2023-2024",
            impact: "50+ active members",
            category: "Community",
        },
    ];

    const milestones = [
        {
            year: "2023",
            title: "Club Foundation",
            description:
                "Established the PCCoE LFDT Club as an official student chapter",
        },
        {
            year: "2023",
            title: "First Workshop",
            description:
                "Conducted our inaugural blockchain workshop with 30+ participants",
        },
        {
            year: "2023",
            title: "LFDT Partnership",
            description:
                "Officially partnered with Linux Foundation Decentralized Trust",
        },
        {
            year: "2024",
            title: "100 Students Milestone",
            description:
                "Reached 100+ students through our educational initiatives",
        },
        {
            year: "2024",
            title: "Open Source Recognition",
            description:
                "Gained recognition for significant contributions to LFDT projects",
        },
        {
            year: "2024",
            title: "Industry Partnerships",
            description:
                "Established collaborations with 5+ blockchain companies",
        },
    ];

    return (
        <main className="min-h-screen bg-[#0f1419] text-white pt-16">
            {/* Hero Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-b from-[#0f1419] via-[#1a202c] to-[#2d3748]">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-tight font-heading">
                        Our <span className="text-[#3182ce]">Achievements</span>
                    </h1>
                    <p className="mt-8 max-w-4xl mx-auto text-xl text-[#a0aec0] leading-relaxed font-body">
                        Building real impact within and beyond the college
                        community through dedication, innovation, and
                        collaboration
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Impact by{" "}
                            <span className="text-[#3182ce]">Numbers</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Quantifying our contribution to the blockchain and
                            open-source community
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-[#2d3748] p-8 rounded-xl text-center hover:bg-[#374151] transition-all duration-300 hover:scale-105"
                            >
                                <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-[#3182ce] mb-2 font-heading">
                                    {stat.number}
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-heading">
                                    {stat.label}
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Key{" "}
                            <span className="text-[#3182ce]">Achievements</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Milestones that showcase our commitment to
                            excellence and community impact
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="bg-[#1a365d] p-8 rounded-xl hover:bg-[#2d3748] transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-[#3182ce] text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {achievement.category}
                                    </span>
                                    <span className="text-[#a0aec0] text-sm">
                                        {achievement.date}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-heading">
                                    {achievement.title}
                                </h3>
                                <p className="text-[#a0aec0] mb-4 font-body">
                                    {achievement.description}
                                </p>
                                <div className="flex items-center gap-2 text-[#3182ce] font-medium">
                                    <Trophy className="w-4 h-4" />
                                    <span>{achievement.impact}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Our <span className="text-[#3182ce]">Journey</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Key milestones in our growth and development as a
                            community
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#3182ce] hidden md:block"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center ${
                                        index % 2 === 0
                                            ? "md:flex-row"
                                            : "md:flex-row-reverse"
                                    }`}
                                >
                                    <div
                                        className={`w-full md:w-1/2 ${
                                            index % 2 === 0
                                                ? "md:pr-8"
                                                : "md:pl-8"
                                        }`}
                                    >
                                        <div className="bg-[#2d3748] p-6 rounded-xl">
                                            <div className="flex items-center gap-4 mb-3">
                                                <span className="bg-[#3182ce] text-white px-3 py-1 rounded-full text-sm font-bold">
                                                    {milestone.year}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 font-heading">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-[#a0aec0] font-body">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="hidden md:block w-4 h-4 bg-[#3182ce] rounded-full border-4 border-[#1a202c] relative z-10"></div>

                                    <div className="w-full md:w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Recognition Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Recognition &{" "}
                            <span className="text-[#3182ce]">Awards</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Acknowledgments from the community and industry
                            partners
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="bg-[#1a365d] p-8 rounded-xl text-center">
                            <Award className="w-16 h-16 text-[#3182ce] mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4 font-heading">
                                LFDT Community Recognition
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Recognized by LFDT for outstanding contributions
                                to open-source projects and community building
                            </p>
                        </div>

                        <div className="bg-[#1a365d] p-8 rounded-xl text-center">
                            <Trophy className="w-16 h-16 text-[#3182ce] mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4 font-heading">
                                Best Student Chapter
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Awarded &quot;Best Student Chapter&quot; by
                                PCCoE for exceptional student engagement and
                                technical initiatives
                            </p>
                        </div>

                        <div className="bg-[#1a365d] p-8 rounded-xl text-center">
                            <Globe className="w-16 h-16 text-[#3182ce] mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4 font-heading">
                                Global Community Impact
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Featured in LFDT global newsletter for
                                significant contributions to the blockchain
                                ecosystem
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-r from-[#1a365d] to-[#3182ce]">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                        Be Part of Our Success
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-body">
                        Join our community and contribute to the next chapter of
                        achievements. Together, we can build the future of
                        decentralized trust technologies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#1a365d] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-heading"
                        >
                            Join Our Community
                        </a>
                        <a
                            href="/events"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white hover:bg-white hover:text-[#1a365d] transition-all duration-200 font-heading"
                        >
                            Upcoming Events
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
