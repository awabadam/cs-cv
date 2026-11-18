import type {
  TransitionBeforePreparationEvent,
  TransitionBeforeSwapEvent,
} from "astro:transitions/client";
import { eachPage } from "@/scripts/page";

/* Motion that follows the reader down the page and from one page to the next, all on the curves
   in global.css. None of it runs for anyone who asks the system for reduced motion; global.css
   shows everything in place for them. */

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

const seen = (el: Element) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight;
};

/* Each word of a heading learns which line it ended up on, so a line rises together. */
const number = (heading: HTMLElement) => {
  let line = -1;
  let top = -Infinity;
  for (const w of heading.querySelectorAll<HTMLElement>(".w")) {
    const y = w.getBoundingClientRect().top;
    if (y - top > 4) {
      line++;
      top = y;
    }
    w.style.setProperty("--line", String(line));
  }
};

/* Headings split by Words.astro (.rise) come up a line at a time, pictures (.reveal) open out
   of a tighter crop, and blocks of text (.lift) float up into place, a beat apart when several
   arrive together. */
const reveal = (signal: AbortSignal) => {
  const io = new IntersectionObserver(
    (entries) => {
      let n = 0;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        if (el.classList.contains("rise")) number(el);
        else el.style.setProperty("--delay", `${Math.min(n++, 5) * 90}ms`);
        el.classList.add("in");
      }
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  for (const el of document.querySelectorAll(".rise, .reveal, .lift")) io.observe(el);
  signal.addEventListener("abort", () => io.disconnect());
};

/* The opening picture (the home hero, a project's cover) draws in as the page scrolls past it:
   --pull runs from 0 at the top to 1 once the picture has gone by. A cover's caption moves in
   with it, so the value goes on the frame around both. */
const pull = (signal: AbortSignal) => {
  const el = document.querySelector<HTMLElement>(".hero-img, .cover .zoom");
  if (!el) return;
  const host = el.closest<HTMLElement>(".cover") ?? el;
  let queued = false;
  const update = () => {
    queued = false;
    const p = Math.min(Math.max(scrollY / el.offsetHeight, 0), 1);
    host.style.setProperty("--pull", p.toFixed(4));
  };
  addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true, signal }
  );
  update();
};

/* A project card grows into the cover of the page it opens, and the cover shrinks back into its
   card on the way back. The router swaps pages inside one view transition, so this works in
   every browser with view transitions, Firefox included. The name "cover" sits on a project's
   cover (global.css); on either side of a change, a card in view for the other page takes it,
   and a cover with no card to meet, or out of sight, gives it up rather than fly in from off
   screen. Each change marks its own pair and clears them once it is over. */
let change = 0;
let from: URL | undefined;

const mark = (el: HTMLElement, name: string) => {
  el.style.viewTransitionName = name;
  el.dataset.vt = String(change);
};
const clear = (only?: number) => {
  for (const el of document.querySelectorAll<HTMLElement>("[data-vt]")) {
    if (only !== undefined && el.dataset.vt !== String(only)) continue;
    el.style.removeProperty("view-transition-name");
    delete el.dataset.vt;
  }
};

const pair = (path: string, clicked?: Element) => {
  const cards = [...document.querySelectorAll<HTMLAnchorElement>("a.card")].filter(
    (a) => a.pathname === path
  );
  if (clicked instanceof HTMLAnchorElement && cards.includes(clicked)) cards.unshift(clicked);
  const frame = cards
    .map((a) => a.querySelector<HTMLElement>(".hero-img, .card-img"))
    .find((f) => !!f && seen(f));
  const own = document.querySelector<HTMLElement>(".cover .zoom");
  if (frame) {
    mark(frame, "cover");
    /* It is already in view, so it shows as it is rather than opening out of its crop. */
    frame.classList.remove("reveal");
  }
  if (own) mark(own, frame || !seen(own) ? "none" : "cover");
};

/* The new page's cover is fetched and decoded before the swap, so the card grows into the
   picture rather than into an empty frame. A slow connection waits a second at most. */
const preload = async (doc?: Document) => {
  const media = doc?.querySelector(".cover .zoom :is(img, video)");
  if (!media) return;
  const img = new Image();
  if (media.tagName === "VIDEO") img.src = media.getAttribute("poster") ?? "";
  else {
    img.sizes = media.getAttribute("sizes") ?? "";
    img.srcset = media.getAttribute("srcset") ?? "";
    img.src = media.getAttribute("src") ?? "";
  }
  if (!img.src) return;
  await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 1000))]);
};

if (!calm) {
  document.addEventListener("astro:before-preparation", (e: TransitionBeforePreparationEvent) => {
    clear();
    change++;
    from = e.from;
    pair(e.to.pathname, e.sourceElement);
    const load = e.loader;
    e.loader = async () => {
      await load();
      await preload(e.newDocument);
    };
  });
  document.addEventListener("astro:before-swap", (e: TransitionBeforeSwapEvent) => {
    const mine = change;
    const done = () => clear(mine);
    e.viewTransition.finished.then(done, done);
  });
  /* The new page is in place and scrolled to where it was left, before it is drawn. */
  document.addEventListener("astro:after-swap", () => {
    if (from) pair(from.pathname);
  });

  eachPage((signal) => {
    reveal(signal);
    pull(signal);
  });
}
