import { EnquiryForm, type Field } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Picture, SIZES } from "@/components/Picture";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("/membership");

const fields: Field[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "role", label: "Role / designation", required: true },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" },
  { name: "organisation", label: "Organisation / cooperative", required: true, full: true, autoComplete: "organization" },
  { name: "state", label: "State / union territory", required: true },
  { name: "category", label: "Membership interest", type: "select", required: true, options: ["Working / Organisational Member", "Strategic Alliance Member", "Individual Member", "Not sure yet"] },
  { name: "domain", label: "Primary domain", type: "select", required: true, full: true, options: ["Transport & mobility", "Tourism", "Logistics", "Hospitality", "Trade / agri-trade", "Horizontal services", "Other"] },
  { name: "message", label: "Tell us about your membership base and capabilities", type: "textarea", required: true, full: true },
];

const faqs = [
  { q: "Does sending the enquiry make us a member?", a: "No. The enquiry is an Expression of Interest. Membership is subject to eligibility, documentation, review and approval by the Managing Director’s Office under the Federation’s by-laws, and becomes effective only after that approval is confirmed." },
  { q: "How much is the membership fee?", a: "The applicable admission fee depends on your membership category and organisational level. NFTCI emails the fee details to you after reviewing your Expression of Interest. Never pay anyone who contacts you before that review." },
  { q: "What documents may be requested?", a: "Depending on your organisation, NFTCI may request registration records, by-laws, governing-body authorisation, audited information, member details, tax or banking records and evidence of operating capability." },
  { q: "Can an individual become a member?", a: "Yes. The amended by-laws introduced Individual Membership to broaden participation. Send an enquiry with your background and the Federation will advise on the right route." },
  { q: "Does membership guarantee contracts, funding or returns?", a: "No. Membership fees and deposits are not an investment and carry no assured returns. Membership gives access to the network and support ecosystem; it does not guarantee any project, contract, finance or commercial outcome." },
];

export default function MembershipPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }} />
      <PageHero trail={[{ name: "Membership", path: "/membership" }]} title="Bring your cooperative capability into a national network.">
        <p>Membership creates a route to shared standards, stronger capacity, wider partnerships and coordinated opportunity.</p>
      </PageHero>

      <section className="section">
        <div className="container grid-2">
          <div className="reveal">
            <span className="eyebrow">Why join</span>
            <h2 className="section-heading">Economic participation, not dependency</h2>
            <p className="lead">NFTCI membership offers structured access to opportunity: institutional recognition instead of informal work, and leadership pathways instead of fragmented representation.</p>
            <ul className="feature-list">
              <li>A national cooperative identity and an official NFTC Membership ID</li>
              <li>Inclusion in the national federation register</li>
              <li>Participation in NFTCI programmes, assemblies and conventions</li>
              <li>Access to digital platforms, dashboards and communication systems</li>
              <li>Economic participation in tourism, transport, SHGs, MSMEs, agri-trade and rural enterprise</li>
              <li>Skill development, training, capacity building and livelihood support</li>
            </ul>
          </div>
          <figure className="photo-frame reveal">
            <Picture name="cooperative-leadership" alt="A diverse group of cooperative leaders planning together" sizes={SIZES.half} />
            <figcaption className="floating-note">
              <strong>Membership with purpose</strong>
              <span>Shared opportunity comes with shared standards and accountability.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section surface" id="categories">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Membership categories</span>
            <h2 className="section-heading">Choose how your organisation takes part</h2>
            <p className="lead">Final eligibility and category are determined under the Federation’s by-laws and application review.</p>
          </div>
          <div className="grid-3">
            <article className="card membership-type reveal">
              <span className="tag">Category I · Governing</span>
              <h3>Working &amp; Organisational Members</h3>
              <p>The Federation’s operational and governance backbone at national, state, district, block and grassroots levels. Members take part in policy, decision-making and execution, with voting and representation rights under the by-laws. Admission fee, refundable interest-free working deposit and a nominal annual subscription apply.</p>
            </article>
            <article className="card membership-type reveal">
              <span className="tag">Non-governing</span>
              <h3>Strategic Alliance Members</h3>
              <p>Institutions, corporates, MSMEs and strategic partners who join for platform access, facilitation, recognition, project linkages and advisory support, without governance or voting rights. A one-time, non-refundable admission fee applies.</p>
            </article>
            <article className="card membership-type reveal">
              <span className="tag">Individuals</span>
              <h3>Individual Members</h3>
              <p>Introduced by the amended by-laws to broaden participation: SHG members, rural youth, farmers, artisans, small transport operators and homestay or food-service providers seeking organised opportunity.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section dark-surface">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow on-dark">Membership journey</span>
            <h2 className="section-heading">A clear path from interest to participation</h2>
            <p style={{ color: "#b7cad8" }}>The exact review and documentation requirements vary by applicant and category.</p>
          </div>
          <div className="steps">
            <article className="step reveal">
              <h3>Expression of Interest</h3>
              <p>Share your organisation, geography, membership base and core capabilities using the form below.</p>
            </article>
            <article className="step reveal">
              <h3>Review &amp; fee details</h3>
              <p>NFTCI reviews fit and category, then emails the applicable fee and document list.</p>
            </article>
            <article className="step reveal">
              <h3>Application &amp; payment</h3>
              <p>Submit the prescribed form and statutory documents, and pay through authorised digital banking channels.</p>
            </article>
            <article className="step reveal">
              <h3>Approval &amp; onboarding</h3>
              <p>Membership takes effect after approval by the Managing Director’s Office, followed by orientation and your Membership ID.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-sm surface-sand" id="payments">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Fees &amp; payment safeguards</span>
            <h2 className="section-heading">Protect yourself when paying any fee</h2>
            <p className="lead">These principles apply to every membership category.</p>
          </div>
          <ul className="safeguards reveal">
            <li>
              <strong>Digital banking only.</strong> All payments must be made through authorised digital banking channels to the Federation.
            </li>
            <li>
              <strong>No cash, ever.</strong> Cash transactions are strictly prohibited. Do not pay cash to any individual claiming to represent NFTCI.
            </li>
            <li>
              <strong>Centralised approval.</strong> Membership is processed and approved only through the Managing Director’s Office.
            </li>
            <li>
              <strong>Not an investment.</strong> Fees and deposits do not constitute investment or profit-sharing and carry no assured returns.
            </li>
            <li>
              <strong>Admission fees</strong> are one-time and non-refundable.
            </li>
            <li>
              <strong>Working deposits</strong> (Category I) are refundable and interest-free, subject to exit clearance.
            </li>
          </ul>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container application-layout">
          <div className="reveal">
            <span className="eyebrow">Start your enquiry</span>
            <h2 className="section-heading">Tell us about your organisation</h2>
            <p className="lead">This Expression of Interest helps the Federation understand your profile. It is not, by itself, a formal membership application.</p>
            <p>After reviewing it, the Federation will advise on eligibility, category, fees and supporting documents.</p>
            <a className="text-link" href={site.bylawsPdf} target="_blank" rel="noopener">
              Review the by-laws <span aria-hidden="true">↗</span>
            </a>
          </div>
          <EnquiryForm id="membership" kind="membership" subject="NFTCI membership enquiry" fields={fields} submitLabel="Send membership enquiry" />
        </div>
      </section>

      <section className="section-sm surface">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="reveal">
            <span className="eyebrow">Common questions</span>
            <h2 className="section-heading">Before you apply</h2>
          </div>
          <div className="reveal">
            {faqs.map((item) => (
              <details className="faq" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
