"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    baseOpacity: number;
    pulsePhase: number;
    pulseSpeed: number;
}

export default function BackgroundParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationIdRef = useRef<number>();
    const lastTimeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize particles
        const initParticles = () => {
            const particleCount = Math.floor(
                (window.innerWidth * window.innerHeight) / 15000
            ); // Responsive particle count
            particlesRef.current = [];

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3, // Very slow movement
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1, // Small particles (1-3px)
                    baseOpacity: Math.random() * 0.3 + 0.1, // Base opacity 0.1-0.4
                    opacity: 0,
                    pulsePhase: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.5 + 0.3, // Slow pulse
                });
            }
        };

        initParticles();

        // Animation loop with time-based updates (not frame dependent)
        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTimeRef.current;
            lastTimeRef.current = currentTime;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current.forEach((particle) => {
                // Update position (time-based, not frame-based)
                particle.x += particle.vx * (deltaTime / 16); // Normalize to ~60fps equivalent
                particle.y += particle.vy * (deltaTime / 16);

                // Wrap around screen edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Update opacity with subtle pulse
                particle.pulsePhase += particle.pulseSpeed * (deltaTime / 1000);
                const pulseMultiplier =
                    0.7 + Math.sin(particle.pulsePhase) * 0.3; // Pulse between 0.4 and 1.0
                particle.opacity = particle.baseOpacity * pulseMultiplier;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

                // Use theme colors similar to the cubes but more subtle
                const alpha = particle.opacity;
                ctx.fillStyle = `rgba(66, 153, 226, ${alpha})`; // #4299e2 with variable alpha
                ctx.fill();

                // Add subtle glow for larger particles
                if (particle.size > 2) {
                    ctx.beginPath();
                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.size * 1.5,
                        0,
                        Math.PI * 2
                    );
                    ctx.fillStyle = `rgba(49, 130, 206, ${alpha * 0.3})`; // #3182ce with lower alpha
                    ctx.fill();
                }
            });

            animationIdRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        lastTimeRef.current = performance.now();
        animationIdRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 9997 }} // Behind the cubes (9998) but above content (0)
            aria-hidden="true"
        />
    );
}
