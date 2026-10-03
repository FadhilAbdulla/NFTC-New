import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("/privacy");

// Keep this notice accurate if the forms, hosting or email provider change.
const LAST_UPDATED = "3 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero trail={[{ name: "Privacy", path: "/privacy" }]} title="Privacy notice">
        <p>How the Federation handles personal information shared through this website. Last updated {LAST_UPDATED}.</p>
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Who we are</h2>
            <p>
              This website is operated by the {site.legalName} (“NFTCI”, “the Federation”), {site.address.lines.join(", ")}, India. For any question about this notice or your information, write to <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>What we collect</h2>
            <p>We collect only what you choose to send us through the membership and contact forms:</p>
            <ul>
              <li>your name, role, email address and phone number;</li>
              <li>your organisation, state or union territory and area of work;</li>
              <li>the message you write.</li>
            </ul>
            <p>The website does not use advertising or tracking cookies, and does not ask you to create an account.</p>

            <h2>Why we use it</h2>
            <p>We use your information to respond to your enquiry, assess a membership Expression of Interest, and contact you about the next steps you asked about. We do not sell your information or use it for unrelated marketing.</p>

            <h2>How it is handled</h2>
            <p>When you submit a form, your details are sent securely to the Federation’s email inbox through our website hosting provider (Cloudflare) and email delivery provider. The website itself does not keep a database of submissions. If the form cannot be sent directly, your own email app opens instead and the message is sent from your account.</p>
            <p>Enquiries are kept only as long as needed to deal with them and to meet the Federation’s record-keeping obligations.</p>

            <h2>Your choices</h2>
            <p>
              You can ask us to see, correct or delete the information you sent, or withdraw your consent to us using it, by writing to <a href={`mailto:${site.email}`}>{site.email}</a>. We handle personal data in line with India’s Digital Personal Data Protection Act, 2023.
            </p>

            <h2>Changes</h2>
            <p>If we change how we handle information, we will update this page and the date at the top.</p>
          </div>
        </div>
      </section>
    </>
  );
}
