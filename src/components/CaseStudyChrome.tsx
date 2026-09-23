"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Print furniture for the case-study article:
 *  - a hairline ink rule across the top that fills as the reader descends
 *  - staggered reveals for anything marked [data-reveal]
 *
 * The article scrolls inside `.case-study-page`, not the window, so both
 * behaviours are bound to that element rather than to the document.
 */
export default function CaseStudyChrome() {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>(".case-study-page");
    if (!scroller) return;

    const read = () => {
      const travel = scroller.scrollHeight - scroller.clientHeight;
      setProgress(travel > 0 ? scroller.scrollTop / travel : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(read);
    };

    read();
    scroller.addEventListener("scroll", onScroll, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = scroller.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduced) {
      targets.forEach((el) => el.classList.add("is-revealed"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          });
        },
        { root: scroller, rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      targets.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame.current);
        scroller.removeEventListener("scroll", onScroll);
      };
    }

    return () => {
      cancelAnimationFrame(frame.current);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="cs-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
