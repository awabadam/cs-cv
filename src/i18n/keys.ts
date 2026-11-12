/* Which strings in the data are text to translate, shared by the site and scripts/i18n.ts. */

/* Fields that hold identifiers, links and codes, never prose. */
export const SKIP_KEYS = new Set([
  "id", "img", "kind", "hex", "source", "href", "slug", "url", "preview", "src", "number", "display",
]);

/* Prose has a letter in it; a bare domain, path or handle ("saphiredent.com") does not count. */
export const translatable = (s: string) => /\p{L}/u.test(s) && !/^[^\s]*[./@][^\s]*$/.test(s);
