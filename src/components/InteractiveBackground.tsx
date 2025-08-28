"use client";
import FloatingCubesCanvas from "./background/FloatingCubes";
// Retain as a lightweight orchestrator that can be used globally
export default function InteractiveBackground() {
    return (
        <div className="absolute inset-0 z-[9998]" aria-hidden>
            <FloatingCubesCanvas />
        </div>
    );
}
