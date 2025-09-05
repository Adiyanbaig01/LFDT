import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBackground from "@/components/ui/SectionBackground";
import CTASection from "@/components/sections/CTASection";

export default function About() {
    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            {/* Hero Section */}
            <HeroSection
                title={
                    <>
                        About{" "}
                        <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                            LFDT
                        </span>
                    </>
                }
                subtitle="Learn more about the Linux Foundation Decentralized Trust and our student chapter at PCCoE"
                height={600}
            />

            <div className="relative overflow-hidden">
                <SectionBackground variant="about" />
                {/* About LFDT Section */}
                <section className="relative px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
                            <div>
                                <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                                    About{" "}
                                    <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                        LFDT
                                    </span>
                                </h2>
                                <p className="text-lg text-[#a0aec0] leading-relaxed mb-6 font-body">
                                    The{" "}
                                    <strong>
                                        Linux Foundation Decentralized Trust
                                        (LFDT)
                                    </strong>{" "}
                                    is a collaborative ecosystem for open-source
                                    projects in blockchain, distributed ledgers,
                                    and decentralized systems.
                                </p>
                                <p className="text-lg text-[#a0aec0] leading-relaxed mb-6 font-body">
                                    Its mission is to enable innovation,
                                    adoption, and standardization in digital
                                    trust technologies across industries such as
                                    finance, supply chain, government services,
                                    and identity management.
                                </p>
                                <p className="text-lg text-[#a0aec0] leading-relaxed font-body">
                                    Through collaborative development, LFDT
                                    brings together developers, enterprises, and
                                    institutions to build the foundation for
                                    tomorrow&apos;s decentralized world.
                                </p>
                            </div>
                            <SpotlightCard className="p-8">
                                <h3 className="text-2xl font-bold mb-6 text-white font-heading">
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
                            </SpotlightCard>
                        </div>
                    </div>
                </section>

                {/* About Our Club Section */}
                <section className="relative px-6 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                                About Our{" "}
                                <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                    Club
                                </span>
                            </h2>
                            <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                                The PCCoE LFDT Club is a student-run initiative
                                that acts as a local hub for learning and
                                contributing to this global mission.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3 mb-16">
                            <SpotlightCard className="p-8 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-2xl font-bold mb-4 text-white font-heading">
                                    Structured Pathways
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    Provide structured pathways for students to
                                    get started with open-source contributions
                                </p>
                            </SpotlightCard>

                            <SpotlightCard className="p-8 text-center">
                                <div className="text-4xl mb-4">📢</div>
                                <h3 className="text-2xl font-bold mb-4 text-white font-heading">
                                    Awareness
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    Spread awareness about the potential of
                                    decentralized technologies
                                </p>
                            </SpotlightCard>

                            <SpotlightCard className="p-8 text-center">
                                <div className="text-4xl mb-4">🌉</div>
                                <h3 className="text-2xl font-bold mb-4 text-white font-heading">
                                    Bridge Building
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    Bridge academia and industry through
                                    LFDT-aligned events and projects
                                </p>
                            </SpotlightCard>
                        </div>
                    </div>
                </section>
            </div>

            {/* CTA Section */}
            <CTASection
                wrapperClassName="relative px-6 py-16 sm:py-20 bg-[#0a0e13] overflow-hidden"
                showSectionBackground={true}
                containerClassName="relative mx-auto max-w-4xl text-center"
                spotlightCardClassName="p-12"
                title={
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                        Join Our{" "}
                        <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                            Mission
                        </span>
                    </h2>
                }
                description={
                    <p className="text-xl text-[#a0aec0] mb-10 max-w-2xl mx-auto font-body">
                        Be part of a community that&apos;s shaping the future of
                        decentralized trust technologies. Connect, learn, and
                        contribute to meaningful open-source projects.
                    </p>
                }
                primary={{
                    label: "Get Involved",
                    href: "/contact",
                    className:
                        "inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-black hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl font-body",
                }}
                secondary={{
                    label: "View Events",
                    href: "/events",
                    className:
                        "inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition-all duration-200 font-body",
                }}
                buttonsWrapperClassName="flex flex-col sm:flex-row gap-4 justify-center"
            />
        </main>
    );
}
