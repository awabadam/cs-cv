# Awab Elkhalil — Work & CV

A work-first portfolio and CV. The home page opens on an image grid of every project; each project page leads with the work itself, full width, and the write-up follows underneath.

**Live:** [cv.awab.design](https://cv.awab.design)

## What's inside

- **Work index.** Twenty-two projects as an image grid, filterable by discipline (brand, web, product, campaign, 3D, motion, print, photo).
- **Project pages.** Cover, then every board in justified rows that keep each image at its own aspect ratio. Any image opens a full-screen viewer that steps through the whole project with arrow keys or a swipe. Motion pieces loop silently while on screen and play with controls in the viewer.
- **Case studies.** Seven projects carry a long-form write-up under the work, with stat strips, plates and line diagrams.
- **CV.** About, experience, skills and contact on the home page, below the work.
- **Plain styling.** One typeface (Switzer), neutral tones, light and dark mode that follow the system, with a header switch to pin either. No effects in the way of the images.
- **Static output.** Every page is prerendered. Old `/case-studies/:slug` links redirect to `/work/:slug`.

## Content

- [`src/data/work.json`](src/data/work.json) and [`public/work/`](public/work/) are generated from the portfolio knowledge base (project data, captions and images). Regenerate them rather than editing by hand.
- [`src/data/work.ts`](src/data/work.ts) types that data, adds the two product case studies that have no board set (Vuedent, Saphire Intelligence), and attaches the write-ups.
- [`src/data/studies.ts`](src/data/studies.ts) holds the long-form case studies.
- [`src/data/content.ts`](src/data/content.ts) holds the CV: experience, skills, links.

[`CONTENT.md`](CONTENT.md) documents the sources and the claims behind it.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- `next/image` for responsive WebP delivery; motion as static H.264 clips

## Getting started

```bash
git clone https://github.com/awabadam/cs-cv.git
cd cs-cv
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are needed.

## Structure

```
src/
├── app/
│   ├── page.tsx              # Work grid, about, experience, skills, contact
│   ├── work/[slug]/page.tsx  # One project: gallery, text, case study
│   └── fonts/                # Switzer variable font (FFL licence)
├── components/
│   ├── WorkGrid.tsx          # Filterable project grid
│   ├── ProjectCard.tsx
│   ├── Gallery.tsx           # Justified rows and the full-screen viewer
│   └── CaseStudyDiagrams.tsx
└── data/                     # work.json (generated), work.ts, studies.ts, content.ts
public/work/                  # Project images and motion clips (generated)
```

## Author

**Awab Elkhalil** · [awab.design](https://www.awab.design) · [LinkedIn](https://linkedin.com/in/awab-adam)

This repository is shared as a portfolio piece. The content, design and imagery are not licensed for reuse. Client names and screenshots belong to their respective owners.
