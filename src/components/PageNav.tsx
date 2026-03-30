"use client";

import MagneticButton from "@/components/MagneticButton";

interface PageNavProps {
  currentPage: number;
  goToPage: (index: number) => void;
  pageLabels: string[];
  PAGE_COUNT: number;
}

export default function PageNav({ currentPage, goToPage, pageLabels, PAGE_COUNT }: PageNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid items-center bg-paper-page/95 backdrop-blur-sm px-4 md:px-6 py-2.5 md:py-3 border-t border-rule-faint" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
      {/* Left spacer */}
      <div />

      {/* Center — arrows + labels */}
      <div className="flex items-center gap-2 md:gap-4 justify-center">
      <MagneticButton>
        <button
          onClick={() => goToPage(Math.max(currentPage - 1, 0))}
          className="text-ink-lighter hover:text-ink border-none bg-transparent cursor-pointer font-headline font-bold transition-colors text-base px-2 py-1"
          aria-label="Previous page"
        >
          &larr;
        </button>
      </MagneticButton>

      <div className="flex items-center gap-1.5 md:gap-2">
        {pageLabels.map((label, i) => (
          <MagneticButton key={i}>
            <button
              onClick={() => goToPage(i)}
              className="border-none cursor-pointer transition-all duration-300 bg-transparent relative"
              aria-label={`Go to ${label}`}
            >
              <span className={`hidden md:inline font-headline text-[0.7rem] font-bold tracking-[0.1em] uppercase px-2 py-0.5 transition-colors ${
                currentPage === i ? "text-ink" : "text-ink-lighter hover:text-ink"
              }`}>
                {label}
              </span>
              {/* Active underline */}
              <span className={`hidden md:block absolute bottom-0 left-1/2 h-[1px] bg-ink transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${
                currentPage === i ? "w-full -translate-x-1/2" : "w-0 -translate-x-1/2"
              }`} />
              {/* Mobile dot */}
              <span className={`md:hidden block rounded-full transition-all ${
                currentPage === i ? "w-4 h-1.5 bg-ink" : "w-1.5 h-1.5 bg-rule-light"
              }`} />
            </button>
          </MagneticButton>
        ))}
      </div>

      <MagneticButton>
        <button
          onClick={() => goToPage(Math.min(currentPage + 1, PAGE_COUNT - 1))}
          className="text-ink-lighter hover:text-ink border-none bg-transparent cursor-pointer font-headline font-bold transition-colors text-base px-2 py-1"
          aria-label="Next page"
        >
          &rarr;
        </button>
      </MagneticButton>

      </div>

      {/* Right — page number */}
      <span className="font-headline font-bold text-ink-lighter text-[0.75rem] text-right tracking-wider">
        {currentPage + 1} / {PAGE_COUNT}
      </span>
    </nav>
  );
}
