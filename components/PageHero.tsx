import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

export function PageHero({ trail, title, children }: { trail: Crumb[]; title: string; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="container page-hero__inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {trail.map((crumb, index) => (
            <span key={crumb.path} style={{ display: "contents" }}>
              <span aria-hidden="true">/</span>
              {index === trail.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  );
}
