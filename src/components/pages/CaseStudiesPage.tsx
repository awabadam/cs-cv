"use client";

import React from "react";
import Link from "next/link";
import { caseStudies } from "@/data/content";
import ReactiveTitle from "@/components/ReactiveTitle";

interface CaseStudiesPageProps {
  isActive: boolean;
  style: React.CSSProperties;
}

export default function CaseStudiesPage({ isActive, style }: CaseStudiesPageProps) {
  return (
    <section className="paper-page" data-active={isActive} style={style}>
      <div className="flex flex-col md:flex-row h-auto md:h-full">
        <div className="w-full md:w-[30%] flex-none md:flex-col flex flex-col justify-between md:border-r border-rule-light px-4 md:px-8 py-4 md:pt-8 md:pb-14 md:max-h-none">
          <div>
            <div data-anim="fade" data-anim-d="1" className="section-label text-ink-lighter mb-1">Selected</div>
            <ReactiveTitle
              lines={[{ text: "Case" }, { text: "Stud", accent: true }, { text: "ies" }]}
              className="text-[1.5rem] sm:text-[2.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.82] mb-6"
            />
          </div>
          <div>
            <hr className="rule-thick mb-3" />
            <p data-anim="slide-up" data-anim-d="2" className="justify-editorial text-ink-light leading-[1.7] text-[0.9rem]">
              A collection of projects that demonstrate process, thinking,
              and craft. Each traces a problem from brief to resolution.
            </p>
          </div>
        </div>

        <div className="w-full md:w-[70%] bento-grid">
          {caseStudies.map((study, i) => {
            const isLarge = i === 0 || i === 3;
            const borders = [
              "border-r border-rule-light border-b border-rule-light",
              "border-b border-rule-light",
              "border-r border-rule-light",
              "",
            ][i];

            return (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                data-anim="scale-in"
                data-anim-d={String(i < 2 ? i + 2 : i + 1)}
                className={`border-none group relative overflow-hidden ${borders} transition-all duration-500`}
                style={{ perspective: "800px" }}
                onMouseMove={(e) => {
                  if (!window.matchMedia("(pointer: fine)").matches) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
                  e.currentTarget.style.boxShadow = `${-x * 8}px ${y * 8}px 24px rgba(20,20,10,0.1), inset 0 0 40px rgba(74,74,74,0.04)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <span
                  className={`absolute font-headline font-bold leading-none text-paper-edge transition-all duration-500 group-hover:text-rule-light group-hover:scale-110 bento-float-${i + 1} bento-num`}
                  style={{
                    fontSize: isLarge ? "12rem" : "8rem",
                    right: i % 2 === 0 ? "-0.5rem" : "auto",
                    left: i % 2 === 1 ? "-0.5rem" : "auto",
                    bottom: "-1.5rem",
                  }}
                >
                  {study.number}
                </span>

                <div className={`relative z-10 flex flex-col h-full ${isLarge ? "px-4 md:px-8 pt-5 md:pt-7 pb-6 md:pb-8" : "px-3 md:px-6 pt-4 md:pt-6 pb-5 md:pb-7"}`}>
                  <div className="flex items-center gap-2 mb-auto">
                    <span className="section-label text-accent text-[0.5rem] tracking-[0.3em]">
                      {study.category}
                    </span>
                    <hr className="rule-light flex-1" />
                    <span className="dateline text-ink-lighter text-[0.6rem]">
                      {study.year}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className={`font-headline font-bold leading-[1.1] mb-2 group-hover:text-accent transition-colors ${isLarge ? "text-[1.5rem]" : "text-[1.1rem]"}`}>
                      {study.headline}
                    </h3>
                    <p className="dateline text-ink-lighter text-[0.6rem] mb-2">
                      {study.subtitle}
                    </p>
                    {isLarge && (
                      <p className="text-ink-light leading-[1.55] text-[0.78rem] mb-3">
                        {study.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="section-label text-ink-lighter text-[0.5rem] group-hover:text-accent transition-colors tracking-[0.2em]">
                        Read study
                      </span>
                      <span className="text-ink-lighter group-hover:text-accent group-hover:translate-x-1 transition-all text-[0.7rem]">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
