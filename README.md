# Awab Elkhalil — Work & CV

A work-first portfolio and CV. The home page opens on an image grid of every project; each project page leads with the work itself, full width, and the write-up follows underneath.

**Live:** [cv.awab.design](https://cv.awab.design)

## What's inside

- **Work index.** Twenty-two projects as an image grid, filterable by discipline (brand, web, product, campaign, 3D, motion, print, photo).
- **Project pages.** Cover, then every board in justified rows that keep each image at its own aspect ratio. Any image opens a full-screen viewer that steps through the whole project with arrow keys or a swipe. Motion pieces loop silently while on screen and play with controls in the viewer.
- **Case studies.** Seven projects carry a long-form write-up under the work, with stat strips, plates and line diagrams.
- **CV.** About, experience, skills and contact on the home page, below the work.
- **Plain styling.** One typeface (Switzer), neutral tones, light and dark mode that follow the system, with a header switch to pin either. No effects in the way of the images.
- **Static and light.** Every page is prerendered to plain HTML with its CSS inline and a few kilobytes of script. Images are resized to WebP at build time. Links prerender on hover, so the next page is usually ready before the click. Old `/case-studies/:slug` links redirect to `/work/:slug`.

## Content

- [`src/data/work.json`](src/data/work.json), [`src/assets/work/`](src/assets/work/) (images) and [`public/work/`](public/work/) (motion clips) are generated from the portfolio knowledge base. Regenerate them rather than editing by hand.
- [`src/data/work.ts`](src/data/work.ts) types that data, adds the two product case studies that have no board set (Vuedent, Saphire Intelligence), and attaches the write-ups.
- [`src/data/studies.ts`](src/data/studies.ts) holds the long-form case studies.
- [`src/data/content.ts`](src/data/content.ts) holds the CV: experience, skills, links.

[`CONTENT.md`](CONTENT.md) documents the sources and the claims behind it.

## Tech stack

- [Astro 7](https://astro.build/), static output, and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- `astro:assets` for responsive WebP; motion as static H.264 clips
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
│   ├── index.astro           # Work grid, about, experience, skills, contact
│   ├── work/[slug].astro     # One project: gallery, text, case study
│   └── 404.astro
├── layouts/Base.astro        # Head, meta, font, theme
├── components/
│   ├── WorkGrid.astro        # Filterable project grid
│   ├── ProjectCard.astro
│   ├── Gallery.astro         # Justified rows and the full-screen viewer
│   └── CaseStudyDiagrams.tsx # Rendered to static SVG at build time
├── assets/                   # Project and case-study images (work/ is generated)
├── fonts/                    # Switzer variable font (FFL licence)
└── data/                     # work.json (generated), work.ts, studies.ts, content.ts
public/work/                  # Motion clips (generated)
```

## Author

**Awab Elkhalil** · [awab.design](https://www.awab.design) · [LinkedIn](https://linkedin.com/in/awab-adam)

This repository is shared as a portfolio piece. The content, design and imagery are not licensed for reuse. Client names and screenshots belong to their respective owners.
