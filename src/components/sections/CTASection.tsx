import Link from "next/link";
import SpotlightCard from "../ui/SpotlightCard";

export default function CTASection() {
    return (
        <section className="relative px-6 pb-10  bg-[#0a0e13] overflow-hidden">
            <div className="relative mx-auto max-w-7xl">
                {/* CTA block */}
                <SpotlightCard className="p-6 lg:p-8 backdrop-blur-xl">
                    <div className="relative text-center">
                        <div className="mb-6">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-snug">
                                Curious about what we can create together?{" "}
                                <span className="text-white">
                                    Let&apos;s bring something extraordinary to
                                    life!
                                </span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#3182ce] to-[#4299e2] mx-auto rounded-full"></div>
                        </div>

                        <p className="text-base sm:text-lg text-[#a0aec0] mb-8 max-w-3xl mx-auto leading-relaxed">
                            Be part of the future of decentralized technologies.
                            Connect with like-minded students, contribute to
                            cutting-edge open-source projects, and build your
                            career in blockchain and distributed systems.
                        </p>

                        <div className="mb-8 flex items-center justify-center gap-3">
                            <button
                                onClick={() => {
                                    window.open(
                                        "https://forms.google.com/register",
                                        "_blank"
                                    );
                                }}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all"
                                aria-label="Register for Build-A-Thon 2025"
                            >
                                Register Now
                            </button>
                            <Link
                                href="/events"
                                className="inline-flex items-center gap-2 px-6 py-2.5 text-white border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-colors"
                                aria-label="Explore our events"
                            >
                                Explore Events
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-8 opacity-60">
                            <div className="text-white/60 text-sm font-medium">
                                Linux Foundation
                            </div>
                            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                            <div className="text-white/60 text-sm font-medium">
                                Hyperledger
                            </div>
                            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                            <div className="text-white/60 text-sm font-medium">
                                PCCoE
                            </div>
                        </div>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}
