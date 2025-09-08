"use client";

import {
    MapPin,
    Plus,
    Minus,
} from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionBackground from "@/components/ui/SectionBackground";

export default function Contact() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as
        | string
        | undefined;
    const templateIdAdmin = process.env
        .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN as string | undefined;
    const templateIdUser = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER as
        | string
        | undefined;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as
        | string
        | undefined;

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isValidEmail = (email: string) => /.+@.+\..+/.test(email);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(null);

        if (
            !formData.firstName.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        ) {
            setSubmitError(
                "Please fill in your first name, email, and message."
            );
            return;
        }

        if (!isValidEmail(formData.email)) {
            setSubmitError("Please enter a valid email address.");
            return;
        }

        if (!serviceId || !templateIdAdmin || !templateIdUser || !publicKey) {
            setSubmitError(
                "Email service is not configured. Please try again later."
            );
            return;
        }

        setIsSubmitting(true);
        try {
            const fullName =
                `${formData.firstName} ${formData.lastName}`.trim();

            // Admin template params - matches your admin template setup
            const templateParamsAdmin = {
                from_name: fullName,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                reply_to: formData.email,
                to_name: "LFDT Team",
                to_email: "pccoelfdt@gmail.com", // Force the recipient email
            } as Record<string, unknown>;

            // User template params - matches your user template setup
            const templateParamsUser = {
                to_name: fullName || formData.email,
                to_email: formData.email,
                subject: formData.subject,
            } as Record<string, unknown>;

            await emailjs.send(
                serviceId,
                templateIdAdmin,
                templateParamsAdmin,
                { publicKey }
            );
            await emailjs.send(serviceId, templateIdUser, templateParamsUser, {
                publicKey,
            });

            setSubmitSuccess(
                "Message sent! Check your inbox for a confirmation email."
            );
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                subject: "General Inquiry",
                message: "",
            });
        } catch (error) {
            setSubmitError(
                "Something went wrong while sending your message. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqs = [
        {
            question: "How can I join the PCCoE LFDT Club?",
            answer: "You can join by attending our events, filling out our contact form, or reaching out to any of our team members. We welcome all PCCoE students interested in blockchain and decentralized technologies.",
        },
        {
            question: "Do I need prior blockchain experience?",
            answer: "Not at all! We welcome students of all skill levels. Our workshops and events are designed to help beginners get started while also providing advanced content for experienced members.",
        },
        {
            question: "What kind of events do you organize?",
            answer: "We organize workshops, hackathons, guest talks, study circles, and collaborative projects. Check our Events page for the latest schedule and upcoming activities.",
        },
        {
            question: "Can I contribute to open-source projects?",
            answer: "Absolutely! We actively encourage and guide members to contribute to LFDT projects like Hyperledger Fabric, Besu, and other blockchain technologies.",
        },
        {
            question: "When do you meet and where?",
            answer: "We typically meet weekly on campus at PCCOE. Follow our social media or join our mailing list to stay updated on meeting schedules and locations.",
        },
    ];
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
                                    <form
                                        className="space-y-6"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 font-body text-white">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                    placeholder="e.g., Neil"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 font-body text-white">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                    placeholder="e.g., Lunavat"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 font-body text-white">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                placeholder="you@college.edu"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 font-body text-white">
                                                Subject
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white appearance-none cursor-pointer hover:bg-white/10"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition:
                                                        "right 0.75rem center",
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundSize:
                                                        "1.5em 1.5em",
                                                }}
                                            >
                                                <option
                                                    value="General Inquiry"
                                                    className="bg-[#1a202c] text-white py-2"
                                                >
                                                    General Inquiry
                                                </option>
                                                <option
                                                    value="Join the Club"
                                                    className="bg-[#1a202c] text-white py-2"
                                                >
                                                    Join the Club
                                                </option>
                                                <option
                                                    value="Event Registration"
                                                    className="bg-[#1a202c] text-white py-2"
                                                >
                                                    Event Registration
                                                </option>
                                                <option
                                                    value="Collaboration"
                                                    className="bg-[#1a202c] text-white py-2"
                                                >
                                                    Collaboration
                                                </option>
                                                <option
                                                    value="Technical Support"
                                                    className="bg-[#1a202c] text-white py-2"
                                                >
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
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-[#3182ce] focus:outline-none transition-colors font-body text-white placeholder:text-white/50"
                                                placeholder="Share a few details about your question or idea..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 font-body shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting
                                                ? "Sending..."
                                                : "Send Message"}
                                        </button>

                                        {submitSuccess && (
                                            <p className="text-green-400 font-body text-sm">
                                                {submitSuccess}
                                            </p>
                                        )}
                                        {submitError && (
                                            <p className="text-red-400 font-body text-sm">
                                                {submitError}
                                            </p>
                                        )}
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

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <SpotlightCard
                                    key={index}
                                    className="overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full p-6 text-left focus:outline-none transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold font-heading text-white pr-4">
                                                {faq.question}
                                            </h3>
                                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300">
                                                {openFAQ === index ? (
                                                    <Minus className="w-5 h-5 text-[#3182ce]" />
                                                ) : (
                                                    <Plus className="w-5 h-5 text-[#3182ce]" />
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            openFAQ === index
                                                ? "max-h-96 opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-6">
                                            <p className="text-[#a0aec0] font-body leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
