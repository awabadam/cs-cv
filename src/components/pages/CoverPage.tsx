import React, { lazy, Suspense } from "react";
import ReactiveTitle from "@/components/ReactiveTitle";

const ObjectRiver = lazy(() => import("@/components/ObjectRiver"));

interface CoverPageProps {
  isActive: boolean;
  style: React.CSSProperties;
  today: string;
}

export default function CoverPage({ isActive, style, today }: CoverPageProps) {
  return (
    <section className="paper-page" data-active={isActive} style={style}>
      <div className="cover-split">
        <div className="cover-left">
          <div className="flex justify-between items-center text-ink-lighter dateline mb-3 hover:text-ink transition-colors duration-500">
            <span>Vol. IX, No. 1</span>
            <span>{today}</span>
          </div>
          <hr className="rule-thin mb-[3px]" />
          <hr className="rule-thick mb-4" />

          <ReactiveTitle
            lines={[{ text: "Awab" }, { text: "Elkhalil" }]}
            className="text-[1.8rem] sm:text-[3rem] md:text-[6rem] lg:text-[8.5rem] mb-2"
          />

          <div data-anim="slide-up" data-anim-d="2" className="byline my-3">
            Digital Artisan &mdash; Istanbul, T&uuml;rkiye
          </div>

          <h2 data-anim="slide-up" data-anim-d="3" className="font-quote text-[1.15rem] leading-[1.45] font-normal mb-5 text-ink-light italic">
            One designer. Two brands.<br />
            Five&nbsp;years. Every&nbsp;pixel.
          </h2>

          <p data-anim="slide-up" data-anim-d="4" className="justify-editorial text-ink-light leading-[1.7] mb-4 text-[0.9rem]">
            I am a digital artisan. I hack, I play, I mold projects until
            they hit their targets&thinsp;&mdash;&thinsp;or until the work
            speaks for itself. A decade of graphic design,
            five&nbsp;years building two brands from the ground up, and a
            growing practice in web development have taught me that the best
            work lives at the intersection of craft and obsession.
          </p>

          <p data-anim="fade" data-anim-d="5" className="pull-quote mb-4">
            Every project is a system waiting to be understood,<br />
            then shaped until it works on its own terms.&ensp;&rdquo;
          </p>

          <hr data-anim="fade" data-anim-d="6" className="rule-ornament mb-4" />

          <div data-anim="fade" data-anim-d="6" className="flex justify-between text-ink-lighter dateline text-[0.72rem]">
            <span>Arabic &bull; English &bull; Turkish</span>
            <span>Istanbul Edition</span>
          </div>
        </div>

        <div className="cover-right">
          <Suspense fallback={
            <div className="img-placeholder w-full h-full">loading scene</div>
          }>
            <ObjectRiver />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
