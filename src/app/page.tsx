"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";

/* ── DATA ── */

const experience = [
  {
    role: "Web Developer & Lead Designer",
    company: "Saphire Dent & Estetik World",
    location: "Istanbul, Türkiye",
    period: "2025 – Present",
    description:
      "Now focused on the web — architecting and developing the main website and high-conversion landing pages. Working directly with management on cross-brand digital strategy. Integrated Google Ads and Analytics to drive measurable campaign ROI.",
  },
  {
    role: "Lead Graphic Designer & Media Team Lead",
    company: "Saphire Dent & Estetik World",
    location: "Istanbul, Türkiye",
    period: "2020 – 2025",
    description:
      "Joined as the sole designer for two brands under one company. Designed both logos, art directed all social media, created ad campaigns, and edited before-and-after patient photography. Built and led a design team of three.",
  },
  {
    role: "Co-Founder",
    company: "Sequence Media Productions",
    location: "Khartoum, Sudan",
    period: "2019 – 2020",
    description:
      "Co-founded a media production studio with friends, all while holding full-time positions elsewhere. Oversaw creative direction and client strategy. Left amicably to pursue design over media production — a clearer path.",
  },
  {
    role: "Lead Graphic Designer",
    company: "Tenchologya",
    location: "Khartoum, Sudan",
    period: "2019 – 2020",
    description:
      "Led a team of designers and a motion artist across multi-sector branding and advertising projects for tech, FMCG, and services clients.",
  },
  {
    role: "Graphic Designer",
    company: "Boost Sudan",
    location: "Khartoum, Sudan",
    period: "2018 – 2019",
    description:
      "Produced branding and digital campaign assets across diverse client engagements.",
  },
  {
    role: "Graphic Designer",
    company: "icare-net",
    location: "Sudan",
    period: "2016 – 2018",
    description:
      "First professional role. Designed logos, event branding, product graphics, and print materials. First introduction to web design — where the curiosity began.",
  },
];

const expertise = {
  design: [
    "Brand Identity Systems",
    "Editorial & Publication Design",
    "Typography & Type Setting",
    "Packaging & Print Production",
    "UI/UX & Digital Product Design",
    "Motion Graphics & Animation",
    "Art Direction & Photography",
  ],
  technical: [
    "Next.js & React",
    "Tailwind CSS",
    "VPS, Docker & Nginx",
    "Google Ads & Analytics",
    "Adobe Creative Suite",
    "Figma & Prototyping",
    "Blender 3D",
  ],
};

const caseStudies = [
  {
    slug: "saphire-dent",
    number: "I",
    headline: "From Four Figures to Seven",
    subtitle: "Saphire Dent & Estetik World",
    description:
      "Five years of building two dental tourism brands from the ground up — logos, identity systems, social media, ad campaigns, websites, and a design team. A study in growing with the business.",
    category: "Brand Identity & Digital",
    year: "2020 – 2025",
  },
  {
    slug: "editorial-system",
    number: "II",
    headline: "Building a Modular Editorial Design System",
    subtitle: "Publication Design",
    description:
      "A systematic approach to layout and typography that transformed a quarterly publication into an industry design benchmark. Scalable, consistent, unmistakable.",
    category: "Editorial Design",
    year: "2023",
  },
  {
    slug: "packaging-redesign",
    number: "III",
    headline: "Shelf Impact Through Restraint",
    subtitle: "Packaging Redesign",
    description:
      "A packaging redesign that increased retail visibility by stripping away everything unnecessary. Proof that less, done right, commands more attention.",
    category: "Packaging",
    year: "2023",
  },
];

const pageLabels = ["Cover", "Story", "Experience", "Expertise", "Work", "Contact"];
const PAGE_COUNT = pageLabels.length;

/* ── PAGE ── */

