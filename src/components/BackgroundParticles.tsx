"use client";

import { useEffect, useRef, useMemo, memo } from "react";

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

// Pre-calculate constants
const PARTICLE_COLOR_RGB = { r: 66, g: 153, b: 226 }; // #4299e2
const GLOW_COLOR_RGB = { r: 49, g: 130, b: 206 }; // #3182ce
const TWO_PI = Math.PI * 2;

const BackgroundParticles = memo(function BackgroundParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationIdRef = useRef<number | undefined>(undefined);
    const lastTimeRef = useRef<number>(0);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;
        ctxRef.current = ctx;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize particles with object pooling
        const initParticles = () => {
            const particleCount = Math.min(
                Math.floor((window.innerWidth * window.innerHeight) / 15000),
                100 // Cap at 100 particles for performance
            );
            
            // Reuse existing particles array if possible
            if (particlesRef.current.length !== particleCount) {
                particlesRef.current = new Array(particleCount);
            }

            for (let i = 0; i < particleCount; i++) {
                particlesRef.current[i] = {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    baseOpacity: Math.random() * 0.3 + 0.1,
                    opacity: 0,
                    pulsePhase: Math.random() * TWO_PI,
                    pulseSpeed: Math.random() * 0.5 + 0.3,
                };
            }
        };

        initParticles();

        // Optimized animation loop with batched rendering
        const animate = (currentTime: number) => {
            const deltaTime = Math.min(currentTime - lastTimeRef.current, 33); // Cap at 33ms (30fps min)
            lastTimeRef.current = currentTime;
            
            const ctx = ctxRef.current;
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const deltaFactor = deltaTime / 16; // Normalize to ~60fps
            const deltaPulse = deltaTime / 1000;

            // Batch similar particles together
            const particles = particlesRef.current;
            const len = particles.length;
            
            for (let i = 0; i < len; i++) {
                const particle = particles[i];
                
                // Update position
                particle.x += particle.vx * deltaFactor;
                particle.y += particle.vy * deltaFactor;

                // Wrap around screen edges (optimized)
                if (particle.x < 0) particle.x = canvas.width;
                else if (particle.x > canvas.width) particle.x = 0;
                
                if (particle.y < 0) particle.y = canvas.height;
                else if (particle.y > canvas.height) particle.y = 0;

                // Update opacity with pulse
                particle.pulsePhase += particle.pulseSpeed * deltaPulse;
                const pulseMultiplier = 0.7 + Math.sin(particle.pulsePhase) * 0.3;
                particle.opacity = particle.baseOpacity * pulseMultiplier;
            }
            
            // Draw all particles in batches
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow effect
            
            for (let i = 0; i < len; i++) {
                const particle = particles[i];
                const alpha = particle.opacity;
                
                // Draw main particle
                ctx.fillStyle = `rgba(${PARTICLE_COLOR_RGB.r}, ${PARTICLE_COLOR_RGB.g}, ${PARTICLE_COLOR_RGB.b}, ${alpha})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, TWO_PI);
                ctx.fill();
                
                // Draw glow for larger particles
                if (particle.size > 2) {
                    ctx.fillStyle = `rgba(${GLOW_COLOR_RGB.r}, ${GLOW_COLOR_RGB.g}, ${GLOW_COLOR_RGB.b}, ${alpha * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, TWO_PI);
                    ctx.fill();
                }
            }
            
            ctx.globalCompositeOperation = 'source-over'; // Reset blend mode

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
            style={{ zIndex: 10 }} // Below cubes/dialogs, above main content
            aria-hidden="true"
        />
    );
});

export default BackgroundParticles;
