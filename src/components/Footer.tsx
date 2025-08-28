export default function Footer() {
    return (
        <footer
            id="contact"
            className="px-6 py-16 bg-[#1a202c] border-t border-[#2d3748]"
        >
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 md:grid-cols-3">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-[#3182ce]">
                            PCCoE LFDT Club
                        </h3>
                        <p className="text-[#a0aec0] mb-6">
                            Official student chapter of the Linux Foundation
                            Decentralized Trust at Pimpri Chinchwad College of
                            Engineering.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-6">Contact Info</h4>
                        <div className="space-y-3 text-[#a0aec0]">
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
                        <h4 className="text-xl font-bold mb-6">
                            Connect With Us
                        </h4>
                        <div className="space-y-3">
                            <a
                                href="https://instagram.com/pccoe_lfdt"
                                className="block text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                            >
                                Instagram
                            </a>
                            <a
                                href="https://www.linkedin.com/company/lfdt-student-chapter-pccoe"
                                className="block text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                            >
                                LinkedIn
                            </a>
                            <p className="text-[#a0aec0]">
                                Visit us at PCCoE campus to connect in person
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-[#2d3748] text-center text-[#a0aec0]">
                    <p>&copy; 2024 PCCoE LFDT Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
