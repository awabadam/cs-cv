import React from "react";
import { expertise } from "@/data/content";

interface ExpertisePageProps {
  isActive: boolean;
  style: React.CSSProperties;
}

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <>
      <div className="section-label text-accent mb-1 tracking-[0.3em]">{title}</div>
      <hr className="rule-thick mb-5" />
      {items.map((item, i) => (
        <div key={i} className="group mb-0">
          <div className="flex items-start gap-4 py-4 border-b border-rule-faint">
            <span className="font-headline text-[1.5rem] md:text-[2.5rem] font-bold leading-none text-paper-edge group-hover:text-accent transition-colors">
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
    </>
  );
}

export default function ExpertisePage({ isActive, style }: ExpertisePageProps) {
  return (
    <section className="paper-page" data-active={isActive} style={style}>
      <div className="flex flex-col md:flex-row h-auto md:h-full">
        <div className="w-full md:w-[38%] flex-none md:flex-col flex flex-col md:border-r border-rule-light px-4 md:px-10 py-4 md:pt-8 md:pb-14 md:max-h-none">
          <h2 data-anim="slide-left" data-anim-d="1" className="masthead-title text-[1.5rem] sm:text-[2.5rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.82] mb-4 md:mb-8">
            Exper<br/><span className="text-accent">tise</span>
          </h2>

          <div className="flex-1" />

          <div className="mb-6">
            <div className="section-label text-ink-lighter mb-1">Education</div>
            <hr className="rule-thick mb-3" />
            <p className="font-headline font-bold text-[1.2rem] leading-tight">B.A. Graphic Design</p>
            <p className="text-ink-light text-[0.88rem] mt-1">The Future University, Khartoum</p>
            <p className="dateline text-ink-lighter">2014 – 2018</p>
          </div>

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

        <div className="w-full md:w-[62%] grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto">
          <div className="md:border-r border-rule-light px-4 md:px-8 pt-4 md:pt-8 pb-6 md:pb-14 overflow-y-auto">
            <SkillColumn title="Design" items={expertise.design} />
          </div>
          <div className="px-4 md:px-8 pt-4 md:pt-8 pb-6 md:pb-14 overflow-y-auto">
            <SkillColumn title="Technical" items={expertise.technical} />
          </div>
        </div>
      </div>
    </section>
  );
}
