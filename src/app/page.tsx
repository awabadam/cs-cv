import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import ThemeSwitch from "@/components/ThemeSwitch";
import WorkGrid from "@/components/WorkGrid";
import { experience, expertise, socialLinks } from "@/data/content";

const EMAIL = "awabe.adam@gmail.com";
const PHONE = "+90 554 175 9945";

const nav = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

function SectionHead({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="border-t border-line pt-4 mb-8 text-lg font-medium scroll-mt-6">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      {/* On a phone the switch sits beside the name and the section links take the next line. */}
      <header className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 text-sm">
        <Link href="/" className="font-medium">
          Awab Elkhalil
        </Link>
        <ThemeSwitch className="sm:order-last" />
        <nav aria-label="Sections" className="flex w-full gap-5 text-muted sm:ml-auto sm:w-auto">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-fg">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="wrap pt-4 pb-10 sm:pt-6 sm:pb-14 grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <h1 className="text-[clamp(2.1rem,4.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            I design it, then I build it.{" "}
            <span className="text-muted">Brand, interface, code&nbsp;&mdash; end to end.</span>
          </h1>
          <div className="max-w-[60ch] text-[15px] sm:text-[17px] leading-relaxed">
            <p>
              Designer and developer in Istanbul. A decade of graphic design, five years building two
              brands from the ground up, and a practice that now runs the whole distance&nbsp;&mdash;
              brand, interface, code, and the server it ships to. Mostly multilingual, mostly Arabic
              first.
            </p>
            <p className="mt-4 text-sm">
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-3">
                {EMAIL}
              </a>
              <span className="text-muted"> &middot; </span>
              <a
                href="https://www.linkedin.com/in/awab-adam"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-3"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </section>

        <section id="work" className="wrap scroll-mt-6" aria-label="Work">
          <WorkGrid />
        </section>

        <section className="wrap mt-28" aria-labelledby="about">
          <SectionHead id="about">About</SectionHead>
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Image
              src="/images/story/profile-photo-of-awab.jpg"
              alt="Awab Elkhalil"
              width={1600}
              height={1066}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto bg-panel"
            />
            <div className="max-w-[60ch] space-y-4 text-[17px] leading-relaxed">
              <p>
                I am a digital artisan. I hack, I play, I mold projects until they hit their
                targets&nbsp;&mdash; or until the work speaks for itself.
              </p>
              <p>
                It started in Khartoum&nbsp;&mdash; designing logos and event materials at icare-net,
                where I first touched web design and felt the pull of the screen. From there: leading
                teams, building brands, co-founding a production studio with friends on the side. In
                2020, everything changed.
              </p>
              <p>
                New city. New language. New market. I joined a dental company with two brands and no
                designer. Over five years I built everything&nbsp;&mdash; the logos, the identity
                systems, the social media, the websites&nbsp;&mdash; and a team to carry it forward.
                Then I learned to build the software too: a platform in eight languages, a patient app,
                a portal, an AI system that listens to sales calls. The design eye never left.
              </p>
            </div>
          </div>
        </section>

        <section className="wrap mt-28" aria-labelledby="experience">
          <SectionHead id="experience">Experience</SectionHead>
          <ol>
            {experience.map((e) => (
              <li
                key={`${e.company}-${e.period}`}
                className="grid gap-x-8 gap-y-1 border-b border-line py-5 first:pt-0 md:grid-cols-[150px_minmax(0,1fr)_minmax(0,1.3fr)]"
              >
                <p className="font-mono text-xs text-muted pt-1">{e.period}</p>
                <div>
                  <p className="font-medium">{e.role}</p>
                  <p className="text-sm text-muted">
                    {e.company} &middot; {e.location}
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed max-w-[70ch]">{e.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap mt-28" aria-labelledby="skills">
          <SectionHead id="skills">Skills</SectionHead>
          <div className="grid gap-8 sm:grid-cols-2">
            {(
              [
                ["Design", expertise.design],
                ["Technical", expertise.technical],
              ] as const
            ).map(([label, list]) => (
              <div key={label}>
                <p className="text-sm text-muted mb-3">{label}</p>
                <ul className="space-y-1.5 text-[15px]">
                  {list.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap mt-28" aria-labelledby="contact">
          <SectionHead id="contact">Contact</SectionHead>
          <a
            href={`mailto:${EMAIL}`}
            className="block w-fit text-[clamp(1.6rem,4vw,3.25rem)] font-semibold tracking-[-0.02em] leading-tight underline decoration-line underline-offset-[0.15em] hover:decoration-fg break-all sm:break-normal"
          >
            {EMAIL}
          </a>
          <dl className="mt-8 grid grid-cols-[112px_minmax(0,1fr)] gap-x-4 gap-y-2 text-[15px] max-w-xl">
            <dt className="text-muted">Phone</dt>
            <dd className="select-all">{PHONE}</dd>
            <dt className="text-muted">Based in</dt>
            <dd>Istanbul, Türkiye</dd>
            <dt className="text-muted">LinkedIn</dt>
            <dd>
              <a href="https://www.linkedin.com/in/awab-adam" target="_blank" rel="noopener noreferrer" className="hover:underline">
                in/awab-adam
              </a>
            </dd>
            <dt className="text-muted">Studio site</dt>
            <dd>
              <a href="https://awab.design" target="_blank" rel="noopener noreferrer" className="hover:underline">
                awab.design
              </a>
            </dd>
            {socialLinks.map((s) => (
              <div key={s.label} className="contents">
                <dt className="text-muted">{s.label}</dt>
                <dd>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {s.display}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
