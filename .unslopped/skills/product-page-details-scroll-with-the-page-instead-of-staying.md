---
name: product-page-details-scroll-with-the-page-instead-of-staying
title: Product page details scroll with the page instead of staying pinned on desktop
created: 2026-11-18T03:48:18.504Z
updated: 2026-11-18T03:48:18.504Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261118-be1d34
tags: product, page, details, scroll, instead, staying, pinned, src
---
# Product page details scroll with the page instead of staying pinned on desktop

## When to use
Requests like:
- "Product page details scroll with the page instead of staying pinned on desktop"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx

Acceptance criteria that passed:
- On a 1440 x 900 desktop product page, scrolling down 400px moves the product name up by 400px.
- The details column still starts level with the top of the photo.
- The shop filter column stays sticky.
- Screenshots of a product page before and after scrolling at desktop width are sent to Alex.

Gate runs: 9 (1 failed)

## Known failures
- build gate, build failed 1 time(s): > Build error occurred

## Notes
- Merged as PR #61 into develop on 2026-11-18.
- One-line change; reviewed before committing so the review record went in the same commit (one approval instead of two).
- The build stopped once more on the Next.js security warning; the upgrade is queued.
