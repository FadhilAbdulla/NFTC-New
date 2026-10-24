import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const TRAVEL_DIR = path.join(process.cwd(), "content", "travel");

export type TravelGuide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  theme: string;
  region: string;
  duration: string;
  pace: string;
  bestFor: string;
  destinations: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  body: string;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readGuide(file: string): TravelGuide | null {
  const slug = file.replace(/\.mdx?$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(TRAVEL_DIR, file), "utf8"));
  if (data.draft) return null;
  const required = ["title", "description", "date", "theme", "region", "duration", "pace", "bestFor", "image", "imageAlt"];
  const missing = required.filter((key) => !data[key]);
  if (missing.length) throw new Error(`content/travel/${file} is missing frontmatter: ${missing.join(", ")}`);
  if (!SLUG.test(slug)) throw new Error(`content/travel/${file}: file name must be lowercase-words-with-hyphens`);
  const toDate = (value: unknown) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value));
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: toDate(data.date),
    updated: data.updated ? toDate(data.updated) : undefined,
    author: data.author ? String(data.author) : "NFTCI Travel Desk",
    theme: String(data.theme),
    region: String(data.region),
    duration: String(data.duration),
    pace: String(data.pace),
    bestFor: String(data.bestFor),
    destinations: Array.isArray(data.destinations) ? data.destinations.map(String) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: String(data.image),
    imageAlt: String(data.imageAlt),
    featured: Boolean(data.featured),
    body: content,
  };
}

export function getAllTravelGuides(): TravelGuide[] {
  if (!fs.existsSync(TRAVEL_DIR)) return [];
  return fs
    .readdirSync(TRAVEL_DIR)
    .filter((file) => /\.mdx?$/.test(file) && !file.startsWith("_") && file !== "README.md")
    .map(readGuide)
    .filter((guide): guide is TravelGuide => guide !== null)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getTravelGuide(slug: string): TravelGuide | undefined {
  return getAllTravelGuides().find((guide) => guide.slug === slug);
}

export const formatGuideDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
