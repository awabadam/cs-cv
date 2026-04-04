"use client";

import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  elongation: number;
  x: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  shape: "oval" | "sliver" | "streak";
  rotation: number;
  color: string;
  blur: number;
  layer: "far" | "mid" | "near";
}

const COLORS = [
  "20,20,10",
  "180,170,150",
  "200,195,180",
  "160,155,140",
  "130,125,112",
  "220,215,200",
];

const LAYERS = {
  far:  { count: 45, size: [1, 2.5],   speed: [12, 18], opacity: [0.15, 0.35], blur: [1, 2],     widthMul: 0.4 },
  mid:  { count: 60, size: [2.5, 5],   speed: [5, 9],   opacity: [0.35, 0.55], blur: [0, 0],     widthMul: 0.55 },
  near: { count: 20, size: [6, 12],    speed: [3, 6],   opacity: [0.2, 0.4],   blur: [1.5, 3.5], widthMul: 0.75 },
} as const;

function makeParticles(): Particle[] {
  const particles: Particle[] = [];
  let id = 0;

  for (const [layer, cfg] of Object.entries(LAYERS) as [keyof typeof LAYERS, typeof LAYERS[keyof typeof LAYERS]][]) {
    for (let i = 0; i < cfg.count; i++) {
      const r = Math.random;
      particles.push({
        id: id++,
        size: cfg.size[0] + r() * (cfg.size[1] - cfg.size[0]),
        elongation: 3 + r() * 5,
        x: -10 + r() * 120,
        delay: -(r() * 20),
        duration: cfg.speed[0] + r() * (cfg.speed[1] - cfg.speed[0]),
        drift: -20 - r() * 40,
        opacity: cfg.opacity[0] + r() * (cfg.opacity[1] - cfg.opacity[0]),
        shape: (["oval", "sliver", "streak"] as const)[Math.floor(r() * 3)],
        rotation: r() * 360,
        color: COLORS[Math.floor(r() * COLORS.length)],
        blur: cfg.blur[0] + r() * (cfg.blur[1] - cfg.blur[0]),
        layer,
      });
    }
  }

  return particles;
}

function ParticleShape({ p, widthMul }: { p: Particle; widthMul: number }) {
  if (p.shape === "oval") {
    return (
      <div style={{
        width: p.size * widthMul,
        height: p.size * p.elongation,
        borderRadius: "50%",
        background: `rgba(${p.color},${p.opacity})`,
        transform: `rotate(${p.rotation}deg)`,
      }} />
    );
  }
  if (p.shape === "sliver") {
    return (
      <div style={{
        width: p.size * widthMul * 0.7,
        height: p.size * p.elongation,
        borderRadius: `${p.size}px`,
        background: `rgba(${p.color},${p.opacity})`,
        transform: `rotate(${p.rotation}deg)`,
      }} />
    );
  }
  return (
    <div style={{
      width: p.size * widthMul * 0.5,
      height: p.size * (p.elongation + 2),
      borderRadius: 1,
      background: `linear-gradient(to bottom, transparent, rgba(${p.color},${p.opacity}), transparent)`,
      transform: `rotate(${p.rotation}deg)`,
    }} />
  );
}

export default function FallingParticles() {
  const particles = useMemo(makeParticles, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 12 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: "-2%",
            animationName: "particle-fall",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            ["--drift" as string]: `${p.drift}vw`,
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
          }}
        >
          <ParticleShape p={p} widthMul={LAYERS[p.layer].widthMul} />
        </div>
      ))}
    </div>
  );
}
