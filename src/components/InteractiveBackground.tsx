"use client";
import FloatingCubesCanvas from "./background/FloatingCubes";
import BackgroundParticles from "./BackgroundParticles";

// Retain as a lightweight orchestrator that can be used globally
export default function InteractiveBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <BackgroundParticles />
            <FloatingCubesCanvas />
        </div>
    );
}
