import { Cta } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { Picture, SIZES } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/programmes");

const areas = [
  { id: "green-mobility", image: "green-mobility", alt: "Electric cooperative buses undergoing inspection at a depot", tag: "Mobility", title: "Electric fleet transition", text: "Fleet-readiness planning, charging partnerships, technician capacity and reliable route operations." },
  { id: "pilgrimage", image: "pilgrimage-mobility", alt: "A coordinator assisting older pilgrimage travellers near shuttle buses", tag: "Tourism", title: "Pilgrimage & event mobility", text: "Coordinated arrival, shuttle, accessibility, hospitality and ground-support services." },
  { id: "agri-logistics", image: "agri-logistics", alt: "A farmer cooperative preparing produce for cold-chain transport", tag: "Agri-logistics", title: "Producer-to-market networks", text: "Collection, grading, storage, cold chain and movement to institutional and retail buyers." },
  { id: "community-tourism", image: "community-tourism", alt: "Local hosts welcoming travellers to a community homestay", tag: "Community tourism", title: "Homestay & destination clusters", text: "Experience design, host readiness, common standards and market access for local enterprises." },
] as const;

export default function ProgrammesPage() {
  return (
    <>
      <PageHero trail={[{ name: "Programmes", path: "/programmes" }]} title="Programme areas shaped for member-led delivery.">
        <p>Focused pathways where cooperative networks can create public value, stronger services and durable local livelihoods.</p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Priority areas</span>
            <h2 className="section-heading">Designed around real operating needs</h2>
            <p className="lead">These are programme directions NFTCI can develop with qualified members and partners. Specific projects, locations and outcomes depend on formal agreements.</p>
          </div>
          <div className="project-grid">
            {areas.map((area) => (
              <article className="project-card reveal" id={area.id} key={area.id}>
                <Picture name={area.image} alt={area.alt} sizes={SIZES.half} />
                <div className="project-card__content">
                  <span className="tag">{area.tag}</span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">Delivery framework</span>
            <h2 className="section-heading">Programmes run through members, not around them</h2>
            <p className="lead">The federation structures the opportunity and shared operating model. Delivery is routed to members with the right capability and geography.</p>
            <p>This approach combines national coordination with local accountability, helping institutions work with a broad cooperative network through a clear delivery framework.</p>
          </div>
          <div>
            {[
              ["Scope & structure", "Define outcomes, geography, service levels, commercial terms and governance."],
              ["Qualify & prepare", "Identify capable members and close readiness gaps through standards and training."],
              ["Allocate & operate", "Route work transparently and coordinate execution across locations."],
              ["Monitor & improve", "Track service, compliance, reporting and continuous improvement."],
            ].map(([title, text], index) => (
              <article className="principle reveal" key={title}>
                <span className="principle__num">Step {index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-surface">
        <div className="container">
          <div className="section-intro narrow center reveal">
            <span className="eyebrow on-dark">A practical partnership model</span>
            <h2 className="section-heading">Clear roles from programme design to ground delivery</h2>
          </div>
          <div className="steps">
            <article className="step reveal">
              <h3>Partner need</h3>
              <p>A public, institutional or market requirement is clearly defined.</p>
            </article>
            <article className="step reveal">
              <h3>NFTCI platform</h3>
              <p>The federation structures standards, governance and member participation.</p>
            </article>
            <article className="step reveal">
              <h3>Member delivery</h3>
              <p>Qualified societies execute through their local assets and teams.</p>
            </article>
            <article className="step reveal">
              <h3>Shared accountability</h3>
              <p>Performance and reporting remain visible across the programme.</p>
            </article>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Develop a programme"
        title="Bring us the need. We’ll map the cooperative capability."
        text="Start with your service requirement, location, scale and intended outcomes."
        primary={{ label: "Talk to NFTCI", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
