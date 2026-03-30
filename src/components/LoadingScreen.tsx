"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = Date.now();
    document.fonts.ready.then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(800 - elapsed, 0);
      setTimeout(() => setLoaded(true), remaining);
    });
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-paper transition-opacity duration-700 ${
        loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onTransitionEnd={() => loaded && setHidden(true)}
    >
      <div className="text-center">
        <h1
          className="masthead-title text-[2.5rem] md:text-[4rem] mb-4"
          style={{ opacity: 1, transform: "none" }}
        >
          Awab
          <br />
          Elkhalil
        </h1>

        <div className="w-48 h-[2px] bg-rule-faint mx-auto overflow-hidden">
          <div
            className="h-full bg-ink"
            style={{
              animation: "load-rule 1.5s ease-in-out forwards",
            }}
          />
        </div>

        <p className="section-label text-ink-lighter text-[0.6rem] mt-4 tracking-[0.3em]">
          Loading edition&hellip;
        </p>
      </div>
    </div>
  );
}
