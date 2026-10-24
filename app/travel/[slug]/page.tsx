import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatGuideDate, getAllTravelGuides, getTravelGuide } from "@/lib/travel";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return getAllTravelGuides().map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: Params) {
  const guide = getTravelGuide((await params).slug);
  if (!guide) return {};
  return buildMetadata({ title: guide.title, description: guide.description, path: `/travel/${guide.slug}`, type: "article", publishedTime: guide.date, modifiedTime: guide.updated ?? guide.date, image: { url: guide.image, width: 1672, height: 1050, alt: guide.imageAlt } });
}

export default async function TravelGuidePage({ params }: Params) {
  const guide = getTravelGuide((await params).slug);
  if (!guide) notFound();
  const url = absoluteUrl(`/travel/${guide.slug}`);
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Journey enquiry: ${guide.title}`)}&body=${encodeURIComponent(`Hello NFTCI Travel Desk,\n\nI am interested in the ${guide.title} planning concept.\n\nPreferred travel dates:\nNumber of travellers:\nStarting city:\nAccessibility or dietary needs:\n\nPlease share the next steps.\n`)}`;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: guide.date, dateModified: guide.updated ?? guide.date, mainEntityOfPage: url, url, image: [absoluteUrl(guide.image)], author: { "@type": "Organization", name: guide.author }, publisher: { "@id": `${site.url}/#organization` }, keywords: [...guide.tags, guide.theme, guide.region].join(", ") }} />
      <PageHero trail={[{ name: "Travel guides", path: "/travel" }, { name: guide.title, path: `/travel/${guide.slug}` }]} title={guide.title}>
        <p>{guide.description}</p>
        <div className="article-meta"><span>{guide.theme}</span><span>{guide.duration}</span><span>{guide.region}</span><time dateTime={guide.date}>Updated {formatGuideDate(guide.updated ?? guide.date)}</time></div>
      </PageHero>
      <section className="section travel-article-section">
        <div className="container travel-article-layout">
          <article className="prose travel-prose">
            <img className="article-cover" src={guide.image} alt={guide.imageAlt} />
            <div className="guide-facts" aria-label="Journey summary">
              <div><span>Duration</span><strong>{guide.duration}</strong></div>
              <div><span>Pace</span><strong>{guide.pace}</strong></div>
              <div><span>Best for</span><strong>{guide.bestFor}</strong></div>
            </div>
            <MDXRemote source={guide.body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
            <div className="guide-disclaimer">
              <h2>Planning note</h2>
              <p>This is an editorial planning guide, not a confirmed or government-issued package. Routes, opening hours, permits, transport, accommodation, accessibility, prices and operator availability can change. NFTCI will only treat a journey as offered after details are confirmed in writing. Always verify current information with the relevant government authority or official operator before travel.</p>
            </div>
          </article>
          <aside className="journey-enquiry">
            <span className="eyebrow">Interested in this route?</span>
            <h2>Plan it with NFTCI</h2>
            <p>Email the travel desk with your dates, group size, starting city and any accessibility or dietary needs.</p>
            <a className="btn btn-primary" href={mailto}>Email this itinerary <Icon name="mail" size={18} /></a>
            <small>No online payment is requested. A written reply should confirm any next steps, availability and terms.</small>
          </aside>
        </div>
        <div className="container"><p className="back-link"><Link className="text-link" href="/travel">← Browse all travel guides</Link></p></div>
      </section>
    </>
  );
}
