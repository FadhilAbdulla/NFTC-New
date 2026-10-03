import Link from "next/link";
import { Cta } from "@/components/Cta";
import { EnquiryForm, type Field } from "@/components/EnquiryForm";
import { Glyph } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("/contact");

const fields: Field[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  { name: "organisation", label: "Organisation", autoComplete: "organization" },
  { name: "enquiry-type", label: "Enquiry type", type: "select", required: true, full: true, options: ["Membership", "Institutional partnership", "Programme proposal", "Member support", "Media / communications", "Other"] },
  { name: "message", label: "How can NFTCI help?", type: "textarea", required: true, full: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero trail={[{ name: "Contact", path: "/contact" }]} title="Let’s connect capability with opportunity.">
        <p>Contact the Federation about membership, institutional partnerships, programme development or member services.</p>
      </PageHero>

      <section className="section-sm surface">
        <div className="container grid-3">
          <article className="card contact-card reveal">
            <div className="icon-box">
              <Glyph d="M3 5h18v14H3zM3 7l9 6 9-6" />
            </div>
            <h2 className="h3-size">Email the federation</h2>
            <p>For general, membership and partnership enquiries.</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </article>
          <article className="card contact-card reveal">
            <div className="icon-box orange">
              <Glyph d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </div>
            <h2 className="h3-size">Federation office</h2>
            <address style={{ fontStyle: "normal" }}>
              <p>{site.address.lines.join(", ")}, India.</p>
            </address>
            <a href={site.address.mapsUrl} target="_blank" rel="noopener">
              Open in Google Maps ↗
            </a>
          </article>
          <article className="card contact-card reveal">
            <div className="icon-box green">
              <Glyph d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
            </div>
            <h2 className="h3-size">Before you write</h2>
            <p>Include your organisation, location, service domain and the specific outcome you want to discuss.</p>
            <Link href="/membership">Membership guidance →</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container application-layout">
          <div className="reveal">
            <span className="eyebrow">Send an enquiry</span>
            <h2 className="section-heading">Give us enough context to route your message well</h2>
            <p className="lead">A focused note helps the Federation respond with the right next step.</p>
            <ul className="feature-list">
              <li>Your organisation and role</li>
              <li>The state or geography involved</li>
              <li>The service or partnership you need</li>
              <li>Expected scale and timeline, if known</li>
            </ul>
          </div>
          <EnquiryForm id="contact" kind="contact" subject="Enquiry from the NFTCI website" fields={fields} submitLabel="Send enquiry" />
        </div>
      </section>

      <section className="section-sm surface">
        <div className="container">
          <div className="section-intro narrow reveal">
            <span className="eyebrow">Find us</span>
            <h2 className="section-heading">NFTCI federation office, Noida</h2>
          </div>
          <div className="map-card reveal">
            <iframe title="Map showing NFTCI office area in Sector 80, Noida" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=B-81%20Sector%2080%20Noida%20Uttar%20Pradesh&output=embed" />
          </div>
        </div>
      </section>

      <Cta
        eyebrow="Looking to join?"
        title="Start with the membership guide."
        text="Understand categories, benefits, payment safeguards and the application journey before sending your profile."
        primary={{ label: "View membership", href: "/membership" }}
        secondary={{ label: "Read the by-laws", href: site.bylawsPdf, external: true }}
      />
    </>
  );
}
