import type { MetadataRoute } from "next";
import { pages, site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.shortName,
    description: pages["/"].description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#071a2f",
    icons: [
      { src: "/icon.png", type: "image/png", sizes: "192x192" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
