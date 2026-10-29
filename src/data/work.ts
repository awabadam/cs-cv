/* ── The work: every project, in the order the index shows it ──
 *
 * work.json is generated from the design-portfolio knowledge base (projects, captions,
 * palettes, image sizes); its images live in public/work/<key>.webp, and motion pieces
 * add a clip at public/work/<key>.mp4. Two products that
 * exist only as written case studies (Vuedent, Saphire Intelligence) are added here,
 * and every project with a long-form write-up in studies.ts carries it as `study`.
 */

import data from "./work.json";
import { caseStudies } from "./content";
import { studies, type Study } from "./studies";

export type Kind = "brand" | "web" | "product" | "campaign" | "3d" | "motion" | "print" | "photo";
export type Img = { img: string; cap: string };
export type Cell = Img | { stack: Img[] };
export type Section = { title: string; note: string | null; rows: Cell[][] };
export type Swatch = { hex: string; name?: string | null; source?: string };

export type Project = {
  id: string;
  num: string;
  client: string;
  title: string;
  year: string | null;
  sector: string | null;
  disciplines: string[];
  kind: Kind[];
  palette: Swatch[];
  summary: string;
  copy: { lead: string | null; text: string }[];
  facts: { k: string; v: string }[];
  link: { href: string; label: string } | null;
  cover: Img | null;
  /* Card image, when the cover would crop badly in a landscape frame. */
  thumb?: string;
  sections: Section[];
  study?: Study;
};

export const kindLabels: Record<Kind, string> = {
  brand: "Brand",
  web: "Web",
  product: "Product",
  campaign: "Campaign",
  "3d": "3D",
  motion: "Motion",
  print: "Print",
  photo: "Photo",
};

/* A motion piece is its poster frame (the webp) plus a clip beside it in public/work. */
export const images: Record<string, { w: number; h: number; src: string; video?: string }> = {
  ...Object.fromEntries(
    Object.entries(data.images).map(([k, v]) => [
      k,
      { w: v.w, h: v.h, src: `/work/${k}.webp`, video: "video" in v ? `/work/${k}.mp4` : undefined },
    ])
  ),
  "cs-vuedent": { w: 2880, h: 1520, src: "/images/case-studies/vuedent.jpg" },
};

/* Products documented only as case studies; their text comes from the study itself. */
function fromStudy(slug: string, kind: Kind[], cover: Img | null): Omit<Project, "num"> {
  const s = studies[slug];
  const card = caseStudies.find((c) => c.slug === slug)!;
  return {
    id: slug,
    client: s.subtitle,
    title: s.category,
    year: s.year.replace(/ – /g, "–"),
    sector: null,
    disciplines: [],
    kind,
    palette: [],
    summary: card.description,
    copy: [],
    facts: [],
    link: s.url ? { href: s.url, label: s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") } : null,
    cover,
    sections: [],
  };
}

const products = [
  fromStudy("vuedent", ["product", "web"], {
    img: "cs-vuedent",
    cap: '<a href="https://vuedent.com">vuedent.com</a> — the product homepage',
  }),
  fromStudy("saphire-intelligence", ["product"], null),
];

const THUMBS: Record<string, string> = {};

const ordered = [...(data.projects as unknown as Omit<Project, "num">[])];
ordered.splice(ordered.findIndex((p) => p.id === "awab-design") + 1, 0, ...products);

const NUM = Object.fromEntries(ordered.map((p, i) => [p.id, String(i + 1).padStart(2, "0")]));

/* The portfolio cross-references chapters by number; here they point at the project page,
   and outbound links open in a new tab. */
function relink(html: string) {
  return html
    .replace(/<a href="#([a-z0-9-]+)">chapter \d+<\/a>/g, (m, id: string) =>
      NUM[id] ? `<a href="/work/${id}">project ${NUM[id]}</a>` : m
    )
    .replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http');
}

/* Some images (logo lockups, photographs) carry no caption in the source data. */
const relinkImg = (i: Img): Img => ({ ...i, cap: i.cap ? relink(i.cap) : "" });

export const projects: Project[] = ordered.map((p) => ({
  ...p,
  num: NUM[p.id],
  thumb: THUMBS[p.id],
  copy: p.copy.map((c) => ({ ...c, text: relink(c.text) })),
  cover: p.cover && relinkImg(p.cover),
  sections: p.sections.map((s) => ({
    ...s,
    note: s.note && relink(s.note),
    rows: s.rows.map((r) =>
      r.map((c) => ("stack" in c ? { stack: c.stack.map(relinkImg) } : relinkImg(c)))
    ),
  })),
  study: studies[p.id],
}));

export const kinds = (Object.keys(kindLabels) as Kind[]).filter((k) =>
  projects.some((p) => p.kind.includes(k))
);

/* Plain text of a caption, for alt text and aria labels. */
export const plain = (html: string) =>
  html.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
