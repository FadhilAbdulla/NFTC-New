import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to out/, served by Cloudflare (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
