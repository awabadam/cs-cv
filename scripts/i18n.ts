/*
 * Lists the site text that the Arabic and Turkish dictionaries (src/i18n/<locale>.json) don't
 * cover yet, and the entries they hold that the site no longer uses.
 *
 *   node scripts/i18n.ts            report per locale
 *   node scripts/i18n.ts --json     print every source string as a JSON array
 *
 * Dictionaries map the English text, exactly as it appears in the data, to its translation.
 * Text with no entry stays in English, so regenerating work.json never breaks a page; run this
 * afterwards to see what needs translating. Page chrome (nav, headings, labels) lives in
 * src/i18n/ui.ts instead.
 */

import fs from "node:fs";
import { experience, expertise, caseStudies } from "../src/data/content.ts";
import { studies } from "../src/data/studies.ts";
import { SKIP_KEYS, translatable } from "../src/i18n/keys.ts";

const work = JSON.parse(fs.readFileSync("src/data/work.json", "utf8"));

/* Text written in src/data/work.ts itself rather than in the data. */
const EXTRA = ['<a href="https://vuedent.com">vuedent.com</a> — the product homepage'];

const found = new Set<string>();
const walk = (v: unknown, key = ""): void => {
  if (typeof v === "string") {
    if (!SKIP_KEYS.has(key) && translatable(v)) found.add(v);
  } else if (Array.isArray(v)) v.forEach((x) => walk(x, key));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, k);
};

walk(work.projects);
walk(Object.values(studies));
walk(experience);
walk(expertise);
walk(caseStudies.map((c) => c.description));
EXTRA.forEach((s) => found.add(s));

const all = [...found];

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(all, null, 2));
} else {
  for (const locale of ["ar", "tr"]) {
    const file = `src/i18n/${locale}.json`;
    const dict: Record<string, string> = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
    const missing = all.filter((s) => !(s in dict));
    const unused = Object.keys(dict).filter((s) => !found.has(s));
    console.log(`${locale}: ${all.length - missing.length}/${all.length} translated, ${unused.length} unused`);
    for (const s of missing) console.log(`  missing: ${s.slice(0, 100)}`);
    for (const s of unused) console.log(`  unused:  ${s.slice(0, 100)}`);
  }
}
