import { Cta } from "@/components/Cta";
import { Glyph } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Picture, SIZES } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMetadata("/services");

const services = [
  { id: "transport", name: "Transport & mobility", description: "Passenger and institutional transport, rural and last-mile connectivity, government and PSU transport contracts, fleet aggregation and EV transition." },
  { id: "tourism", name: "Tourism & destinations", description: "Community, rural, agri- and pilgrimage tourism, destination management, tour operations and ground handling." },
  { id: "logistics", name: "Logistics", description: "First-mile collection, warehousing, cold-chain and agricultural logistics, goods transport and last-mile delivery networks." },
  { id: "hospitality", name: "Hospitality", description: "Hotels, resorts, homestays and eco-lodges, feasibility studies, operator tie-ups and workforce training." },
  { id: "trade", name: "Trade & agri-trade", description: "Producer aggregation, institutional market linkages, procurement support and market access for agri-products and handicrafts." },
  { id: "sez", name: "SEZ & industrial-park services", description: "EV fleets, warehousing, facility management, catering, housekeeping, security and staff housing in SEZs and industrial parks." },
  { id: "horizontal", name: "Horizontal services", description: "Digital platforms, data governance, governance audits, compliance, facility services, training and SOPs." },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NFTCI service domains",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      "@id": absoluteUrl(`/services#${service.id}`),
      name: service.name,
      description: service.description,
      url: absoluteUrl(`/services#${service.id}`),
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: "India" },
    },
  })),
};

