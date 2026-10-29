import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* The sources in public/work are already WebP, so AVIF would double Vercel's
       transformation count for a small saving. Images are static; cache them for 31 days. */
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
