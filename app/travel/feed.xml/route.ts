import { absoluteUrl, site } from "@/lib/site";
import { getAllTravelGuides } from "@/lib/travel";

export const dynamic = "force-static";

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllTravelGuides().map((guide) => {
    const url = absoluteUrl(`/travel/${guide.slug}`);
    return `<item><title>${escape(guide.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(guide.date + "T00:00:00Z").toUTCString()}</pubDate><description>${escape(guide.description)}</description><category>${escape(guide.theme)}</category></item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escape(site.shortName)} travel guides</title><link>${absoluteUrl("/travel")}</link><atom:link href="${absoluteUrl("/travel/feed.xml")}" rel="self" type="application/rss+xml"/><description>India pilgrimage, wellness, heritage and community-tourism planning guides from ${escape(site.shortName)}</description><language>en-in</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
