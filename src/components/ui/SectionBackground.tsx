interface SectionBackgroundProps {
    variant?: "default" | "events" | "about";
    className?: string;
}

export default function SectionBackground({
    variant = "default",
    className = "",
}: SectionBackgroundProps) {
    const variants = {
        default: {
            spotlights: [
                {
                    position: "top-32 right-1/3",
                    size: "w-[1200px] h-[800px]",
                    opacity: "opacity-30",
                },
                {
                    position: "top-1/4 left-1/4",
                    size: "w-[1000px] h-[1000px]",
                    opacity: "opacity-20",
                },
                {
                    position: "top-2/3 left-1/2 -translate-x-1/2",
                    size: "w-[1200px] h-[1000px]",
                    opacity: "opacity-40",
                },
            ],
        },
        events: {
            spotlights: [
                {
                    position: "top-32 right-1/3",
                    size: "w-[1200px] h-[800px]",
                    opacity: "opacity-30",
                },
                {
                    position: "top-1/4 left-1/4",
                    size: "w-[1000px] h-[1000px]",
                    opacity: "opacity-20",
                },
                {
                    position: "top-2/3 left-1/2 -translate-x-1/2",
                    size: "w-[1200px] h-[1000px]",
                    opacity: "opacity-40",
                },
            ],
        },
        about: {
            spotlights: [
                {
                    position: "-top-32 left-1/3",
                    size: "w-[1200px] h-[1400px]",
                    opacity: "opacity-40",
                },
                {
                    position: "top-1/2 right-1/4",
                    size: "w-[800px] h-[800px]",
                    opacity: "opacity-25",
                },
                {
                    position: "top-1/2 left-1/2 -translate-x-1/2",
                    size: "w-[1100px] h-[800px]",
                    opacity: "opacity-50",
                },
            ],
        },
    };

    const config = variants[variant];

    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 overflow-hidden section-fade-edges ${className}`}
        >
            {/* Dynamic spotlights */}
            {config.spotlights.map((spotlight, index) => (
                <div
                    key={index}
                    className={`absolute ${spotlight.position} ${spotlight.size} ${spotlight.opacity}`}
                >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_20%,rgba(49,130,206,0.15),transparent_80%)] blur-3xl" />
                    {index === 0 && (
                        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,transparent_0deg,transparent_120deg,rgba(66,153,226,0.2)_140deg,rgba(49,130,206,0.2)_170deg,transparent_200deg)] blur-2xl" />
                    )}
                    {index === 2 && (
                        <>
                            <div className="absolute inset-0 rounded-full border-t border-white/5 opacity-50" />
                            <div className="absolute inset-16 rounded-full border-t border-white/5 opacity-40" />
                            <div className="absolute inset-32 rounded-full border-t border-white/5 opacity-30" />
                        </>
                    )}
                </div>
            ))}

            {/* Subtle ring elements */}
            <div className="absolute top-10 right-10 w-[500px] h-[500px] opacity-15">
                <div className="absolute inset-0 rounded-full border border-white/3" />
                <div className="absolute inset-12 rounded-full border border-white/3" />
                <div className="absolute inset-24 rounded-full border border-white/3" />
            </div>

            {/* Flowing gradient lines */}
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[rgba(49,130,206,0.015)] via-[rgba(66,153,226,0.015)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(66,153,226,0.015)] via-[rgba(49,130,206,0.015)] to-transparent" />
        </div>
    );
}
