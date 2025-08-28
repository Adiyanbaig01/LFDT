import { Mail, MapPin, Users, Instagram, Linkedin, Clock } from "lucide-react";

export default function Contact() {
    return (
        <main className="min-h-screen bg-[#0f1419] text-white pt-16">
            {/* Hero Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-b from-[#0f1419] via-[#1a202c] to-[#2d3748]">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-tight font-heading">
                        Get in <span className="text-[#3182ce]">Touch</span>
                    </h1>
                    <p className="mt-8 max-w-4xl mx-auto text-xl text-[#a0aec0] leading-relaxed font-body">
                        Ready to join our community or have questions? We&apos;d
                        love to hear from you!
                    </p>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Contact Details */}
                        <div>
                            <h2 className="text-4xl font-bold mb-8 font-heading">
                                Contact{" "}
                                <span className="text-[#3182ce]">
                                    Information
                                </span>
                            </h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 font-heading">
                                            Email
                                        </h3>
                                        <p className="text-[#a0aec0] font-body">
                                            <a
                                                href="mailto:dummyemail@gmail.com"
                                                className="hover:text-[#3182ce] transition-colors"
                                            >
                                                dummyemail@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 font-heading">
                                            Location
                                        </h3>
                                        <p className="text-[#a0aec0] font-body">
                                            Pimpri Chinchwad College of
                                            Engineering
                                            <br />
                                            Sector 26, Pradhikaran, Nigdi
                                            <br />
                                            Pune, Maharashtra 411044
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#3182ce] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 font-heading">
                                            Office Hours
                                        </h3>
                                        <p className="text-[#a0aec0] font-body">
                                            Monday - Friday: 9:00 AM - 5:00 PM
                                            <br />
                                            Saturday: 9:00 AM - 1:00 PM
                                            <br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold mb-6 font-heading">
                                    Follow Us
                                </h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://instagram.com/pccoe_lfdt"
                                        className="w-12 h-12 bg-[#2d3748] rounded-lg flex items-center justify-center hover:bg-[#3182ce] transition-all duration-300"
                                    >
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/lfdt-student-chapter-pccoe"
                                        className="w-12 h-12 bg-[#2d3748] rounded-lg flex items-center justify-center hover:bg-[#3182ce] transition-all duration-300"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-[#2d3748] p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-6 font-heading">
                                Send us a Message
                            </h3>
                            <form className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 font-heading">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-[#1a202c] border border-[#4a5568] rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 font-heading">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-[#1a202c] border border-[#4a5568] rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 font-heading">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-[#1a202c] border border-[#4a5568] rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 font-heading">
                                        Subject
                                    </label>
                                    <select className="w-full px-4 py-3 bg-[#1a202c] border border-[#4a5568] rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body">
                                        <option>General Inquiry</option>
                                        <option>Join the Club</option>
                                        <option>Event Registration</option>
                                        <option>Collaboration</option>
                                        <option>Technical Support</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 font-heading">
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-4 py-3 bg-[#1a202c] border border-[#4a5568] rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#3182ce] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4299e2] transition-colors duration-200 font-heading"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculty & Student Leads Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#0f1419]">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Key <span className="text-[#3182ce]">Contacts</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] max-w-3xl mx-auto font-body">
                            Reach out directly to our faculty coordinators and
                            student leaders
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Faculty Coordinators */}
                        <div className="bg-[#1a365d] p-6 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-heading">
                                Dr. Sonali Patil
                            </h3>
                            <p className="text-[#3182ce] font-medium mb-3">
                                Faculty Coordinator
                            </p>
                            <p className="text-[#a0aec0] text-sm mb-4 font-body">
                                Computer Engineering
                            </p>
                            <a
                                href="mailto:sonali.patil@pccoepune.org"
                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                            >
                                <Mail className="w-5 h-5 mx-auto" />
                            </a>
                        </div>

                        <div className="bg-[#1a365d] p-6 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-heading">
                                Dr. Meghana Lokhande
                            </h3>
                            <p className="text-[#3182ce] font-medium mb-3">
                                Faculty Coordinator
                            </p>
                            <p className="text-[#a0aec0] text-sm mb-4 font-body">
                                Information Technology
                            </p>
                            <a
                                href="mailto:meghana.lokhande@pccoepune.org"
                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                            >
                                <Mail className="w-5 h-5 mx-auto" />
                            </a>
                        </div>

                        {/* Student Leads */}
                        <div className="bg-[#1a365d] p-6 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl font-bold text-white">
                                    VK
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-heading">
                                Varad Kulkarni
                            </h3>
                            <p className="text-[#3182ce] font-medium mb-3">
                                President
                            </p>
                            <p className="text-[#a0aec0] text-sm mb-4 font-body">
                                Final Year, Computer Engg.
                            </p>
                            <a
                                href="mailto:varad.kulkarni@student.pccoepune.org"
                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                            >
                                <Mail className="w-5 h-5 mx-auto" />
                            </a>
                        </div>

                        <div className="bg-[#1a365d] p-6 rounded-xl text-center">
                            <div className="w-16 h-16 bg-[#3182ce] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-xl font-bold text-white">
                                    AB
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-heading">
                                Adiyan Baig
                            </h3>
                            <p className="text-[#3182ce] font-medium mb-3">
                                Vice President
                            </p>
                            <p className="text-[#a0aec0] text-sm mb-4 font-body">
                                Final Year, IT
                            </p>
                            <a
                                href="mailto:adiyan.baig@student.pccoepune.org"
                                className="text-[#a0aec0] hover:text-[#3182ce] transition-colors"
                            >
                                <Mail className="w-5 h-5 mx-auto" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-6 py-20 sm:py-32 bg-[#1a202c]">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-heading">
                            Frequently Asked{" "}
                            <span className="text-[#3182ce]">Questions</span>
                        </h2>
                        <p className="text-xl text-[#a0aec0] font-body">
                            Common questions about joining and participating in
                            our club
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#2d3748] p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3 font-heading">
                                How can I join the PCCoE LFDT Club?
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                You can join by attending our events, filling
                                out our contact form, or reaching out to any of
                                our team members. We welcome all PCCoE students
                                interested in blockchain and decentralized
                                technologies.
                            </p>
                        </div>

                        <div className="bg-[#2d3748] p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3 font-heading">
                                Do I need prior blockchain experience?
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Not at all! We welcome students of all skill
                                levels. Our workshops and events are designed to
                                help beginners get started while also providing
                                advanced content for experienced members.
                            </p>
                        </div>

                        <div className="bg-[#2d3748] p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3 font-heading">
                                What kind of events do you organize?
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                We organize workshops, hackathons, guest talks,
                                study circles, and collaborative projects. Check
                                our Events page for the latest schedule and
                                upcoming activities.
                            </p>
                        </div>

                        <div className="bg-[#2d3748] p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3 font-heading">
                                Can I contribute to open-source projects?
                            </h3>
                            <p className="text-[#a0aec0] font-body">
                                Absolutely! We actively encourage and guide
                                members to contribute to LFDT projects like
                                Hyperledger Fabric, Besu, and other blockchain
                                technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Us Section */}
            <section className="px-6 py-20 sm:py-32 bg-gradient-to-r from-[#1a365d] to-[#3182ce]">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-heading">
                        Visit Our Campus
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-body">
                        Drop by the PCCoE campus to connect with us in person.
                        We&apos;re always excited to meet new members and
                        discuss blockchain technologies!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://maps.google.com"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#1a365d] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-heading"
                        >
                            Get Directions
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
