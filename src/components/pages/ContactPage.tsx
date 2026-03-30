import React from "react";
import { socialLinks } from "@/data/content";

interface ContactPageProps {
  isActive: boolean;
  style: React.CSSProperties;
}

export default function ContactPage({ isActive, style }: ContactPageProps) {
  return (
    <section className="paper-page" data-active={isActive} style={style}>
      <div className="flex flex-col md:flex-row h-auto md:h-full">
        <div className="flex-none md:flex-1 flex flex-col justify-between px-4 md:px-8 py-4 md:pt-10 md:pb-14 md:border-r border-rule-light md:max-h-none">
          <div>
            <div className="section-label text-ink-lighter mb-1">Enquiries</div>
            <hr className="rule-thick mb-6" />
            <h2 data-anim="slide-left" data-anim-d="1" className="masthead-title text-[1.5rem] sm:text-[2.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.82] mb-6">
              Let&apos;s<br/><span className="text-accent">Build</span><br/>Some<br/>thing
            </h2>
          </div>
          <div>
            <p className="justify-editorial text-ink-light leading-[1.7] text-[0.9rem] mb-4">
              Open to commissions, collaborations, and full-time
              opportunities. If you need someone who obsesses over the
              details until the work is right&thinsp;&mdash;&thinsp;let&rsquo;s talk.
            </p>
            <hr className="rule-ornament" />
          </div>
        </div>

        <div className="flex-1 flex flex-col px-4 md:px-8 pt-4 md:pt-10 pb-14 overflow-y-auto">
          <div className="section-label text-accent mb-1 tracking-[0.3em]">Contact</div>
          <hr className="rule-thick mb-5" />

          <dl className="space-y-4 font-serif text-[0.95rem] mb-8">
            <div data-anim="slide-up" data-anim-d="2">
              <dt className="dateline text-ink-lighter text-[0.68rem]">Email</dt>
              <dd>
                <a href="mailto:awabe.adam@gmail.com" className="text-[1.05rem]">
                  awabe.adam@gmail.com
                </a>
              </dd>
            </div>
            <div data-anim="slide-up" data-anim-d="3">
              <dt className="dateline text-ink-lighter text-[0.68rem]">Telephone</dt>
              <dd className="text-[1.05rem]">+90 554 175 9945</dd>
            </div>
            <div data-anim="slide-up" data-anim-d="4">
              <dt className="dateline text-ink-lighter text-[0.68rem]">LinkedIn</dt>
              <dd>
                <a href="https://www.linkedin.com/in/awab-adam" target="_blank" rel="noopener noreferrer" className="text-[1.05rem]">
                  linkedin.com/in/awab-adam
                </a>
              </dd>
            </div>
            <div data-anim="slide-up" data-anim-d="5">
              <dt className="dateline text-ink-lighter text-[0.68rem]">Portfolio</dt>
              <dd>
                <a href="https://awab.design" target="_blank" rel="noopener noreferrer" className="text-[1.05rem]">
                  awab.design
                </a>
              </dd>
            </div>
          </dl>

          <div className="section-label text-accent mb-1 tracking-[0.3em]">Elsewhere</div>
          <hr className="rule-thick mb-5" />

          {socialLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-anim="slide-up"
              style={{ transitionDelay: `${0.4 + i * 0.08}s` }}
              className="group flex items-start gap-3 py-3 border-b border-rule-faint border-none"
            >
              <span className="font-headline text-[1.2rem] md:text-[1.8rem] font-bold leading-none text-paper-edge group-hover:text-accent group-hover:-translate-y-0.5 group-hover:scale-105 transition-all duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-0.5 group-hover:translate-x-1 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <p className="font-headline font-bold text-[0.95rem] leading-tight group-hover:text-accent transition-colors">
                  {link.label}
                </p>
                <p className="dateline text-ink-lighter text-[0.6rem]">
                  {link.display}
                </p>
              </div>
            </a>
          ))}

          <div data-anim="fade" data-anim-d="6" className="mt-auto pt-6">
            <hr className="rule-thick mb-[3px]" />
            <hr className="rule-thin mb-3" />
            <p className="text-ink-lighter text-[0.7rem] leading-[1.6] justify-editorial mb-2">
              This document was typeset in Playfair Display and
              Cormorant&nbsp;Garamond. Designed and developed by Awab
              Elkhalil using Next.js and Tailwind&nbsp;CSS. Set in
              Istanbul, T&uuml;rkiye.
            </p>
            <div className="flex justify-between items-center text-ink-lighter dateline text-[0.7rem]">
              <span>&copy; {new Date().getFullYear()} Awab Elkhalil</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
