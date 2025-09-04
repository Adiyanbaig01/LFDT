"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Achievements", href: "/achievements" },
        { name: "Team", href: "/team" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[50] w-full">
            <div
                className={`transition-all duration-300 ease-out ${
                    isScrolled
                        ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/20"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 items-center h-16 px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="PCCoE LFDT Logo"
                                width={100}
                                height={100}
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation (center) */}
                    <div className="hidden lg:block justify-self-center">
                        <div className="flex items-center space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right area: Right logo and hamburger (right-aligned on small/medium) */}
                    <div className="flex justify-end items-center gap-3 md:gap-4">
                        {/* Right Logo (visible on all sizes; scales responsively) */}
                        <div className="flex flex-shrink-0 justify-end">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/ind.png"
                                    alt="Right Logo"
                                    width={200}
                                    height={200}
                                    className="object-contain w-48 h-auto"
                                />
                            </Link>
                        </div>

                        {/* Menu button (visible on small/medium; hidden on large+) */}
                        <div className="lg:hidden justify-self-end">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
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
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden">
                    <div
                        className={`p-4 space-y-2 transition-all duration-300 ease-out ${
                            isScrolled
                                ? "bg-white/5 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/20"
                                : "bg-white/10 backdrop-blur-xl"
                        }`}
                    >
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-white/70 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
