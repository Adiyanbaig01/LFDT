import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#0a0e13] border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* About */}
                    <div>
                        <div className="mb-3">
                            <img
                                src="/logo.png"
                                alt="PCCoE LFDT Club"
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="text-[#a0aec0]">
                            Official student chapter of the Linux Foundation
                            Decentralized Trust at Pimpri Chinchwad College of
                            Engineering.
                        </p>
                        <p className="text-[#a0aec0] mt-3 italic">
                            “Empowering decentralized trust through open-source
                            learning.”
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Contact</h4>
                        <div className="space-y-3 text-[#a0aec0]">
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-white/80" />
                                <a
                                    href="mailto:pccoelfdt@gmail.com"
                                    className="underline underline-offset-4 decoration-white/30 hover:decoration-white hover:text-white transition-colors"
                                >
                                    pccoelfdt@gmail.com
                                </a>
                            </p>
                            <div>
                                <p className="font-semibold text-white/90">
                                    Faculty Coordinators
                                </p>
                                <p>Dr. Sonali Patil</p>
                                <p>Dr. Meghana Lokhande</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white/90">
                                    Student Leads
                                </p>
                                <p>Varad Kulkarni</p>
                                <p>Adiyan Baig</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-1 text-white/80" />
                                <div>
                                    <p>
                                        Pimpri Chinchwad College of Engineering
                                    </p>
                                    <p>Sector 26, Pradhikaran, Nigdi</p>
                                    <p>Pune, Maharashtra 411044</p>
                                    <a
                                        href="https://maps.google.com/?q=PCCOE%20-%20Pimpri%20Chinchwad%20College%20Of%20Engineering"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 inline-block text-sm text-[#a0aec0] hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                                        aria-label="Open PCCoE location on Google Maps"
                                    >
                                        View on Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-lg font-bold mb-3">Connect</h4>
                        <div className="flex flex-wrap items-center gap-3 text-[#a0aec0]">
                            <a
                                href="https://instagram.com/pccoe_lfdt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                aria-label="Open Instagram @pccoe_lfdt"
                            >
                                <Instagram className="w-5 h-5" />
                                <span>Instagram</span>
                            </a>
                            <span className="text-white/20">|</span>
                            <a
                                href="https://www.linkedin.com/company/lfdt-student-chapter-pccoe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 hover:text-white transition-colors"
                                aria-label="Open LinkedIn LFDT Student Chapter PCCoE"
                            >
                                <Linkedin className="w-5 h-5" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-[#a0aec0]">
                    <p className="text-xs">
                        &copy; 2024 PCCoE LFDT Club. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
