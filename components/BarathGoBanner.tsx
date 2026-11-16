import Link from "next/link";
import { barathGo } from "@/lib/site";
import { Glyph } from "./Icon";

const highlights = [
  {
    title: "Driver-first earnings",
    text: "Transparent payouts and welfare benefits, not exploitative commission models.",
    d: "M6 4h12M6 9h12M14.5 20 6 13h3a4.5 4.5 0 0 0 0-9",
  },
  {
    title: "Safe, simple rides",
    text: "Real-time GPS tracking, SOS safety features and secure digital payments.",
    d: "M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4ZM9 12l2 2 4-4",
  },
  {
    title: "Built for India’s journeys",
    text: "Intercity travel, pilgrimage and event mobility, corporate transfers and EV fleets.",
    d: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  },
  {
    title: "Backed by the Federation",
    text: "NFTCI SOPs, compliance support and links to government, PSU and tourism programmes.",
    d: "M4 20V10l8-5 8 5v10M8 20v-6h8v6M3 20h18",
  },
];

const rides = [
  { name: "Mini", eta: "3 min" },
  { name: "Sedan", eta: "5 min" },
  { name: "EV", eta: "4 min", green: true },
];

/** Illustration of the BarathGo passenger app: map with a route, ride choices and a book button. */
function PhoneMockup() {
  return (
    <div className="bg-visual" role="img" aria-label="Illustration of the BarathGo passenger app showing a route on a map, ride options including an electric vehicle, and a book button">
      <div className="bg-visual__glow" aria-hidden="true" />
      <div className="bg-phone" aria-hidden="true">
        <div className="bg-phone__notch" />
        <div className="bg-phone__screen">
          <div className="bg-app-bar">
            <span className="bg-app-logo">
              <span>B</span>
            </span>
            <strong>BarathGo</strong>
            <span className="bg-app-bar__sos">SOS</span>
          </div>
          <svg className="bg-map" viewBox="0 0 260 230" preserveAspectRatio="xMidYMid slice">
            <rect width="260" height="230" fill="#e9eff3" />
            <path d="M-10 168 C 60 150, 110 196, 270 150" stroke="#bfd9ea" strokeWidth="18" fill="none" />
            <rect x="150" y="16" width="70" height="46" rx="8" fill="#d6ead9" />
            <rect x="18" y="20" width="56" height="34" rx="6" fill="#dfe6ec" />
            <rect x="96" y="70" width="44" height="40" rx="6" fill="#dfe6ec" />
            <rect x="168" y="84" width="62" height="36" rx="6" fill="#dfe6ec" />
            <rect x="24" y="96" width="50" height="40" rx="6" fill="#dfe6ec" />
            <g stroke="#ffffff" strokeLinecap="round" fill="none">
              <path d="M0 70 H260" strokeWidth="10" />
              <path d="M84 0 V230" strokeWidth="10" />
              <path d="M152 0 V230" strokeWidth="8" />
              <path d="M0 132 H260" strokeWidth="8" />
              <path d="M0 210 L260 196" strokeWidth="8" />
            </g>
            <path d="M44 200 L84 200 L84 132 L152 132 L152 70 L206 70" stroke="#ffffff" strokeWidth="9" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M44 200 L84 200 L84 132 L152 132 L152 70 L206 70" stroke="#bd5808" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="44" cy="200" r="9" fill="#167454" opacity=".18" />
            <circle cx="44" cy="200" r="5.5" fill="#167454" stroke="#fff" strokeWidth="2" />
            <path d="M206 48c-7 0-12 5-12 11.5 0 8.5 12 18.5 12 18.5s12-10 12-18.5C218 53 213 48 206 48Z" fill="#bd5808" stroke="#fff" strokeWidth="2" />
            <circle cx="206" cy="59.5" r="4" fill="#fff" />
            <g transform="translate(118 124)">
              <rect x="-11" y="-7" width="22" height="14" rx="5" fill="#071a2f" />
              <rect x="-6" y="-5" width="7" height="10" rx="2" fill="#9cc6e4" />
            </g>
          </svg>
          <div className="bg-sheet">
            <div className="bg-sheet__handle" />
            <div className="bg-trip">
              <span className="bg-trip__dot bg-trip__dot--from" />
              <span>Sector 80, Noida</span>
            </div>
            <div className="bg-trip">
              <span className="bg-trip__dot bg-trip__dot--to" />
              <span>Railway station</span>
            </div>
            <div className="bg-rides">
              {rides.map((ride) => (
                <span key={ride.name} className={`bg-ride${ride.name === "EV" ? " is-selected" : ""}`}>
                  <strong>
                    {ride.name}
                    {ride.green && <i className="bg-ride__leaf" />}
                  </strong>
                  <small>{ride.eta}</small>
                </span>
              ))}
            </div>
            <span className="bg-book">Book BarathGo</span>
          </div>
        </div>
      </div>
      <div className="bg-chip bg-chip--top" aria-hidden="true">
        <span className="bg-chip__icon bg-chip__icon--green">₹</span>
        <span>
          <strong>Fair fares</strong>
          <small>More for drivers</small>
        </span>
      </div>
      <div className="bg-chip bg-chip--bottom" aria-hidden="true">
        <span className="bg-chip__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
          </svg>
        </span>
        <span>
          <strong>Live tracking</strong>
          <small>SOS on every ride</small>
        </span>
      </div>
    </div>
  );
}

/** Homepage announcement for BarathGo, the cooperative taxi platform launching under NFTCI. */
export function BarathGoBanner() {
  return (
    <section className="barathgo" aria-labelledby="barathgo-title">
      <div className="container">
        <div className="barathgo__card reveal">
          <div className="barathgo__top">
            <div className="barathgo__intro">
              <span className="barathgo__badge">
                <span className="barathgo__dot" aria-hidden="true" /> New · Launching under NFTCI
              </span>
              <h2 id="barathgo-title">
                <span className="barathgo__brand">{barathGo.name}</span>: a community-first taxi platform for India
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
            <PhoneMockup />
          </div>
          <ul className="barathgo__features">
            {highlights.map((item) => (
              <li key={item.title}>
                <span className="barathgo__icon">
                  <Glyph d={item.d} />
                </span>
                <span className="barathgo__feature-copy">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
