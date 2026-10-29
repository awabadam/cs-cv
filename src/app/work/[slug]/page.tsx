import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyDiagram from "@/components/CaseStudyDiagrams";
import Gallery from "@/components/Gallery";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";
import { images, kindLabels, plain, projects, type Project } from "@/data/work";
import type { Study } from "@/data/studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  if (!p) return {};
  const title = `${p.client} ${p.title}`;
  const description = plain(p.summary);
  const img = p.cover && images[p.cover.img];
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: img ? [img.src] : undefined },
    twitter: { card: "summary_large_image", title, description },
  };
}

function ProjectText({ project: p }: { project: Project }) {
  const sampled = p.palette.filter((c) => c.source === "sampled");
  const paletteNote = !sampled.length
    ? null
    : sampled.length === p.palette.length
      ? "Sampled from the artwork"
      : `${sampled.map((c) => c.name || c.hex.toUpperCase()).join(", ")} sampled from the artwork; the rest as specified`;

  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_340px] mt-10">
      <div className="prose max-w-[68ch] space-y-4 text-[17px] leading-relaxed">
        {p.copy.map((c, i) => (
          <p key={i}>
            {c.lead && <strong className="font-medium">{c.lead} </strong>}
            <span dangerouslySetInnerHTML={{ __html: c.text }} />
          </p>
        ))}
      </div>

      <aside className="text-sm space-y-6">
        <dl className="grid grid-cols-[112px_minmax(0,1fr)] gap-x-4 gap-y-2">
          {p.disciplines.length > 0 && (
            <>
              <dt className="text-muted">Scope</dt>
              <dd>{p.disciplines.join(", ")}</dd>
            </>
          )}
          {p.facts.map((f) => (
            <div key={f.k} className="contents">
              <dt className="text-muted">{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>

        {p.palette.length > 0 && (
          <div>
            <p className="text-muted mb-2">Palette</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {p.palette.map((c) => (
                <li key={c.hex} className="flex items-center gap-2">
                  <span
                    className="size-5 rounded-full border border-line"
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs">
                    {c.hex.toUpperCase()}
                    {c.name && <span className="text-muted"> {c.name}</span>}
                  </span>
                </li>
              ))}
            </ul>
            {paletteNote && <p className="mt-2 text-xs text-muted">{paletteNote}</p>}
          </div>
        )}
      </aside>
    </div>
  );
}

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/* The long-form write-up, for projects that have one. */
function Writeup({ slug, study: s, first }: { slug: string; study: Study; first: boolean }) {
  return (
    <section className={`wrap ${first ? "mt-4" : "mt-24"}`} aria-labelledby="writeup">
      <div className="border-t border-line pt-4 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="max-w-[68ch]">
          <p className="font-mono text-xs text-muted">Case study</p>
          <h2
            id="writeup"
            className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.015em]"
          >
            {s.title}
          </h2>
          <p className="mt-5 text-[19px] leading-relaxed">{s.lede}</p>

          {s.stats && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-line py-5">
              {s.stats.map((st) => (
                <div key={st.label}>
                  <p className="text-2xl font-semibold tracking-tight">{st.value}</p>
                  <p className="mt-1 text-xs text-muted leading-snug">{st.label}</p>
                </div>
              ))}
            </div>
          )}

          {s.sections.map((sec, i) => (
            <div key={sec.heading} className="mt-10">
              <h3 className="text-lg font-medium">{sec.heading}</h3>
              <p className="mt-2 text-[17px] leading-relaxed">{sec.body}</p>
              {sec.plate && (
                <figure className="mt-6">
                  <Image
                    src={sec.plate.src}
                    alt={sec.plate.alt}
                    width={sec.plate.w}
                    height={sec.plate.h}
                    sizes="(max-width: 768px) 100vw, 760px"
                    className="w-full h-auto bg-panel"
                  />
                  <figcaption className="cap">{sec.plate.caption}</figcaption>
                </figure>
              )}
              {s.diagram?.after === i && (
                <figure className="mt-6">
                  <div className="diagram border border-line p-4 sm:p-6">
                    <CaseStudyDiagram slug={slug} />
                  </div>
                  <figcaption className="cap">{s.diagram.caption}</figcaption>
                </figure>
              )}
            </div>
          ))}
        </div>

        <aside className="text-sm lg:sticky lg:top-6 lg:self-start">
          <dl className="grid grid-cols-[112px_minmax(0,1fr)] gap-x-4 gap-y-2">
            <dt className="text-muted">Role</dt>
            <dd className="font-medium">{s.role}</dd>
            {s.facts.map((f) => (
              <div key={f.label} className="contents">
                <dt className="text-muted">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {s.url && (
              <>
                <dt className="text-muted">Live site</dt>
                <dd>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-3">
                    {host(s.url)} ↗
                  </a>
                </dd>
              </>
            )}
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const at = projects.findIndex((p) => p.id === slug);
  if (at === -1) notFound();
  const p = projects[at];
  const more = [1, 2, 3].map((n) => projects[(at + n) % projects.length]);
  const hasGallery = !!p.cover || p.sections.length > 0 || p.copy.length > 0;

  return (
    <>
      <header className="wrap flex items-center justify-between py-5 text-sm">
        <Link href="/" className="font-medium">
          Awab Elkhalil
        </Link>
        <Link href="/#work" className="text-muted hover:text-fg">
          &larr; All work
        </Link>
      </header>

      <main>
        <div className="wrap pt-4 pb-8">
          <p className="font-mono text-xs text-muted">
            {p.num} / {projects.length} &middot; {p.kind.map((k) => kindLabels[k]).join(", ")}
          </p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            {p.client} <span className="text-muted font-normal">{p.title}</span>
          </h1>
          <p className="mt-3 text-muted">
            {[p.year, p.sector].filter(Boolean).join(" · ")}
            {p.link && (
              <>
                {(p.year || p.sector) && " · "}
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline underline-offset-3 decoration-muted hover:decoration-fg"
                >
                  {p.link.label} ↗
                </a>
              </>
            )}
          </p>
        </div>

        {hasGallery && (
          <div className="wrap">
            <Gallery cover={p.cover} sections={p.sections}>
              {p.copy.length > 0 && <ProjectText project={p} />}
            </Gallery>
          </div>
        )}

        {p.study && <Writeup slug={p.id} study={p.study} first={!hasGallery} />}

        <nav className="wrap mt-24" aria-label="More work">
          <div className="flex items-baseline justify-between border-t border-line pt-4 mb-6">
            <h2 className="text-lg font-medium">Next</h2>
            <Link href="/#work" className="text-sm text-muted hover:text-fg">
              All {projects.length} projects &rarr;
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <li key={m.id}>
                <ProjectCard project={m} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <SiteFooter />
    </>
  );
}
