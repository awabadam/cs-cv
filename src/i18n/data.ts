/*
 * Translates the site data. ar.json and tr.json map each English string, exactly as it appears
 * in the data, to its translation; text with no entry stays English. `node scripts/i18n.ts`
 * lists what is missing after the data changes.
 */

import ar from "./ar.json";
import tr from "./tr.json";
import { SKIP_KEYS } from "./keys";
import type { Locale } from "./ui";

const dictionaries: Record<Locale, Record<string, string>> = { en: {}, ar, tr };

/* One string. */
export const t = (s: string, l: Locale) => dictionaries[l][s] ?? s;

/* A copy of `value` with every piece of text in it translated. Identifiers (ids, image keys,
   URLs, colour codes) sit under the keys in SKIP_KEYS and are left alone. */
export function localize<T>(value: T, l: Locale): T {
  if (l === "en") return value;
  const walk = (v: unknown, key: string): unknown => {
    if (typeof v === "string") return SKIP_KEYS.has(key) ? v : t(v, l);
    if (Array.isArray(v)) return v.map((x) => walk(x, key));
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]));
    return v;
  };
  return walk(value, "") as T;
}
