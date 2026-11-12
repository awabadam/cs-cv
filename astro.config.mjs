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
  /* Chrome and Edge prerender links from the speculation rules in Base.astro; this
     prefetches on hover for the other browsers. */
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Switzer",
      cssVariable: "--font-switzer",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      options: {
        variants: [{ src: ["./src/fonts/Switzer-Variable.woff2"], weight: "100 900", style: "normal" }],
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
