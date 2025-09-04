import { Mail, Linkedin, Github } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBackground from "@/components/ui/SectionBackground";
import Image from "next/image";

export default function Team() {
    const facultyCoordinators = [
        {
            name: "Dr. Sonali Patil",
            role: "Faculty Coordinator",
            department: "Computer Engineering",
            image: "/HOD.png",
            bio: "Dr. Patil specializes in blockchain technology and distributed systems. She has published numerous papers on decentralized trust mechanisms.",
            email: "sonali.patil@pccoepune.org",
            linkedin: "#",
        },
        {
            name: "Dr. Meghana Lokhande",
            role: "Faculty Coordinator",
            department: "Information Technology",
            image: "/meghna.png",
            bio: "Dr. Lokhande is an expert in cryptography and security protocols. She guides students in understanding the security aspects of blockchain.",
            email: "meghana.lokhande@pccoepune.org",
            linkedin: "#",
        },
    ];

    const studentLeads = [
        {
            name: "Varad Kulkarni",
            role: "President",
            year: "Final Year",
            branch: "Computer Engineering",
            image: "/varad.png",
            bio: "Passionate about blockchain development and open-source contributions. Leading the club's technical initiatives and community outreach.",
            email: "varad.kulkarni@student.pccoepune.org",
            linkedin: "#",
            github: "#",
            achievements: [
                "Hyperledger Fabric Contributor",
                "Hackathon Winner",
            ],
        },
        {
            name: "Adiyan Baig",
            role: "Technical Head",
            year: "Final Year",
            branch: "Information Technology",
            image: "/adiyan.png",
            bio: "Focused on Web3 development and smart contract security. Organizing workshops and mentoring junior members.",
            email: "adiyan.baig@student.pccoepune.org",
            linkedin: "#",
            github: "#",
            achievements: ["Smart Contract Auditor", "LFDT Ambassador"],
        },
    ];

    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            {/* Hero Section */}
            <HeroSection
                title={
                    <>
                        Meet Our{" "}
                        <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                            Team
                        </span>
                    </>
                }
                subtitle="Dedicated individuals driving innovation and fostering the blockchain community at PCCoE"
                height={600}
            />

            <div className="relative overflow-hidden">
                <SectionBackground variant="default" />
                {/* Faculty Coordinators Section */}
                <section className="relative px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                                Faculty{" "}
                                <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                    Coordinators
                                </span>
                            </h2>
                            <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                                Experienced faculty members guiding our journey in
                                blockchain and decentralized technologies
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {facultyCoordinators.map((faculty, index) => (
                                <SpotlightCard
                                    key={index}
                                    className="p-8"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-32 h-32 rounded-full mb-6 overflow-hidden bg-[#3182ce] flex items-center justify-center">
                                            <Image
                                                src={faculty.image}
                                                alt={faculty.name}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 text-white font-heading">
                                            {faculty.name}
                                        </h3>
                                        <p className="text-[#3182ce] font-medium mb-2">
                                            {faculty.role}
                                        </p>
                                        <p className="text-[#a0aec0] mb-4">
                                            {faculty.department}
                                        </p>
                                        <p className="text-[#a0aec0] mb-6 font-body">
                                            {faculty.bio}
                                        </p>
                                        <div className="flex gap-4">
                                            <a
                                                href={`mailto:${faculty.email}`}
                                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={faculty.linkedin}
                                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Student Leadership Section */}
                <section className="relative px-6 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                                Student{" "}
                                <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                    Leadership
                                </span>
                            </h2>
                            <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                                Passionate student leaders driving the vision and
                                mission of our club
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {studentLeads.map((leader, index) => (
                                <SpotlightCard
                                    key={index}
                                    className="p-8"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-40 h-40 rounded-full mb-6 overflow-hidden bg-[#3182ce] flex items-center justify-center">
                                            <Image
                                                src={leader.image}
                                                alt={leader.name}
                                                width={160}
                                                height={160}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 text-white font-heading">
                                            {leader.name}
                                        </h3>
                                        <p className="text-[#3182ce] font-medium mb-2">
                                            {leader.role}
                                        </p>
                                        <p className="text-[#a0aec0] mb-1">
                                            {leader.year} • {leader.branch}
                                        </p>
                                        <p className="text-[#a0aec0] mb-6 font-body">
                                            {leader.bio}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {leader.achievements.map(
                                                (achievement, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-[#3182ce]/20 text-[#3182ce] px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {achievement}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <div className="flex gap-4">
                                            <a
                                                href={`mailto:${leader.email}`}
                                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                            >
                                                <Mail className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={leader.linkedin}
                                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            <a
                                                href={leader.github}
                                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Join Team Section */}
            <section className="relative px-6 py-16 sm:py-20 bg-[#0a0e13] overflow-hidden">
                <SectionBackground />
                <div className="relative mx-auto max-w-4xl text-center">
                    <SpotlightCard className="p-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                            Join Our{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                Team
                            </span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] mb-10 max-w-2xl mx-auto font-body">
                            Ready to be part of something bigger? Join our team and
                            contribute to the future of blockchain and decentralized
                            technologies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-black hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-body"
                            >
                                Apply to Join
                            </a>
                            <a
                                href="/events"
                                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition-all duration-200 font-body"
                            >
                                Attend Events
                            </a>
                        </div>
                    </SpotlightCard>
                </div>
            </section>
        </main>
    );
}
