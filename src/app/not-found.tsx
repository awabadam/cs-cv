import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap min-h-[80vh] flex flex-col justify-center">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="mt-2 text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight tracking-[-0.02em]">
        Nothing here.
      </h1>
      <p className="mt-4 text-muted">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <Link href="/#work" className="mt-8 w-fit underline underline-offset-3">
        &larr; See the work
      </Link>
    </main>
  );
}