export default function HorizontalCV() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const goToPage = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, PAGE_COUNT - 1));
    if (clamped === currentPageRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentPage(clamped);
    currentPageRef.current = clamped;
    setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 900);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimatingRef.current) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        goToPage(currentPageRef.current + (e.deltaY > 0 ? 1 : -1));
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToPage(currentPageRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPage(currentPageRef.current - 1);
      }
    };

    // Touch swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        goToPage(currentPageRef.current + (dx < 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToPage]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div ref={wrapperRef} className="page-scroller">
        <div
          className="page-track"
          style={{ transform: `translateX(-${currentPage * 100}vw)` }}
        >

        {/* ═══ PAGE 1 — COVER ═══ */}
        <section className="paper-page">
          <div className="cover-split">
            {/* Left half — text */}
            <div className="cover-left">
              <div className="flex justify-between items-center text-ink-lighter dateline mb-3">
                <span>Vol. IX, No. 1</span>
                <span>{today}</span>
              </div>
              <hr className="rule-thin mb-[3px]" />
              <hr className="rule-thick mb-8" />

              <h1 className="masthead-title text-[5rem] md:text-[7rem] lg:text-[9rem] mb-2">
                Awab
                <br />
                Elkhalil
              </h1>

              <div className="byline my-5">
                Digital Artisan &mdash; Istanbul, Türkiye
              </div>

              <h2 className="font-quote text-[1.15rem] leading-[1.45] font-normal mb-5 text-ink-light italic">
                One designer. Two brands.<br />
                Five&nbsp;years. Every&nbsp;pixel.
              </h2>

              <p className="justify-editorial text-ink-light leading-[1.75] mb-6 text-[0.95rem]">
                I am a digital artisan. I hack, I play, I mold projects until
                they hit their targets&thinsp;&mdash;&thinsp;or until the work
                speaks for itself. A decade of graphic design,
                five&nbsp;years building two brands from the ground up, and a
                growing practice in web development have taught me that the best
                work lives at the intersection of craft and obsession.
              </p>

              <p className="pull-quote mb-6">
                I don&rsquo;t stop when it&rsquo;s done.<br />
                I stop when it&rsquo;s right.&ensp;&rdquo;
              </p>

              <hr className="rule-ornament mb-4" />

              <div className="flex justify-between text-ink-lighter dateline text-[0.72rem]">
                <span>Arabic &bull; English &bull; Turkish</span>
                <span>Istanbul Edition</span>
              </div>
            </div>

            {/* Right half — full-height portrait */}
            <div className="cover-right">
              <div className="img-placeholder w-full h-full">
                portrait photograph
              </div>
            </div>
          </div>
          <span className="folio">1</span>
        </section>

        {/* ═══ PAGE 2 — THE JOURNEY ═══ */}
        <section className="paper-page">
          <div className="flex h-full">
            {/* Left — large title + timeline */}
            <div className="flex-1 flex flex-col justify-between px-8 pt-10 pb-4 border-r border-rule-light">
              <div>
                <div className="section-label text-ink-lighter mb-1">The Journey</div>
                <hr className="rule-thick mb-6" />

                <h2 className="masthead-title text-[3rem] md:text-[4rem] lg:text-[5rem] leading-[0.85] mb-6">
                  Khar<br/>toum<br/>
                  <span className="text-accent">to</span><br/>
                  Istan<br/>bul
                </h2>
              </div>

              {/* Timeline markers */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="dateline text-ink-lighter w-12">2016</span>
                  <hr className="rule-light flex-1" />
                  <span className="text-ink-light text-[0.85rem]">First design role</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="dateline text-ink-lighter w-12">2019</span>
                  <hr className="rule-light flex-1" />
                  <span className="text-ink-light text-[0.85rem]">Co-founded Sequence</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="dateline text-accent w-12 font-bold">2020</span>
                  <hr className="rule-thick flex-1" />
                  <span className="text-ink font-bold text-[0.85rem]">Moved to Istanbul</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="dateline text-ink-lighter w-12">2025</span>
                  <hr className="rule-light flex-1" />
                  <span className="text-ink-light text-[0.85rem]">Shifted to web dev</span>
                </div>
              </div>
            </div>

            {/* Right — stacked editorial blocks */}
            <div className="flex-1 flex flex-col px-8 pt-10 pb-4 overflow-y-auto">
              {/* Top — full-width image */}
              <div className="img-placeholder w-full h-[28rem] mb-2">
                collage: sudan work &rarr; istanbul work
              </div>
              <p className="dateline text-ink-lighter text-[0.6rem] mb-5 flex justify-between">
                <span>Khartoum, 2016</span>
                <span>&mdash;&mdash;&mdash;</span>
                <span>Istanbul, 2025</span>
              </p>

              {/* Middle — text in two columns */}
              <div className="grid grid-cols-2 gap-x-6 flex-1">
                <div className="border-r border-rule-light pr-6">
                  <p className="drop-cap justify-editorial text-ink-light leading-[1.8]">
                    It started in Khartoum&thinsp;&mdash;&thinsp;designing logos
                    and event materials at icare-net, where I first touched web
                    design and felt the pull of the screen. From there: leading
                    teams, building brands, co-founding a production studio with
                    friends on the side. In 2020, everything changed.
                  </p>
                </div>
                <div>
                  <p className="drop-cap justify-editorial text-ink-light leading-[1.8]">
                    New city. New language. New market. I joined a dental company
                    with two brands and no designer. Over five years I built
                    everything&thinsp;&mdash;&thinsp;the logos, the identity
                    systems, the social media, the websites&thinsp;&mdash;&thinsp;and
                    a team to carry it forward. Today I focus on web development.
                    The design eye never left.
                  </p>
                </div>
              </div>

              {/* Bottom — pull quote banner */}
              <div className="mt-auto pt-5">
                <hr className="rule-thick mb-4" />
                <p className="font-headline text-[1.4rem] italic text-center leading-[1.35] text-ink-light mb-4">
                  &ldquo;I don&rsquo;t stop when it&rsquo;s done. I stop when it&rsquo;s right.&rdquo;
                </p>
                <hr className="rule-thick" />
              </div>
            </div>
          </div>
          <span className="folio">2</span>
        </section>

        {/* ═══ PAGE 3 — EXPERIENCE (columns) ═══ */}
        <section className="paper-page">
          <div className="flex h-full">
            {/* Left half — section title */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 border-r border-rule-light">
              <h2 className="masthead-title text-[5rem] md:text-[7rem] lg:text-[9rem] text-center leading-[0.82] tracking-[0.05em]">
                Pro<br/>fess<br/>ional<br/><span className="text-accent">Expe<br/>rience</span>
              </h2>
            </div>

            {/* Right half — content in columns */}
            <div className="flex-1 grid grid-cols-2 gap-x-8 overflow-y-auto" style={{ height: '100%', padding: '2.5rem 2rem 1rem' }}>
              {/* Column 1 */}
              <div className="border-r border-rule-light pr-8">
                {experience.slice(0, 3).map((job, i) => (
                  <div key={i} className="mb-5">
                    <div className="flex justify-between items-baseline gap-x-3 mb-[2px]">
                      <h3 className="font-headline text-[1rem] font-bold leading-tight tracking-[-0.005em]">
                        {job.role}
                      </h3>
                      <span className="dateline text-ink-lighter whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-ink-lighter font-serif text-[0.8rem] mb-2 tracking-wide">
                      {job.company}&ensp;&middot;&ensp;{job.location}
                    </p>
                    <p className="justify-editorial text-ink-light leading-[1.6] text-[0.9rem]">
                      {job.description}
                    </p>
                    {i < 2 && <hr className="rule-light mt-4" />}
                  </div>
                ))}
              </div>
              {/* Column 2 */}
              <div>
                {experience.slice(3).map((job, i) => (
                  <div key={i} className="mb-5">
                    <div className="flex justify-between items-baseline gap-x-3 mb-[2px]">
                      <h3 className="font-headline text-[1rem] font-bold leading-tight tracking-[-0.005em]">
                        {job.role}
                      </h3>
                      <span className="dateline text-ink-lighter whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-ink-lighter font-serif text-[0.8rem] mb-2 tracking-wide">
                      {job.company}&ensp;&middot;&ensp;{job.location}
                    </p>
                    <p className="justify-editorial text-ink-light leading-[1.6] text-[0.9rem]">
                      {job.description}
                    </p>
                    {i < experience.slice(3).length - 1 && <hr className="rule-light mt-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span className="folio">3</span>
        </section>

        {/* ═══ PAGE 4 — EXPERTISE & EDUCATION ═══ */}
        <section className="paper-page">
          <div className="flex h-full">
            {/* Left — big title + education + languages */}
            <div className="w-[38%] flex flex-col border-r border-rule-light px-10 pt-8 pb-14">
              <h2 className="masthead-title text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.82] mb-8">
                Exper<br/><span className="text-accent">tise</span>
              </h2>

              <div className="flex-1" />

              {/* Education */}
              <div className="mb-6">
                <div className="section-label text-ink-lighter mb-1">Education</div>
                <hr className="rule-thick mb-3" />
                <p className="font-headline font-bold text-[1.2rem] leading-tight">B.A. Graphic Design</p>
                <p className="text-ink-light text-[0.88rem] mt-1">The Future University, Khartoum</p>
                <p className="dateline text-ink-lighter">2014 – 2018</p>
              </div>

              {/* Languages */}
              <div>
                <div className="section-label text-ink-lighter mb-1">Languages</div>
                <hr className="rule-thick mb-3" />
                {[
                  { lang: "Arabic", level: "Native" },
                  { lang: "English", level: "Full Professional" },
                  { lang: "Turkish", level: "Working Proficiency" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between items-baseline py-2 border-b border-rule-faint">
                    <span className="font-headline font-bold text-[1rem]">{l.lang}</span>
                    <span className="dateline text-ink-lighter text-[0.72rem]">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — two columns of skills, magazine index style */}
            <div className="w-[62%] grid grid-cols-2 h-full">
              {/* Design column */}
              <div className="border-r border-rule-light px-8 pt-8 pb-14 overflow-y-auto">
                <div className="section-label text-accent mb-1 tracking-[0.3em]">Design</div>
                <hr className="rule-thick mb-5" />
                {expertise.design.map((item, i) => (
                  <div key={i} className="group mb-0">
                    <div className="flex items-start gap-4 py-4 border-b border-rule-faint">
                      <span
                        className="font-headline text-[2.5rem] font-bold leading-none text-paper-edge group-hover:text-accent transition-colors"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pt-1">
                        <p className="font-headline font-bold text-[1.1rem] leading-snug group-hover:text-accent transition-colors">
                          {item}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical column */}
              <div className="px-8 pt-8 pb-14 overflow-y-auto">
                <div className="section-label text-accent mb-1 tracking-[0.3em]">Technical</div>
                <hr className="rule-thick mb-5" />
                {expertise.technical.map((item, i) => (
                  <div key={i} className="group mb-0">
                    <div className="flex items-start gap-4 py-4 border-b border-rule-faint">
                      <span
                        className="font-headline text-[2.5rem] font-bold leading-none text-paper-edge group-hover:text-accent transition-colors"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pt-1">
                        <p className="font-headline font-bold text-[1.1rem] leading-snug group-hover:text-accent transition-colors">
                          {item}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span className="folio">4</span>
        </section>

        {/* ═══ PAGE 5 — SELECTED WORK ═══ */}
        <section className="paper-page">
          <div className="flex h-full">
            {/* Left — title */}
            <div className="w-[30%] flex flex-col justify-between border-r border-rule-light px-8 pt-8 pb-14">
              <div>
                <div className="section-label text-ink-lighter mb-1">Selected</div>
                <h2 className="masthead-title text-[4rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.82] mb-6">
                  Case<br/><span className="text-accent">Stud</span><br/>ies
                </h2>
              </div>

              <div>
                <hr className="rule-thick mb-3" />
                <p className="justify-editorial text-ink-light leading-[1.7] text-[0.9rem]">
                  A collection of projects that demonstrate process, thinking,
                  and craft. Each traces a problem from brief to resolution.
                </p>
              </div>
            </div>

            {/* Right — three case studies side by side */}
            <div className="w-[70%] grid grid-cols-3 h-full">
              {caseStudies.map((study, i) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className={`border-none group flex flex-col px-6 pt-8 pb-14 overflow-hidden ${
                    i < caseStudies.length - 1 ? "border-r border-rule-light" : ""
                  }`}
                >
                  {/* Number + category */}
                  <div className="flex items-end justify-between mb-3">
                    <span
                      className="font-headline text-[4rem] font-bold leading-none text-paper-edge group-hover:text-accent transition-colors"
                    >
                      {study.number}
                    </span>
                    <span className="section-label text-accent text-[0.6rem] text-right">
                      {study.category}<br/>{study.year}
                    </span>
                  </div>

                  <hr className="rule-thick mb-4" />

                  {/* Image */}
                  <div className="img-placeholder w-full h-44 mb-4 group-hover:opacity-80 transition-opacity">
                    project imagery
                  </div>

                  {/* Headline */}
                  <h3 className="font-headline text-[1.2rem] font-bold leading-[1.15] mb-2 group-hover:text-accent transition-colors">
                    {study.headline}
                  </h3>

                  {/* Subtitle */}
                  <p className="dateline text-ink-lighter text-[0.7rem] mb-3">
                    {study.subtitle}
                  </p>

                  {/* Description */}
                  <p className="justify-editorial text-ink-light leading-[1.6] text-[0.82rem] flex-1">
                    {study.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 pt-3 border-t border-rule-faint">
                    <span className="section-label text-ink-lighter text-[0.6rem] group-hover:text-accent transition-colors tracking-[0.2em]">
                      Read full study &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <span className="folio">5</span>
        </section>

        {/* ═══ PAGE 6 — CONTACT ═══ */}
        <section className="paper-page">
          <div className="page-inner-single">
            <div className="w-full max-w-lg">
              <div className="section-label text-ink-lighter mb-1">
                Enquiries
              </div>
              <hr className="rule-thick mb-5" />

              <h3 className="font-headline text-[2.5rem] font-bold leading-[1.1] mb-4 tracking-[-0.01em]">
                Let&apos;s build
                <br />
                something.
              </h3>

              <p className="text-ink-light font-serif leading-[1.7] mb-8 text-[0.95rem]">
                Open to commissions, collaborations, and full-time opportunities.
                If you need someone who obsesses over the details until the work
                is right&thinsp;&mdash;&thinsp;let&rsquo;s talk.
              </p>

              <dl className="space-y-5 font-serif text-[0.95rem] mb-10">
                <div>
                  <dt className="dateline text-ink-lighter text-[0.7rem]">Email</dt>
                  <dd>
                    <a href="mailto:awabe.adam@gmail.com" className="text-lg">
                      awabe.adam@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="dateline text-ink-lighter text-[0.7rem]">Telephone</dt>
                  <dd className="text-lg">+90 554 175 9945</dd>
                </div>
                <div>
                  <dt className="dateline text-ink-lighter text-[0.7rem]">LinkedIn</dt>
                  <dd>
                    <a href="https://www.linkedin.com/in/awab-adam" target="_blank" rel="noopener noreferrer" className="text-lg">
                      linkedin.com/in/awab-adam
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="dateline text-ink-lighter text-[0.7rem]">Portfolio</dt>
                  <dd>
                    <a href="https://awab.design" target="_blank" rel="noopener noreferrer" className="text-lg">
                      awab.design
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="dateline text-ink-lighter text-[0.7rem]">Links</dt>
                  <dd>
                    <a href="https://linktr.ee/awabelkhalil" target="_blank" rel="noopener noreferrer" className="text-lg">
                      linktr.ee/awabelkhalil
                    </a>
                  </dd>
                </div>
              </dl>

              <hr className="rule-thick mb-[3px]" />
              <hr className="rule-thin mb-3" />
              <p className="text-ink-lighter text-[0.7rem] leading-[1.6] justify-editorial mb-2">
                This document was typeset in Playfair Display and EB&nbsp;Garamond.
                Designed and developed by Awab Elkhalil using Next.js and
                Tailwind&nbsp;CSS. Set in Istanbul, Türkiye.
              </p>
              <div className="flex justify-between items-center text-ink-lighter dateline text-[0.7rem]">
                <span>&copy; {new Date().getFullYear()} Awab Elkhalil</span>
                <span>All rights reserved</span>
              </div>
            </div>
          </div>
          <span className="folio">6</span>
        </section>

        </div>
      </div>

      {/* Page indicator */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-paper-page/90 backdrop-blur-sm px-5 py-2.5 border border-rule-faint" style={{ boxShadow: '0 2px 8px rgba(20,20,10,0.08)' }}>
        <button
          onClick={() => goToPage(Math.max(currentPage - 1, 0))}
          className="text-ink-lighter hover:text-ink border-none bg-transparent cursor-pointer dateline transition-colors text-sm"
          aria-label="Previous page"
        >
          &larr;
        </button>

        <div className="flex items-center gap-2">
          {pageLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`border-none cursor-pointer transition-all duration-300 section-label text-[0.6rem] px-1.5 py-0.5 ${
                currentPage === i
                  ? "bg-ink text-paper-page"
                  : "bg-transparent text-ink-lighter hover:text-ink"
              }`}
              aria-label={`Go to ${label}`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(Math.min(currentPage + 1, PAGE_COUNT - 1))}
          className="text-ink-lighter hover:text-ink border-none bg-transparent cursor-pointer dateline transition-colors text-sm"
          aria-label="Next page"
        >
          &rarr;
        </button>
      </nav>
    </>
  );
}
