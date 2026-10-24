"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TravelGuide } from "@/lib/travel";
import { Icon } from "./Icon";

type GuideCard = Omit<TravelGuide, "body" | "author" | "date" | "updated" | "tags" | "imageAlt" | "featured">;

export function TravelGuideGrid({ guides }: { guides: GuideCard[] }) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("All journeys");
  const themes = useMemo(() => ["All journeys", ...Array.from(new Set(guides.map((guide) => guide.theme)))], [guides]);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return guides.filter((guide) => {
      const matchesTheme = theme === "All journeys" || guide.theme === theme;
      const haystack = [guide.title, guide.description, guide.region, guide.bestFor, ...guide.destinations].join(" ").toLowerCase();
      return matchesTheme && (!needle || haystack.includes(needle));
    });
  }, [guides, query, theme]);

  return (
    <>
      <div className="travel-tools" aria-label="Filter travel guides">
        <label className="travel-search">
          <span>Search by place or interest</span>
          <span className="travel-search__field">
            <Icon name="search" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Try Varanasi, meditation or Kerala" />
          </span>
        </label>
        <div className="travel-filters" aria-label="Journey theme">
          {themes.map((item) => (
            <button key={item} type="button" className={theme === item ? "is-active" : ""} aria-pressed={theme === item} onClick={() => setTheme(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="travel-results" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "journey" : "journeys"}
      </p>
      {visible.length ? (
        <div className="travel-grid">
          {visible.map((guide) => (
            <article className="travel-card card hover-card" key={guide.slug}>
              <Link className="travel-card__media" href={`/travel/${guide.slug}`} tabIndex={-1} aria-hidden="true">
                <img src={guide.image} alt="" loading="lazy" />
                <span>{guide.theme}</span>
              </Link>
              <div className="travel-card__body">
                <div className="travel-card__facts">
                  <span>{guide.duration}</span>
                  <span>{guide.region}</span>
                </div>
                <h2><Link href={`/travel/${guide.slug}`}>{guide.title}</Link></h2>
                <p>{guide.description}</p>
                <Link className="text-link" href={`/travel/${guide.slug}`} aria-label={`Explore ${guide.title}`}>
                  View itinerary <Icon name="arrow" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2 className="h3-size">No journeys match that search</h2>
          <p>Try another place or choose a different theme.</p>
          <button className="btn btn-outline" type="button" onClick={() => { setQuery(""); setTheme("All journeys"); }}>Clear filters</button>
        </div>
      )}
    </>
  );
}
