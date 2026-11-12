# Astro 7, static output

The site is built with Astro 7 (`astro.config.mjs`) to plain files in `dist/`, served by nginx (`nginx.conf`, `Dockerfile`). APIs may differ from your training data: check the types in `node_modules/astro` and the docs at docs.astro.build before writing code, and heed deprecation notices.

- Images live in `src/assets` and render through `src/components/Pic.astro` (astro:assets), so they are resized at build time. Data refers to them by their old public paths (`/work/x.webp`); `src/data/assets.ts` maps those to the files.
- Motion clips stay in `public/work` and are served as they are.
- No client framework ships. Interactivity is plain `<script>` in the component that needs it. React is only used to render `CaseStudyDiagrams.tsx` at build time; don't add `client:*` directives.
