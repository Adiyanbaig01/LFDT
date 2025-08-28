import { Mail, Linkedin, Github } from "lucide-react";

export default function Team() {
    const facultyCoordinators = [
        {
            name: "Dr. Sonali Patil",
            role: "Faculty Coordinator",
            department: "Computer Engineering",
            image: "/api/placeholder/200/200",
            bio: "Dr. Patil specializes in blockchain technology and distributed systems. She has published numerous papers on decentralized trust mechanisms.",
            email: "sonali.patil@pccoepune.org",
            linkedin: "#",
        },
        {
            name: "Dr. Meghana Lokhande",
            role: "Faculty Coordinator",
            department: "Information Technology",
            image: "/api/placeholder/200/200",
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
            image: "/api/placeholder/200/200",
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
            role: "Vice President",
            year: "Final Year",
            branch: "Information Technology",
            image: "/api/placeholder/200/200",
            bio: "Focused on Web3 development and smart contract security. Organizing workshops and mentoring junior members.",
            email: "adiyan.baig@student.pccoepune.org",
            linkedin: "#",
            github: "#",
            achievements: ["Smart Contract Auditor", "LFDT Ambassador"],
        },
    ];

    const coreTeam = [
        {
            name: "Arjun Sharma",
            role: "Technical Lead",
            year: "Third Year",
            branch: "Computer Engineering",
            image: "/api/placeholder/200/200",
            specialization: "Blockchain Development",
            github: "#",
        },
        {
            name: "Priya Mehta",
            role: "Events Coordinator",
            year: "Third Year",
            branch: "Information Technology",
            image: "/api/placeholder/200/200",
            specialization: "Community Management",
            linkedin: "#",
        },
        {
            name: "Rohan Desai",
            role: "Content Manager",
            year: "Second Year",
            branch: "Computer Engineering",
            image: "/api/placeholder/200/200",
            specialization: "Technical Writing",
            github: "#",
        },
        {
            name: "Sneha Patil",
            role: "Design Lead",
            year: "Third Year",
            branch: "Electronics Engineering",
            image: "/api/placeholder/200/200",
            specialization: "UI/UX Design",
            linkedin: "#",
        },
        {
            name: "Karan Singh",
            role: "Research Coordinator",
            year: "Second Year",
            branch: "Information Technology",
            image: "/api/placeholder/200/200",
            specialization: "DeFi Research",
            github: "#",
        },
        {
            name: "Ananya Joshi",
            role: "Outreach Manager",
            year: "Third Year",
            branch: "Computer Engineering",
            image: "/api/placeholder/200/200",
            specialization: "Partnership Development",
            linkedin: "#",
        },
    ];

    const activeMembers = [
        "Rahul Agarwal",
        "Sakshi Gupta",
        "Amit Verma",
        "Pooja Reddy",
        "Nikhil Jain",
        "Kavya Nair",
        "Siddharth Kumar",
        "Ritika Sharma",
        "Abhishek Tiwari",
        "Neha Singh",
        "Vikram Rao",
        "Shreya Patel",
        "Manish Yadav",
        "Divya Kumari",
        "Harsh Pandey",
        "Isha Mishra",
        "Gaurav Saxena",
        "Ruchi Agrawal",
        "Suraj Bhosale",
        "Megha Joshi",
    ];

    return (
        <main className="min-h-screen bg-[#0f1419] text-white pt-16">
            {/* Hero Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-b from-[#0f1419] via-[#1a202c] to-[#2d3748]">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-tight font-heading">
                        Meet Our <span className="text-[#3182ce]">Team</span>
                    </h1>
                    <p className="mt-8 max-w-4xl mx-auto text-xl text-[#a0aec0] leading-relaxed font-body">
                        Dedicated individuals driving innovation and fostering
                        the blockchain community at PCCoE
                    </p>
                </div>
            </section>

            {/* Faculty Coordinators Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Faculty{" "}
                            <span className="text-[#3182ce]">Coordinators</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Experienced faculty members guiding our journey in
                            blockchain and decentralized technologies
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {facultyCoordinators.map((faculty, index) => (
                            <div
                                key={index}
                                className="bg-[#2d3748] p-8 rounded-xl hover:bg-[#374151] transition-all duration-300"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-[#3182ce] rounded-full mb-6 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-white">
                                            {faculty.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 font-heading">
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Student Leadership Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Student{" "}
                            <span className="text-[#3182ce]">Leadership</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Passionate student leaders driving the vision and
                            mission of our club
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {studentLeads.map((leader, index) => (
                            <div
                                key={index}
                                className="bg-[#1a365d] p-8 rounded-xl hover:bg-[#2d3748] transition-all duration-300"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 bg-[#3182ce] rounded-full mb-6 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">
                                            {leader.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 font-heading">
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
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Team Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Core <span className="text-[#3182ce]">Team</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Dedicated team members managing various aspects of
                            our club operations
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {coreTeam.map((member, index) => (
                            <div
                                key={index}
                                className="bg-[#2d3748] p-6 rounded-xl hover:bg-[#374151] transition-all duration-300 text-center"
                            >
                                <div className="w-24 h-24 bg-[#3182ce] rounded-full mb-4 flex items-center justify-center mx-auto">
                                    <span className="text-2xl font-bold text-white">
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-heading">
                                    {member.name}
                                </h3>
                                <p className="text-[#3182ce] font-medium mb-1">
                                    {member.role}
                                </p>
                                <p className="text-[#a0aec0] text-sm mb-2">
                                    {member.year} • {member.branch}
                                </p>
                                <p className="text-[#a0aec0] text-sm mb-4">
                                    {member.specialization}
                                </p>
                                <div className="flex justify-center gap-3">
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {member.github && (
                                        <a
                                            href={member.github}
                                            className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Active Members Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Active{" "}
                            <span className="text-[#3182ce]">Members</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Enthusiastic students contributing to our community
                            and learning together
                        </p>
                    </div>

                    <div className="bg-[#1a365d] p-8 rounded-xl">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {activeMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-[#2d3748] p-4 rounded-lg text-center hover:bg-[#374151] transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-[#3182ce] rounded-full mb-3 flex items-center justify-center mx-auto">
                                        <span className="text-sm font-bold text-white">
                                            {member
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium font-heading">
                                        {member}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-[#a0aec0] font-body">
                                And many more passionate students joining our
                                community every day!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Team Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-r from-[#1a365d] to-[#3182ce]">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                        Join Our Team
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-body">
                        Ready to be part of something bigger? Join our team and
                        contribute to the future of blockchain and decentralized
                        technologies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#1a365d] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-body"
                        >
                            Apply to Join
                        </a>
                        <a
                            href="/events"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white hover:bg-white hover:text-[#1a365d] transition-all duration-200 font-body"
                        >
                            Attend Events
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
