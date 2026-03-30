import Link from "next/link";
import { notFound } from "next/navigation";

const studies: Record<
  string,
  {
    number: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    role: string;
    lede: string;
    sections: { heading: string; body: string; image?: string }[];
  }
> = {
  "saphire-dent": {
    number: "I",
    title: "From Four Figures to Seven",
    subtitle: "Saphire Dent & Estetik World",
    category: "Brand Identity & Digital",
    year: "2020 – 2025",
    role: "Lead Graphic Designer, Media Team Lead, Web Developer",
    lede: "When I joined, there was no designer, no brand system, and no visual identity to speak of. Two dental tourism brands under one company, both operating in the low four figures. Over five years I built everything — and watched the numbers follow.",
    sections: [
      {
        heading: "The Brief",
        body: "Two brands — Saphire Dent and Estetik World — needed a complete visual presence from scratch. Logos, identity systems, social media strategy, advertising campaigns, before-and-after patient photography, and eventually a full web platform. All with a team of one.",
        image: "brand identity overview",
      },
      {
        heading: "Building the Identity",
        body: "I designed both logos and developed comprehensive brand guidelines that could scale across digital, print, and environmental applications. The visual language needed to feel premium and trustworthy — critical in health tourism where patients are making high-stakes decisions from abroad.",
        image: "logo design and brand guidelines",
      },
      {
        heading: "Art Direction & Social Media",
        body: "As media team lead, I art directed all social media content for both brands. This included campaign concepts, ad creative, Instagram and Facebook content calendars, and the careful editing of before-and-after patient photography — work that required both technical skill and genuine sensitivity.",
        image: "social media campaigns",
      },
      {
        heading: "Growing the Team",
        body: "Starting as the sole designer, I hired and mentored two junior designers, establishing structured workflows that doubled our content output. The system I built allowed the team to maintain quality and consistency even as demand scaled rapidly.",
        image: "team workflow",
      },
      {
        heading: "The Web Platform",
        body: "In the later phase I transitioned to web development — designing and building the main website and conversion-optimized landing pages. Integrated Google Ads and Analytics to create a measurable, data-driven acquisition funnel. The website became the primary driver of international patient leads.",
        image: "website and landing pages",
      },
      {
        heading: "The Result",
        body: "Over five years, the business grew from four figures to seven figures in annual revenue. The brand went from invisible to recognizable in the Turkish health tourism market. Today I continue to work with management on digital strategy and web development.",
      },
    ],
  },
  "editorial-system": {
    number: "II",
    title: "Building a Modular Editorial Design System",
    subtitle: "Publication Design",
    category: "Editorial Design",
    year: "2023",
    role: "Lead Designer",
    lede: "A systematic approach to layout and typography that transformed a quarterly publication into an industry design benchmark. The goal was not just consistency — it was building a machine that produces beautiful pages at scale.",
    sections: [
      {
        heading: "The Challenge",
        body: "The publication had grown organically over several years, with each issue designed ad-hoc. The result was a lack of visual cohesion, slow production timelines, and a growing disconnect between the editorial voice and the visual presentation.",
        image: "before redesign",
      },
      {
        heading: "The System",
        body: "I developed a modular grid system with interchangeable layout components — headline blocks, pull quotes, image treatments, sidebar modules — that could be assembled in different configurations while maintaining a unified visual language. Typography was standardized to a strict hierarchy.",
        image: "grid system and components",
      },
      {
        heading: "The Outcome",
        body: "Production time decreased by 40%. Visual consistency increased dramatically. The publication began receiving design recognition within the industry, and the system has been maintained and evolved by subsequent designers without losing its integrity.",
        image: "final spreads",
      },
    ],
  },
  "packaging-redesign": {
    number: "III",
    title: "Shelf Impact Through Restraint",
    subtitle: "Packaging Redesign",
    category: "Packaging",
    year: "2023",
    role: "Lead Designer",
    lede: "Most packaging redesigns add. This one subtracted. The brief was to increase shelf visibility in a crowded market — the answer was to strip away everything that didn't earn its place.",
    sections: [
      {
        heading: "The Problem",
        body: "The existing packaging was cluttered with information, competing visual elements, and an unclear hierarchy. On shelf, it disappeared. In a category where every competitor shouts, the brand had no voice.",
        image: "before packaging",
      },
      {
        heading: "The Approach",
        body: "I audited the competitive landscape and identified that every brand in the category was using the same visual vocabulary — busy, colorful, information-dense. The opportunity was restraint. A limited palette, generous white space, confident typography, and a single focal image.",
        image: "design exploration",
      },
      {
        heading: "The Result",
        body: "The redesigned packaging achieved a measurable increase in retail visibility and brand recall. The quiet confidence of the design stood out precisely because it refused to compete on the same terms as the rest of the shelf.",
        image: "final packaging on shelf",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = studies[slug];
  if (!study) notFound();

  return (
    <div>
      {/* Hero — full width */}
      <div className="max-w-[1200px] mx-auto mb-12">
        {/* Back nav */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="section-label text-ink-lighter text-[0.68rem] hover:text-accent transition-colors"
          >
            &larr; Back to main
          </Link>
          <span className="section-label text-ink-lighter text-[0.68rem]">
            Case Study {study.number}
          </span>
        </div>

        {/* Hero image */}
        <div className="img-placeholder w-full h-[50vh] min-h-[360px] mb-8">
          hero project imagery
        </div>

        {/* Title block */}
        <div className="flex gap-8 items-end">
          <span
            className="font-headline text-[8rem] font-bold leading-none text-paper-edge"
            style={{ marginBottom: "-0.1em" }}
          >
            {study.number}
          </span>
          <div className="flex-1 pb-2">
            <div className="section-label text-accent mb-2 tracking-[0.3em]">
              {study.category}&ensp;&middot;&ensp;{study.year}
            </div>
            <h1 className="masthead-title text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.88] mb-3">
              {study.title}
            </h1>
            <p className="dateline text-ink-lighter">
              {study.subtitle}
            </p>
          </div>
        </div>

        <hr className="rule-thick mt-6 mb-0" />
      </div>

      {/* Content area */}
      <div className="max-w-[1200px] mx-auto">
        {/* Role + Lede — two column */}
        <div className="grid grid-cols-[1fr_2fr] gap-12 mb-12">
          <div>
            <div className="section-label text-ink-lighter mb-1">Role</div>
            <hr className="rule-thick mb-3" />
            <p className="font-headline font-bold text-[1.05rem] leading-snug">
              {study.role}
            </p>
          </div>
          <div>
            <div className="section-label text-ink-lighter mb-1">Overview</div>
            <hr className="rule-thick mb-3" />
            <p className="drop-cap justify-editorial text-ink-light leading-[1.8] text-[1.05rem]">
              {study.lede}
            </p>
          </div>
        </div>

        <hr className="rule-ornament mb-12" />

        {/* Sections — alternating layouts */}
        {study.sections.map((section, i) => {
          const isEven = i % 2 === 0;

          return (
            <div key={i} className="mb-12">
              {section.image ? (
                <div className={`grid grid-cols-2 gap-10 ${isEven ? "" : "direction-rtl"}`}>
                  {/* Image side */}
                  <div className={isEven ? "order-1" : "order-2"}>
                    <div className="img-placeholder w-full h-[320px]">
                      {section.image}
                    </div>
                  </div>
                  {/* Text side */}
                  <div className={isEven ? "order-2" : "order-1"}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-headline text-[2.5rem] font-bold leading-none text-paper-edge">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-headline text-[1.4rem] font-bold leading-tight">
                        {section.heading}
                      </h2>
                    </div>
                    <hr className="rule-light mb-4" />
                    <p className="justify-editorial text-ink-light leading-[1.8] text-[0.95rem]">
                      {section.body}
                    </p>
                  </div>
                </div>
              ) : (
                /* No image — full width text with large number */
                <div className="max-w-2xl mx-auto text-center">
                  <span className="font-headline text-[3rem] font-bold leading-none text-paper-edge block mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-headline text-[1.6rem] font-bold leading-tight mb-3">
                    {section.heading}
                  </h2>
                  <hr className="rule-light mb-4 max-w-xs mx-auto" />
                  <p className="justify-editorial text-ink-light leading-[1.8] text-[1rem]">
                    {section.body}
                  </p>
                </div>
              )}

              {i < study.sections.length - 1 && (
                <hr className="rule-ornament mt-12" />
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div className="mt-16 mb-8">
          <hr className="rule-thick mb-[3px]" />
          <hr className="rule-thin mb-6" />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-ink-lighter text-[0.72rem] leading-[1.6]">
                &copy; {new Date().getFullYear()} Awab Elkhalil
              </p>
            </div>
            <Link
              href="/"
              className="section-label text-[0.68rem] text-ink-lighter hover:text-accent transition-colors"
            >
              Back to main &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
