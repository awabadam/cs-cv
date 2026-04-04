import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SitePreview from "@/components/SitePreview";

const studies: Record<
  string,
  {
    number: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    role: string;
    url?: string;
    iframeable?: boolean;
    lede: string;
    sections: { heading: string; body: string; image?: string }[];
  }
> = {
  "saphire-dent": {
    number: "I",
    title: "Building a Dental Empire's Entire Visual World",
    subtitle: "Saphire Dent & Estetik World",
    category: "Brand Identity & Web",
    year: "2020 – 2025",
    role: "Lead Graphic Designer, Media Team Lead, Web Developer",
    url: "https://saphiredent.com/en/",
    iframeable: false,
    lede: "When I joined, there was no designer, no brand system, and no visual identity to speak of. Two dental tourism brands under one company — Saphire Dent and Estetik World — both serving international patients from a single Istanbul clinic. Over five years I built everything from the ground up.",
    sections: [
      {
        heading: "The Brief",
        body: "Two brands needed a complete visual presence from scratch. Logos, identity systems, social media strategy, advertising campaigns, before-and-after patient photography, and eventually a full web platform with multilingual support targeting patients from Europe, the Middle East, and North Africa. Starting headcount: one designer — me.",
        image: "saphiredent brand identity overview",
      },
      {
        heading: "Building the Identity",
        body: "I designed both logos and developed comprehensive brand guidelines that could scale across digital, print, and environmental applications. The visual language needed to feel premium and trustworthy — critical in health tourism where patients are making high-stakes decisions about their bodies from thousands of miles away. Every touchpoint had to say: we are serious, we are professional, you are safe here.",
        image: "logo design and brand guidelines",
      },
      {
        heading: "Art Direction & Social Media",
        body: "As media team lead, I art directed all social media content for both brands across Instagram and Facebook. This included campaign concepts, ad creative, content calendars, and the careful editing of before-and-after patient photography — work that required both technical retouching skill and genuine sensitivity to patient privacy and dignity. The social presence became the primary discovery channel for international patients.",
        image: "social media campaigns and ads",
      },
      {
        heading: "Growing the Team",
        body: "Starting as the sole designer, I hired and mentored two junior designers, establishing structured workflows and a design system that doubled our content output while maintaining quality. The system I built allowed the team to operate consistently even as demand scaled with the business.",
        image: "team and workflow",
      },
      {
        heading: "The Web Platform",
        body: "In the later phase I transitioned to web development — designing and building the main website and conversion-optimized landing pages with Next.js and Tailwind CSS. Integrated Google Ads and Analytics to create a measurable, data-driven acquisition funnel. The website became the primary driver of international patient leads, supporting 8+ languages and featuring before/after galleries, video testimonials, and treatment calculators.",
        image: "saphiredent.com website",
      },
      {
        heading: "The Result",
        body: "Over five years, the business served 5,000+ patients and became a recognized name in Turkish dental tourism. The brand went from invisible to a market presence with a 15-year treatment warranty promise. I continue to work with management on web development and digital strategy, now focused on conversion optimization and platform scaling.",
      },
    ],
  },
  "jouvence": {
    number: "II",
    title: "Luxury Aesthetics, Translated to Screen",
    subtitle: "Jouvence Medical Aesthetic",
    category: "Web Design & Development",
    year: "2024",
    role: "Designer & Developer",
    url: "https://www.jouvencetr.com/en",
    lede: "Jouvence is a premium medical aesthetic clinic in Istanbul offering dental work, hair restoration, and VIP concierge services to an international clientele. They needed a website that matched the exclusivity of walking through their doors — in three languages.",
    sections: [
      {
        heading: "The Challenge",
        body: "The clinic's positioning is luxury-first: German and Swiss dental materials, sapphire FUE hair transplants, VIP transportation and accommodation packages. The existing digital presence didn't reflect any of this. The website needed to convey premium quality, build trust with patients who would fly internationally for treatment, and convert in English, French, and Arabic.",
        image: "jouvence brand and positioning",
      },
      {
        heading: "Design Direction",
        body: "I chose luxury minimalism — clean, spacious layouts with generous whitespace, a restrained palette of black, white, and gold accents, and high-quality imagery featuring the clinic's actual facilities and patient transformations. Light font weights for headings, careful typography hierarchy, and deliberate negative space. The design conveys exclusivity through restraint, not ornamentation.",
        image: "jouvence design system",
      },
      {
        heading: "Technical Execution",
        body: "Built with Next.js for server-side rendering and optimal performance across regions. Multi-language support with seamless EN/FR/AR switching including RTL layout for Arabic. Image optimization, carousel components for before/after galleries, and a conversion funnel designed around consultation booking. Every page load needed to feel fast regardless of the patient's location — Istanbul, Paris, or Riyadh.",
        image: "jouvence website pages",
      },
      {
        heading: "The Result",
        body: "A website that positions Jouvence as the premium choice in a crowded Istanbul aesthetics market. The trilingual platform serves as the primary digital touchpoint for international patients, with a design that matches the in-clinic VIP experience the brand promises.",
        image: "jouvence final website",
      },
    ],
  },
  "esteexpert": {
    number: "III",
    title: "Trust Through Design",
    subtitle: "EsteExpert Clinic",
    category: "Web Design & Development",
    year: "2024",
    role: "Designer & Developer",
    url: "https://esteexpert.clinic",
    lede: "Medical aesthetics is a trust business. Patients considering procedures abroad need to feel confident before they ever step on a plane. EsteExpert needed a website that converted hesitation into consultation bookings — fast.",
    sections: [
      {
        heading: "The Problem",
        body: "The medical aesthetics market in Istanbul is saturated. Dozens of clinics compete for the same international patients with similar services and similar promises. EsteExpert's differentiator was clinical expertise and patient care — but their digital presence didn't communicate either. The website needed to build trust within seconds of landing.",
        image: "esteexpert competitive landscape",
      },
      {
        heading: "The Approach",
        body: "Every design decision was filtered through one question: does this build trust? Clean typography and generous spacing signal professionalism. Real patient photography (not stock) signals authenticity. Clear treatment explanations signal transparency. A prominent consultation CTA on every page removes friction. The design is warm but clinical — approachable but serious.",
        image: "esteexpert design approach",
      },
      {
        heading: "Development",
        body: "Built with a modern stack for performance and SEO — critical for a business that lives and dies by search visibility. WhatsApp integration for instant patient communication, optimized for mobile (where most international patients browse), and structured for multilingual expansion.",
        image: "esteexpert website",
      },
      {
        heading: "The Result",
        body: "A conversion-focused platform that turns the clinic's clinical credibility into a tangible digital experience. The website serves as the trust bridge between a patient's first Google search and their consultation booking.",
      },
    ],
  },
  "awab-design": {
    number: "IV",
    title: "Designing the Designer's Own Platform",
    subtitle: "awab.design",
    category: "Portfolio & Web Development",
    year: "2024",
    role: "Designer & Developer",
    url: "https://www.awab.design",
    lede: "The hardest client is yourself. awab.design is my own portfolio and service platform — a place to document 50+ website projects, offer design and development services, and demonstrate the full range of what I build. It needed to practice what it preaches.",
    sections: [
      {
        heading: "The Challenge",
        body: "Most designer portfolios are either beautiful but empty, or content-rich but generic. I needed a platform that could serve as both a portfolio showcasing real work and a service page that converts potential clients — while being technically impressive enough that the site itself is a case study.",
      },
      {
        heading: "The Stack",
        body: "Built with Next.js and React for performance and SEO, Tailwind CSS for rapid iteration, and Three.js with WebGL for immersive visual experiences. AI-driven features including chatbot integration for 24/7 client communication. Deployed on a VPS with Docker and Nginx for full control over performance and scaling.",
      },
      {
        heading: "Design Decisions",
        body: "The design needed to signal technical capability without overshadowing the work. Clean layouts for project showcases, immersive transitions between sections, and a service architecture that makes it easy for potential clients to understand what I offer and take action. Every interaction is intentional.",
      },
      {
        heading: "The Result",
        body: "A living platform that documents 50+ websites created, serves as the primary acquisition channel for freelance and contract work, and evolves as my skills and services expand. The site itself demonstrates the intersection of design thinking and technical execution that defines how I work.",
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
            href="/?page=4"
            className="section-label text-ink-lighter text-[0.68rem] hover:text-accent transition-colors"
          >
            &larr; Back to main
          </Link>
          <span className="section-label text-ink-lighter text-[0.68rem]">
            Case Study {study.number}
          </span>
        </div>

        {/* Live site preview */}
        {study.url && (
          study.iframeable !== false ? (
            <SitePreview url={study.url} title={`${study.subtitle} — live site`} />
          ) : (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-[50vh] min-h-[360px] mb-8 border border-rule-light overflow-hidden relative group"
            >
              <Image
                src="/images/case-studies/saphiredent.jpg"
                alt={`${study.subtitle} website screenshot`}
                fill
                className="object-cover object-top"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors flex items-center justify-center">
                <span className="section-label text-[0.75rem] bg-paper-page/90 backdrop-blur-sm px-5 py-2.5 border border-rule-faint opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.2em]">
                  Visit live site &nearr;
                </span>
              </div>
            </a>
          )
        )}

        {/* Title block */}
        <div className="flex gap-4 md:gap-8 items-end">
          <span
            className="font-headline text-[2.5rem] md:text-[8rem] font-bold leading-none text-paper-edge"
            style={{ marginBottom: "-0.1em" }}
          >
            {study.number}
          </span>
          <div className="flex-1 pb-2">
            <div className="section-label text-accent mb-2 tracking-[0.3em]">
              {study.category}&ensp;&middot;&ensp;{study.year}
            </div>
            <h1 className="masthead-title text-[clamp(1.3rem,3.5vw,4.5rem)] leading-[0.88] mb-3">
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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12 mb-12">
          <div>
            <div className="section-label text-ink-lighter mb-1">Role</div>
            <hr className="rule-thick mb-3" />
            <p className="font-headline font-bold text-[1.05rem] leading-snug mb-3">
              {study.role}
            </p>
            {study.url && (
              <>
                <div className="section-label text-ink-lighter mb-1 mt-4">Live Site</div>
                <hr className="rule-light mb-2" />
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-[0.9rem] hover:text-ink transition-colors"
                >
                  {study.url.replace("https://www.", "").replace("https://", "")} &nearr;
                </a>
              </>
            )}
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

        {/* Sections — clean editorial text */}
        <div className="max-w-3xl mx-auto">
          {study.sections.map((section, i) => (
            <div key={i} className="mb-10">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-headline text-[1.5rem] md:text-[2rem] font-bold leading-none text-paper-edge">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-headline text-[1.1rem] md:text-[1.4rem] font-bold leading-tight">
                  {section.heading}
                </h2>
              </div>
              <hr className="rule-light mb-4" />
              <p className="justify-editorial text-ink-light leading-[1.85] text-[1rem]">
                {section.body}
              </p>
              {i < study.sections.length - 1 && (
                <hr className="rule-ornament mt-10" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 mb-8">
          <hr className="rule-thick mb-[3px]" />
          <hr className="rule-thin mb-6" />
          <div className="flex justify-between items-center">
            <p className="text-ink-lighter text-[0.72rem] leading-[1.6]">
              &copy; {new Date().getFullYear()} Awab Elkhalil
            </p>
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
