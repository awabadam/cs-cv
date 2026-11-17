/* Pages change in place (Astro's ClientRouter, in Base.astro), so a component's script runs only
   once, on whichever page the visit starts. eachPage runs its setup there and again on every page
   swapped in after it. Listeners on window or document take the signal, so they go with the page
   they were for; the page's own elements take theirs with them. */
export const eachPage = (setup: (signal: AbortSignal) => void) => {
  let page: AbortController | undefined;
  const run = () => {
    page?.abort();
    page = new AbortController();
    setup(page.signal);
  };
  document.addEventListener("astro:after-swap", run);
  run();
};
