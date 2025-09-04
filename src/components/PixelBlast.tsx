"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type PixelBlastVariant = "square" | "circle" | "triangle" | "diamond";

type PixelBlastProps = {
    variant?: PixelBlastVariant;
    pixelSize?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    antialias?: boolean;
    patternScale?: number;
    patternDensity?: number;
    liquid?: boolean;
    liquidStrength?: number;
    liquidRadius?: number;
    pixelSizeJitter?: number;
    enableRipples?: boolean;
    rippleIntensityScale?: number;
    rippleThickness?: number;
    rippleSpeed?: number;
    liquidWobbleSpeed?: number;
    autoPauseOffscreen?: boolean;
    speed?: number;
    transparent?: boolean;
    edgeFade?: number;
    noiseAmount?: number;
};

const createTouchTexture = () => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D context not available");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    const trail: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        force: number;
        age: number;
    }[] = [];
    let last: { x: number; y: number } | null = null;
    const maxAge = 64;
    let radius = 0.1 * size;
    const speed = 1 / maxAge;
    const clear = () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const drawPoint = (p: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        force: number;
        age: number;
    }) => {
        const pos = { x: p.x * size, y: (1 - p.y) * size };
        let intensity = 1;
        const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
        const easeOutQuad = (t: number) => -t * (t - 2);
        if (p.age < maxAge * 0.3)
            intensity = easeOutSine(p.age / (maxAge * 0.3));
        else
            intensity =
                easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;
        intensity *= p.force;
        const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${
            intensity * 255
        }`;
        const offset = size * 5;
        ctx.shadowOffsetX = offset;
        ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius;
        ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,0,0,1)";
        ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        ctx.fill();
    };
    const addTouch = (norm: { x: number; y: number }) => {
        let force = 0;
        let vx = 0;
        let vy = 0;
        if (last) {
            const dx = norm.x - last.x;
            const dy = norm.y - last.y;
            if (dx === 0 && dy === 0) return;
            const dd = dx * dx + dy * dy;
            const d = Math.sqrt(dd);
            vx = dx / (d || 1);
            vy = dy / (d || 1);
            force = Math.min(dd * 10000, 1);
        }
        last = { x: norm.x, y: norm.y };
        trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
    };
    const update = () => {
        clear();
        for (let i = trail.length - 1; i >= 0; i--) {
            const point = trail[i];
            const f = point.force * speed * (1 - point.age / maxAge);
            point.x += point.vx * f;
            point.y += point.vy * f;
            point.age++;
            if (point.age > maxAge) trail.splice(i, 1);
        }
        for (let i = 0; i < trail.length; i++) drawPoint(trail[i]);
        texture.needsUpdate = true;
    };
    return {
        canvas,
        texture,
        addTouch,
        update,
        set radiusScale(v: number) {
            radius = 0.1 * size * v;
        },
        get radiusScale() {
            return radius / (0.1 * size);
        },
        size,
    };
};

const SHAPE_MAP: Record<PixelBlastVariant, number> = {
    square: 0,
    circle: 1,
    triangle: 2,
    diamond: 3,
};

const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// Integrated liquid warp within the fragment shader (no postprocessing dep)
const FRAGMENT_SRC = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;
uniform int   uShapeType;
uniform sampler2D uTouchTex;
uniform float uLiquidStrength;
uniform float uLiquidFreq;

const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;
uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) { a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p); vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0,0,0), vec3(1,57,113)));
  float n100 = hash11(dot(ip + vec3(1,0,0), vec3(1,57,113)));
  float n010 = hash11(dot(ip + vec3(0,1,0), vec3(1,57,113)));
  float n110 = hash11(dot(ip + vec3(1,1,0), vec3(1,57,113)));
  float n001 = hash11(dot(ip + vec3(0,0,1), vec3(1,57,113)));
  float n101 = hash11(dot(ip + vec3(1,0,1), vec3(1,57,113)));
  float n011 = hash11(dot(ip + vec3(0,1,1), vec3(1,57,113)));
  float n111 = hash11(dot(ip + vec3(1,1,1), vec3(1,57,113)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x); float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x); float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  float amp = 1.0; float freq = 1.0; float sum = 1.0;
  for(int i=0;i<5;i++){ sum += amp * vnoise(vec3(uv * freq, t)); freq *= 1.25; amp *= 1.0; }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){ float r = sqrt(cov) * .25; float d = length(p - 0.5) - r; float aa = 0.5 * fwidth(d); return cov * (1.0 - smoothstep(-aa, aa, d * 2.0)); }
float maskTriangle(vec2 p, vec2 id, float cov){ bool flip = mod(id.x + id.y, 2.0) > 0.5; if (flip) p.x = 1.0 - p.x; float r = sqrt(cov); float d  = p.y - r*(1.0 - p.x); float aa = fwidth(d); return cov * clamp(0.5 - d/aa, 0.0, 1.0); }
float maskDiamond(vec2 p, float cov){ float r = sqrt(cov) * 0.564; return step(abs(p.x - 0.49) + abs(p.y - 0.49), r); }

void main(){
  vec2 res = uResolution; vec2 uvN = gl_FragCoord.xy / res;
  // Sample touch texture to build displacement
  vec3 tcol = texture(uTouchTex, uvN).rgb;
  vec2 disp = (tcol.rg * 2.0 - 1.0) * tcol.b * uLiquidStrength;
  float wob = 0.5 + 0.5 * sin(uTime * uLiquidFreq + tcol.b * 6.2831853);
  disp *= wob;

  vec2 fragCoord = gl_FragCoord.xy + disp * 12.0 - res * .5;
  float aspectRatio = res.x / res.y;
  float pixelSize = uPixelSize;
  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);
  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / res * vec2(aspectRatio, 1.0);

  float base = fbm2(uv * uScale, uTime * 0.05) * 0.5 - 0.65;
  float feed = base + (uDensity - 0.5) * 0.3;

  if (uEnableRipples == 1) {
    float speed     = uRippleSpeed;
    float thickness = uRippleThickness;
    const float dampT = 1.0; const float dampR = 10.0;
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i]; if (pos.x < 0.0) continue;
      vec2 cuv = (((pos - res * .5 - cellPixelSize * .5) / (res))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);
  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    float edge = min(min(uvN.x, uvN.y), min(1.0 - uvN.x, 1.0 - uvN.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`;

const MAX_CLICKS = 10;

const PixelBlast: React.FC<PixelBlastProps> = ({
    variant = "square",
    pixelSize = 3,
    color = "#B19EEF",
    className,
    style,
    antialias = true,
    patternScale = 2,
    patternDensity = 1,
    liquid = false,
    liquidStrength = 0.1,
    liquidRadius = 1,
    pixelSizeJitter = 0,
    enableRipples = true,
    rippleIntensityScale = 1,
    rippleThickness = 0.1,
    rippleSpeed = 0.3,
    liquidWobbleSpeed = 4.5,
    autoPauseOffscreen = true,
    speed = 0.5,
    transparent = true,
    edgeFade = 0.5,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const visibilityRef = useRef({ visible: true });
    const speedRef = useRef(speed);

    const threeRef = useRef<{
        renderer: THREE.WebGLRenderer;
        scene: THREE.Scene;
        camera: THREE.OrthographicCamera;
        material: THREE.ShaderMaterial;
        clock: THREE.Clock;
        clickIx: number;
        uniforms: any;
        resizeObserver?: ResizeObserver;
        raf?: number;
        quad?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
        timeOffset?: number;
        touch?: ReturnType<typeof createTouchTexture>;
        touchTexture?: THREE.Texture;
    } | null>(null);
    const prevConfigRef = useRef<any>(null);
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        speedRef.current = speed;
        const needsReinitKeys = ["antialias", "liquid"];
        const cfg = { antialias, liquid };
        let mustReinit = false;
        if (!threeRef.current) mustReinit = true;
        else if (prevConfigRef.current) {
            for (const k of needsReinitKeys)
                if (prevConfigRef.current[k] !== (cfg as any)[k]) {
                    mustReinit = true;
                    break;
                }
        }
        if (mustReinit) {
            if (threeRef.current) {
                const t = threeRef.current;
                t.resizeObserver?.disconnect();
                cancelAnimationFrame(t.raf!);
                t.quad?.geometry.dispose();
                t.material.dispose();
                t.renderer.dispose();
                if (t.renderer.domElement.parentElement === container)
                    container.removeChild(t.renderer.domElement);
                threeRef.current = null;
            }
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl2", { antialias, alpha: true });
            if (!gl) return;
            const renderer = new THREE.WebGLRenderer({
                canvas,
                context: gl as WebGL2RenderingContext,
                antialias,
                alpha: true,
            });
            renderer.domElement.style.width = "100%";
            renderer.domElement.style.height = "100%";
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            container.appendChild(renderer.domElement);

            const touch = createTouchTexture();

            const uniforms: any = {
                uResolution: { value: new THREE.Vector2(0, 0) },
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(color) },
                uClickPos: {
                    value: Array.from(
                        { length: MAX_CLICKS },
                        () => new THREE.Vector2(-1, -1)
                    ),
                },
                uClickTimes: { value: new Float32Array(MAX_CLICKS) },
                uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
                uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
                uScale: { value: patternScale },
                uDensity: { value: patternDensity },
                uPixelJitter: { value: pixelSizeJitter },
                uEnableRipples: { value: enableRipples ? 1 : 0 },
                uRippleSpeed: { value: rippleSpeed },
                uRippleThickness: { value: rippleThickness },
                uRippleIntensity: { value: rippleIntensityScale },
                uEdgeFade: { value: edgeFade },
                uTouchTex: { value: touch.texture },
                uLiquidStrength: { value: liquid ? liquidStrength : 0.0 },
                uLiquidFreq: { value: liquidWobbleSpeed },
            };

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const material = new THREE.ShaderMaterial({
                vertexShader: VERTEX_SRC,
                fragmentShader: FRAGMENT_SRC,
                uniforms,
                transparent: true,
                glslVersion: THREE.GLSL3,
                depthTest: false,
                depthWrite: false,
            });
            const quadGeom = new THREE.PlaneGeometry(2, 2);
            const quad = new THREE.Mesh(quadGeom, material);
            scene.add(quad);
            const clock = new THREE.Clock();
            const setSize = () => {
                const w = container.clientWidth || 1;
                const h = container.clientHeight || 1;
                renderer.setSize(w, h, false);
                uniforms.uResolution.value.set(
                    renderer.domElement.width,
                    renderer.domElement.height
                );
                uniforms.uPixelSize.value =
                    pixelSize * renderer.getPixelRatio();
            };
            setSize();
            const ro = new ResizeObserver(setSize);
            ro.observe(container);

            const randomFloat = () => {
                if (
                    typeof window !== "undefined" &&
                    (window as any).crypto?.getRandomValues
                ) {
                    const u32 = new Uint32Array(1);
                    window.crypto.getRandomValues(u32);
                    return u32[0] / 0xffffffff;
                }
                return Math.random();
            };
            const timeOffset = randomFloat() * 1000;

            const mapToPixels = (e: PointerEvent) => {
                const rect = renderer.domElement.getBoundingClientRect();
                const scaleX = renderer.domElement.width / rect.width;
                const scaleY = renderer.domElement.height / rect.height;
                const fx = (e.clientX - rect.left) * scaleX;
                const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
                return {
                    fx,
                    fy,
                    w: renderer.domElement.width,
                    h: renderer.domElement.height,
                };
            };
            const onPointerDown = (e: PointerEvent) => {
                const { fx, fy } = mapToPixels(e);
                const ix = threeRef.current?.clickIx ?? 0;
                uniforms.uClickPos.value[ix].set(fx, fy);
                uniforms.uClickTimes.value[ix] = uniforms.uTime.value;
                if (threeRef.current)
                    threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;
            };
            const onPointerMove = (e: PointerEvent) => {
                const { fx, fy, w, h } = mapToPixels(e);
                touch.addTouch({ x: fx / w, y: fy / h });
            };
            renderer.domElement.addEventListener("pointerdown", onPointerDown, {
                passive: true,
            });
            renderer.domElement.addEventListener("pointermove", onPointerMove, {
                passive: true,
            });

            let raf = 0;
            const animate = () => {
                if (autoPauseOffscreen && !visibilityRef.current.visible) {
                    raf = requestAnimationFrame(animate);
                    return;
                }
                uniforms.uTime.value =
                    timeOffset + clock.getElapsedTime() * speedRef.current;
                touch.update();
                renderer.render(scene, camera);
                raf = requestAnimationFrame(animate);
            };
            raf = requestAnimationFrame(animate);

            threeRef.current = {
                renderer,
                scene,
                camera,
                material,
                clock,
                clickIx: 0,
                uniforms,
                resizeObserver: ro,
                raf,
                quad,
                timeOffset,
                touch,
                touchTexture: touch.texture,
            };
        } else {
            const t = threeRef.current!;
            t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;
            t.uniforms.uPixelSize.value =
                pixelSize * t.renderer.getPixelRatio();
            t.uniforms.uColor.value.set(color);
            t.uniforms.uScale.value = patternScale;
            t.uniforms.uDensity.value = patternDensity;
            t.uniforms.uPixelJitter.value = pixelSizeJitter;
            t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;
            t.uniforms.uRippleIntensity.value = rippleIntensityScale;
            t.uniforms.uRippleThickness.value = rippleThickness;
            t.uniforms.uRippleSpeed.value = rippleSpeed;
            t.uniforms.uEdgeFade.value = edgeFade;
            t.uniforms.uLiquidStrength.value = liquid ? liquidStrength : 0.0;
            t.uniforms.uLiquidFreq.value = liquidWobbleSpeed;
            if (transparent) t.renderer.setClearAlpha(0);
            else t.renderer.setClearColor(0x000000, 1);
        }
        prevConfigRef.current = cfg;
        return () => {
            if (threeRef.current && mustReinit) return;
            if (!threeRef.current) return;
            const t = threeRef.current;
            t.resizeObserver?.disconnect();
            cancelAnimationFrame(t.raf!);
            t.quad?.geometry.dispose();
            t.material.dispose();
            t.renderer.dispose();
            if (t.renderer.domElement.parentElement === container)
                container.removeChild(t.renderer.domElement);
            threeRef.current = null;
        };
    }, [
        antialias,
        liquid,
        pixelSize,
        patternScale,
        patternDensity,
        enableRipples,
        rippleIntensityScale,
        rippleThickness,
        rippleSpeed,
        pixelSizeJitter,
        edgeFade,
        transparent,
        liquidStrength,
        liquidRadius,
        liquidWobbleSpeed,
        autoPauseOffscreen,
        variant,
        color,
        speed,
    ]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative overflow-hidden ${
                className ?? ""
            }`}
            style={style}
            aria-label="PixelBlast interactive background"
        />
    );
};

export default React.memo(PixelBlast);
