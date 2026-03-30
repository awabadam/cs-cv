import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="section-label text-ink-lighter mb-2 tracking-[0.3em]">
          Error
        </p>
        <hr className="rule-thick mb-6" />

        <h1
          className="masthead-title text-[6rem] md:text-[8rem] leading-[0.85] mb-4"
          style={{ opacity: 1, transform: "none" }}
        >
          404
        </h1>

        <p className="font-headline text-[1.3rem] font-bold mb-4">
          This page has gone to print.
        </p>

        <p className="text-ink-light leading-[1.7] mb-8 text-[0.9rem]">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has been
          moved to a different edition.
        </p>

        <hr className="rule-ornament mb-6" />

        <Link
          href="/"
          className="section-label text-[0.7rem] tracking-[0.2em] hover:text-accent transition-colors"
        >
          &larr; Back to the cover
        </Link>
      </div>
    </div>
  );
}
