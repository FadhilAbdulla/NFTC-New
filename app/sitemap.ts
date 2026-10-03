import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { images, type ImageName } from "@/lib/images.generated";
import { getAllPosts } from "@/lib/news";
import { absoluteUrl, pages, site, type PagePath } from "@/lib/site";

export const dynamic = "force-static";

// lastModified comes from the last git commit that touched each page, so it only changes when content does.
// Uncommitted files (or builds without git history) fall back to the file's modification time.
function lastModified(file: string): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { encoding: "utf8" }).trim();
    if (iso) return new Date(iso);
  } catch {}
  return fs.existsSync(file) ? fs.statSync(file).mtime : undefined;
}

const routeFile = (path: PagePath) => (path === "/" ? "app/page.tsx" : `app${path}/page.tsx`);

// Image sitemap: every optimised image a page references by name (via <Picture name="…"> or a data array).
function pageImages(file: string): string[] {
  const source = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  return (Object.keys(images) as ImageName[])
    .filter((name) => source.includes(`"${name}"`))
    .map((name) => absoluteUrl(`/images/${name}-${images[name].widths[images[name].widths.length - 1]}.webp`));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const paths = (Object.keys(pages) as PagePath[]).filter((path) => path !== "/news" || posts.length > 0);
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path), lastModified: lastModified(routeFile(path)), priority: pages[path].priority, images: pageImages(routeFile(path)) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/news/${post.slug}`), lastModified: new Date(post.updated ?? post.date), priority: 0.6, images: post.image ? [absoluteUrl(post.image)] : undefined })),
    { url: absoluteUrl(site.bylawsPdf), lastModified: lastModified(`public${site.bylawsPdf}`), priority: 0.5 },
  ];
}
