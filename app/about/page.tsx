import { Cta } from "@/components/Cta";
import { Glyph } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Picture, SIZES } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("/about");

const principles = [
  "One Village – One Leader – One Nation",
  "Leadership through responsibility",
  "Decentralised execution with central governance",
  "Accountability at every level",
  "Cooperative ownership and dignity",
];

const board = [
  "Representatives elected from Tourism Cooperative Societies",
  "Representation from Individual Members",
  "Nominees from Government Departments, Public Sector Undertakings, Autonomous Bodies, Corporates, Trusts and NGOs",
  "Nominees from the Ministry of Tourism & Culture and the Ministry of Transport & Highways",
  "Representation from National and State-level Cooperative Federations",
  "A nominee from the National Cooperative Development Corporation (NCDC)",
  "The Managing Director, serving ex officio",
  "Co-opted professionals with specialised expertise",
];

export default function AboutPage() {
  return (
    <>
      <PageHero trail={[{ name: "About", path: "/about" }]} title="Built to turn cooperative strength into national capability.">
        <p>NFTCI provides a common institutional platform for tourism, transport and allied service cooperatives across India.</p>
      </PageHero>

      <section className="section">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">Who we are</span>
            <h2 className="section-heading">A federation designed for shared progress</h2>
            <p className="lead">The National Federation of Tourism &amp; Transport Co-operatives of India Ltd is a national-level apex cooperative federation.</p>
            <p>Its role is to organise, regulate, promote and scale a diverse ecosystem spanning tourism, transport, hospitality, logistics, SEZ and industrial-zone services, MSMEs, SHGs, rural enterprises and service cooperatives.</p>
            <p>Rather than replacing local organisations, NFTCI helps them work together: strengthening governance, aligning standards, building capacity and connecting their delivery capability with larger institutional programmes.</p>
          </div>
          <figure className="photo-frame reveal">
            <Picture name="cooperative-leadership" alt="Indian cooperative leaders reviewing a programme plan together" sizes={SIZES.half} priority />
            <figcaption className="floating-note">
              <strong>A cooperative of cooperatives</strong>
              <span>Shared infrastructure and governance, delivered through member capability.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div className="reveal">
              <span className="eyebrow">Purpose</span>
              <h2 className="section-heading">The bridge between grassroots enterprise and structured opportunity</h2>
              <p className="lead">India’s local cooperatives understand their people and places. NFTCI helps translate that strength into coordinated, dependable and scalable delivery.</p>
            </div>
            <div>
              <article className="principle reveal">
                <span className="principle__num">Vision</span>
                <h3>A trusted cooperative ecosystem</h3>
                <p>A resilient national ecosystem in which cooperative enterprises are trusted partners in mobility, tourism, services and local development.</p>
              </article>
              <article className="principle reveal">
                <span className="principle__num">Mission</span>
                <h3>Standards, systems and market access</h3>
                <p>To build common standards, systems, partnerships and market access that help members deliver responsibly and competitively.</p>
              </article>
              <article className="principle reveal">
                <span className="principle__num">Approach</span>
                <h3>National coordination, local execution</h3>
                <p>Keeping capability, employment and economic value close to member communities.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Our mandate</span>
            <h2 className="section-heading">A broad mandate, held together by one operating principle</h2>
            <p className="lead">Every domain should create member opportunity while meeting the governance and service standards expected by institutions and citizens.</p>
          </div>
          <div className="grid-3">
            <article className="card card-pad reveal">
              <div className="icon-box">
                <Glyph d="M4 19V8l8-5 8 5v11M8 19v-6h8v6M3 19h18" />
              </div>
              <h3>Organise</h3>
              <p>Bring members, sector capabilities and regional networks into a coherent national framework.</p>
            </article>
            <article className="card card-pad reveal">
              <div className="icon-box orange">
                <Glyph d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4ZM9 12l2 2 4-4" />
              </div>
              <h3>Strengthen</h3>
              <p>Support standards, compliance, training, digital systems and transparent governance.</p>
            </article>
            <article className="card card-pad reveal">
              <div className="icon-box green">
                <Glyph d="M4 17 10 11l4 4 6-7M15 8h5v5" />
              </div>
              <h3>Scale</h3>
              <p>Structure partnerships and programmes that individual organisations could not pursue alone.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section surface" id="principles">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="reveal">
            <span className="eyebrow">Core principles</span>
            <h2 className="section-heading">One Village – One Leader – One Nation</h2>
            <p className="lead">The principles that shape how NFTCI organises members and shares responsibility across every level of the Federation.</p>
          </div>
          <ul className="feature-list reveal">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="governance">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="reveal">
            <span className="eyebrow">Leadership &amp; governance</span>
            <h2 className="section-heading">A reconstituted Board for a national mandate</h2>
            <p className="lead">NFTCI is governed by a Board of Directors designed for balanced representation, sectoral relevance and strong governance.</p>
            <p>The Board has no more than 21 Directors, excluding co-opted members. The Managing Director is the chief executive authority, responsible for administration, implementing Board decisions, coordinating with State and Central Government departments and executing the Federation’s programmes.</p>
          </div>
          <div className="card card-pad reveal">
            <span className="tag">Board composition</span>
            <ul className="feature-list" style={{ marginTop: 24, marginBottom: 0 }}>
              {board.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-sm surface-sand" id="bylaws">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="reveal">
            <span className="eyebrow">Governance foundation</span>
            <h2 className="section-heading">By-laws for a diversified national role</h2>
            <p>The NFTCI By-Laws, as amended and approved by the General Body on 24 December 2020, provide the legal and governance foundation for the Federation’s expanded role. They authorise NFTCI to operate as a national-level cooperative federation, with diversified revenue streams, large-scale project execution and governance in line with applicable cooperative regulations.</p>
            <a className="btn btn-secondary" href={site.bylawsPdf} target="_blank" rel="noopener">
              Read the official by-laws (PDF, 1.6 MB) <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="card card-pad reveal">
            <span className="tag">Key amendments</span>
            <ul className="feature-list" style={{ marginTop: 24, marginBottom: 0 }}>
              <li>Operational jurisdiction extended to all States and Union Territories</li>
              <li>Objectives diversified to include healthcare, wellness, infrastructure, procurement, environmental management, renewable energy, facility management, labour services and community development</li>
              <li>Authorised share capital increased from ₹10 crore to ₹250 crore</li>
              <li>Revised membership categories and fee structures</li>
              <li>Share transfer and withdrawal provisions with defined lock-in periods</li>
              <li>Strengthened Board composition for governance and accountability</li>
            </ul>
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Work with purpose"
        title="Stronger members create stronger local economies."
        text="See how NFTCI’s service ecosystem translates the mandate into practical areas of work."
        primary={{ label: "Explore services", href: "/services" }}
        secondary={{ label: "Become a member", href: "/membership" }}
      />
    </>
  );
}
