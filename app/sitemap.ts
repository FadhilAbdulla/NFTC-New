import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { getAllPosts } from "@/lib/news";
import { absoluteUrl, pages, type PagePath } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const paths = (Object.keys(pages) as PagePath[]).filter((path) => path !== "/news" || posts.length > 0);
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path), lastModified: lastModified(routeFile(path)), priority: pages[path].priority })),
    ...posts.map((post) => ({ url: absoluteUrl(`/news/${post.slug}`), lastModified: new Date(post.updated ?? post.date), priority: 0.6 })),
  ];
}
