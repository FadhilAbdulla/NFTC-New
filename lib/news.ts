import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// News posts are Markdown/MDX files in content/news/. See content/news/README.md for the format.
const NEWS_DIR = path.join(process.cwd(), "content", "news");

export type NewsPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  author: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  body: string;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readPost(file: string): NewsPost | null {
  const slug = file.replace(/\.mdx?$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(NEWS_DIR, file), "utf8"));
  if (data.draft) return null;
  const missing = ["title", "description", "date"].filter((key) => !data[key]);
  if (missing.length) throw new Error(`content/news/${file} is missing frontmatter: ${missing.join(", ")}`);
  if (!SLUG.test(slug)) throw new Error(`content/news/${file}: file name must be lowercase-words-with-hyphens`);
  const toDate = (value: unknown) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value));
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: toDate(data.date),
    updated: data.updated ? toDate(data.updated) : undefined,
    author: data.author ? String(data.author) : "NFTCI",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    body: content,
  };
}

export function getAllPosts(): NewsPost[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((file) => /\.mdx?$/.test(file) && !file.startsWith("_") && file !== "README.md")
    .map(readPost)
    .filter((post): post is NewsPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): NewsPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export const hasNews = () => getAllPosts().length > 0;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
