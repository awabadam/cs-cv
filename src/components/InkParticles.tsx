"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  isBurst: boolean;
}

export interface InkParticlesHandle {
  burst: (x: number, y: number) => void;
}

const InkParticles = forwardRef<InkParticlesHandle>(function InkParticles(
  _,
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const createAmbient = useCallback((): Particle => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      x: Math.random() * w,
      y: h + Math.random() * 20,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.06 + Math.random() * 0.1,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(0.15 + Math.random() * 0.25),
      life: 0,
      maxLife: Infinity,
      isBurst: false,
    };
  }, []);

  const burst = useCallback((cx: number, cy: number) => {
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.current.push({
        x: cx,
        y: cy,
        size: 1 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 600,
        isBurst: true,
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({ burst }), [burst]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed ambient particles
    for (let i = 0; i < 20; i++) {
      const p = createAmbient();
      p.y = Math.random() * window.innerHeight;
      particles.current.push(p);
    }

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      particles.current = particles.current.filter((p) => {
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.life += 16;

        if (p.isBurst) {
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.opacity *= 0.97;
          if (p.life > p.maxLife || p.opacity < 0.01) return false;
        } else {
          // Ambient: respawn when off-screen
          if (p.y < -10) {
            Object.assign(p, createAmbient());
          }
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 20, 10, ${p.opacity})`;
        ctx.fill();

        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Pause when hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [createAmbient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.6 }}
    />
  );
});

export default InkParticles;
