import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Self-hosted on Dokploy: the Dockerfile runs the minimal server from .next/standalone. */
  output: "standalone",
  images: {
    /* The sources in public/work are already WebP, so AVIF would double the
       transformation work for a small saving. Images are static; cache them for 31 days. */
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      /* The case studies now sit under the work they describe. */
      { source: "/case-studies/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
