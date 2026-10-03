import { Cta } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { Picture, SIZES } from "@/components/Picture";
import type { ImageName } from "@/lib/images.generated";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("/gallery");

const items: { image: ImageName; layout: "wide" | "tall" | ""; alt: string; title: string; text: string }[] = [
  { image: "hero-mobility", layout: "wide", alt: "Transport professionals beside a coach at an Indian regional terminal", title: "Regional mobility", text: "Coordinated passenger services" },
  { image: "community-tourism", layout: "tall", alt: "Community hosts welcome travellers at a rural Indian homestay", title: "Community tourism", text: "Local hospitality and authentic experiences" },
  { image: "green-mobility", layout: "", alt: "Technicians inspect an electric bus at a depot", title: "Green mobility", text: "Fleet readiness and technical capability" },
  { image: "agri-logistics", layout: "wide", alt: "Cooperative members prepare vegetables for refrigerated transport", title: "Farm-to-market logistics", text: "Aggregation, quality and cold-chain movement" },
  { image: "cooperative-leadership", layout: "", alt: "Cooperative leaders review regional programme plans", title: "Shared governance", text: "Planning across sectors and regions" },
  { image: "pilgrimage-mobility", layout: "wide", alt: "Coordinator assists elderly travellers near pilgrimage shuttle buses", title: "Inclusive visitor services", text: "Thoughtful mobility and ground support" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero trail={[{ name: "Gallery", path: "/gallery" }]} title="The people and places behind cooperative delivery.">
        <p>A visual overview of the service environments NFTCI’s network is designed to support.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">In the field</span>
            <h2 className="section-heading">Capability is built where people work</h2>
            <p className="lead">From transport depots to homestays and collection centres, cooperative value begins with local knowledge and dependable execution.</p>
          </div>
          <div className="gallery-grid">
            {items.map((item, index) => (
              <figure className={`gallery-item ${item.layout} reveal`} key={item.image}>
                <Picture name={item.image} alt={item.alt} sizes={item.layout === "wide" ? SIZES.twoThirds : SIZES.third} priority={index === 0} />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm surface-sand">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">Member stories</span>
            <h2 className="section-heading">Help document cooperative impact</h2>
            <p>Member organisations can share high-resolution, consent-cleared photographs of their teams, assets, programmes and communities for consideration in NFTCI communications.</p>
          </div>
          <div className="reveal">
            <a className="btn btn-secondary" href={`mailto:${site.email}?subject=${encodeURIComponent("Member photographs for NFTCI")}`}>
              Share photographs by email
            </a>
            <p style={{ marginTop: 14, color: "var(--muted)", fontSize: ".85rem" }}>Please include captions, location, date and confirmation that pictured individuals have consented to publication.</p>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Be part of the network"
        title="Your cooperative could help shape the next story."
        text="Explore membership and bring your local capability into a wider ecosystem."
        primary={{ label: "Explore membership", href: "/membership" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
