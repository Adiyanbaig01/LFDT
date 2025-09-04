import {
    Mail,
    MapPin,
    Instagram,
    Linkedin,
    Clock,
    ChevronDown,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBackground from "@/components/ui/SectionBackground";

export default function Contact() {
    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            {/* Hero Section */}
            <HeroSection
                title={
                    <>
                        Get in{" "}
                        <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                            Touch
                        </span>
                    </>
                }
                subtitle="Ready to join our community or have questions? We'd love to hear from you!"
                height={600}
            />

            <div className="relative overflow-hidden">
                <SectionBackground variant="default" />
                {/* Contact Form and Map Section */}
                <section className="relative px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-4xl font-bold mb-8 font-heading">
                                    Send us a{" "}
                                    <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                        Message
                                    </span>
                                </h2>
                                <SpotlightCard className="p-8">
                                    <form className="space-y-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 font-body text-white">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 font-body text-white">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 font-body text-white">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                placeholder="john.doe@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 font-body text-white">
                                                Subject
                                            </label>
                                            <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white">
                                                <option className="bg-[#0a0e13] text-white">
                                                    General Inquiry
                                                </option>
                                                <option className="bg-[#0a0e13] text-white">
                                                    Join the Club
                                                </option>
                                                <option className="bg-[#0a0e13] text-white">
                                                    Event Registration
                                                </option>
                                                <option className="bg-[#0a0e13] text-white">
                                                    Collaboration
                                                </option>
                                                <option className="bg-[#0a0e13] text-white">
                                                    Technical Support
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 font-body text-white">
                                                Message
                                            </label>
                                            <textarea
                                                rows={5}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                placeholder="Tell us more about your inquiry..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 font-body shadow-lg hover:shadow-xl"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </SpotlightCard>
                            </div>

                            {/* Campus Location Map */}
                            <div>
                                <h2 className="text-4xl font-bold mb-8 font-heading">
                                    Visit Our{" "}
                                    <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                        Campus
                                    </span>
                                </h2>
                                <SpotlightCard className="p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 font-heading text-white">
                                                    Location
                                                </h3>
                                                <p className="text-[#a0aec0] font-body">
                                                    Pimpri Chinchwad College of
                                                    Engineering
                                                    <br />
                                                    Sector 26, Pradhikaran,
                                                    Nigdi
                                                    <br />
                                                    Pune, Maharashtra 411044
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full h-80 rounded-lg overflow-hidden">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15121.153092750737!2d73.74352940093966!3d18.651055669485075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x1b210131915734fd!2sPCCOE%20-%20Pimpri%20Chinchwad%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1757014254298!5m2!1sen!2sin"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen={true}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="rounded-lg"
                                            ></iframe>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative px-6 pb-16 sm:pb-20 bg-transparent">
                    <div className="relative mx-auto max-w-4xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                                Frequently Asked{" "}
                                <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                    Questions
                                </span>
                            </h2>
                            <p className="text-xl text-[#a0aec0] font-body">
                                Common questions about joining and participating
                                in our club
                            </p>
                        </div>

                        <div className="space-y-6">
                            <SpotlightCard className="p-6">
                                <h3 className="text-xl font-bold mb-3 font-heading text-white">
                                    How can I join the PCCoE LFDT Club?
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    You can join by attending our events,
                                    filling out our contact form, or reaching
                                    out to any of our team members. We welcome
                                    all PCCoE students interested in blockchain
                                    and decentralized technologies.
                                </p>
                            </SpotlightCard>

                            <SpotlightCard className="p-6">
                                <h3 className="text-xl font-bold mb-3 font-heading text-white">
                                    Do I need prior blockchain experience?
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    Not at all! We welcome students of all skill
                                    levels. Our workshops and events are
                                    designed to help beginners get started while
                                    also providing advanced content for
                                    experienced members.
                                </p>
                            </SpotlightCard>

                            <SpotlightCard className="p-6">
                                <h3 className="text-xl font-bold mb-3 font-heading text-white">
                                    What kind of events do you organize?
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    We organize workshops, hackathons, guest
                                    talks, study circles, and collaborative
                                    projects. Check our Events page for the
                                    latest schedule and upcoming activities.
                                </p>
                            </SpotlightCard>

                            <SpotlightCard className="p-6">
                                <h3 className="text-xl font-bold mb-3 font-heading text-white">
                                    Can I contribute to open-source projects?
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    Absolutely! We actively encourage and guide
                                    members to contribute to LFDT projects like
                                    Hyperledger Fabric, Besu, and other
                                    blockchain technologies.
                                </p>
                            </SpotlightCard>

                            <SpotlightCard className="p-6">
                                <h3 className="text-xl font-bold mb-3 font-heading text-white">
                                    When do you meet and where?
                                </h3>
                                <p className="text-[#a0aec0] font-body">
                                    We typically meet weekly on campus at PCCOE.
                                    Follow our social media or join our mailing
                                    list to stay updated on meeting schedules
                                    and locations.
                                </p>
                            </SpotlightCard>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
