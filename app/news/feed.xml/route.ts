import { getAllPosts } from "@/lib/news";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllPosts()
    .map((post) => {
      const url = absoluteUrl(`/news/${post.slug}`);
      return `<item><title>${escape(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(post.date + "T00:00:00Z").toUTCString()}</pubDate><description>${escape(post.description)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escape(site.shortName)} news</title><link>${absoluteUrl("/news")}</link><atom:link href="${absoluteUrl("/news/feed.xml")}" rel="self" type="application/rss+xml"/><description>${escape(`News and updates from the ${site.legalName}`)}</description><language>en-in</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
