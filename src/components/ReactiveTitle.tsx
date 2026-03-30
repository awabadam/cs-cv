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
}

interface LetterState {
  x: number;
  y: number;
  rot: number;
  scale: number;
  targetX: number;
  targetY: number;
  targetRot: number;
  targetScale: number;
}

export default function ReactiveTitle({
  lines,
  className = "",
  animType = "slide-left",
  animDelay = "1",
}: ReactiveTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const states = useRef<LetterState[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  // Initialize states array when spans are set
  const ensureStates = useCallback((count: number) => {
    while (states.current.length < count) {
      states.current.push({ x: 0, y: 0, rot: 0, scale: 1, targetX: 0, targetY: 0, targetRot: 0, targetScale: 1 });
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

    const lerp = 0.08; // Smooth factor — lower = smoother

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const maxDist = 130;

      for (let i = 0; i < spanRefs.current.length; i++) {
        const span = spanRefs.current[i];
        const state = states.current[i];
        if (!span || !state) continue;

        const rect = span.getBoundingClientRect();
        // Account for current transform offset
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist && dist > 0) {
          const force = 1 - dist / maxDist;
          state.targetX = -(dx / dist) * force * 12;
          state.targetY = -(dy / dist) * force * 8;
          state.targetRot = (dx > 0 ? -1 : 1) * force * 5;
          state.targetScale = 1 + force * 0.06;
        } else {
          state.targetX = 0;
          state.targetY = 0;
          state.targetRot = 0;
          state.targetScale = 1;
        }

        // Lerp toward target
        state.x += (state.targetX - state.x) * lerp;
        state.y += (state.targetY - state.y) * lerp;
        state.rot += (state.targetRot - state.rot) * lerp;
        state.scale += (state.targetScale - state.scale) * lerp;

        // Apply — skip if negligible to reduce paint
        if (
          Math.abs(state.x) > 0.05 ||
          Math.abs(state.y) > 0.05 ||
          Math.abs(state.rot) > 0.05 ||
          Math.abs(state.scale - 1) > 0.001
        ) {
          span.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rot}deg) scale(${state.scale})`;
        } else {
          span.style.transform = "";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
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
            ensureStates(i + 1);
            if (char === " ") return <span key={i}>&nbsp;</span>;
            return (
              <span
                key={i}
                ref={(el) => { spanRefs.current[i] = el; }}
                className={`inline-block ${line.accent ? "text-accent" : ""}`}
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
