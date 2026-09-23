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
    preview?: string;
    lede: string;
    sections: { heading: string; body: string; image?: string }[];
  }
> = {
  "saphire-dent": {
    number: "I",
    title: "One Clinic, Five Products, One Builder",
    subtitle: "Saphire Dent & Estetik World",
    category: "Brand, Web & Product",
    year: "2020 – Present",
    role: "Lead Designer, Media Team Lead, then Web Developer",
    url: "https://saphiredent.com/en/",
    iframeable: false,
    preview: "/images/case-studies/saphiredent.jpg",
    lede: "When I joined there was no designer, no brand system, and no visual identity to speak of — two dental tourism brands under one company, serving international patients from a single Istanbul clinic. I spent five years building the brand. Then I spent the next phase building the software it runs on: five production systems, all shipped solo.",
    sections: [
      {
        heading: "The Brief",
        body: "Two brands needed a complete visual presence from scratch. Logos, identity systems, social media strategy, advertising campaigns, before-and-after patient photography, and eventually a full web platform with multilingual support targeting patients from Europe, the Middle East, and North Africa. Starting headcount: one designer — me.",
      },
      {
        heading: "Building the Identity",
        body: "I designed both logos and developed brand guidelines that could scale across digital, print, and environmental applications. The visual language needed to feel premium and trustworthy — critical in health tourism, where patients make high-stakes decisions about their bodies from thousands of miles away. Every touchpoint had to say: we are serious, we are professional, you are safe here.",
      },
      {
        heading: "Art Direction & Content at Volume",
        body: "As media team lead I art directed all social media for both brands, producing campaign concepts, ad creative, and 200+ patient case studies a month through a standardised before-and-after pipeline — work requiring technical retouching skill and genuine sensitivity to patient privacy. Automating batch editing with Photoshop Actions made that workflow three to five times faster. Patient inquiries rose roughly 30% over the campaign era. I grew the team from one designer to three and wrote the system that kept quality steady as volume climbed.",
      },
      {
        heading: "The Flagship Platform",
        body: "By 2025 I could build what I had been designing. saphiredent.com is now a Next.js and PostgreSQL platform in eight languages including RTL Arabic — with a custom CMS behind five-role access control, an AI chatbot with human takeover and sales analytics, AI-assisted lead management, a geographic map of incoming leads, and Odoo CRM integration. 714 commits over sixteen months. Dedicated landing pages strip the site chrome entirely for a one-to-one match with each ad campaign.",
      },
      {
        heading: "Engineering the Operations",
        body: "It runs self-hosted: two Next.js instances behind a proxy on a VPS with Docker Compose, so a solo maintainer can deploy blue-green without downtime for a clinic answering leads around the clock. The Odoo lead push is deliberately fail-open — if the CRM is unreachable the lead is stored locally and an alert fires, because a lost lead costs more than a delayed sync.",
      },
      {
        heading: "Extending Into an Ecosystem",
        body: "The engagement became five products. A patient mobile app in Expo and React Native walks a prospective patient from dental concerns through medical history and photos to an instant cost estimate, with six-language RTL support and medical data held only in the device secure store. A patient portal built as a Next.js backend-for-frontend over Odoo adds TOTP two-factor authentication, argon2id hashing, eight locales, and invite-only provisioning. A sales-call intelligence platform coaches the people who close. And a print-optimised open-day system brings the work back to collateral, where it started.",
      },
      {
        heading: "The Result",
        body: "One client, design since 2020, development since 2025, five shipped products, still engaged. The business serves international patients in eight languages with a fifteen-year treatment warranty promise, and the website it once lacked is now its primary acquisition channel — measured end to end through Tag Manager, GA4, and Google Ads conversion tracking.",
      },
    ],
  },
  "saphire-intelligence": {
    number: "II",
    title: "Teaching a Clinic to Hear Itself",
    subtitle: "Saphire Intelligence",
    category: "AI Product Engineering",
    year: "2026",
    role: "Designer & Developer",
    lede: "A dental tourism clinic lives or dies on phone calls. Hundreds of them a month, in several languages, made by consultants nobody has time to listen to. Saphire Intelligence ingests every call and WhatsApp thread, transcribes and translates it, analyses it, and hands back coaching — written in the margin beside the exact sentence it refers to.",
    sections: [
      {
        heading: "The Problem",
        body: "The clinic had recordings and no way to learn from them. Managers sampled a handful of calls a week, in languages they sometimes did not speak, and coached on impressions. Nobody could answer the simple questions: which objection kills the most deals, which consultant is strongest on price, what do patients actually ask before they book.",
      },
      {
        heading: "The Pipeline",
        body: "Calls from the clinic's dialer and exported WhatsApp conversations flow through a transcribe, analyse, and translate pipeline — a job queue with a dedicated worker, object storage for audio behind presigned URLs, and model calls for transcription and analysis. Work is queued rather than run inline because a twenty-minute call cannot block a web request, and because a failed stage must be retryable without losing the recording.",
      },
      {
        heading: "Coaching in the Margin",
        body: "The design decision that shaped the product: analysis is worthless as a summary at the top of a page. Coaching notes are anchored to the transcript turns they are about, in the margin, so a consultant reads their own words and the correction together. Team analytics and voice-of-customer patterns sit above that, but the unit of learning is one sentence in one call.",
      },
      {
        heading: "Access as a Reporting Tree",
        body: "Recordings of sales conversations are sensitive in both directions — for the patient and the consultant. Access is an eight-role hierarchy scoped to the reporting tree: a manager reads exactly their subtree, nothing beside it. Ingest webhooks verify HMAC signatures over raw bytes within a five-minute replay window and fail closed when unconfigured. Malformed payloads return 400 so the dialer stops retrying the unretryable; processing failures return 500 so it retries what might succeed.",
      },
      {
        heading: "Deleting My Own Design",
        body: "I designed a bespoke clinical-dossier identity for it — gold on paper, five reading faces — then ran a legibility audit against my own work and found the structural layer sitting below the visible threshold. I reset the interface to a stock component library as a floor to redesign up from, with tests that assert the stock palette's known faults so the redesign has to fix them measurably. Killing your own work on evidence is the tradeoff.",
      },
      {
        heading: "The Result",
        body: "224 commits in five weeks — the most sophisticated system I have built and the fastest I have built one. It is internal software for a working clinic rather than a public product, which is exactly why it had to be right: the people it evaluates are the people who have to trust it.",
      },
    ],
  },
  "vuedent": {
    number: "III",
    title: "A Practice Management System, Built Solo",
    subtitle: "Vuedent",
    category: "Product & SaaS",
    year: "2025 – 2026",
    role: "Founder, Designer & Developer",
    url: "https://vuedent.com",
    iframeable: false,
    preview: "/images/case-studies/vuedent.jpg",
    lede: "Five years inside a dental clinic teaches you what the software gets wrong. Vuedent is my answer: multi-tenant practice management where patient records, imaging, scheduling, and billing live in one system built around how a clinic actually moves through a day.",
    sections: [
      {
        heading: "Why Build It",
        body: "Clinic software tends to be either an enterprise system priced for hospitals or a booking calendar wearing a lab coat. What sits between them is a practice that needs patient records, clinical imaging, a room-aware schedule, and billing — without an IT department to hold it together. I had watched that gap from the inside for half a decade.",
      },
      {
        heading: "The Product",
        body: "Patient records with full clinical history, image tagging by tooth region so a photograph attaches to the specific site it documents, scheduling that understands rooms and not just time slots, PDF reporting, and subscription billing. Multi-tenant from the first commit, because a practice management system that cannot isolate two clinics is a demo, not a product.",
      },
      {
        heading: "Security as Architecture",
        body: "Patient health data sets the constraints before anything else is decided. Records are encrypted at rest with AES-256-GCM, every read of protected health information writes to an audit trail, and tenant isolation is enforced at the data layer rather than trusted to application code. These decisions are structural — they cannot be added to a system that was not shaped around them.",
      },
      {
        heading: "Where It Stands",
        body: "The product site is live at vuedent.com with an interactive demo, and the system behind it is 295 commits over thirteen months of solo work. Underneath, two migrations are still in motion — the data layer moving to a lighter ORM, billing moving to a new merchant of record. Both are the kind of change that is cheap now and expensive later.",
      },
    ],
  },
  "jouvence": {
    number: "IV",
    title: "Luxury Aesthetics, Translated to Screen",
    subtitle: "Jouvence Medical Aesthetic",
    category: "Web Design & Development",
    year: "2025 – 2026",
    role: "Designer & Developer",
    url: "https://www.jouvencetr.com/en",
    lede: "Jouvence is a premium medical aesthetic clinic in Istanbul offering dental work, hair restoration, and VIP concierge services to an international clientele. They needed a website that matched the exclusivity of walking through their doors — in three languages. It became my longest-running client engagement.",
    sections: [
      {
        heading: "The Challenge",
        body: "The clinic's positioning is luxury-first: German and Swiss dental materials, sapphire FUE hair transplants, VIP transportation and accommodation packages. The existing digital presence reflected none of it. The site had to convey premium quality, build trust with patients who would board a plane for treatment, and convert in English, French, and Arabic.",
      },
      {
        heading: "Design Direction",
        body: "Luxury minimalism — spacious layouts with generous whitespace, a restrained palette of black, white, and gold, light font weights, and deliberate negative space. Motion carries the rest: scroll-linked animation and smooth scrolling that make the site feel handled rather than browsed. The design conveys exclusivity through restraint, not ornamentation.",
      },
      {
        heading: "Technical Execution",
        body: "Built with Next.js for server rendering and regional performance, with seamless EN/FR/AR switching including full RTL layout for Arabic, optimised imagery, before-and-after galleries, and a conversion funnel built around consultation booking. Every page load had to feel fast from Istanbul, Paris, or Riyadh.",
      },
      {
        heading: "Beyond the Site",
        body: "The engagement ran from 2025 into 2026 and grew past the website: a custom Odoo patient-CRM addon connecting enquiries from the site to the clinic's internal pipeline, so the marketing surface and the operational one stopped being separate systems.",
      },
      {
        heading: "The Result",
        body: "A website that positions Jouvence as the premium choice in a crowded Istanbul aesthetics market. The trilingual platform is the primary digital touchpoint for international patients, with a design matching the in-clinic VIP experience the brand promises.",
      },
    ],
  },
  "omar-marketing": {
    number: "V",
    title: "A Media Buyer Makes His Own Case",
    subtitle: "Omar Marketing",
    category: "Web & Motion",
    year: "2026",
    role: "Designer & Developer",
    url: "https://omar.marketing",
    lede: "A performance marketer managing millions in annual ad spend has a specific problem: his own site has to outperform the landing pages he critiques for a living. Nothing decorative survives if it costs a tenth of a second.",
    sections: [
      {
        heading: "The Brief",
        body: "Omar sells measurable outcomes — cost per lead, return on ad spend, conversion rates. The site needed to prove competence in the first three seconds, present real campaign case studies including clinics I had also worked with, and convert in English and Arabic for clients across Turkey and the Gulf.",
      },
      {
        heading: "Design Direction",
        body: "Dark, high-contrast, and quiet where the work should speak — with Three.js visuals carrying the atmosphere instead of stock photography. The motion is there to signal technical credibility on a site selling technical credibility, which meant it had to be cheap to render: GPU-composited, paused when off-screen, and reduced for users who ask for less motion.",
      },
      {
        heading: "Built to Be Measured",
        body: "Bilingual EN/AR with RTL, 95+ Lighthouse performance, and conversion tracking wired through Tag Manager and GA4 from day one — because the first thing a media buyer does with a new site is check whether its own events fire correctly.",
      },
      {
        heading: "The Result",
        body: "An agency site that passes the audit its owner would run on anyone else's, live at omar.marketing and doubling as a demonstration that performance and visual ambition are not opposed.",
      },
    ],
  },
  "esteexpert": {
    number: "—",
    title: "Trust Through Design",
    subtitle: "EsteExpert Clinic",
    category: "Web Design & Development",
    year: "2026",
    role: "Designer & Developer",
    url: "https://esteexpert.clinic",
    lede: "Medical aesthetics is a trust business. Patients considering procedures abroad need to feel confident before they ever step on a plane. EsteExpert, a JCI-accredited clinic, needed a website that converted hesitation into consultation bookings — fast.",
    sections: [
      {
        heading: "The Problem",
        body: "The medical aesthetics market in Istanbul is saturated. Dozens of clinics compete for the same international patients with similar services and similar promises. EsteExpert's differentiator was clinical accreditation and patient care — but their digital presence communicated neither. The website needed to build trust within seconds of landing.",
      },
      {
        heading: "The Approach",
        body: "Every design decision was filtered through one question: does this build trust? Clean typography and generous spacing signal professionalism. Real patient photography signals authenticity. Doctor profiles with credentials signal accountability. A prominent consultation CTA on every page removes friction. The design is warm but clinical — approachable but serious.",
      },
      {
        heading: "The Calculator",
        body: "The centrepiece is an interactive hair-graft calculator built on the Norwood scale: a prospective patient selects their stage and receives a graft estimate and an indicative price before speaking to anyone. It turns the most anxious question in the funnel into a self-serve answer, and it qualifies the lead that follows.",
      },
      {
        heading: "Development",
        body: "Built for performance and SEO — critical for a business that lives by search visibility — in English, Arabic, Turkish, and French with RTL support, WhatsApp integration for instant patient contact, and a mobile-first layout, because that is where international patients browse.",
      },
      {
        heading: "The Result",
        body: "A conversion-focused platform that turns clinical credibility into a tangible digital experience — the trust bridge between a patient's first search and their consultation booking.",
      },
    ],
  },
  "awab-design": {
    number: "VI",
    title: "Designing the Designer's Own Platform",
    subtitle: "awab.design",
    category: "Portfolio & Platform",
    year: "2024 – Present",
    role: "Designer & Developer",
    url: "https://www.awab.design",
    lede: "The hardest client is yourself. awab.design is my studio platform — portfolio, service catalogue, pricing, journal, and quoting tool in one. It is also the longest-running thing I maintain, and the only project where I am both the brief and the deadline.",
    sections: [
      {
        heading: "The Challenge",
        body: "Most designer portfolios are either beautiful but empty or content-rich but generic. I needed a platform that works as a portfolio of real shipped work and as a sales surface that converts enquiries — while being technically credible enough that the site is itself a case study for the services it sells.",
      },
      {
        heading: "The Stack",
        body: "Next.js App Router, statically prerendered, with Three.js for the visual layer and Tailwind for iteration speed. Four locales — English, Arabic, Turkish, and French — with correct hreflang and RTL Arabic, light and dark themes, structured data, and a full sitemap. An admin panel and a database behind it, so the case studies and journal are content rather than commits.",
      },
      {
        heading: "Selling Without a Salesperson",
        body: "A freelancer's real bottleneck is the quoting conversation. The site answers it directly: published package pricing, a services catalogue, care plans, and an interactive rate calculator that produces a quote and captures the lead attached to it. The journal does the other half — long-form posts aimed at the niche I actually serve, including Istanbul clinics losing international patients to outdated websites.",
      },
      {
        heading: "The Work It Documents",
        body: "Nine projects are written up there, with more subdomains than most agencies run: Prestij Emlak, a Turkish real-estate listings platform with maps and WhatsApp leads pre-filled with property details, at emlak.awab.design. GymTrack, a training PWA with one-handed set logging and e1RM analytics, at gym.awab.design. An ad-free offline Quran reader precaching all 114 surahs, at quran.awab.design. And this CV, at cv.awab.design.",
      },
      {
        heading: "The Result",
        body: "197 commits and counting since 2024. It is the primary acquisition channel for freelance and contract work, and it changes whenever the services do — which is the argument for building your own platform rather than renting someone else's template.",
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
          ) : study.preview ? (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-[50vh] min-h-[360px] mb-8 border border-rule-light overflow-hidden relative group"
            >
              <Image
                src={study.preview}
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
          ) : null
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
