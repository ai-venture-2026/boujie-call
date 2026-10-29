---
name: point-share-image-and-sitemap-urls-at-the-deployed-address-u
title: Point share image and sitemap URLs at the deployed address until boujiecall.com moves
created: 2026-10-29T00:36:17.066Z
updated: 2026-10-29T00:36:17.066Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261029-f47834
tags: point, share, image, sitemap, urls, deployed, address, until, src
---
# Point share image and sitemap URLs at the deployed address until boujiecall.com moves

## When to use
Requests like:
- "Point share image and sitemap URLs at the deployed address until boujiecall.com moves"

## Playbook
Files touched:
- CHANGELOG.md
- src/lib/content.test.ts
- src/lib/content.ts

Acceptance criteria that passed:
- On the deployed site, og:image, twitter:image and the sitemap entries start with the address the page was served from, and fetching og:image returns image/png
- With no deployment variables, siteUrl() still returns https://boujiecall.com
- An explicit NEXT_PUBLIC_SITE_URL overrides the Vercel address

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Never hard-code the public origin; derive it from the deployment so previews and sitemaps follow wherever the site is served.
