"use client";

import { useEffect, useRef } from "react";

/* A looping clip that plays only while on screen, and never on its own under reduced motion. */
export default function Clip({
  src,
  poster,
  w,
  h,
  label,
}: {
  src: string;
  poster: string;
  w: number;
  h: number;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={w}
      height={h}
      aria-label={label || undefined}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
