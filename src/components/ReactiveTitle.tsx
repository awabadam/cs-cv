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
  cx: number;
  cy: number;
  x: number;
  y: number;
  rot: number;
  targetX: number;
  targetY: number;
  targetRot: number;
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
  const rectsStale = useRef(true);

  const cacheRects = useCallback(() => {
    // Temporarily reset all transforms so rects are accurate
    for (const span of spanRefs.current) {
      if (span) span.style.transform = "";
    }

    // Force layout read
    for (let i = 0; i < spanRefs.current.length; i++) {
      const span = spanRefs.current[i];
      if (!span || !states.current[i]) continue;
      const rect = span.getBoundingClientRect();
      states.current[i].cx = rect.left + rect.width / 2;
      states.current[i].cy = rect.top + rect.height / 2;
    }

    rectsStale.current = false;
  }, []);

  const ensureStates = useCallback((count: number) => {
    while (states.current.length < count) {
      states.current.push({
        cx: 0, cy: 0,
        x: 0, y: 0, rot: 0,
        targetX: 0, targetY: 0, targetRot: 0,
      });
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

    const onResize = () => {
      rectsStale.current = true;
    };

    // Cache rects after a short delay (let layout settle)
    const initTimeout = setTimeout(() => cacheRects(), 500);

    const lerp = 0.06;
    const maxDist = 140;

    const animate = () => {
      if (rectsStale.current) cacheRects();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < spanRefs.current.length; i++) {
        const span = spanRefs.current[i];
        const s = states.current[i];
        if (!span || !s) continue;

        // Use cached center positions (offset by current transform)
        const cx = s.cx + s.x;
        const cy = s.cy + s.y;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist && dist > 0) {
          const force = 1 - dist / maxDist;
          s.targetX = -(dx / dist) * force * 14;
          s.targetY = -(dy / dist) * force * 9;
          s.targetRot = (dx > 0 ? -1 : 1) * force * 6;
        } else {
          s.targetX = 0;
          s.targetY = 0;
          s.targetRot = 0;
        }

        s.x += (s.targetX - s.x) * lerp;
        s.y += (s.targetY - s.y) * lerp;
        s.rot += (s.targetRot - s.rot) * lerp;

        if (Math.abs(s.x) > 0.1 || Math.abs(s.y) > 0.1 || Math.abs(s.rot) > 0.1) {
          span.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg)`;
        } else if (span.style.transform) {
          span.style.transform = "";
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(initTimeout);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [cacheRects]);

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
                className={`inline-block will-change-transform ${line.accent ? "text-accent" : ""}`}
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
