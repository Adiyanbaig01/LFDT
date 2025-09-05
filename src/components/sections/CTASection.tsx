import React from "react";
import Link from "next/link";
import SpotlightCard from "../ui/SpotlightCard";
import SectionBackground from "../ui/SectionBackground";

type CTAButton = {
    label: string;
    href?: string;
    onClick?: () => void;
    ariaLabel?: string;
    className?: string;
    external?: boolean;
};

interface CTASectionProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    primary?: CTAButton;
    secondary?: CTAButton;
    wrapperClassName?: string;
    containerClassName?: string;
    showSpotlightCard?: boolean;
    showSectionBackground?: boolean;
    spotlightCardClassName?: string;
    buttonsWrapperClassName?: string;
    afterContent?: React.ReactNode;
}

export default function CTASection({
    title,
    description,
    primary,
    secondary,
    wrapperClassName,
    containerClassName,
    showSpotlightCard = true,
    showSectionBackground = false,
    spotlightCardClassName = "p-6 lg:p-8 backdrop-blur-xl",
    buttonsWrapperClassName = "mb-8 flex items-center justify-center gap-3",
    afterContent,
}: CTASectionProps) {
    // Defaults to preserve current homepage CTA if no props are provided
    const defaultTitle = (
        <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-snug">
                Curious about what we can create together?{" "}
                <span className="text-white">
                    Let&apos;s bring something extraordinary to life!
                </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#3182ce] to-[#4299e2] mx-auto rounded-full"></div>
        </div>
    );

    const defaultDescription = (
        <p className="text-base sm:text-lg text-[#a0aec0] mb-8 max-w-3xl mx-auto leading-relaxed">
            Be part of the future of decentralized technologies. Connect with
            like-minded students, contribute to cutting-edge open-source
            projects, and build your career in blockchain and distributed
            systems.
        </p>
    );

    const defaultPrimary: CTAButton = {
        label: "Register Now",
        href: "/events/buildathon",
        ariaLabel: "Register for Build-A-Thon 2025",
        className:
            "inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-semibold shadow-lg hover:shadow-xl transition-all",
    };

    const defaultSecondary: CTAButton = {
        label: "Explore Events",
        href: "/events",
        ariaLabel: "Explore our events",
        className:
            "inline-flex items-center gap-2 px-6 py-2.5 text-white border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-colors",
    };

    const resolvedTitle = title ?? defaultTitle;
    const resolvedDescription = description ?? defaultDescription;
    const resolvedPrimary = primary ?? defaultPrimary;
    const resolvedSecondary = secondary ?? defaultSecondary;

    const effectiveWrapperClassName =
        wrapperClassName ?? "relative px-6 pb-10  bg-[#0a0e13] overflow-hidden";
    const effectiveContainerClassName =
        containerClassName ?? "relative mx-auto max-w-7xl";

    const Buttons = () => (
        <div className={buttonsWrapperClassName}>
            {resolvedPrimary &&
                (resolvedPrimary.href ? (
                    resolvedPrimary.external ? (
                        <a
                            href={resolvedPrimary.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={resolvedPrimary.className}
                            aria-label={resolvedPrimary.ariaLabel}
                        >
                            {resolvedPrimary.label}
                        </a>
                    ) : (
                        <Link
                            href={resolvedPrimary.href}
                            className={resolvedPrimary.className}
                            aria-label={resolvedPrimary.ariaLabel}
                        >
                            {resolvedPrimary.label}
                        </Link>
                    )
                ) : (
                    <button
                        onClick={resolvedPrimary.onClick}
                        className={resolvedPrimary.className}
                        aria-label={resolvedPrimary.ariaLabel}
                    >
                        {resolvedPrimary.label}
                    </button>
                ))}

            {resolvedSecondary &&
                (resolvedSecondary.href ? (
                    resolvedSecondary.external ? (
                        <a
                            href={resolvedSecondary.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={resolvedSecondary.className}
                            aria-label={resolvedSecondary.ariaLabel}
                        >
                            {resolvedSecondary.label}
                        </a>
                    ) : (
                        <Link
                            href={resolvedSecondary.href}
                            className={resolvedSecondary.className}
                            aria-label={resolvedSecondary.ariaLabel}
                        >
                            {resolvedSecondary.label}
                        </Link>
                    )
                ) : (
                    <button
                        onClick={resolvedSecondary.onClick}
                        className={resolvedSecondary.className}
                        aria-label={resolvedSecondary.ariaLabel}
                    >
                        {resolvedSecondary.label}
                    </button>
                ))}
        </div>
    );

    const Content = () => (
        <div
            className={
                showSpotlightCard ? "relative text-center" : "text-center"
            }
        >
            {resolvedTitle}
            {resolvedDescription}
            <Buttons />
            {afterContent}
        </div>
    );

    return (
        <section className={effectiveWrapperClassName}>
            {showSectionBackground && <SectionBackground />}
            <div className={effectiveContainerClassName}>
                {showSpotlightCard ? (
                    <SpotlightCard className={spotlightCardClassName}>
                        <Content />
                    </SpotlightCard>
                ) : (
                    <Content />
                )}
            </div>
        </section>
    );
}
