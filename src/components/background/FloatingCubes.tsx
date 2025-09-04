"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3, Color, BoxGeometry } from "three";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { cubeAnchors } from "@/data/cubeAnchors";
import { Edges, useCursor } from "@react-three/drei";
import CubeDialog from "./CubeDialog";

// Centralized configuration for all tunables
const CUBE_CONFIG = {
    // Sizes
    cubeSize: 0.575, // 15% bigger cubes
    particleSize: 8,
    
    // Animation speeds
    formationSpeed: 8,
    rotationSpeed: 0.5, // Rotation speed when formed
    particleNoiseSpeed: { x: 0.8, y: 1.1, z: 0.9 },
    
    // Distances and thresholds  
    hoverRadius: 120, // Hover detection radius in pixels
    particleAmplitude: { min: 0.27, max: 0.36 }, // 90% of original (0.3-0.4 * 0.9)
    
    // Delays
    cubeVisibilityDelay: 300, // ms after formation starts
    dialogDelay: 300, // ms after cube is fully formed
    
    // Visual properties
    colors: {
        base: { r: 0.192, g: 0.51, b: 0.808 }, // #3182ce
        formed: { r: 0.259, g: 0.6, b: 0.886 }, // #4299e2
        emissive: "#3182ce",
        edge: "#4299e2",
    },
    opacity: {
        particle: 0.9,
        cubeFace: 0.25,
        cubeEdge: 0.9,
        emissiveIntensity: 0.4,
    },
    intensity: {
        base: 0.4,
        formed: 1.2,
    },
    
    // Formation threshold
    formationThreshold: 0.7, // Progress at which cube is considered "formed"
};

type HoverState = {
    id: string | null;
    screenPos: { x: number; y: number } | null;
    isFormed: boolean;
};

type DialogState = {
    id: string | null;
    screenPos: { x: number; y: number } | null;
};

type ParticleState = {
    basePosition: Vector3;
    phase: number;
    amplitude: number;
};

// Mutable state for per-frame updates (not React state)
type CubeRuntimeState = {
    isHovered: boolean;
    formationProgress: number;
    cubeVisibilityDelay: number;
    rotation: number;
    dialogTimer: number;
    hasTriggeredDialog: boolean;
    particleFadeOut: number; // 0 to 1, controls particle opacity during fadeout
};

function useProjectToScreen() {
    const { camera, size } = useThree();
    return (world: Vector3) => {
        const projected = world.clone().project(camera);
        // Account for zoom level
        const zoom = window.visualViewport?.scale || 1;
        const x = ((projected.x * 0.5 + 0.5) * size.width) / zoom;
        const y = ((-projected.y * 0.5 + 0.5) * size.height) / zoom;
        return { x, y };
    };
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
}

// Pre-create reusable objects to avoid allocations in render loop
const tempVec3 = new Vector3();
const floatingPos = new Vector3();
const springOffset = new Vector3();

