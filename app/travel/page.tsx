import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { TravelGuideGrid } from "@/components/TravelGuideGrid";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { getAllTravelGuides } from "@/lib/travel";

export const metadata = pageMetadata("/travel");

export default function TravelPage() {
  const guides = getAllTravelGuides();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "India travel itineraries",
        description: "Practical India journey ideas from NFTCI for pilgrimage, wellness, heritage and community tourism.",
        url: absoluteUrl("/travel"),
        mainEntity: { "@type": "ItemList", numberOfItems: guides.length, itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/travel/${guide.slug}`), name: guide.title })) },
      }} />
      <PageHero trail={[{ name: "Travel guides", path: "/travel" }]} title="Journeys through India, planned with purpose.">
        <p>Explore pilgrimage, meditation, wellness, heritage and community-tourism itineraries—then email NFTCI to discuss a journey for your group.</p>
        <div className="travel-hero__actions">
          <a className="btn btn-primary" href={`mailto:${site.email}?subject=${encodeURIComponent("Travel planning enquiry")}`}>Plan a journey <Icon name="mail" size={18} /></a>
          <span>{guides.length} planning guides · no online payment required</span>
        </div>
      </PageHero>

      <section className="section-sm travel-intro">
        <div className="container travel-intro__grid">
          <div>
            <span className="eyebrow">Travel resource centre</span>
            <h2>Start with inspiration. Continue with a real conversation.</h2>
          </div>
          <div>
            <p className="lead">These guides help families, associations, cooperatives and institutions shape better India journeys. Routes are adaptable for group size, accessibility, local transport and community participation.</p>
            <p className="travel-note"><strong>Important:</strong> These are NFTCI planning concepts, not confirmed government tour packages. Government schemes may support destination development, but availability, operators, inclusions and prices must be confirmed in writing. NFTCI is not the Ministry of Tourism or IRCTC.</p>
          </div>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <TravelGuideGrid guides={guides.map(({ slug, title, description, theme, region, duration, pace, bestFor, destinations, image }) => ({ slug, title, description, theme, region, duration, pace, bestFor, destinations, image }))} />
        </div>
      </section>

      <section className="section-sm official-resources">
        <div className="container">
          <div className="section-intro narrow">
            <span className="eyebrow">Verify before you travel</span>
            <h2>Official planning resources</h2>
            <p className="lead">Use primary government sources for current advisories, destination information and bookable government-operated products.</p>
          </div>
          <div className="grid-3">
            <a className="card resource-card hover-card" href="https://www.incredibleindia.gov.in/en/trips/trip-listing" target="_blank" rel="noopener noreferrer">
              <span>Ministry of Tourism</span><h3>Incredible India trip ideas</h3><p>Destination inspiration and itineraries from India’s official tourism portal.</p><strong>Open official portal ↗</strong>
            </a>
            <a className="card resource-card hover-card" href="https://www.irctctourism.com/" target="_blank" rel="noopener noreferrer">
              <span>Government enterprise</span><h3>IRCTC Tourism</h3><p>Check currently published rail tours, packages, policies and booking conditions.</p><strong>Open IRCTC Tourism ↗</strong>
            </a>
            <a className="card resource-card hover-card" href="https://tourism.gov.in/schemes-and-guidelines/schemes" target="_blank" rel="noopener noreferrer">
              <span>Policy &amp; schemes</span><h3>Ministry programmes</h3><p>Read about destination-development schemes such as Swadesh Darshan and PRASHAD.</p><strong>Open ministry website ↗</strong>
            </a>
          </div>
        </div>
      </section>

      <Cta eyebrow="A journey shaped for your group" title="Tell NFTCI where India is calling you." text="Share your preferred route, group size, travel window and accessibility needs. The travel desk will respond by email with next steps; no payment is collected on this website." primary={{ label: "Email the travel desk", href: `mailto:${site.email}?subject=${encodeURIComponent("NFTCI journey planning request")}` }} secondary={{ label: "How NFTCI works", href: "/about" }} />
    </>
  );
}
