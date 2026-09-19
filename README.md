# NFTCI website

A responsive, dependency-light website for the **National Federation of Tourism & Transport Co-operatives of India Ltd**.

## Pages

- `index.html` — homepage and federation overview
- `about.html` — purpose, mandate and governance
- `services.html` — integrated service domains
- `projects.html` — priority programme areas and delivery model
- `gallery.html` — visual overview of the operating ecosystem
- `memberships.html` — eligibility guidance, benefits, FAQ and enquiry
- `contact.html` — federation office, map and enquiry form

## Architecture

The website is plain semantic HTML, CSS and JavaScript with no compilation step or runtime framework.

- `assets/css/theme.css` contains the complete responsive design system.
- `assets/js/site.js` renders the shared header/footer and manages the mobile menu, reveal effects and email forms.
- `assets/img/brand` contains the official logo and favicons sourced from `ntfc_final`.
- `assets/img/generated` contains the optimized editorial image set created specifically for this website.
- `assets/docs/nftci-bylaws.pdf` is the official by-laws document supplied with the source assets.

The original `ntfc_final` folder remains untouched as source/reference material. Legacy Tailwind files are retained for reference but are not loaded by the rebuilt site.

## Forms

The membership and contact forms validate in the browser and open the visitor's email application with a prepared message addressed to `info@nftcindia.in`. No visitor information is stored by the static site.

For production-grade form delivery, replace this mail-client workflow with an approved backend or form provider and add an appropriate privacy notice.

## Local preview

```bash
npm run serve
# open http://localhost:8080
```

Run the JavaScript syntax check with:

```bash
npm run check
```

## Content safeguards

- The placeholder telephone number in the source site is intentionally not displayed.
- Unverified statistics and template testimonials were removed.
- Programme pages describe capability and focus areas, not unverified completed projects.
- Generated editorial imagery contains no third-party logos or embedded text.
