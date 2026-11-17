# Awab Elkhalil — Work & CV

A work-first portfolio and CV. The home page opens on an image grid of every project; each project page leads with the work itself, full width, and the write-up follows underneath.

**Live:** [cv.awab.design](https://cv.awab.design)

## What's inside

- **Work index.** Twenty-two projects as an image grid, filterable by discipline (brand, web, product, campaign, 3D, motion, print, photo).
- **Project pages.** Cover, then every board in justified rows that keep each image at its own aspect ratio. Any image opens a full-screen viewer that steps through the whole project with arrow keys or a swipe. Motion pieces loop silently while on screen and play with controls in the viewer.
- **Case studies.** Seven projects carry a long-form write-up under the work, with stat strips, plates and line diagrams.
- **CV.** About, experience, skills and contact on the home page, below the work, and a footer with the time in Istanbul beside a few other cities.
- **Three languages.** English at `/`, Arabic (right to left) at `/ar`, Turkish at `/tr`, with a header switch that keeps you on the same page. Each page links its translations for search engines.
- **Plain styling.** One typeface (Zalando Sans, with DM Mono for numbers and IBM Plex Sans Arabic for Arabic text), neutral tones, rounded images throughout, light and dark mode that follow the system, with a header switch to pin either. No effects in the way of the images.
- **Smooth motion.** Wheel scrolling and in-page links glide ([Lenis](https://lenis.darkroom.engineering/)), pages cross-fade into each other and a project card grows into the cover it opens. Headlines rise line by line and pictures open out as they scroll in. All of it stands down for anyone whose system asks for reduced motion.
- **Static and light.** Every page is prerendered to plain HTML with its CSS inline and a few kilobytes of script. Images are resized to WebP at build time. Pages change in place through Astro's router, which fetches a link's page on hover, so the next page is usually ready before the click. Old `/case-studies/:slug` links redirect to `/work/:slug`.

## Content

- [`src/data/work.json`](src/data/work.json), [`src/assets/work/`](src/assets/work/) (images) and [`public/work/`](public/work/) (motion clips) are generated from the portfolio knowledge base. Regenerate them rather than editing by hand.
- [`src/data/work.ts`](src/data/work.ts) types that data, adds the two product case studies that have no board set (Vuedent, Saphire Intelligence), and attaches the write-ups.
- [`src/data/studies.ts`](src/data/studies.ts) holds the long-form case studies.
- [`src/data/content.ts`](src/data/content.ts) holds the CV: experience, skills, links.
- [`src/i18n/ui.ts`](src/i18n/ui.ts) holds the interface text (navigation, labels, hero, about) in all three languages.
- [`src/i18n/ar.json`](src/i18n/ar.json) and [`src/i18n/tr.json`](src/i18n/tr.json) translate the data: each maps an English string, exactly as it appears in the data, to its translation. Text with no entry shows in English. After changing the data, run `npm run i18n` to list what is missing or no longer used.

[`CONTENT.md`](CONTENT.md) documents the sources and the claims behind it.

## Tech stack

- [Astro 7](https://astro.build/), static output, and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- `astro:assets` for responsive WebP; motion as static H.264 clips
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- Zalando Sans, DM Mono and IBM Plex Sans Arabic, fetched from Google Fonts at build time and served from the site (Astro's font API)
- React only at build time, to render the case-study diagrams; none of it ships to the browser
- nginx in a Docker image for hosting (see [`Dockerfile`](Dockerfile) and [`nginx.conf`](nginx.conf))

## Getting started

```bash
git clone https://github.com/awabadam/cs-cv.git
cd cs-cv
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). No environment variables are needed.

## Structure

```
src/
├── pages/
│   ├── [...lang]/            # Every page once per language: /, /ar, /tr
│   │   ├── index.astro       # Work grid, about, experience, skills, contact
│   │   └── work/[slug].astro # One project: gallery, text, case study
│   ├── [lang]/404.astro      # The Arabic and Turkish 404s
│   └── 404.astro
├── layouts/Base.astro        # Head, meta, fonts, theme, smooth scroll
├── i18n/                     # Interface text, data translations (ar.json, tr.json)
├── components/
│   ├── WorkGrid.astro        # Filterable project grid
│   ├── ProjectCard.astro
│   ├── Gallery.astro         # Justified rows and the full-screen viewer
│   └── CaseStudyDiagrams.tsx # Rendered to static SVG at build time
├── assets/                   # Project and case-study images (work/ is generated)
└── data/                     # work.json (generated), work.ts, studies.ts, content.ts
public/work/                  # Motion clips (generated)
```

## Author

**Awab Elkhalil** · [awab.design](https://www.awab.design) · [LinkedIn](https://linkedin.com/in/awab-adam)

This repository is shared as a portfolio piece. The content, design and imagery are not licensed for reuse. Client names and screenshots belong to their respective owners.
