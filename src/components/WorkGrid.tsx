"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { kindLabels, kinds, projects, type Kind } from "@/data/work";

export default function WorkGrid() {
  const [kind, setKind] = useState<Kind | null>(null);
  const shown = kind ? projects.filter((p) => p.kind.includes(kind)) : projects;

  const chip = (k: Kind | null, label: string) => (
    <button
      key={label}
      type="button"
      aria-pressed={kind === k}
      onClick={() => setKind(k)}
      className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-sm border border-line transition-colors aria-pressed:bg-fg aria-pressed:text-bg aria-pressed:border-fg hover:border-fg"
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-4 mb-6">
        <h2 className="text-lg font-medium">
          Work <span className="text-muted font-normal">{shown.length}</span>
        </h2>
        <div
          className="chips flex gap-2 overflow-x-auto w-[calc(100%+32px)] -mx-4 px-4 sm:w-auto sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
          role="group"
          aria-label="Filter by discipline"
        >
          {chip(null, "All")}
          {kinds.map((k) => chip(k, kindLabels[k]))}
        </div>
      </div>

      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.id}>
            <ProjectCard
              project={p}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              eager={i < 6}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
