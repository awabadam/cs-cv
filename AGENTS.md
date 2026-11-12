# Astro 7, static output

The site is built with Astro 7 (`astro.config.mjs`) to plain files in `dist/`, served by nginx (`nginx.conf`, `Dockerfile`). APIs may differ from your training data: check the types in `node_modules/astro` and the docs at docs.astro.build before writing code, and heed deprecation notices.

- Images live in `src/assets` and render through `src/components/Pic.astro` (astro:assets), so they are resized at build time. Data refers to them by their old public paths (`/work/x.webp`); `src/data/assets.ts` maps those to the files.
- Motion clips stay in `public/work` and are served as they are.
- Three languages from one set of pages. `src/pages/[...lang]/` builds each page for `lang` undefined (English, `/`), `ar` and `tr`. Components read the language with `localeOf(Astro.url)` and take their text from `ui[l]` in `src/i18n/ui.ts`; build links with `localized(path, l)`. Data text is translated by `localize()`/`t()` from `src/i18n/data.ts` against `ar.json`/`tr.json`, keyed by the exact English string, so changing English text in the data drops its translation until `npm run i18n` reports it and it is re-added.
- Arabic pages are `dir="rtl"`. Use logical utilities (`ms-*`, `me-*`, `ps-*`, `start-*`, `end-*`, `text-start`) rather than left/right ones, and wrap Latin strings that start or end with punctuation (phone numbers, handles, hex codes) in `dir="ltr"`.
- Smooth scrolling is Lenis, set up once in `Base.astro`. Anything that scrolls on its own (like the image viewer) must be excluded through its `prevent` option.
- Regenerate `package-lock.json` with the npm in the Docker image (`docker run --rm -u $(id -u):$(id -g) -e HOME=/tmp -v "$PWD":/app -w /app node:24-alpine npm install --package-lock-only`). An older host npm drops optional entries and the image's `npm ci` then fails.
- No client framework ships. Interactivity is plain `<script>` in the component that needs it. React is only used to render `CaseStudyDiagrams.tsx` at build time; don't add `client:*` directives.
