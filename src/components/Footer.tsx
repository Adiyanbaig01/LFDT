export default function Footer() {
    return (
        <footer id="contact" className="bg-[#0a0e13] border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <h3 className="text-xl font-bold mb-3">
                            PCCoE{" "}
                            <span className="text-transparent bg-gradient-to-r from-[#3182ce] to-[#4299e2] bg-clip-text">
                                LFDT
                            </span>{" "}
                            Club
                        </h3>
                        <p className="text-[#a0aec0]">
                            Official student chapter of the Linux Foundation
                            Decentralized Trust at Pimpri Chinchwad College of
                            Engineering.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-3">Contact Info</h4>
                        <div className="space-y-2 text-[#a0aec0]">
                            <p>
                                <strong>Email:</strong> dummyemail@gmail.com
                            </p>
                            <p>
                                <strong>Faculty Coordinators:</strong>
                                <br />
                                Dr. Sonali Patil
                                <br />
                                Dr. Meghana Lokhande
                            </p>
                            <p>
                                <strong>Student Leads:</strong>
                                <br />
                                Varad Kulkarni
                                <br />
                                Adiyan Baig
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-3">
                            Connect With Us
                        </h4>
                        <div className="space-y-2">
                            <a
                                href="https://instagram.com/pccoe_lfdt"
                                className="block text-[#a0aec0] hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://www.linkedin.com/company/lfdt-student-chapter-pccoe"
                                className="block text-[#a0aec0] hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                            >
                                LinkedIn
                            </a>
                            <p className="text-[#a0aec0] px-1">
                                Visit us at PCCoE campus to connect in person
                            </p>
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
