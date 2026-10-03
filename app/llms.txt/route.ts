import { getAllPosts } from "@/lib/news";
import { absoluteUrl, pages, site, type PagePath } from "@/lib/site";

export const dynamic = "force-static";

// /llms.txt (https://llmstxt.org): a plain-Markdown guide to the site for AI assistants and answer engines.
// Page titles and descriptions come from lib/site.ts; keep the facts below in step with the page copy.

const link = (path: PagePath) => `- [${pages[path].label}](${absoluteUrl(path)}): ${pages[path].description}`;

export function GET() {
  const posts = getAllPosts();
  const body = `# ${site.legalName} (${site.name})

> ${site.legalName} — also known as ${site.name} or ${site.shortName} — is a national-level apex cooperative federation (a "cooperative of cooperatives") that connects tourism, transport, hospitality, logistics, trade and service cooperatives, SHGs, MSMEs and rural enterprises across all States and Union Territories of India.

## Key facts

- Legal name: ${site.legalName}
- Short names: ${site.name}, ${site.shortName}, NFTC
- Type: National-level apex cooperative federation, India
- Jurisdiction: All States and Union Territories of India
- Governance: Board of Directors of no more than 21 Directors (excluding co-opted members); the Managing Director is the chief executive authority
- By-laws: Amended and approved by the General Body on 24 December 2020; authorised share capital raised from ₹10 crore to ₹250 crore ([PDF](${absoluteUrl(site.bylawsPdf)}))
- Guiding principle: One Village – One Leader – One Nation
- Service domains: transport and mobility; tourism, agri-tourism and pilgrimage; logistics and cold chain; hospitality; trade and agri-trade; SEZ and industrial-park services; horizontal services (digital platforms, training, compliance)
- Membership categories: Working / Organisational Member, Strategic Alliance Member, Individual Member
- Membership is approved by the Managing Director's Office under the by-laws; fees are communicated by email only after an Expression of Interest is reviewed. Membership is not an investment and carries no assured returns.
- Office: ${site.address.lines.join(", ")}
- Email: ${site.email}
- Phone: ${site.phone.display}

## Pages

${(["/", "/about", "/services", "/programmes", "/membership", "/contact"] as PagePath[]).map(link).join("\n")}
${posts.length ? `\n## News\n\n${posts.map((post) => `- [${post.title}](${absoluteUrl(`/news/${post.slug}`)}): ${post.description}`).join("\n")}\n` : ""}
## Optional

${(["/gallery", "/privacy"] as PagePath[]).map(link).join("\n")}
- [Sitemap](${absoluteUrl("/sitemap.xml")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
