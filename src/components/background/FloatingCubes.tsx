"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3, Color, BoxGeometry } from "three";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { cubeAnchors } from "@/data/cubeAnchors";
import CubeDialog from "./CubeDialog";

type HoverState = {
    id: string | null;
    screenPos: { x: number; y: number } | null;
    isFormed: boolean;
};

type ClickState = {
    id: string | null;
    screenPos: { x: number; y: number } | null;
};

type ParticleState = {
    basePosition: Vector3;
    currentPosition: Vector3;
    velocity: Vector3;
    phase: number;
    amplitude: number;
};

type CubeState = {
    particles: ParticleState[];
    isHovered: boolean;
    isFormed: boolean;
    formationProgress: number;
    cubeVisibilityDelay: number;
    clickSpring: number;
    clickVelocity: number;
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

function ParticleCube({
    anchor,
    onHoverChange,
    onCubeClick,
}: {
    index: number;
    anchor: (typeof cubeAnchors)[0];
    onHoverChange: (h: HoverState) => void;
    onCubeClick: (clickState: ClickState) => void;
}) {
    const particlesRef = useRef<THREE.Points>(null);
    const project = useProjectToScreen();

    const [cubeState, setCubeState] = useState<CubeState>(() => {
        const cubeSize = 0.575; // 15% bigger cubes (0.5 * 1.15)
        const basePos = new Vector3(...anchor.pos);

        // 8 corners of a cube
        const corners = [
            new Vector3(-cubeSize / 2, -cubeSize / 2, -cubeSize / 2),
            new Vector3(cubeSize / 2, -cubeSize / 2, -cubeSize / 2),
            new Vector3(-cubeSize / 2, cubeSize / 2, -cubeSize / 2),
            new Vector3(cubeSize / 2, cubeSize / 2, -cubeSize / 2),
            new Vector3(-cubeSize / 2, -cubeSize / 2, cubeSize / 2),
            new Vector3(cubeSize / 2, -cubeSize / 2, cubeSize / 2),
            new Vector3(-cubeSize / 2, cubeSize / 2, cubeSize / 2),
            new Vector3(cubeSize / 2, cubeSize / 2, cubeSize / 2),
        ];

        return {
            particles: corners.map((corner) => ({
                basePosition: basePos.clone().add(corner),
                currentPosition: basePos.clone().add(corner),
                velocity: new Vector3(0, 0, 0),
                phase: Math.random() * Math.PI * 2,
                amplitude: (0.3 + Math.random() * 0.4) * 0.9, // Particles stray 90% of original
            })),
            isHovered: false,
            isFormed: false,
            formationProgress: 0,
            cubeVisibilityDelay: 0,
            clickSpring: 0,
            clickVelocity: 0,
        };
    });

    const pointer = useRef<{ x: number; y: number; active: boolean }>({
        x: -1,
        y: -1,
        active: false,
    });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            // Account for zoom level in pointer coordinates
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
            particlesRef.current.geometry.attributes.position.array;
        const colors = particlesRef.current.geometry.attributes.color.array;

        setCubeState((prev) => {
            const newState = { ...prev };
            let isInHoverArea = false;

            // Check if mouse is in the general cube area
            if (pointer.current.active) {
                const centerWorld = new Vector3(...anchor.pos);
                const centerScreen = project(centerWorld);
                const dx = centerScreen.x - pointer.current.x;
                const dy = centerScreen.y - pointer.current.y;
                const d = Math.hypot(dx, dy);
                const threshold = 120;

                if (d < threshold) {
                    isInHoverArea = true;
                }
            }

            // Update hover state and formation progress
            if (isInHoverArea && !newState.isHovered) {
                newState.isHovered = true;
            } else if (!isInHoverArea && newState.isHovered) {
                newState.isHovered = false;
            }

            // Smooth formation progress
            const targetProgress = newState.isHovered ? 1 : 0;
            newState.formationProgress +=
                (targetProgress - newState.formationProgress) * delta * 8;
            newState.isFormed = newState.formationProgress > 0.7;

            // Update cube visibility delay (300ms after formation starts)
            if (
                newState.formationProgress > 0.7 &&
                newState.cubeVisibilityDelay < 1
            ) {
                newState.cubeVisibilityDelay += delta * (1000 / 300); // 300ms delay
            } else if (newState.formationProgress <= 0.7) {
                newState.cubeVisibilityDelay = 0;
            }

            // Update click spring
            const springForce = -newState.clickSpring * 15;
            const damping = -newState.clickVelocity * 8;
            newState.clickVelocity += (springForce + damping) * delta;
            newState.clickSpring += newState.clickVelocity * delta;

            // Update particles
            newState.particles.forEach((particle, i) => {
                const baseIdx = i * 3;

                // Calculate base floating position with noise
                const noiseX =
                    Math.sin(t * 0.8 + particle.phase) * particle.amplitude;
                const noiseY =
                    Math.sin(t * 1.1 + particle.phase * 1.3) *
                    particle.amplitude;
                const noiseZ =
                    Math.sin(t * 0.9 + particle.phase * 0.7) *
                    particle.amplitude;

                const floatingPos = particle.basePosition.clone();
                floatingPos.x += noiseX;
                floatingPos.y += noiseY;
                floatingPos.z += noiseZ;

                // Interpolate between floating position and exact cube corner
                const exactCubePos = particle.basePosition.clone();
                particle.currentPosition.copy(floatingPos);
                particle.currentPosition.lerp(
                    exactCubePos,
                    newState.formationProgress
                );

                // Apply click spring effect
                if (newState.clickSpring !== 0) {
                    const springOffset = new Vector3(...anchor.pos)
                        .sub(particle.currentPosition)
                        .normalize()
                        .multiplyScalar(newState.clickSpring * 0.3);
                    particle.currentPosition.add(springOffset);
                }

                positions[baseIdx] = particle.currentPosition.x;
                positions[baseIdx + 1] = particle.currentPosition.y;
                positions[baseIdx + 2] = particle.currentPosition.z;

                // Particle color based on formation progress - vibrant theme colors
                const baseIntensity = 0.4;
                const formedIntensity = 1.2;
                const intensity =
                    baseIntensity +
                    newState.formationProgress *
                        (formedIntensity - baseIntensity);

                // Use website theme colors (#3182ce to #4299e2)
                // Base color: #3182ce (49, 130, 206) -> RGB(0.192, 0.51, 0.808)
                // Formed color: #4299e2 (66, 153, 226) -> RGB(0.259, 0.6, 0.886)
                const baseR = 0.192,
                    baseG = 0.51,
                    baseB = 0.808;
                const formedR = 0.259,
                    formedG = 0.6,
                    formedB = 0.886;

                const r =
                    baseR + newState.formationProgress * (formedR - baseR);
                const g =
                    baseG + newState.formationProgress * (formedG - baseG);
                const b =
                    baseB + newState.formationProgress * (formedB - baseB);

                colors[baseIdx] = r * intensity; // R
                colors[baseIdx + 1] = g * intensity; // G
                colors[baseIdx + 2] = b * intensity; // B
            });

            // Trigger hover callback
            if (newState.isFormed && isInHoverArea) {
                const centerScreen = project(new Vector3(...anchor.pos));
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

            return newState;
        });

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.geometry.attributes.color.needsUpdate = true;
    });

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(cubeState.particles.length * 3);
        cubeState.particles.forEach((particle, i) => {
            positions[i * 3] = particle.basePosition.x;
            positions[i * 3 + 1] = particle.basePosition.y;
            positions[i * 3 + 2] = particle.basePosition.z;
        });
        return positions;
    }, [cubeState.particles]);

    const particleColors = useMemo(() => {
        const colors = new Float32Array(cubeState.particles.length * 3);
        // Use theme colors: #3182ce (49, 130, 206) -> RGB(0.192, 0.51, 0.808)
        for (let i = 0; i < cubeState.particles.length; i++) {
            colors[i * 3] = 0.192; // R - theme blue
            colors[i * 3 + 1] = 0.51; // G - theme blue
            colors[i * 3 + 2] = 0.808; // B - theme blue
        }
        return colors;
    }, [cubeState.particles.length]);

    const cubeSize = 0.575; // 15% bigger cubes
    const cubeOpacity = Math.max(0, Math.min(1, cubeState.cubeVisibilityDelay)); // Fade in cube geometry after delay

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
                    size={8} // Smaller particles
                    vertexColors
                    transparent
                    opacity={0.9}
                    sizeAttenuation={false}
                />
            </points>

            {/* Cube faces and edges when formed */}
            {cubeState.cubeVisibilityDelay > 0 && (
                <mesh
                    position={anchor.pos}
                    scale={[cubeSize, cubeSize, cubeSize]}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (cubeState.isFormed) {
                            // Trigger spring animation
                            setCubeState((prev) => ({
                                ...prev,
                                clickSpring: 0.5,
                                clickVelocity: 0,
                            }));

                            // Open dialog at cube position
                            const centerScreen = project(
                                new Vector3(...anchor.pos)
                            );
                            onCubeClick({
                                id: anchor.id,
                                screenPos: centerScreen,
                            });
                        }
                    }}
                    onPointerEnter={() => {
                        document.body.style.cursor = cubeState.isFormed
                            ? "pointer"
                            : "default";
                    }}
                    onPointerLeave={() => {
                        document.body.style.cursor = "default";
                    }}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="#4299e2"
                        transparent
                        opacity={cubeOpacity * 0.25} // Slightly more visible faces
                        emissive={new Color("#3182ce")}
                        emissiveIntensity={cubeOpacity * 0.4} // More vibrant glow
                    />
                </mesh>
            )}

            {/* Cube edges */}
            {cubeState.cubeVisibilityDelay > 0 && (
                <lineSegments
                    position={anchor.pos}
                    scale={[cubeSize, cubeSize, cubeSize]}
                >
                    <edgesGeometry args={[new BoxGeometry(1, 1, 1)]} />
                    <lineBasicMaterial
                        color="#4299e2"
                        transparent
                        opacity={cubeOpacity * 0.9} // More vibrant and opaque edges
                    />
                </lineSegments>
            )}
        </group>
    );
}

