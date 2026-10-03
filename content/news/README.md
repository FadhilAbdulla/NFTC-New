# Writing a news post

Each post is one Markdown (`.md`) or MDX (`.mdx`) file in this folder. The file name becomes the URL:

`content/news/national-convention-2026.md` → `https://nftcindia.in/news/national-convention-2026`

Use lowercase words separated by hyphens. Files starting with `_` and this README are ignored.

## Template

```md
---
title: NFTCI holds its national cooperative convention in Noida
description: One or two sentences (about 150 characters) shown in Google results, social previews and the news list.
date: 2026-11-15
# Optional:
updated: 2026-11-18
author: NFTCI
tags: [convention, membership]
image: /images/news/convention-2026.jpg   # put the file in public/images/news/, ideally 1200×630
imageAlt: Delegates at the NFTCI national convention
draft: true                               # remove this line to publish
---

Write the post here in Markdown. Use `##` for section headings (the title is already the page's H1).

- Bullet lists, **bold**, [links](https://example.com) and tables all work.
```

## Publishing

1. Add the file and any image, then run `npm run dev` and check `http://localhost:3000/news`.
2. Commit and push. Cloudflare rebuilds and deploys automatically (see README).

Publishing the first post automatically adds "News" to the site navigation, the sitemap and the RSS feed at `/news/feed.xml`.
