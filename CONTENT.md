# Content Documentation — Awab Elkhalil CV/Portfolio

> Last synced: 2026-10-28. Sources: CV Knowledge Base (`Nextcloud/Main vault/1 Projects/CV Knowledge Base`),
> GitHub `awabadam` + `AwabElAdam`, and local repo commit history.

## Identity
- **Full name:** Awab Elsheilkh Adam Elkhalil
- **Title on site:** Digital Artisan
- **Current positioning:** Designer & developer — end-to-end multilingual, Arabic-first web products
- **Location:** Istanbul, Türkiye — open to relocation and remote
- **Languages:** Arabic (Native), English (Full Professional), Turkish (Working)
- **Education:** B.A. Graphic Design — The Future University, Khartoum, 2014–2018

## Contact
- **Email:** awabe.adam@gmail.com
- **Phone / WhatsApp:** +90 554 175 9945
- **LinkedIn:** linkedin.com/in/awab-adam
- **Portfolio:** awab.design
- **Instagram:** @awabeladam
- **Facebook:** facebook.com/awabeladam
- **GitHub:** github.com/awabadam (second account `AwabElAdam` holds client-facing repos)
- **Behance:** behance.net/awab-elkhalil
- **500px:** 500px.com/p/AwabAdam
- **Linktree:** linktr.ee/awabelkhalil

## Professional Experience

### Web Developer & Lead Designer — Saphire Dent & Estetik World
**2025 – Present | Istanbul, Türkiye**
- Sole builder of the clinic's digital ecosystem — five production systems
- saphiredent.com: Next.js + PostgreSQL, 8 languages incl. RTL, custom CMS with 5-role RBAC,
  AI chatbot with sales analytics, AI-assisted lead management, Odoo CRM integration
- 714 commits over 16 months (verified 2026-09-23)
- Self-hosted: Docker Compose on VPS, blue-green deploys, Nginx
- GTM / GA4 / Google Ads conversion tracking

### Full-Stack Developer & Designer (Freelance) — Independent
**2024 – Present | Istanbul, Türkiye**
- Jouvence (jouvencetr.com), EsteExpert (esteexpert.clinic), Omar Marketing (omar.marketing),
  Prestij Emlak (emlak.awab.design), Zeyad Gouda portfolio
- Reusable in-house Next.js starter (auth, roles, i18n, Docker + Nginx)
- awab.design: own studio platform, 4 locales, quote builder, admin panel, 197 commits

### Lead Graphic Designer & Media Team Lead — Saphire Dent & Estetik World
**2020 – 2025 | Istanbul, Türkiye**
- Sole designer for two brands; designed both logos and all identity systems
- Art directed all social media; 200+ patient case studies a month
- Photoshop Actions automation made before/after workflow 3–5× faster
- ~30% rise in patient inquiries over the Meta campaign era (marketing-attributed)
- Grew the design team from 1 to 3; media team lead for 2 years

### Co-Founder & Creative Lead — Sequence Media Productions
**2019 – 2020 | Khartoum, Sudan** — 360° campaigns for 12+ clients; left amicably

### Lead Graphic Designer — Tenchologya
**2019 – 2020 | Khartoum, Sudan** — led designers + motion artist; first hand-coded landing pages

### Graphic Designer — Boost Sudan
**2018 – 2019 | Khartoum, Sudan** — 100+ social ads, template standardisation

### Graphic Designer — icare-net
**2016 – 2018 | Khartoum, Sudan** — first role; logos, print, first web and app UI

## Expertise

### Design
Brand Identity Systems · Editorial & Publication Design · Typography & Type Setting ·
UI/UX & Digital Product Design · Motion Graphics & Animation · Art Direction & Photography ·
Packaging & Print Production

### Technical
Next.js, React & TypeScript · Tailwind CSS & Design Systems · Three.js & WebGL ·
PostgreSQL, Prisma & Drizzle · Expo & React Native · AI Chatbots & Content Pipelines ·
Arabic-First i18n & RTL · Docker, Dokploy & VPS Deployment · Nginx, CI/CD & Blue-Green Deploys ·
GA4, Tag Manager & Google Ads · Adobe Suite, Figma & Blender

**Method:** spec-first delivery with AI coding agents — writes the spec, directs and reviews the
implementation, tests and deploys. Framing rule from the KB: *method, not skills deficit.*

## Work (22 projects)

The project index, captions and images come from the portfolio knowledge base
(`CV Knowledge Base/web-portfolio`, see its `SCHEMA.md`). `src/data/work.json` and `src/assets/work/*.webp`
are generated from it; regenerate after changing the knowledge base. Motion pieces add a silent H.264
clip at `public/work/<key>.mp4` (720 px short side), with the webp as its poster frame. Images go in
`src/assets` so the build can resize them; clips stay in `public` and are served as they are. Excluded from the
site, as in the print portfolio: `lp-implant-03`, `lp-implant-07`, `lp-mobile2`, `ads-smile-more` (patient
imagery). Sarı Dental is left off the site at the owner's request; it stays in the knowledge base.

Order: 01 Saphire Dent Brand Identity · 02 Saphire Dent Main Site · 03 Yasmina Beauty ·
04 Bespoke Clinics · 05 Motion · 06 Omega Implants · 07 Campaign System · 08 Jouvence ·
09 EsteExpert · 10 Omar Marketing · 11 awab.design · 12 Vuedent · 13 Saphire Intelligence ·
14 DentBazaar · 15 WATERBOY · 16 TAKU · 17 Chef's Burger & Crepe · 18 Blue Mesh · 19 Italy Pizza ·
20 Branded Equipment · 21 Key Visuals · 22 Photography. A motion cover loops on its index card too.

