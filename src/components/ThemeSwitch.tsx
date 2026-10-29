"use client";

import { useSyncExternalStore } from "react";

/* Auto follows the system; Light and Dark pin it. The choice lives in localStorage and is
   applied before first paint by the script in layout.tsx, as html[data-theme]. */
type Theme = "auto" | "light" | "dark";
const EVENT = "themechange";

const read = (): Theme => {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "auto";
};

const subscribe = (cb: () => void) => {
  addEventListener(EVENT, cb);
  return () => removeEventListener(EVENT, cb);
};

function apply(t: Theme) {
  const root = document.documentElement;
  if (t === "auto") delete root.dataset.theme;
  else root.dataset.theme = t;
  try {
    if (t === "auto") localStorage.removeItem("theme");
    else localStorage.setItem("theme", t);
  } catch {}
  dispatchEvent(new Event(EVENT));
}

const icon = {
  auto: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" stroke="none" />
    </>
  ),
  light: (
    <>
      <circle cx="8" cy="8" r="2.75" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
    </>
  ),
  dark: <path d="M13.5 9.6A5.75 5.75 0 0 1 6.4 2.5a5.75 5.75 0 1 0 7.1 7.1z" />,
};

const label: Record<Theme, string> = { auto: "Auto", light: "Light", dark: "Dark" };

export default function ThemeSwitch({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, () => "auto" as Theme);
  return (
    <div role="group" aria-label="Colour theme" className={`flex rounded-full border border-line p-0.5 ${className}`}>
      {(Object.keys(label) as Theme[]).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          aria-label={label[t]}
          title={label[t]}
          onClick={() => apply(t)}
          className={`grid size-7 place-items-center rounded-full ${
            theme === t ? "bg-line text-fg" : "text-muted hover:text-fg"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {icon[t]}
          </svg>
        </button>
      ))}
    </div>
  );
}
