"use client";

import { useRef, useEffect, useCallback } from "react";

interface Line {
  text: string;
  accent?: boolean;
}

interface ReactiveTitleProps {
  lines: Line[];
  className?: string;
  animType?: string;
  animDelay?: string;
  isActive?: boolean;
}

// Frame-rate independent damping (Three.js MathUtils.damp approach)
function damp(current: number, target: number, smoothing: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-smoothing * dt));
}

// Round to 2 decimal places to avoid subpixel shimmer
function r2(n: number): number {
  return (n * 100 | 0) / 100;
}

export default function ReactiveTitle({
  lines,
  className = "",
  animType = "slide-left",
  animDelay = "1",
  isActive = false,
}: ReactiveTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stateX = useRef<Float32Array>(new Float32Array(0));
  const stateY = useRef<Float32Array>(new Float32Array(0));
  const stateR = useRef<Float32Array>(new Float32Array(0));
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const lastTime = useRef(0);
  const charCount = useRef(0);

  const initState = useCallback((count: number) => {
    if (stateX.current.length !== count) {
      stateX.current = new Float32Array(count);
      stateY.current = new Float32Array(count);
      stateR.current = new Float32Array(count);
      charCount.current = count;
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const smoothing = 8; // Higher = snappier, lower = smoother (8-12 range)
    const maxDist = 140;
    const maxPush = 14;
    const maxPushY = 9;
    const maxRot = 6;
    const threshold = 0.05;

    const animate = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTime.current) / 1000, 0.05); // Cap at 50ms
      lastTime.current = timestamp;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const count = charCount.current;

      // Batch read: get all rects first (no transforms reset needed — we read live)
      const centers: { cx: number; cy: number }[] = [];
      for (let i = 0; i < count; i++) {
        const span = spanRefs.current[i];
        if (span) {
          const rect = span.getBoundingClientRect();
          centers.push({ cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 });
        } else {
          centers.push({ cx: 0, cy: 0 });
        }
      }

      // Batch compute + write
      for (let i = 0; i < count; i++) {
        const span = spanRefs.current[i];
        if (!span) continue;

        const { cx, cy } = centers[i];
        const dx = mx - cx;
        const dy = my - cy;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = maxDist * maxDist;

        let targetX = 0, targetY = 0, targetR = 0;

        if (distSq < maxDistSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = 1 - dist / maxDist;
          targetX = -(dx / dist) * force * maxPush;
          targetY = -(dy / dist) * force * maxPushY;
          targetR = (dx > 0 ? -1 : 1) * force * maxRot;
        }

        const curX = stateX.current[i];
        const curY = stateY.current[i];
        const curR = stateR.current[i];

        const newX = damp(curX, targetX, smoothing, dt);
        const newY = damp(curY, targetY, smoothing, dt);
        const newR = damp(curR, targetR, smoothing, dt);

        stateX.current[i] = newX;
        stateY.current[i] = newY;
        stateR.current[i] = newR;

        if (Math.abs(newX) > threshold || Math.abs(newY) > threshold || Math.abs(newR) > threshold) {
          span.style.transform = `translate3d(${r2(newX)}px, ${r2(newY)}px, 0) rotate(${r2(newR)}deg)`;
        } else if (span.style.transform) {
          span.style.transform = "";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    lastTime.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  let idx = 0;

  return (
    <h2
      ref={containerRef}
      data-anim={animType}
      data-anim-d={animDelay}
      className={`masthead-title ${className}`}
    >
      {lines.map((line, li) => (
        <span key={li}>
          {line.text.split("").map((char) => {
            const i = idx++;
            initState(i + 1);
            if (char === " ") return <span key={i}>&nbsp;</span>;
            return (
              <span
                key={i}
                ref={(el) => { spanRefs.current[i] = el; }}
                className={`inline-block will-change-transform ${line.accent ? "text-accent" : ""}`}
                style={{ backfaceVisibility: "hidden" }}
              >
                {char}
              </span>
            );
          })}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
}
