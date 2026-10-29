import Image from "next/image";
import Link from "next/link";
import CaseStudyDiagram from "@/components/CaseStudyDiagrams";
import Clip from "@/components/Clip";
import { images, plain, type Project } from "@/data/work";

/* One project in the index: its image first (a motion cover loops), then number, name and year. */
export default function ProjectCard({
  project: p,
  sizes,
  eager = false,
}: {
  project: Project;
  sizes: string;
  eager?: boolean;
}) {
  const key = p.thumb ?? p.cover?.img;
  const img = key ? images[key] : null;
  const alt = !p.thumb && p.cover ? plain(p.cover.cap) : "";

  return (
    <Link href={`/work/${p.id}`} className="card block">
      <div className="card-img">
        {img?.video ? (
          <Clip src={img.video} poster={img.src} w={img.w} h={img.h} label={alt} />
        ) : img ? (
          <Image
            src={img.src}
            alt={alt}
            width={img.w}
            height={img.h}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
          />
        ) : (
          <div className="diagram h-full grid place-items-center p-[6%]">
            <CaseStudyDiagram slug={p.id} />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-3 text-[15px] leading-snug">
        <span className="font-mono text-xs text-muted">{p.num}</span>
        <span className="flex-1 min-w-0">
          <span className="font-medium">{p.client}</span>{" "}
          <span className="text-muted">{p.title}</span>
        </span>
        {p.year && <span className="text-sm text-muted whitespace-nowrap">{p.year}</span>}
      </div>
    </Link>
  );
}
