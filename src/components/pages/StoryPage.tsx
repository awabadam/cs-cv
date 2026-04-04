import React from "react";

interface StoryPageProps {
  isActive: boolean;
  style: React.CSSProperties;
}

export default function StoryPage({ isActive, style }: StoryPageProps) {
  return (
    <section className="paper-page" data-active={isActive} style={style}>
      <div className="flex flex-col md:flex-row h-auto md:h-full">
        <div className="flex-none md:flex-1 flex flex-col justify-between px-4 md:px-8 py-4 md:pt-10 md:pb-4 md:border-r border-rule-light md:max-h-none">
          <div>
            <div data-anim="fade" data-anim-d="1" className="section-label text-ink-lighter mb-1">The Journey</div>
            <hr className="rule-thick mb-6" />
            <h2 data-anim="slide-left" data-anim-d="1" className="masthead-title text-[clamp(1.2rem,4vw,5rem)] leading-[0.85] mb-6">
              Khar<br/>toum<br/>
              <span className="text-accent">to</span><br/>
              Istan<br/>bul
            </h2>
          </div>
          <div className="space-y-3 mb-4">
            <div data-anim="slide-up" data-anim-d="2" className="flex items-center gap-3">
              <span className="dateline text-ink-lighter w-12">2016</span>
              <hr className="rule-light flex-1" />
              <span className="text-ink-light text-[0.85rem]">First design role</span>
            </div>
            <div data-anim="slide-up" data-anim-d="3" className="flex items-center gap-3">
              <span className="dateline text-ink-lighter w-12">2019</span>
              <hr className="rule-light flex-1" />
              <span className="text-ink-light text-[0.85rem]">Co-founded Sequence</span>
            </div>
            <div data-anim="slide-up" data-anim-d="4" className="flex items-center gap-3">
              <span className="dateline text-accent w-12 font-bold">2020</span>
              <hr className="rule-thick flex-1" />
              <span className="text-ink font-bold text-[0.85rem]">Moved to Istanbul</span>
            </div>
            <div data-anim="slide-up" data-anim-d="5" className="flex items-center gap-3">
              <span className="dateline text-ink-lighter w-12">2025</span>
              <hr className="rule-light flex-1" />
              <span className="text-ink-light text-[0.85rem]">Shifted to web dev</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col px-4 md:px-8 pt-4 md:pt-10 pb-4 overflow-y-auto">
          <div data-anim="slide-up" data-anim-d="2" className="img-placeholder w-full h-[14rem] md:h-[28rem] mb-2">
            collage: sudan work &rarr; istanbul work
          </div>
          <p className="dateline text-ink-lighter text-[0.6rem] mb-5 flex justify-between">
            <span>Khartoum, 2016</span>
            <span>&mdash;&mdash;&mdash;</span>
            <span>Istanbul, 2025</span>
          </p>
          <div data-anim="slide-up" data-anim-d="3" className="grid grid-cols-1 md:grid-cols-2 gap-x-6 flex-1">
            <div className="md:border-r border-rule-light md:pr-6">
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
          <div data-anim="fade" data-anim-d="4" className="mt-auto pt-5">
            <hr className="rule-thick mb-4" />
            <p className="font-headline text-[1.1rem] md:text-[1.4rem] italic text-center leading-[1.35] text-ink-light mb-4">
              &ldquo;I don&rsquo;t stop when it&rsquo;s done. I stop when it&rsquo;s right.&rdquo;
            </p>
            <hr className="rule-thick" />
          </div>
        </div>
      </div>
    </section>
  );
}