function ParticleCube({
    anchor,
    onHoverChange,
    onDialogTrigger,
}: {
    anchor: (typeof cubeAnchors)[0];
    onHoverChange: (h: HoverState) => void;
    onDialogTrigger: (d: DialogState) => void;
}) {
    const particlesRef = useRef<THREE.Points>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const project = useProjectToScreen();

    // Static particle data (doesn't change)
    const particles = useMemo<ParticleState[]>(() => {
        const basePos = new Vector3(...anchor.pos);
        const halfSize = CUBE_CONFIG.cubeSize / 2;

        // 8 corners of a cube
        const corners = [
            new Vector3(-halfSize, -halfSize, -halfSize),
            new Vector3(halfSize, -halfSize, -halfSize),
            new Vector3(-halfSize, halfSize, -halfSize),
            new Vector3(halfSize, halfSize, -halfSize),
            new Vector3(-halfSize, -halfSize, halfSize),
            new Vector3(halfSize, -halfSize, halfSize),
            new Vector3(-halfSize, halfSize, halfSize),
            new Vector3(halfSize, halfSize, halfSize),
        ];

        return corners.map((corner) => ({
            basePosition: basePos.clone().add(corner),
            phase: Math.random() * Math.PI * 2,
            amplitude:
                CUBE_CONFIG.particleAmplitude.min +
                Math.random() *
                    (CUBE_CONFIG.particleAmplitude.max -
                        CUBE_CONFIG.particleAmplitude.min),
        }));
    }, [anchor.pos]);

    // Mutable runtime state (not React state to avoid re-renders)
    const runtimeState = useRef<CubeRuntimeState>({
        isHovered: false,
        formationProgress: 0,
        cubeVisibilityDelay: 0,
        rotation: 0,
        dialogTimer: 0,
        hasTriggeredDialog: false,
        particleFadeOut: 1, // Start fully visible
    });

    const pointer = useRef<{ x: number; y: number; active: boolean }>({
        x: -1,
        y: -1,
        active: false,
    });

    // Track hover state for cursor
    const [isHoverable, setIsHoverable] = useState(false);
    useCursor(isHoverable);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            const zoom = window.visualViewport?.scale || 1;
            pointer.current.x = e.clientX / zoom;
            pointer.current.y = e.clientY / zoom;
            pointer.current.active = true;
        };
        const onLeave = () => {
            pointer.current.active = false;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    useFrame(({ clock }, delta) => {
        if (!particlesRef.current) return;

        const t = clock.getElapsedTime();
        const positions =
            particlesRef.current.geometry.attributes.position.array as Float32Array;
        const colors = particlesRef.current.geometry.attributes.color
            .array as Float32Array;
        const state = runtimeState.current;

        // Check if mouse is in hover area (larger invisible area around cube)
        let isInHoverArea = false;
        if (pointer.current.active) {
            tempVec3.set(...anchor.pos);
            const centerScreen = project(tempVec3);
            const dx = centerScreen.x - pointer.current.x;
            const dy = centerScreen.y - pointer.current.y;
            const d = Math.hypot(dx, dy);

            if (d < CUBE_CONFIG.hoverRadius) {
                isInHoverArea = true;
            }
        }

        // Update hover state
        if (isInHoverArea !== state.isHovered) {
            state.isHovered = isInHoverArea;
            if (!isInHoverArea) {
                // Reset dialog trigger and particle fade when unhovered
                state.hasTriggeredDialog = false;
                state.dialogTimer = 0;
                state.particleFadeOut = 1;
                // Close dialog immediately when unhovered
                onDialogTrigger({
                    id: null,
                    screenPos: null,
                });
            }
        }

        // Smooth formation progress
        const targetProgress = state.isHovered ? 1 : 0;
        state.formationProgress +=
            (targetProgress - state.formationProgress) *
            delta *
            CUBE_CONFIG.formationSpeed;

        const isFormed = state.formationProgress > CUBE_CONFIG.formationThreshold;

        // Update cube visibility delay
        if (isFormed && state.cubeVisibilityDelay < 1) {
            state.cubeVisibilityDelay +=
                delta * (1000 / CUBE_CONFIG.cubeVisibilityDelay);
        } else if (!isFormed) {
            state.cubeVisibilityDelay = 0;
        }

        // Rotate cube when formed
        if (isFormed) {
            state.rotation += delta * CUBE_CONFIG.rotationSpeed;
            if (meshRef.current) {
                meshRef.current.rotation.y = state.rotation;
                meshRef.current.rotation.x = state.rotation * 0.5;
            }
        }

        // Handle dialog timer (auto-show after cube forms)
        if (isFormed && state.isHovered && !state.hasTriggeredDialog) {
            state.dialogTimer += delta * 1000; // Convert to ms
            
            // Start fading out particles as dialog timer progresses
            state.particleFadeOut = 1 - (state.dialogTimer / CUBE_CONFIG.dialogDelay);
            state.particleFadeOut = Math.max(0, state.particleFadeOut);
            
            if (state.dialogTimer >= CUBE_CONFIG.dialogDelay) {
                state.hasTriggeredDialog = true;
                tempVec3.set(...anchor.pos);
                const centerScreen = project(tempVec3);
                
                // Determine if cube is on left or right side based on world position
                const isOnRightSide = anchor.pos[0] > 0; // x > 0 means right side
                const offsetX = isOnRightSide ? -200 : 200; // Dialog on opposite side
                const offsetY = -30; // Slight upward offset
                
                onDialogTrigger({
                    id: anchor.id,
                    screenPos: {
                        x: centerScreen.x + offsetX,
                        y: centerScreen.y + offsetY,
                    },
                });
            }
        } else if (!isFormed || !state.isHovered) {
            // Reset particle fade when not hovering or not formed
            state.particleFadeOut = 1;
        }

        // Update particles
        particles.forEach((particle, i) => {
            const baseIdx = i * 3;

            // Calculate base floating position with noise
            const noiseX =
                Math.sin(t * CUBE_CONFIG.particleNoiseSpeed.x + particle.phase) *
                particle.amplitude;
            const noiseY =
                Math.sin(
                    t * CUBE_CONFIG.particleNoiseSpeed.y + particle.phase * 1.3
                ) * particle.amplitude;
            const noiseZ =
                Math.sin(
                    t * CUBE_CONFIG.particleNoiseSpeed.z + particle.phase * 0.7
                ) * particle.amplitude;

            // Reuse floatingPos vector
            floatingPos.copy(particle.basePosition);
            floatingPos.x += noiseX;
            floatingPos.y += noiseY;
            floatingPos.z += noiseZ;

            // Interpolate between floating and formed positions
            const lerpFactor = state.formationProgress;
            positions[baseIdx] =
                floatingPos.x * (1 - lerpFactor) +
                particle.basePosition.x * lerpFactor;
            positions[baseIdx + 1] =
                floatingPos.y * (1 - lerpFactor) +
                particle.basePosition.y * lerpFactor;
            positions[baseIdx + 2] =
                floatingPos.z * (1 - lerpFactor) +
                particle.basePosition.z * lerpFactor;

            // Update colors based on formation progress
            const intensity =
                CUBE_CONFIG.intensity.base +
                state.formationProgress *
                    (CUBE_CONFIG.intensity.formed - CUBE_CONFIG.intensity.base);

            const { base, formed } = CUBE_CONFIG.colors;
            colors[baseIdx] =
                (base.r + state.formationProgress * (formed.r - base.r)) *
                intensity;
            colors[baseIdx + 1] =
                (base.g + state.formationProgress * (formed.g - base.g)) *
                intensity;
            colors[baseIdx + 2] =
                (base.b + state.formationProgress * (formed.b - base.b)) *
                intensity;
        });

        // Update cursor state
        setIsHoverable(isFormed && isInHoverArea);

        // Trigger hover callback for UI updates
        if (isFormed && isInHoverArea) {
            tempVec3.set(...anchor.pos);
            const centerScreen = project(tempVec3);
            onHoverChange({
                id: anchor.id,
                screenPos: centerScreen,
                isFormed: true,
            });
        } else {
            onHoverChange({
                id: null,
                screenPos: null,
                isFormed: false,
            });
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.geometry.attributes.color.needsUpdate = true;
    });

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(particles.length * 3);
        particles.forEach((particle, i) => {
            positions[i * 3] = particle.basePosition.x;
            positions[i * 3 + 1] = particle.basePosition.y;
            positions[i * 3 + 2] = particle.basePosition.z;
        });
        return positions;
    }, [particles]);

    const particleColors = useMemo(() => {
        const colors = new Float32Array(particles.length * 3);
        const { base } = CUBE_CONFIG.colors;
        for (let i = 0; i < particles.length; i++) {
            colors[i * 3] = base.r;
            colors[i * 3 + 1] = base.g;
            colors[i * 3 + 2] = base.b;
        }
        return colors;
    }, [particles.length]);

    // Memoize geometry to avoid recreations
    const boxGeometry = useMemo(() => new BoxGeometry(1, 1, 1), []);

    const cubeOpacity = Math.max(
        0,
        Math.min(1, runtimeState.current.cubeVisibilityDelay)
    );

    return (
        <group>
            {/* Particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particlePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[particleColors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={CUBE_CONFIG.particleSize}
                    vertexColors
                    transparent
                    opacity={CUBE_CONFIG.opacity.particle * runtimeState.current.particleFadeOut}
                    sizeAttenuation={false}
                />
            </points>

            {/* Cube mesh with edges when formed */}
            {runtimeState.current.cubeVisibilityDelay > 0 && (
                <mesh
                    ref={meshRef}
                    position={anchor.pos}
                    scale={[
                        CUBE_CONFIG.cubeSize,
                        CUBE_CONFIG.cubeSize,
                        CUBE_CONFIG.cubeSize,
                    ]}
                >
                    <primitive object={boxGeometry} />
                    <meshStandardMaterial
                        color={CUBE_CONFIG.colors.edge}
                        transparent
                        opacity={cubeOpacity * CUBE_CONFIG.opacity.cubeFace}
                        emissive={new Color(CUBE_CONFIG.colors.emissive)}
                        emissiveIntensity={
                            cubeOpacity * CUBE_CONFIG.opacity.emissiveIntensity
                        }
                    />
                    <Edges
                        color={CUBE_CONFIG.colors.edge}
                        scale={1.001} // Slightly larger to prevent z-fighting
                        renderOrder={1}
                        linewidth={2}
                        threshold={15} // Angle threshold for edge detection
                        opacity={cubeOpacity * CUBE_CONFIG.opacity.cubeEdge}
                    />
                </mesh>
            )}
        </group>
    );
}

