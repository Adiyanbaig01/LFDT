"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Achievements", href: "/achievements" },
        { name: "Team", href: "/team" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-[#0f1419]/95 backdrop-blur-sm border-b border-[#2d3748]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#3182ce] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    L
                                </span>
                            </div>
                            <span className="text-white font-bold text-lg">
                                PCCoE LFDT
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-[#a0aec0] hover:text-[#3182ce] px-3 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button (Desktop) */}
                    <div className="hidden md:block">
                        <Link
                            href="/contact"
                            className="bg-[#3182ce] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#4299e2] transition-colors duration-200"
                        >
                            Join Us
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#a0aec0] hover:text-white hover:bg-[#2d3748] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3182ce]"
                        >
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#1a202c] border-b border-[#2d3748]">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[#a0aec0] hover:text-[#3182ce] block px-3 py-2 text-base font-medium transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-[#3182ce] text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-[#4299e2] transition-colors duration-200 mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            Join Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