function ParticleCubes({
    onHoverChange,
    onCubeClick,
}: {
    onHoverChange: (h: HoverState) => void;
    onCubeClick: (c: ClickState) => void;
}) {
    const handleHoverChange = (newHover: HoverState) => {
        onHoverChange(newHover);
    };

    const handleCubeClick = (clickState: ClickState) => {
        onCubeClick(clickState);
    };

    return (
        <>
            {cubeAnchors.map((anchor, index) => (
                <ParticleCube
                    key={anchor.id}
                    index={index}
                    anchor={anchor}
                    onHoverChange={handleHoverChange}
                    onCubeClick={handleCubeClick}
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
    const [clickedCube, setClickedCube] = useState<ClickState>({
        id: null,
        screenPos: null,
    });
    const isMobile = useIsMobile();
    const active = clickedCube.id
        ? cubeAnchors.find((a) => a.id === clickedCube.id)
        : null;

    // Don't render on mobile
    if (isMobile) {
        return null;
    }

    return (
        <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0">
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{ fov: 55, position: [0, 0, 6] }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Lights />
                    <ParticleCubes
                        onHoverChange={setHover}
                        onCubeClick={setClickedCube}
                    />
                </Canvas>
            </div>

            <div className="pointer-events-auto">
                <CubeDialog
                    open={!!clickedCube.id && !!active}
                    title={active?.title ?? ""}
                    body={active?.body ?? ""}
                    onClose={() =>
                        setClickedCube({ id: null, screenPos: null })
                    }
                    screenPos={clickedCube.screenPos}
                />
            </div>
        </div>
    );
}
