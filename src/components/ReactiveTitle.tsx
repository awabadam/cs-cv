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

export default function ReactiveTitle({ lines, className = "", animType = "slide-left", animDelay = "1" }: ReactiveTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  const onMove = useCallback((e: MouseEvent) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    for (const span of spans.current) {
      if (!span) continue;
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;

      if (dist < maxDist) {
        const force = 1 - dist / maxDist;
        const pushX = -(dx / dist) * force * 10;
        const pushY = -(dy / dist) * force * 6;
        const rot = (dx > 0 ? -1 : 1) * force * 4;
        span.style.transform = `translate(${pushX}px, ${pushY}px) rotate(${rot}deg) scale(${1 + force * 0.08})`;
      } else {
        span.style.transform = "";
      }
    }
  }, []);

  const onLeave = useCallback(() => {
    for (const span of spans.current) {
      if (span) span.style.transform = "";
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

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
            if (char === " ") return <span key={i}>&nbsp;</span>;
            return (
              <span
                key={i}
                ref={(el) => { spans.current[i] = el; }}
                className={`inline-block transition-transform duration-300 ${line.accent ? "text-accent" : ""}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
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
