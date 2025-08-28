"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        // HiDPI scaling
        const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        let W: number, H: number;

        function resize() {
            if (!canvas || !ctx) return;
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = Math.floor(W * DPR);
            canvas.height = Math.floor(H * DPR);
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            buildGradient();
            seed();
        }

        // Background gradient layers adapted to website theme
        let bgGrad: CanvasGradient;
        function buildGradient() {
            if (!ctx) return;
            bgGrad = ctx.createLinearGradient(0, 0, W, H);
            bgGrad.addColorStop(0, "#0f1419"); // Main website background
            bgGrad.addColorStop(0.35, "#1a202c"); // Secondary background
            bgGrad.addColorStop(1, "#0f1419");
        }

        const cfg = {
            speed: 0.2,
            density: 18000,
            minCount: 90,
            maxCount: 220,
            connectDist: 140,
            thickDist: 70,
            nearMouseBoost: 1.8,
            triangleDist: 90,
            nodeRadius: 1.6,
        };

        // Point system
        class Point {
            x: number;
            y: number;
            vx: number;
            vy: number;
            phase: number;
            amp: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * cfg.speed;
                this.vy = (Math.random() - 0.5) * cfg.speed;
                this.phase = Math.random() * Math.PI * 2;
                this.amp = 0.35 + Math.random() * 0.65;
            }

            step(dt: number) {
                this.phase += dt * (0.7 + Math.random() * 0.3) * 0.15;
                this.vx += Math.cos(this.phase) * 0.004 * this.amp;
                this.vy += Math.sin(this.phase * 0.9) * 0.004 * this.amp;

                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 180 * 180) {
                        const d = Math.sqrt(d2) + 1e-4;
                        const f = ((180 - d) / 180) * 0.015;
                        this.vx += (dx / d) * f;
                        this.vy += (dy / d) * f;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                const m = 40;
                if (this.x < -m) this.x = W + m;
                if (this.x > W + m) this.x = -m;
                if (this.y < -m) this.y = H + m;
                if (this.y > H + m) this.y = -m;

                this.vx *= 0.995;
                this.vy *= 0.995;
            }
        }

        function countForSize() {
            const n = Math.floor((W * H) / cfg.density);
            return Math.max(cfg.minCount, Math.min(cfg.maxCount, n));
        }

        let points: Point[] = [];
        function seed() {
            const n = countForSize();
            if (points.length && Math.abs(points.length - n) < 10) return;
            points = [];
            for (let i = 0; i < n; i++) {
                points.push(new Point(Math.random() * W, Math.random() * H));
            }
        }

        // Spatial hashing
        const grid = { size: 120, cells: new Map<string, number[]>() };
        function rebuildGrid() {
            grid.cells.clear();
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                const key = `${(p.x / grid.size) | 0},${(p.y / grid.size) | 0}`;
                if (!grid.cells.has(key)) grid.cells.set(key, []);
                grid.cells.get(key)!.push(i);
            }
        }

        function neighborIndices(p: Point): number[] {
            const gx = (p.x / grid.size) | 0;
            const gy = (p.y / grid.size) | 0;
            const out: number[] = [];
            for (let y = gy - 1; y <= gy + 1; y++) {
                for (let x = gx - 1; x <= gx + 1; x++) {
                    const arr = grid.cells.get(`${x},${y}`);
                    if (arr) out.push(...arr);
                }
            }
            return out;
        }

        function drawBackground() {
            if (!ctx) return;
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, W, H);

            // Soft vignette for depth
            const g = ctx.createRadialGradient(
                W * 0.55,
                H * 0.4,
                Math.min(W, H) * 0.05,
                W * 0.55,
                H * 0.4,
                Math.max(W, H) * 0.85
            );
            g.addColorStop(0, "rgba(15, 20, 25, 0)");
            g.addColorStop(1, "rgba(0, 0, 0, 0.7)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }

        // Cursor state
        const mouse = { x: -9999, y: -9999, active: false };
        function distToMouse(x: number, y: number) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            return Math.hypot(dx, dy);
        }

        // Main render
        function render(dt: number) {
            if (!ctx) return;
            drawBackground();
            rebuildGrid();
            const baseConnect = cfg.connectDist;
            const nearBoost = mouse.active ? cfg.nearMouseBoost : 1;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                p.step(dt);

                const neigh = neighborIndices(p);
                let nn1: Point | null = null;
                let nn2: Point | null = null;
                let d1 = 1e9;
                let d2 = 1e9;

                const localBoost =
                    mouse.active && distToMouse(p.x, p.y) < 160 ? nearBoost : 1;
                const connectDist = baseConnect * localBoost;

                for (const j of neigh) {
                    if (j <= i) continue;
                    const q = points[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const d2q = dx * dx + dy * dy;
                    if (d2q > connectDist * connectDist) continue;

                    const d = Math.sqrt(d2q);
                    if (d < d1) {
                        d2 = d1;
                        nn2 = nn1;
                        d1 = d;
                        nn1 = q;
                    } else if (d < d2) {
                        d2 = d;
                        nn2 = q;
                    }

                    const alpha = 1 - d / connectDist;
                    ctx.globalAlpha = Math.pow(alpha, 1.8) * 0.9;
                    ctx.strokeStyle = "#3182ce"; // Website primary blue
                    ctx.lineWidth = d < cfg.thickDist ? 1.35 : 0.7;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }

                // Glowing node halo
                const halo = ctx.createRadialGradient(
                    p.x,
                    p.y,
                    0,
                    p.x,
                    p.y,
                    10
                );
                halo.addColorStop(0, "rgba(49, 130, 206, 0.55)"); // Website blue with transparency
                halo.addColorStop(1, "rgba(49, 130, 206, 0)");
                ctx.globalAlpha = 1;
                ctx.fillStyle = halo;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
                ctx.fill();

                // Node core
                ctx.fillStyle = "#4299e2"; // Lighter website blue
                ctx.beginPath();
                ctx.arc(p.x, p.y, cfg.nodeRadius, 0, Math.PI * 2);
                ctx.fill();

                // Translucent triangular "sails"
                if (
                    nn1 &&
                    nn2 &&
                    d1 < cfg.triangleDist &&
                    d2 < cfg.triangleDist
                ) {
                    const area = Math.abs(
                        (nn1.x - p.x) * (nn2.y - p.y) -
                            (nn2.x - p.x) * (nn1.y - p.y)
                    );
                    if (area > 150) {
                        ctx.globalAlpha = 0.04 + Math.random() * 0.02;
                        ctx.fillStyle = "#3182ce"; // Website primary blue
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(nn1.x, nn1.y);
                        ctx.lineTo(nn2.x, nn2.y);
                        ctx.closePath();
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            // Cursor marker
            if (mouse.active) {
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = "#3182ce";
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        // Animation loop
        let last = performance.now();
        let running = true;
        function frame(now: number) {
            if (!running) return;
            const dt = Math.min(0.033, (now - last) / 1000);
            last = now;
            render(dt);
            requestAnimationFrame(frame);
        }

        // Interaction handlers
        const handlePointerMove = (e: PointerEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handlePointerLeave = () => {
            mouse.active = false;
        };

        // Event listeners
        canvas.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });
        canvas.addEventListener("pointerleave", handlePointerLeave);
        window.addEventListener("resize", resize);

        // Initialize
        resize();
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
            running = false;
        }
        requestAnimationFrame(frame);

        // Cleanup
        return () => {
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerleave", handlePointerLeave);
            window.removeEventListener("resize", resize);
            running = false;
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "transparent" }}
        />
    );
}
