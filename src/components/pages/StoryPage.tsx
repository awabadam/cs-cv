import React from "react";
import ReactiveTitle from "@/components/ReactiveTitle";

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
            <ReactiveTitle
              lines={[{ text: "Khar" }, { text: "toum" }, { text: "to", accent: true }, { text: "Istan" }, { text: "bul" }]}
              className="text-[clamp(1.2rem,4vw,5rem)] leading-[0.85] mb-6"
              isActive={isActive}
            />
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
              <span className="dateline text-ink-lighter w-12">2024</span>
              <hr className="rule-light flex-1" />
              <span className="text-ink-light text-[0.85rem]">First sites shipped solo</span>
            </div>
            <div data-anim="slide-up" data-anim-d="6" className="flex items-center gap-3">
              <span className="dateline text-ink-lighter w-12">2026</span>
              <hr className="rule-light flex-1" />
              <span className="text-ink-light text-[0.85rem]">Five products live</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col px-4 md:px-8 pt-4 md:pt-10 pb-4 overflow-y-auto">
          <div data-anim="slide-up" data-anim-d="2" className="relative w-full h-[14rem] md:h-[28rem] mb-2">
            {/* Victorian border frame */}
            <div className="absolute inset-0 border-[3px] border-double border-rule-light z-10 pointer-events-none">
              <div className="absolute inset-[5px] border border-rule-faint" />
              {/* Corner ornaments */}
              <span className="absolute -top-[2px] -left-[2px] text-rule-light text-[1.1rem] leading-none font-serif select-none">&lsaquo;</span>
              <span className="absolute -top-[2px] -right-[2px] text-rule-light text-[1.1rem] leading-none font-serif select-none">&rsaquo;</span>
              <span className="absolute -bottom-[2px] -left-[2px] text-rule-light text-[1.1rem] leading-none font-serif select-none">&lsaquo;</span>
              <span className="absolute -bottom-[2px] -right-[2px] text-rule-light text-[1.1rem] leading-none font-serif select-none">&rsaquo;</span>
            </div>
            {/* Photo */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/story/profile-photo-of-awab.jpg"
                alt="Awab Elkhalil"
                className="w-full h-full object-cover object-center brightness-[1.3] contrast-[0.95] sepia-[0.15] saturate-[0.8]"
              />
              {/* Paper grain overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='6' intercept='-2.5'/%3E%3CfeFuncG type='linear' slope='6' intercept='-2.5'/%3E%3CfeFuncB type='linear' slope='6' intercept='-2.5'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '256px 256px',
              }} />
              {/* Warm paper tint */}
              <div className="absolute inset-0 pointer-events-none bg-[#f4efe4] mix-blend-soft-light opacity-40" />
              {/* Vignette edges */}
              <div className="absolute inset-0 pointer-events-none" style={{
                boxShadow: 'inset 0 0 80px rgba(20,20,10,0.25), inset 0 0 160px rgba(20,20,10,0.1)',
              }} />
            </div>
          </div>
          <p className="dateline text-ink-lighter text-[0.6rem] mb-5 flex justify-between">
            <span>Khartoum, 2016</span>
            <span>&mdash;&mdash;&mdash;</span>
            <span>Istanbul, 2026</span>
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
                a team to carry it forward. Then I learned to build the
                software too: a platform in eight languages, a patient app, a
                portal, an AI system that listens to sales calls. The design
                eye never left.
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
