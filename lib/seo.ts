import type { Metadata } from "next";
import { absoluteUrl, pages, site, type PagePath } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /** Skip the " | NFTC India" title suffix (used on the homepage, whose title already leads with the brand). */
  absoluteTitle?: boolean;
};

/** Builds complete metadata (canonical, Open Graph, Twitter) for any route. */
export function buildMetadata({ title, description, path, image = site.ogImage, type = "website", publishedTime, modifiedTime, noindex, absoluteTitle }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.shortName,
      locale: site.locale,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for a page registered in lib/site.ts. */
export function pageMetadata(path: PagePath): Metadata {
  const { title, description } = pages[path];
  return buildMetadata({ title, description, path, absoluteTitle: path === "/" });
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.legalName,
  alternateName: [site.name, site.shortName, "NFTC"],
  url: site.url + "/",
  logo: `${site.url}/images/nftci-logo.webp`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.streetAddress,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "India" },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url + "/",
  name: site.shortName,
  alternateName: site.legalName,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-IN",
};

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
