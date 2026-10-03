/**
 * Cloudflare Worker for nftcindia.in.
 * Every request runs this script first (see wrangler.jsonc):
 *   - http:// and www.nftcindia.in → 301 to https://nftcindia.in (same path and query)
 *   - /api/* → handled here
 *   - everything else → static files from out/ via the ASSETS binding
 *
 * POST /api/enquiry → validates the form and emails it to ENQUIRY_TO via Resend (https://resend.com).
 * Returns 503 when RESEND_API_KEY is not configured, so the browser falls back to opening the visitor's email app.
 */

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
  ENQUIRY_TO: string;
  ENQUIRY_FROM: string;
  ENQUIRY_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

const CANONICAL_HOST = "nftcindia.in";
const ALLOWED_ORIGINS = ["https://nftcindia.in", "https://www.nftcindia.in"];
// Old-site URLs whose page still exists: a permanent 301 instead of the assets layer's 307.
// Every other old URL falls through to ASSETS, which applies public/_redirects.
const LEGACY_PAGES = new Set(["/about.html", "/contact.html", "/gallery.html", "/services.html"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LABELS: Record<string, string> = {
  name: "Name",
  role: "Role / designation",
  email: "Email",
  phone: "Phone",
  organisation: "Organisation",
  state: "State / UT",
  category: "Membership interest",
  domain: "Primary domain",
  "enquiry-type": "Enquiry type",
  message: "Message",
};
const REQUIRED: Record<string, string[]> = {
  membership: ["name", "role", "email", "phone", "organisation", "state", "category", "domain", "message"],
  contact: ["name", "email", "enquiry-type", "message"],
};

const json = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

function isAllowedOrigin(origin: string | null, requestUrl: string) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  const own = new URL(requestUrl).origin; // allows *.workers.dev previews and `wrangler dev`
  return origin === own;
}

async function handleEnquiry(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!isAllowedOrigin(request.headers.get("Origin"), request.url)) return json({ error: "Forbidden" }, 403);

  if (env.ENQUIRY_LIMITER) {
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.ENQUIRY_LIMITER.limit({ key: ip });
    if (!success) return json({ error: "Too many submissions. Please wait a minute and try again." }, 429);
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success so they don't retry.
  if (typeof data.website === "string" && data.website.trim() !== "") return json({ ok: true });

  const kind = data.kind === "membership" ? "membership" : data.kind === "contact" ? "contact" : null;
  if (!kind) return json({ error: "Please check the form and try again." }, 400);

  const fields: Record<string, string> = {};
  for (const key of Object.keys(LABELS)) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) fields[key] = value.trim().slice(0, key === "message" ? 4000 : 200);
  }
  const missing = REQUIRED[kind].filter((key) => !fields[key]);
  if (missing.length) return json({ error: `Please fill in: ${missing.map((key) => LABELS[key]).join(", ")}.` }, 400);
  if (!EMAIL.test(fields.email)) return json({ error: "Please enter a valid email address." }, 400);

  if (!env.RESEND_API_KEY) return json({ error: "Email delivery is not configured" }, 503);

  const subject = `${kind === "membership" ? "Membership enquiry" : "Website enquiry"}: ${fields.organisation ?? fields.name}`.replace(/[\r\n]+/g, " ");
  const text = [
    `New ${kind} enquiry from nftcindia.in`,
    "",
    ...Object.entries(fields).map(([key, value]) => (key === "message" ? `\n${LABELS[key]}:\n${value}` : `${LABELS[key]}: ${value}`)),
    "",
    "Reply to this email to respond directly to the sender.",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.ENQUIRY_FROM, to: [env.ENQUIRY_TO], reply_to: fields.email, subject, text }),
  });
  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    return json({ error: "Email delivery failed" }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isProductionHost = url.hostname === CANONICAL_HOST || url.hostname === `www.${CANONICAL_HOST}`;
    if (isProductionHost && (url.hostname !== CANONICAL_HOST || url.protocol !== "https:")) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/api/enquiry") return handleEnquiry(request, env);
    if (url.pathname.startsWith("/api/")) return json({ error: "Not found" }, 404);
    if (LEGACY_PAGES.has(url.pathname)) return Response.redirect(`${url.origin}${url.pathname.slice(0, -5)}${url.search}`, 301);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
