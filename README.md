# Awab Elkhalil — Interactive CV

An interactive CV and case-study portfolio, designed as an editorial newspaper spread.

**Live:** [cv.awab.design](https://cv.awab.design)

## What's inside

- **Horizontal page layout.** Full-screen pages with transform-based transitions, set out like the pages of a broadsheet.
- **Editorial typography.** Playfair Display masthead, Fraunces headlines, Libre Caslon body text and Cormorant SC small caps on a cream paper palette with a deep red accent.
- **Case studies.** Six long-form case studies, each with ink-style diagrams, stat strips and live site previews. Sites that block framing are shown as clickable screenshots.
- **Interaction details.** Ink and falling-paper particle effects in Three.js, a custom cursor, magnetic buttons, reactive titles and optional paper sound effects.
- **Generated Open Graph image and icon.**

All CV content lives in a single typed file, [`src/data/content.ts`](src/data/content.ts). [`CONTENT.md`](CONTENT.md) documents the sources and the claims behind it.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) and TypeScript
- [React Three Fiber](https://r3f.docs.pmnd.rs/) and [drei](https://drei.docs.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)

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
│   ├── page.tsx                  # The CV spread
│   └── case-studies/[slug]/      # Case study pages
├── components/                   # Particles, cursor, diagrams, previews
│   └── pages/                    # Individual CV pages
└── data/content.ts               # All CV and case-study content
public/images/                    # Cover, story and case-study imagery
```

## Author

**Awab Elkhalil** · [awab.design](https://www.awab.design) · [LinkedIn](https://linkedin.com/in/awab-adam)

This repository is shared as a portfolio piece. The content, design and imagery are not licensed for reuse. Client names and screenshots belong to their respective owners.
