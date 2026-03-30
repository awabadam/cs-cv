"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const targetRotation = useRef(0);
  const scale = useRef(1);
  const targetScale = useRef(1);
  const labelOpacity = useRef(0);
  const targetLabelOpacity = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setMounted(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = e.target as HTMLElement;
      const isCard = !!el.closest(".group");
      const isInteractive = !!el.closest(
        "a, button, [role='button'], input, textarea, select"
      );

      targetRotation.current = isInteractive || isCard ? 45 : 0;
      targetScale.current = isInteractive || isCard ? 1.3 : 1;
      targetLabelOpacity.current = isCard ? 1 : 0;
    };

    let visible = true;
    const onLeave = () => { visible = false; };
    const onEnter = () => { visible = true; };

    let raf: number;
    const animate = () => {
      // Smooth position
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      // Smooth rotation & scale
      rotation.current += (targetRotation.current - rotation.current) * 0.12;
      scale.current += (targetScale.current - scale.current) * 0.12;
      labelOpacity.current += (targetLabelOpacity.current - labelOpacity.current) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px) rotate(${rotation.current}deg) scale(${scale.current})`;
        cursorRef.current.style.opacity = visible ? "1" : "0";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x - 10}px, ${pos.current.y + 18}px)`;
        labelRef.current.style.opacity = String(labelOpacity.current);
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
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 9998, mixBlendMode: "difference" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="1" x2="12" y2="23" stroke="white" strokeWidth="1" />
          <line x1="1" y1="12" x2="23" y2="12" stroke="white" strokeWidth="1" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      </div>

      <span
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none section-label text-[0.5rem] tracking-[0.3em]"
        style={{ zIndex: 9998, mixBlendMode: "difference", color: "white" }}
      >
        View
      </span>
    </>
  );
}
