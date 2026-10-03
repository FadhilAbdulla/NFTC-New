// Single source of truth for organisation details, navigation and per-page SEO.
// Every page's <title>, description, canonical URL, Open Graph tags and sitemap entry come from here.

export const site = {
  url: "https://nftcindia.in",
  name: "NFTCI",
  shortName: "NFTC India",
  legalName: "National Federation of Tourism & Transport Co-operatives of India Ltd",
  tagline: "India’s apex cooperative platform for tourism, transport and allied services",
  email: "info@nftcindia.in",
  phone: { display: "+91 98950 44424", tel: "+919895044424" },
  locale: "en_IN",
  ogImage: { url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "NFTCI — cooperative tourism and transport across India" },
  bylawsPdf: "/docs/nftci-bylaws.pdf",
  address: {
    lines: ["NCUI Printing Press & Skill Development Centre", "2nd Floor, B-81, Sector 80", "Noida, Uttar Pradesh, NCR of Delhi"],
    streetAddress: "NCUI Printing Press & Skill Development Centre, 2nd Floor, B-81, Sector 80",
    locality: "Noida",
    region: "Uttar Pradesh",
    country: "IN",
    short: "Sector 80, Noida, Uttar Pradesh",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=B-81+Sector+80+Noida+Uttar+Pradesh",
  },
} as const;

export type PagePath = "/" | "/about" | "/services" | "/programmes" | "/gallery" | "/membership" | "/news" | "/contact" | "/privacy";

type PageSeo = { title: string; description: string; label: string; priority: number };

export const pages: Record<PagePath, PageSeo> = {
  "/": {
    label: "Home",
    title: "NFTC India — Cooperative Platform for Tourism & Transport",
    description: "The National Federation of Tourism & Transport Co-operatives of India connects tourism, transport, hospitality and logistics cooperatives nationwide.",
    priority: 1,
  },
  "/about": {
    label: "About",
    title: "About NFTCI — Purpose, Governance & By-Laws",
    description: "How NFTCI is governed: its mandate, Board of Directors, core principles and the by-laws that authorise its pan-India role as an apex cooperative federation.",
    priority: 0.8,
  },
  "/services": {
    label: "Services",
    title: "Services — Tourism, Transport & Logistics",
    description: "NFTCI service domains: transport and mobility, tourism and pilgrimage, logistics, hospitality, trade and agri-trade, SEZ services and horizontal support.",
    priority: 0.8,
  },
  "/programmes": {
    label: "Programmes",
    title: "Programme Areas — Member-Led Delivery",
    description: "Programme areas NFTCI develops with member cooperatives and partners: green mobility, pilgrimage and event mobility, agri-logistics and community tourism.",
    priority: 0.7,
  },
  "/gallery": {
    label: "Gallery",
    title: "Gallery — Cooperative Tourism & Mobility",
    description: "Visual stories from the cooperative tourism, mobility, logistics and member-led programme ecosystem NFTCI supports across India.",
    priority: 0.4,
  },
  "/membership": {
    label: "Membership",
    title: "Membership — How to Join NFTCI",
    description: "NFTCI membership categories, benefits, payment safeguards and how to apply for cooperatives, institutions and aligned organisations across India.",
    priority: 0.9,
  },
  "/news": {
    label: "News",
    title: "News & Updates",
    description: "News, announcements and updates from the National Federation of Tourism & Transport Co-operatives of India.",
    priority: 0.6,
  },
  "/contact": {
    label: "Contact",
    title: "Contact NFTCI — Federation Office, Noida",
    description: "Contact NFTCI about membership, institutional partnerships and programmes. Federation office: B-81, Sector 80, Noida, Uttar Pradesh.",
    priority: 0.7,
  },
  "/privacy": {
    label: "Privacy",
    title: "Privacy Notice",
    description: "How NFTCI handles the personal information you share through enquiry and membership forms on this website.",
    priority: 0.2,
  },
};

// "News" is added automatically once the first post is published (see lib/news.ts).
export const primaryNav: PagePath[] = ["/", "/about", "/services", "/programmes", "/gallery", "/membership", "/contact"];

export const serviceLinks = [
  { label: "Transport & mobility", href: "/services#transport" },
  { label: "Tourism", href: "/services#tourism" },
  { label: "Logistics", href: "/services#logistics" },
  { label: "Hospitality", href: "/services#hospitality" },
  { label: "Trade & rural enterprise", href: "/services#trade" },
] as const;

export const absoluteUrl = (path: string) => (path === "/" ? site.url + "/" : site.url + path);
