"use client";
import PixelBlast from "./PixelBlast";

type HeroSectionProps = {
    title: React.ReactNode;
    subtitle?: string;
    children?: React.ReactNode;
    height?: number;
};

export default function HeroSection({
    title,
    subtitle,
    children,
    height = 600,
}: HeroSectionProps) {
    return (
        <section className="relative px-6 bg-[#0a0e13]">
            <div className="w-full relative" style={{ height: `${height}px` }}>
                <PixelBlast
                    variant="circle"
                    pixelSize={8}
                    color="#5E81AC"
                    patternScale={3}
                    patternDensity={1.0}
                    pixelSizeJitter={0.5}
                    enableRipples
                    rippleSpeed={0.4}
                    rippleThickness={0.1}
                    rippleIntensityScale={1.5}
                    liquid
                    liquidStrength={0.1}
                    liquidRadius={1.2}
                    liquidWobbleSpeed={5}
                    speed={0.6}
                    edgeFade={0.25}
                    transparent
                />
            </div>
            <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-5xl sm:text-7xl font-bold leading-tight font-heading">
                        {title}
                    </h1>
                    {subtitle ? (
                        <p className="mt-8 max-w-4xl mx-auto text-xl text-text-secondary leading-relaxed font-body">
                            {subtitle}
                        </p>
                    ) : null}
                    {children}
                </div>
            </div>
        </section>
    );
}
