import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <span className="eyebrow on-dark">Error 404</span>
        <h1>We couldn’t find that page.</h1>
        <p>The page may have moved when the NFTCI website was rebuilt. These are good places to start:</p>
        <div className="button-row" style={{ marginTop: 32 }}>
          <Link className="btn btn-primary" href="/">
            Go to the homepage
          </Link>
          <Link className="btn btn-ghost" href="/membership">
            Membership
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Contact the federation
          </Link>
        </div>
      </div>
    </section>
  );
}
