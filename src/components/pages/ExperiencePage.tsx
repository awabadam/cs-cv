import React from "react";
import { experience } from "@/data/content";

interface ExperiencePageProps {
  isActive: boolean;
  style: React.CSSProperties;
}

function JobEntry({ job, index, isLast }: { job: typeof experience[0]; index: number; isLast: boolean }) {
  return (
    <div data-anim="slide-up" data-anim-d={String(index + 2)} className="mb-5 group relative pl-4">
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
      <div className="flex justify-between items-baseline gap-x-3 mb-[2px]">
        <h3 className="font-headline text-[1rem] font-bold leading-tight tracking-[-0.005em] group-hover:text-accent transition-colors duration-300">
          {job.role}
        </h3>
        <span className="dateline text-ink-lighter whitespace-nowrap">
          {job.period}
        </span>
      </div>
      <p className="text-ink-lighter font-serif text-[0.8rem] mb-2 tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
        {job.company}&ensp;&middot;&ensp;{job.location}
      </p>
      <p className="justify-editorial text-ink-light leading-[1.6] text-[0.9rem]">
        {job.description}
      </p>
      {!isLast && <hr className="rule-light mt-4" />}
    </div>
  );
}

export default function ExperiencePage({ isActive, style }: ExperiencePageProps) {
  return (
    <section className="paper-page" data-active={isActive} style={style}>
      <div className="flex flex-col md:flex-row h-auto md:h-full">
        <div className="flex-none md:flex-1 flex flex-col justify-center items-center px-4 md:px-8 py-4 md:py-0 md:border-r border-rule-light md:max-h-none">
          <h2 data-anim="slide-left" data-anim-d="1" className="masthead-title text-[1.5rem] sm:text-[2.5rem] md:text-[7rem] lg:text-[9rem] text-center leading-[0.82] tracking-[0.05em]">
            Pro<br className="hidden md:block"/>fess<br className="hidden md:block"/>ional<br/><span className="text-accent">Expe<br className="hidden md:block"/>rience</span>
          </h2>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 overflow-y-auto px-4 md:px-6 pt-4 md:pt-6 pb-4" style={{ height: '100%' }}>
          <div className="md:border-r border-rule-light md:pr-8">
            {experience.slice(0, 3).map((job, i) => (
              <JobEntry key={i} job={job} index={i} isLast={i === 2} />
            ))}
          </div>
          <div>
            {experience.slice(3).map((job, i) => (
              <JobEntry key={i} job={job} index={i} isLast={i === experience.slice(3).length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
