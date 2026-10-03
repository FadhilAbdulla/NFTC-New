import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Glyph, Icon } from "@/components/Icon";
import { Picture, SIZES } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

const domains = [
  { title: "Transport & mobility", text: "Passenger services, fleet aggregation, rural connectivity, government transport and green mobility.", href: "/services#transport", tone: "", d: "M3 17h18M6 17l1-8h10l1 8M8 9V6h8v3M8 21h.01M16 21h.01" },
  { title: "Tourism & destinations", text: "Community tourism, pilgrimage circuits, destination services and experience-led local enterprise.", href: "/services#tourism", tone: "orange", d: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" },
  { title: "Logistics & supply chains", text: "Collection, storage, goods movement and cooperative-led last-mile delivery networks.", href: "/services#logistics", tone: "green", d: "M3 7h11v10H3zM14 10h4l3 3v4h-7zM7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4" },
  { title: "Hospitality", text: "Homestays, hotels, catering, event support and cooperative hospitality capacity.", href: "/services#hospitality", tone: "orange", d: "M4 21V9l8-5 8 5v12M8 21v-7h8v7M9 10h.01M15 10h.01" },
  { title: "Trade & rural enterprise", text: "Market linkages for producer groups, MSMEs, SHGs and agri-trade cooperatives.", href: "/services#trade", tone: "green", d: "M4 20h16M6 20V8h12v12M9 8V4h6v4M9 12h2M13 12h2M9 16h2M13 16h2" },
  { title: "Horizontal services", text: "Digital systems, training, facility support, compliance and cross-sector programme management.", href: "/services#horizontal", tone: "", d: "M4 4h16v16H4zM8 8h8v8H8zM12 4v4M12 16v4M4 12h4M16 12h4" },
];

const proof = [
  { title: "National apex federation", text: "A cooperative of cooperatives", d: "M4 20V10l8-5 8 5v10M8 20v-6h8v6M3 20h18" },
  { title: "Pan-India scope", text: "Across states and union territories", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" },
  { title: "Multi-sector mandate", text: "Mobility, tourism and allied services", d: "M12 3v18M3 12h18M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18" },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Picture name="hero-mobility" className="home-hero__media" alt="" sizes="(max-width: 780px) 540px, 100vw" priority />
        <div className="container">
          <div className="hero-content">
            <div className="hero-kicker">
              <span /> India’s apex cooperative platform
            </div>
            <h1>Local enterprise. National opportunity.</h1>
            <p className="hero-lead">The National Federation of Tourism &amp; Transport Co-operatives of India brings tourism, transport, hospitality, logistics and service cooperatives onto one structured platform, so local capability can deliver at scale.</p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/membership">
                Explore membership <Icon name="arrow" />
              </Link>
              <Link className="btn btn-ghost" href="/services">
                View our mandate
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-proof">
          <div className="container proof-grid">
            {proof.map((item) => (
              <div className="proof-item" key={item.title}>
                <span className="proof-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d={item.d} />
                  </svg>
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">The federation</span>
            <h2 className="section-heading">One platform. Many local engines.</h2>
            <p className="lead">NFTCI is a national-level apex cooperative federation mandated to organise, regulate, promote and scale tourism, transport, hospitality, logistics, SEZ and industrial-zone services, MSMEs, SHGs, rural enterprises and service cooperatives across India.</p>
            <p className="max-copy">It connects grassroots societies, rural enterprises, SHGs and service cooperatives with shared systems, technical capability, institutional partnerships and larger opportunities, while keeping delivery rooted in local ownership.</p>
            <ul className="feature-list">
              <li>Structured access to cross-sector opportunities</li>
              <li>Standards, governance and compliance support</li>
              <li>Capability building and technology enablement</li>
            </ul>
            <Link className="text-link" href="/about">
              Understand NFTCI <Icon name="arrow" />
            </Link>
          </div>
          <figure className="photo-frame reveal">
            <Picture name="community-tourism" alt="Local homestay hosts welcoming travellers in an Indian hill community" sizes={SIZES.half} />
            <figcaption className="floating-note">
              <strong>Growth that stays local</strong>
              <span>Member-led tourism, mobility and enterprise create value within communities.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section surface" id="domains">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Our service ecosystem</span>
            <h2 className="section-heading">A connected mandate for a connected economy</h2>
            <p className="lead">NFTCI works across complementary domains, helping members take part in integrated programmes rather than isolated services.</p>
          </div>
          <div className="grid-3">
            {domains.map((domain) => (
              <article className="card domain-card hover-card reveal" key={domain.title}>
                <div className={`icon-box ${domain.tone}`}>
                  <Glyph d={domain.d} />
                </div>
                <h3>{domain.title}</h3>
                <p>{domain.text}</p>
                <Link className="text-link" href={domain.href}>
                  Explore domain <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">National backbone platform</span>
            <h2 className="section-heading">From Panchayat level to national scale</h2>
            <p className="lead">NFTCI integrates grassroots enterprise with MSMEs and service cooperatives so they can operate together as one structured, bankable and execution-ready ecosystem.</p>
          </div>
          <ol className="ladder">
            <li className="reveal">
              <strong>Panchayat</strong>
              <span>Grassroots SHGs and rural enterprises</span>
            </li>
            <li className="reveal">
              <strong>District</strong>
              <span>Integration with MSMEs and service cooperatives</span>
            </li>
            <li className="reveal">
              <strong>State</strong>
              <span>Coordination and structured ecosystem development</span>
            </li>
            <li className="reveal">
              <strong>National</strong>
              <span>A bankable, execution-ready platform</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section dark-surface">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow on-dark">How the platform works</span>
            <h2 className="section-heading">Scale without losing local ownership</h2>
            <p style={{ color: "#b6cad8" }}>NFTCI provides the shared structure; qualified member organisations deliver through their local knowledge, people and assets.</p>
          </div>
          <div className="steps">
            <article className="step reveal">
              <h3>Aggregate</h3>
              <p>Bring tourism, transport, hotel, resort, event, destination-management and mobility cooperatives onto one platform.</p>
            </article>
            <article className="step reveal">
              <h3>Prepare</h3>
              <p>Build SOPs, standards, digital platforms, compliance and delivery readiness.</p>
            </article>
            <article className="step reveal">
              <h3>Connect</h3>
              <p>Structure partnerships and route opportunities to suitable members.</p>
            </article>
            <article className="step reveal">
              <h3>Deliver</h3>
              <p>Execute government programmes, pilgrimages, cultural events, tourism circuits and PPP projects.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div className="narrow reveal">
              <span className="eyebrow">Programme focus</span>
              <h2 className="section-heading">Where cooperation becomes capability</h2>
              <p className="lead">Priority programme areas shaped around public value, member livelihoods and reliable service delivery.</p>
            </div>
            <Link className="btn btn-outline" href="/programmes">
              See all programme areas
            </Link>
          </div>
          <div className="project-grid">
            <Link className="project-card reveal" href="/programmes#green-mobility">
              <Picture name="green-mobility" alt="Technicians inspecting an electric cooperative bus fleet" sizes={SIZES.half} />
              <div className="project-card__content">
                <span className="tag">Green mobility</span>
                <h3>Cleaner fleets, stronger local operations</h3>
                <p>Practical pathways for fleet transition, charging readiness and member-led mobility services.</p>
              </div>
            </Link>
            <Link className="project-card reveal" href="/programmes#pilgrimage">
              <Picture name="pilgrimage-mobility" alt="Coordinator helping elderly travellers at a pilgrimage transport hub" sizes={SIZES.half} />
              <div className="project-card__content">
                <span className="tag">Pilgrimage &amp; events</span>
                <h3>Coordinated journeys with dignity</h3>
                <p>Mobility, hospitality and ground support designed around safe, inclusive visitor movement.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Build with the cooperative network"
        title="Bring your capability into a national ecosystem."
        text="Whether you represent a cooperative, institution or programme partner, start a conversation with NFTCI."
        primary={{ label: "Join NFTCI", href: "/membership" }}
        secondary={{ label: "Contact the federation", href: "/contact" }}
      />
    </>
  );
}