function ParticleCubes({
    onHoverChange,
    onDialogTrigger,
}: {
    onHoverChange: (h: HoverState) => void;
    onDialogTrigger: (d: DialogState) => void;
}) {
    return (
        <>
            {cubeAnchors.map((anchor) => (
                <ParticleCube
                    key={anchor.id}
                    anchor={anchor}
                    onHoverChange={onHoverChange}
                    onDialogTrigger={onDialogTrigger}
                />
            ))}
        </>
    );
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            <pointLight
                position={[-5, -3, -2]}
                intensity={0.8}
                color="#3182ce"
            />
        </>
    );
}

export default function FloatingCubesCanvas() {
    const [, setHover] = useState<HoverState>({
        id: null,
        screenPos: null,
        isFormed: false,
    });
    const [dialogState, setDialogState] = useState<DialogState>({
        id: null,
        screenPos: null,
    });
    const isMobile = useIsMobile();
    const active = dialogState.id
        ? cubeAnchors.find((a) => a.id === dialogState.id)
        : null;

    // Don't render on mobile
    if (isMobile) {
        return null;
    }

    return (
        <div className="absolute inset-0 z-[10] pointer-events-none" aria-hidden>
            <div className="absolute inset-0 pointer-events-none">
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{ fov: 55, position: [0, 0, 6] }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Lights />
                    <ParticleCubes
                        onHoverChange={setHover}
                        onDialogTrigger={setDialogState}
                    />
                </Canvas>
            </div>

            <CubeDialog
                open={!!dialogState.id && !!active}
                title={active?.title ?? ""}
                body={active?.body ?? ""}
                onClose={() => setDialogState({ id: null, screenPos: null })}
                screenPos={dialogState.screenPos}
            />
        </div>
    );
}