const darkCard = { background: "rgba(255,255,255,.07)", borderColor: "rgba(255,255,255,.14)" };

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <PageHero trail={[{ name: "Services", path: "/services" }]} title="An integrated service ecosystem, built around member capability.">
        <p>NFTCI connects complementary sectors so members can deliver complete programmes, not isolated parts.</p>
      </PageHero>

      <section className="section-sm surface">
        <div className="container stat-band reveal">
          <div className="stat-item">
            <strong>Mobility</strong>
            <span>Passenger, rural and institutional transport</span>
          </div>
          <div className="stat-item">
            <strong>Destinations</strong>
            <span>Tourism, pilgrimage and visitor services</span>
          </div>
          <div className="stat-item">
            <strong>Enterprise</strong>
            <span>Trade, logistics and market access</span>
          </div>
          <div className="stat-item">
            <strong>Enablement</strong>
            <span>Technology, training and compliance</span>
          </div>
        </div>
      </section>

      <section className="section" id="transport">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">Transport &amp; mobility</span>
            <h2 className="section-heading">Reliable movement, organised cooperatively</h2>
            <p className="lead">NFTCI helps members combine vehicles, operators, route knowledge and local presence into structured mobility services.</p>
            <ul className="feature-list">
              <li>Passenger and institutional transport</li>
              <li>Rural and last-mile connectivity</li>
              <li>Government and PSU transport contracts</li>
              <li>Fleet aggregation, operations and maintenance</li>
              <li>EV transition and charging partnerships</li>
              <li>Tourism and event mobility</li>
            </ul>
          </div>
          <figure className="photo-frame reveal">
            <Picture name="green-mobility" alt="Electric bus technicians carrying out a fleet inspection" sizes={SIZES.half} />
            <figcaption className="floating-note">
              <strong>Built for dependable operations</strong>
              <span>Safety, readiness and member capability at every stage.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section surface" id="tourism">
        <div className="container grid-2">
          <figure className="photo-frame reveal">
            <Picture name="community-tourism" alt="Community homestay hosts welcoming Indian travellers" sizes={SIZES.half} />
          </figure>
          <div className="reveal">
            <span className="eyebrow">Tourism &amp; destinations</span>
            <h2 className="section-heading">Visitor economies that benefit host communities</h2>
            <p className="lead">Developing tourism through local enterprise, authentic experiences and coordinated destination services.</p>
            <ul className="feature-list">
              <li>Community and rural tourism</li>
              <li>Agri-tourism: farm stays, village tourism, local cuisine, crafts and culture</li>
              <li>Spiritual and pilgrimage circuits, including crowd management and event mobility</li>
              <li>Infrastructure planning for temples, monasteries, heritage sites and rural clusters</li>
              <li>Destination management, tour operations and ground handling</li>
              <li>Training and capacity building for rural entrepreneurs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="logistics">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">Logistics</span>
            <h2 className="section-heading">From local production to dependable delivery</h2>
            <p className="lead">Cooperative logistics can make fragmented local capacity visible, coordinated and commercially useful.</p>
            <ul className="feature-list">
              <li>First-mile collection and consolidation</li>
              <li>Warehousing and storage support</li>
              <li>Cold-chain and agricultural logistics</li>
              <li>Goods transport and route coordination</li>
              <li>Last-mile delivery networks</li>
              <li>Digital dispatch and tracking enablement</li>
            </ul>
          </div>
          <figure className="photo-frame reveal">
            <Picture name="agri-logistics" alt="Farmer cooperative members sorting produce for refrigerated transport" sizes={SIZES.half} />
            <figcaption className="floating-note">
              <strong>Market access starts with movement</strong>
              <span>Coordinated collection and logistics help producers reach larger buyers.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Connected domains</span>
            <h2 className="section-heading">Services that complete the ecosystem</h2>
            <p className="lead">The strongest programmes combine sector expertise with the supporting capabilities needed to deliver well.</p>
          </div>
          <div className="grid-3">
            <article className="card domain-card hover-card reveal" id="hospitality">
              <div className="icon-box orange">
                <Glyph d="M4 21V9l8-5 8 5v12M8 21v-7h8v7M9 10h.01M15 10h.01" />
              </div>
              <h3>Hospitality</h3>
              <p>Hotels, resorts, wellness retreats, homestays and eco-lodges; DPRs and feasibility studies; operator tie-ups; asset-light, lease-back and revenue-sharing models; workforce training.</p>
            </article>
            <article className="card domain-card hover-card reveal" id="trade">
              <div className="icon-box green">
                <Glyph d="M4 6h16v13H4zM8 6V4h8v2M4 10h16M9 14h6" />
              </div>
              <h3>Trade &amp; agri-trade</h3>
              <p>Producer aggregation, institutional market linkages, procurement support, market access for agri-products and handicrafts, and cooperative commerce.</p>
            </article>
            <article className="card domain-card hover-card reveal" id="horizontal">
              <div className="icon-box">
                <Glyph d="M4 4h16v16H4zM8 8h8v8H8zM12 4v4M12 16v4M4 12h4M16 12h4" />
              </div>
              <h3>Horizontal services</h3>
              <p>Digital platforms for membership, reporting and governance; data governance and controlled access; governance audits and compliance; facility services, training and SOPs.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section dark-surface" id="partnerships">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow on-dark">Institutional partnerships</span>
            <h2 className="section-heading">A coordinated partner for complex programmes</h2>
            <p style={{ color: "#b7cad8" }}>NFTCI can bring together mobility, logistics, hospitality and local-enterprise capacity under a shared delivery framework. Channel partners, including hotels, transport operators, trusts, PSUs, private developers and government bodies, work with the Federation under facilitation and commission frameworks.</p>
          </div>
          <div className="grid-2" style={{ gap: 18 }}>
            <div className="card card-pad" style={darkCard}>
              <h3 style={{ color: "white" }}>Public institutions</h3>
              <p style={{ color: "#b7cad8" }}>Structured member networks for programmes, contracts and local delivery.</p>
            </div>
            <div className="card card-pad" style={darkCard} id="sez">
              <h3 style={{ color: "white" }}>SEZs &amp; industrial parks</h3>
              <p style={{ color: "#b7cad8" }}>Cooperative-led services in and around SEZs, industrial parks and logistics zones: EV fleets, warehousing, facility management, catering, housekeeping, security and staff housing.</p>
            </div>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Start a conversation"
        title="Need a cooperative delivery network?"
        text="Tell us about the geography, service need and capability you are looking for."
        primary={{ label: "Discuss a programme", href: "/contact" }}
        secondary={{ label: "View programme areas", href: "/programmes" }}
      />
    </>
  );
}
