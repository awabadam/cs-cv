"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on desktop with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setVisible(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = e.target as HTMLElement;
      const isInteractive = el.closest(
        "a, button, [role='button'], .group, input, textarea, select"
      );
      setHovering(!!isInteractive);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px) scale(${hovering ? 1.5 : 1})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [hovering]);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
        style={{
          zIndex: 9998,
          background: "var(--ink)",
          mixBlendMode: "difference",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none"
        style={{
          zIndex: 9997,
          border: "1px solid var(--ink)",
          opacity: hovering ? 0.5 : 0.2,
          transition: "opacity 0.3s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </>
  );
}
