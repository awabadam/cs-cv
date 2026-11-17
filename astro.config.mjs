// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

/* Fully static: every page is prerendered and every image is resized at build time,
   so nginx serves plain files. React only renders the case-study diagrams to SVG
   during the build; no React reaches the browser. */
export default defineConfig({
  site: "https://cv.awab.design",
  trailingSlash: "never",
  build: {
    format: "file",
    /* The stylesheet is small; inlining it saves a render-blocking request. */
    inlineStylesheets: "always",
  },
  integrations: [react()],
  /* The router (Base.astro) fetches a page as soon as its link is hovered, so the change is
     ready by the click. */
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  fonts: [
    /* Fetched from Google Fonts at build time and served from this site. One variable file
       per subset covers every weight; latin-ext carries the Turkish letters. */
    {
      provider: fontProviders.google(),
      name: "Zalando Sans",
      cssVariable: "--font-zalando",
      weights: ["200 900"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    /* Numbers, dates and small labels. */
    {
      provider: fontProviders.google(),
      name: "DM Mono",
      cssVariable: "--font-dm-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-monospace", "monospace"],
    },
    /* Arabic pages only. Its faces cover just the Arabic block and it has no fallbacks of its
       own, so Latin text on those pages (names, numbers) still falls through to Zalando Sans. */
    {
      provider: fontProviders.google(),
      name: "IBM Plex Sans Arabic",
      cssVariable: "--font-arabic",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["arabic"],
      fallbacks: [],
      optimizedFallbacks: false,
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
