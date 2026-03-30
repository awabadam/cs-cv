"use client";

import { useState } from "react";

export default function SitePreview({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-[60vh] min-h-[400px] mb-8 border border-rule-light overflow-hidden relative">
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper-page z-10">
          <div className="section-label text-ink-lighter text-[0.65rem] tracking-[0.3em] mb-3">
            Loading preview
          </div>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rule-light animate-[pulse_1.2s_ease-in-out_infinite]" />
            <span className="w-1.5 h-1.5 rounded-full bg-rule-light animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
            <span className="w-1.5 h-1.5 rounded-full bg-rule-light animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
          </div>
        </div>
      )}

      <iframe
        src={url}
        className="border-none origin-top-left"
        style={{ width: "143%", height: "143%", transform: "scale(0.7)" }}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setLoaded(true)}
      />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 section-label text-[0.6rem] bg-paper-page/90 backdrop-blur-sm px-3 py-1.5 border border-rule-faint hover:text-accent transition-colors z-20"
      >
        Open live site &nearr;
      </a>
    </div>
  );
}
