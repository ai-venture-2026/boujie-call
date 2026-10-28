---
name: add-branded-404-link-previews-sitemap-and-robots-and-stacked
title: Add branded 404, link previews, sitemap and robots, and stacked mobile hero buttons
created: 2026-10-28T13:24:02.375Z
updated: 2026-10-28T13:24:02.375Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 6
lastCycle: 20261028-91f6ac
tags: add, branded, 404, link, previews, sitemap, robots, stacked, src
---
# Add branded 404, link previews, sitemap and robots, and stacked mobile hero buttons

## When to use
Requests like:
- "Add branded 404, link previews, sitemap and robots, and stacked mobile hero buttons"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/layout.tsx
- src/app/not-found.tsx
- src/app/opengraph-image.png
- src/app/page.tsx
- src/app/robots.ts
- src/app/seo.test.tsx
- src/app/sitemap.ts
- src/lib/content.ts

Acceptance criteria that passed:
- An unknown URL shows "This page didn't pick up." with a link to Home, inside the site header and footer.
- The sitemap lists Home, Shop and the three product pages on https://boujiecall.com, and nothing else.
- robots allows crawling and points to https://boujiecall.com/sitemap.xml.
- Pages carry an Open Graph image of 1200x630 and absolute URLs on https://boujiecall.com.
- On a 390px wide screen the hero "Join the waitlist" button renders at 342px wide and the secondary text link renders below it.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 14 (6 failed)

## Known failures
- plan gate, criteria quality failed 6 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):

## Notes
- The criteria checker treats "works" as vague, so UI labels like "How it works" trip it; name the element instead of quoting the label.
- Importing app/layout.tsx in vitest needs next/font/google stubbed.
