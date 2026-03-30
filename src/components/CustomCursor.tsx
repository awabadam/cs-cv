"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cardHover, setCardHover] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setVisible(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      const el = e.target as HTMLElement;
      const isCard = !!el.closest(".group");
      const isInteractive = !!el.closest(
        "a, button, [role='button'], input, textarea, select"
      );
      setCardHover(isCard);
      setHovering(isInteractive || isCard);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${hovering ? 45 : 0}deg) scale(${hovering ? 1.3 : 1})`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y + 20}px)`;
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
      {/* Crosshair */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 9998,
          mixBlendMode: "difference",
          marginLeft: -12,
          marginTop: -12,
          transition: "rotate 0.3s cubic-bezier(0.22, 1, 0.36, 1), scale 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" y1="0" x2="12" y2="24" stroke="white" strokeWidth="1" />
          <line x1="0" y1="12" x2="24" y2="12" stroke="white" strokeWidth="1" />
          {/* Small center dot for precision */}
          <circle cx="12" cy="12" r="1.5" fill="white" />
        </svg>
      </div>

      {/* "VIEW" label for card hovers */}
      <span
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none section-label text-[0.55rem] tracking-[0.3em]"
        style={{
          zIndex: 9998,
          mixBlendMode: "difference",
          color: "white",
          opacity: cardHover ? 1 : 0,
          transition: "opacity 0.2s ease",
          marginLeft: -10,
        }}
      >
        View
      </span>
    </>
  );
}