Vuedent and Saphire Intelligence have no board set; they are built from their case studies in
`src/data/work.ts`.

### Case studies (long-form, `src/data/studies.ts`)

| Slug | Subject | Category | Year |
|---|---|---|---|
| `saphire-dent` | Saphire Dent & Estetik World | Brand, Web & Product | 2020 – Present |
| `saphire-intelligence` | Saphire Intelligence | AI Product Engineering | 2026 |
| `vuedent` | Vuedent | Product & SaaS | 2025 – 2026 |
| `jouvence` | Jouvence Medical Aesthetic | Web Design & Development | 2025 – 2026 |
| `esteexpert` | EsteExpert Clinic | Web Design & Development | 2026 |
| `omar-marketing` | Omar Marketing | Web & Motion | 2026 |
| `awab-design` | awab.design | Portfolio & Platform | 2024 – Present |

Each renders under the work on `/work/<slug>`. `/case-studies/<slug>` redirects there (308).

**Verified commit counts (2026-09-23):** Saphiredent 714 · saphire-intelligence 224 · vuedent 295 ·
portfolio 197 · Saphire-app 104 · patient-portal 136.

## Claims to handle carefully
From the KB case-study draft — do not harden these without verification:
- ~30% inquiry increase is marketing-attributed, not solely causal
- 200+ case studies/month and 3–5× photo speedup are self-reported
- Patient portal is paused pre-launch; mobile app is internal distribution
- Client naming and any admin/dashboard screenshots need written client permission

## Story Arc
1. **2016 — Khartoum:** first design job at icare-net, first contact with web design
2. **2018–2019:** Boost Sudan, then leading teams at Tenchologya
3. **2019:** co-founded Sequence Media Productions
4. **2020 — Istanbul:** joined Saphire Dent as sole designer for two brands
5. **2020–2025:** built both brands: logos, identity, social, ads, photography, team
6. **2024:** first sites shipped solo as a developer; freelance practice begins
7. **2025–2026:** web developer & lead designer; five products live around one clinic

## Typeface
- **Zalando Sans** (variable, 200–900, with italics), almost all of it at 400: hierarchy comes from size, uppercase and grey rather than weight. Headlines are uppercase with tight leading (1.08) and tracking (−0.01em); navigation and section labels are 12px uppercase.
- **DM Mono** for numbers, dates and small labels.
- **IBM Plex Sans Arabic** (400, 500) for Arabic text on the Arabic pages. Latin text on those pages stays in Zalando Sans.
- All three are fetched from Google Fonts at build time and served from the site (SIL Open Font License).
- Spacing: a 20px page edge (12px on a phone), section labels above a hairline with 60px below, and about 160px between sections.

## Design Direction
- Work first: the home page opens on three Blender loops from the Motion project side by side (two on a phone), leading to that project; `HERO` and `LOOPS` in `src/pages/[...lang]/index.astro` pick them. Then the project grid; project pages open on their cover. Both run the full width of the window, short of the 20px page edge; the hero is a screen high less the same gap above and below (4:5 on a phone).
- Motion: one curve almost everywhere, an exponential ease-out (`--ease` in `global.css`) that starts fast and settles slowly. It covers link and button colours, the card hover zoom, pictures fading in as they load, cards rising back in when the grid is filtered, the image viewer, page-to-page fades and Lenis scrolling. On top of that: a project card (or the hero) grows into the cover of the page it opens and shrinks back on the way back, on a slower curve that eases in as well as out so the eye can follow it (every browser with view transitions, Firefox included, since pages change in place through Astro's router); headlines rise a line at a time out of a mask; pictures open out of a tighter crop as they scroll in, a beat apart; and the opening picture draws in and rounds off as the page scrolls past it. Reduced-motion settings turn it all off.
- No decoration competing with the images: neutral greys, one typeface, thin rules.
- Images keep their own aspect ratios in justified rows; any image opens a full-screen viewer.
- Light and dark mode follow the system setting by default; the sun/moon button in the header flips to the other one, remembered per browser, and flipping back to the system's choice returns to following it.
- The header lies flat across the top of the page; once the page scrolls it draws in to a floating frosted pill, clear of the top and sides. On a phone the section links fold away behind a Menu button, and the pill opens out into a card with them in large type. Language is a small menu (EN ▾) beside the theme button.
- Below the work, the CV follows the same language as the top of the page: an uppercase two-tone statement opens About and Contact, the portrait sits beside the story told one city at a time, experience is numbered rows, skills are set large and run on, and blocks of text float up as they scroll in.
- The footer shows the time in Istanbul, large, beside London, New York, Dubai and Tokyo with their difference from Istanbul (set in the visitor's browser), and a link back to the top. A round back-to-top button also comes up in the corner once the page is a screen down, and steps aside at the footer.
- English, Arabic and Turkish. The Arabic and Turkish text is machine-translated and needs a native read, especially the claims above and the Arabic spelling of the name (أواب الخليل). Case-study diagrams stay in English.
- Favicon: an "AE" monogram, drawn from Switzer Bold (the site's earlier typeface) (public/icon.svg, favicon.ico, apple-icon.png), inverting with the system colour scheme.
