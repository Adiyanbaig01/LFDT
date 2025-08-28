export default function About() {
    return (
        <main className="min-h-screen bg-[#0f1419] text-white pt-16">
            {/* Hero Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-b from-[#0f1419] via-[#1a202c] to-[#2d3748]">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-tight font-heading">
                        About <span className="text-[#3182ce]">LFDT</span>
                    </h1>
                    <p className="mt-8 max-w-4xl mx-auto text-xl text-[#a0aec0] leading-relaxed font-body">
                        Learn more about the Linux Foundation Decentralized
                        Trust and our student chapter at PCCoE
                    </p>
                </div>
            </section>

            {/* About LFDT Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                                About{" "}
                                <span className="text-[#3182ce]">LFDT</span>
                            </h2>
                            <p className="text-lg text-[#a0aec0] leading-relaxed mb-6 font-body">
                                The{" "}
                                <strong>
                                    Linux Foundation Decentralized Trust (LFDT)
                                </strong>{" "}
                                is a collaborative ecosystem for open-source
                                projects in blockchain, distributed ledgers, and
                                decentralized systems.
                            </p>
                            <p className="text-lg text-[#a0aec0] leading-relaxed mb-6 font-body">
                                Its mission is to enable innovation, adoption,
                                and standardization in digital trust
                                technologies across industries such as finance,
                                supply chain, government services, and identity
                                management.
                            </p>
                            <p className="text-lg text-[#a0aec0] leading-relaxed font-body">
                                Through collaborative development, LFDT brings
                                together developers, enterprises, and
                                institutions to build the foundation for
                                tomorrow&apos;s decentralized world.
                            </p>
                        </div>
                        <div className="bg-[#2d3748] p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6 text-[#3182ce] font-heading">
                                Key Focus Areas
                            </h3>
                            <ul className="space-y-4 font-body">
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Blockchain and Distributed Ledgers
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Digital Identity Solutions
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Supply Chain Traceability
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Tokenization Platforms
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[#3182ce] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[#a0aec0]">
                                        Enterprise Blockchain Solutions
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Our Club Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            About Our{" "}
                            <span className="text-[#3182ce]">Club</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            The PCCoE LFDT Club is a student-run initiative that
                            acts as a local hub for learning and contributing to
                            this global mission.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 mb-16">
                        <div className="bg-[#1a365d] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-heading">
                                Structured Pathways
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Provide structured pathways for students to get
                                started with open-source contributions
                            </p>
                        </div>

                        <div className="bg-[#1a365d] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl">📢</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-heading">
                                Awareness
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Spread awareness about the potential of
                                decentralized technologies
                            </p>
                        </div>

                        <div className="bg-[#1a365d] p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl">🌉</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 font-heading">
                                Bridge Building
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Bridge academia and industry through
                                LFDT-aligned events and projects
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Our{" "}
                            <span className="text-[#3182ce]">Core Values</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Principles that guide our community and align with
                            LFDT&apos;s mission
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-[#2d3748] p-6 rounded-xl text-center hover:bg-[#374151] transition-all duration-300">
                            <h3 className="text-xl font-bold mb-4 text-[#3182ce] font-heading">
                                Openness
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Embracing open-source principles and
                                collaborative development
                            </p>
                        </div>

                        <div className="bg-[#2d3748] p-6 rounded-xl text-center hover:bg-[#374151] transition-all duration-300">
                            <h3 className="text-xl font-bold mb-4 text-[#3182ce] font-heading">
                                Transparency
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Building trust through transparent processes and
                                communications
                            </p>
                        </div>

                        <div className="bg-[#2d3748] p-6 rounded-xl text-center hover:bg-[#374151] transition-all duration-300">
                            <h3 className="text-xl font-bold mb-4 text-[#3182ce] font-heading">
                                Innovation
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Driving innovation through meaningful
                                contributions and projects
                            </p>
                        </div>

                        <div className="bg-[#2d3748] p-6 rounded-xl text-center hover:bg-[#374151] transition-all duration-300">
                            <h3 className="text-xl font-bold mb-4 text-[#3182ce] font-heading">
                                Ethics
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Maintaining professionalism and adhering to
                                community standards
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-r from-[#1a365d] to-[#3182ce]">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                        Join Our Mission
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-body">
                        Be part of a community that&apos;s shaping the future of
                        decentralized trust technologies. Connect, learn, and
                        contribute to meaningful open-source projects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#1a365d] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-heading"
                        >
                            Get Involved
                        </a>
                        <a
                            href="/events"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-medium text-white hover:bg-white hover:text-[#1a365d] transition-all duration-200 font-heading"
                        >
                            View Events
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
