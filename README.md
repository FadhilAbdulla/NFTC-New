# NFTC India website

Website for the **National Federation of Tourism & Transport Co-operatives of India Ltd** — https://nftcindia.in

Next.js (App Router, TypeScript) exported as static HTML and served by a Cloudflare Worker, which also handles the enquiry forms.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000 (forms fall back to the visitor's email app)
npm run preview      # builds, then serves it with Cloudflare's runtime at http://localhost:8787
npm run typecheck
```

## Project layout

| Path | What it is |
| --- | --- |
| `lib/site.ts` | **Single source of truth**: organisation details, navigation, and every page's title, description and sitemap priority |
| `lib/seo.ts` | Builds canonical URLs, Open Graph/Twitter tags and JSON-LD (Organization, WebSite, BreadcrumbList) |
| `app/*/page.tsx` | One folder per page. URLs have no `.html` (`/about`, `/membership`) |
| `app/sitemap.ts`, `app/robots.ts` | Generate `/sitemap.xml` and `/robots.txt` from `lib/site.ts` and the news posts |
| `content/news/` | News posts as Markdown — see [content/news/README.md](content/news/README.md) |
| `components/` | Header, Footer, PageHero, responsive `Picture`, `EnquiryForm`, etc. |
| `app/globals.css` | The design system |
| `worker/index.ts` | Cloudflare Worker: serves `out/` and handles `POST /api/enquiry` |
| `public/` | Files served as-is: optimised images, by-laws PDF, `_headers` |
| `assets/img/` | Full-size image masters (not deployed) |
| `ntfc_final/` | Reference copy of the old site (not deployed) |

## Common tasks

**Add or change a page's SEO** — edit its entry in `lib/site.ts`. Titles get ` | NFTC India` appended automatically (except the homepage). Keep descriptions under ~155 characters.

**Add a page** — create `app/<slug>/page.tsx`, add the path to `PagePath` and `pages` in `lib/site.ts`, and to `primaryNav` if it belongs in the menu. It is added to the sitemap automatically.

**Publish news** — add a Markdown file to `content/news/` and push. "News" appears in the navigation, sitemap and RSS feed (`/news/feed.xml`) once the first post exists.

**Add or replace an image** — put the full-size JPEG in `assets/img/generated/`, run `npm run images` (needs Python 3 + Pillow), then use `<Picture name="file-name" … />`. The script writes WebP sizes to `public/images/` and their dimensions to `lib/images.generated.ts`.

## Enquiry forms

Forms post to `/api/enquiry`. The Worker validates the submission (required fields, email format, honeypot, origin check, 5 per minute per IP) and emails it to `info@nftcindia.in` through [Resend](https://resend.com), with Reply-To set to the visitor. If email delivery is not configured or fails, the browser opens the visitor's email app with the message pre-filled, so no enquiry is silently lost.

Settings live in `wrangler.jsonc` (`ENQUIRY_TO`, `ENQUIRY_FROM`). The API key is a secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

For local testing with real email, put `RESEND_API_KEY=...` in `.dev.vars` (git-ignored) and run `npm run preview`.

## Deploying to Cloudflare

### One-time setup

1. **Move DNS to Cloudflare.** Add `nftcindia.in` to Cloudflare (free plan). Before changing nameservers at the registrar, confirm the imported DNS records include the email records exactly — the mailbox is hosted by GoDaddy:
   - `MX 0 smtp.secureserver.net` and `MX 10 mailstore1.secureserver.net`
   - `TXT "v=spf1 include:secureserver.net -all"` (extend it with `include:amazonses.com` only if Resend asks for it on the root domain; Resend normally uses the `send.` subdomain)
   - `TXT "T1565391"`
   Then switch the nameservers from `ns1/ns2.bluehost.com` to the two Cloudflare gives you. Send a test email to info@nftcindia.in afterwards.
2. **Set up Resend.** Create an account, add the domain `nftcindia.in`, and add the DNS records it shows (they go on the `send.nftcindia.in` subdomain and `resend._domainkey`). Create an API key and run `npx wrangler secret put RESEND_API_KEY`.
3. **Deploy:** `npx wrangler login`, then `npm run deploy`.
4. **Attach the domain.** In the Cloudflare dashboard → Workers & Pages → `nftc-new` → Settings → Domains & Routes, add custom domains `nftcindia.in` and `www.nftcindia.in`.
5. **Redirect www to the bare domain.** Rules → Redirect Rules → template "Redirect from WWW to root" (301, preserve path and query).
6. **Auto-deploy from GitHub (recommended).** Workers & Pages → `nftc-new` → Settings → Builds → connect the GitHub repo with deploy command `npx wrangler deploy` (no build command needed: `wrangler.jsonc` runs `npm run build` itself). Node 22 comes from `.node-version`. Every push to `main` then deploys, and other branches get preview URLs.

   The Worker name in the dashboard must match `name` in `wrangler.jsonc` (`nftc-new`).

### After the first deploy

- Verify `nftcindia.in` in [Google Search Console](https://search.google.com/search-console) (DNS TXT record, easy once DNS is on Cloudflare) and submit `https://nftcindia.in/sitemap.xml`. Do the same in Bing Webmaster Tools.
- Check `https://nftcindia.in/`, `/membership`, a made-up URL (should show the 404 page) and `http://www.nftcindia.in/about.html` (should end at `https://nftcindia.in/about`).
- Submit one test enquiry from each form.
- Optional: enable Cloudflare Web Analytics (cookie-free) for traffic data.

## Content safeguards

- No phone number is published until NFTCI provides a verified one.
- Unverified statistics, testimonials and team names from the old site were not carried over.
- Membership fee amounts are not published; the site states that fees are emailed after an Expression of Interest is reviewed, as the old site's category pages did.
- Programme pages describe capability and focus areas, not unverified completed projects.
