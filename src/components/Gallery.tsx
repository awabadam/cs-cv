"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Clip from "@/components/Clip";
import { images, plain, type Cell, type Img, type Section } from "@/data/work";

const ratio = (i: Img) => images[i.img].w / images[i.img].h;
/* A stack of images in one column reads at the row's height when its ratio is 1 / Σ(1/ratio). */
const cellRatio = (c: Cell) =>
  "stack" in c ? 1 / c.stack.reduce((sum, i) => sum + 1 / ratio(i), 0) : ratio(c);

/**
 * The cover, then `children` (the project text), then every section's image rows.
 * Any image opens a full-screen view that steps through the whole project; motion pieces
 * loop silently in place and play with controls in the viewer.
 */
export default function Gallery({
  cover,
  sections,
  children,
}: {
  cover: Img | null;
  sections: Section[];
  children?: ReactNode;
}) {
  const flat: Img[] = [];
  if (cover) flat.push(cover);
  for (const s of sections)
    for (const r of s.rows) for (const c of r) flat.push(...("stack" in c ? c.stack : [c]));

  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (n: number) =>
    setOpen((o) => (o === null ? o : (o + n + flat.length) % flat.length));

  const figure = (i: Img, sizes: string, cls = "", eager = false) => {
    const m = images[i.img];
    return (
      <figure key={i.img} className={cls}>
        <button
          type="button"
          className="zoom"
          onClick={() => setOpen(flat.indexOf(i))}
          aria-label={i.cap ? `Enlarge: ${plain(i.cap)}` : "Enlarge image"}
        >
          {m.video ? (
            <Clip src={m.video} poster={m.src} w={m.w} h={m.h} />
          ) : (
            <Image
              src={m.src}
              alt=""
              width={m.w}
              height={m.h}
              sizes={sizes}
              loading={eager ? "eager" : "lazy"}
            />
          )}
        </button>
        {i.cap && <figcaption className="cap" dangerouslySetInnerHTML={{ __html: i.cap }} />}
      </figure>
    );
  };

  const current = open === null ? null : flat[open];

  return (
    <>
      {cover && (
        <div className="cover">
          {figure(cover, "(max-width: 1680px) 100vw, 1600px", "", true)}
        </div>
      )}

      {children}

      {sections.map((s) => (
        <section key={s.title} className="mt-16">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-3 mb-5">
            <h2 className="text-lg font-medium">{s.title}</h2>
            {s.note && (
              <p
                className="prose text-sm text-muted max-w-[80ch]"
                dangerouslySetInnerHTML={{ __html: s.note }}
              />
            )}
          </div>
          <div className="rows">
            {s.rows.map((r, ri) => {
              const total = r.reduce((sum, c) => sum + cellRatio(c), 0);
              return (
                <div className="row" key={ri}>
                  {r.map((c, ci) => {
                    const share = cellRatio(c) / total;
                    const sizes = `(max-width: 640px) 100vw, ${Math.ceil(share * 100)}vw`;
                    return (
                      <div
                        key={ci}
                        className="cell"
                        style={{ "--ar": cellRatio(c) } as React.CSSProperties}
                      >
                        {"stack" in c ? (
                          <div className="stack">{c.stack.map((i) => figure(i, sizes))}</div>
                        ) : (
                          figure(c, sizes)
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Image viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t === e.currentTarget || t.tagName === "FIGURE") setOpen(null);
        }}
        onKeyDown={(e) => {
          if ((e.target as HTMLElement).tagName === "VIDEO") return; // arrows seek the clip
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        {current && (
          <figure>
            {images[current.img].video ? (
              <video
                key={current.img}
                src={images[current.img].video}
                poster={images[current.img].src}
                width={images[current.img].w}
                height={images[current.img].h}
                aria-label={plain(current.cap)}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                key={current.img}
                src={images[current.img].src}
                alt={plain(current.cap)}
                width={images[current.img].w}
                height={images[current.img].h}
                sizes="94vw"
              />
            )}
            <figcaption>
              <span className="font-mono mr-2">
                {open! + 1} / {flat.length}
              </span>
              <span dangerouslySetInnerHTML={{ __html: current.cap }} />
            </figcaption>
          </figure>
        )}
        <button type="button" className="lb-btn top-3 right-3" onClick={() => setOpen(null)} aria-label="Close">
          ✕
        </button>
        {flat.length > 1 && (
          <>
            <button
              type="button"
              className="lb-btn left-2 top-1/2 -translate-y-1/2"
              onClick={() => step(-1)}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              className="lb-btn right-2 top-1/2 -translate-y-1/2"
              onClick={() => step(1)}
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
