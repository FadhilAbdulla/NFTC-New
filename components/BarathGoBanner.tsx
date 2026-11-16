import Link from "next/link";
import { barathGo } from "@/lib/site";
import { Glyph } from "./Icon";

const highlights = [
  {
    title: "Driver-first earnings",
    text: "Transparent payouts and welfare benefits, not exploitative commission models.",
    d: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },
  {
    title: "Safe, simple rides",
    text: "Real-time GPS tracking, SOS safety features and secure digital payments.",
    d: "M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4ZM9 12l2 2 4-4",
  },
  {
    title: "Built for India’s journeys",
    text: "Intercity travel, pilgrimage and event mobility, corporate transfers and EV fleets.",
    d: "M3 17h18M6 17l1-8h10l1 8M8 9V6h8v3M7 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
  },
  {
    title: "Backed by the Federation",
    text: "NFTCI SOPs, compliance support and links to government, PSU and tourism programmes.",
    d: "M4 20V10l8-5 8 5v10M8 20v-6h8v6M3 20h18",
  },
];

/** Homepage announcement for BarathGo, the cooperative taxi platform launching under NFTCI. */
export function BarathGoBanner() {
  return (
    <section className="barathgo" aria-labelledby="barathgo-title">
      <div className="container">
        <div className="barathgo__card reveal">
          <div className="barathgo__intro">
            <span className="barathgo__badge">
              <span className="barathgo__dot" aria-hidden="true" /> New · Launching under NFTCI
            </span>
            <h2 id="barathgo-title">
              {barathGo.name}: a community-first taxi platform for India
            </h2>
            <p>
              {barathGo.name} is an online taxi service launching under NFTCI. It brings local transport operators, taxi unions, cooperatives and SHGs onto one app, with fair earnings for drivers, transparent fares and value that stays in local communities.
            </p>
            <div className="barathgo__actions">
              <a className="btn btn-primary" href={barathGo.url} target="_blank" rel="noopener">
                Visit {barathGo.name} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link className="text-link barathgo__secondary" href="/contact">
                Operators &amp; cooperatives: talk to NFTCI
              </Link>
            </div>
          </div>
          <ul className="barathgo__features">
            {highlights.map((item) => (
              <li key={item.title}>
                <span className="barathgo__icon">
                  <Glyph d={item.d} />
                </span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
