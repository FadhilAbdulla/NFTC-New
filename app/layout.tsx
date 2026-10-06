import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header, type NavItem } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/RevealObserver";
import { hasNews } from "@/lib/news";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { pages, primaryNav, site } from "@/lib/site";
import "./globals.css";

const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const display = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: pages["/"].title, template: `%s | ${site.shortName}` },
  description: pages["/"].description,
  applicationName: site.shortName,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: false },
  alternates: { types: { "application/rss+xml": [{ url: "/news/feed.xml", title: `${site.shortName} news` }] } },
};

export const viewport: Viewport = { themeColor: "#071a2f", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navPaths = hasNews() ? [...primaryNav.slice(0, -1), "/news" as const, primaryNav[primaryNav.length - 1]] : primaryNav;
  const nav: NavItem[] = navPaths.map((path) => ({ label: pages[path].label, href: path }));
  return (
    <html lang="en-IN" className={`${body.variable} ${display.variable}`}>
      <head>
        {/* Enables reveal animations only when JS runs; content is fully visible otherwise. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header nav={nav} />
        <main id="main">{children}</main>
        <Footer nav={nav} />
        <RevealObserver />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {/* Google Analytics 4. Loads after the page is interactive so it doesn't slow first paint.
            Client-side navigations are counted by GA4's enhanced measurement (browser history events). */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaMeasurementId}');`}
        </Script>
      </body>
    </html>
  );
}
