import type { ImageMetadata } from "astro";

/* Every picture in src/assets, by the path the data uses for it ("/work/<key>.webp",
   "/images/case-studies/vuedent.jpg"). Astro resizes them at build time; only the
   sizes a page asks for are written out. */
const files = import.meta.glob<{ default: ImageMetadata }>("../assets/**/*.{webp,jpg,png}", {
  eager: true,
});

export function asset(path: string): ImageMetadata {
  const file = files[`../assets${path}`];
  if (!file) throw new Error(`No image at src/assets${path}`);
  return file.default;
}

/* srcset steps up to the original width, which is always the largest. */
export const widthsFor = (w: number) =>
  [480, 960, 1440, 2000].filter((x) => x < w * 0.9).concat(w);
