import Link from "next/link";
import { serviceLinks, site } from "@/lib/site";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import type { NavItem } from "./Header";

export function Footer({ nav }: { nav: NavItem[] }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p className="footer-about">A national-level apex cooperative federation connecting grassroots enterprise with structured tourism, transport, hospitality, logistics and allied service opportunities.</p>
          </div>
          <div>
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-links">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">Key domains</h2>
            <ul className="footer-links">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">Federation office</h2>
            <div className="footer-contact">
              <div>
                <Icon name="pin" size={18} />
                <span>{site.address.lines.join(", ")}, India</span>
              </div>
              <div>
                <Icon name="mail" size={18} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {site.legalName}.
          </p>
          <p>
            <Link href="/privacy">Privacy notice</Link> · <a href={site.bylawsPdf}>By-laws (PDF)</a> · Created by Najaf
          </p>
        </div>
      </div>
    </footer>
  );
}
