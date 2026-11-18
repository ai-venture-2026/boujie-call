---
name: shop-cards-and-the-product-page-photo-show-a-centred-coming-
title: Shop cards and the product page photo show a centred Coming soon or Sold out pill so shoppers know a colour is unavailable
created: 2026-11-18T03:25:16.624Z
updated: 2026-11-18T03:25:16.624Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261118-770798
tags: shop, cards, product, page, photo, show, centred, coming, src
---
# Shop cards and the product page photo show a centred Coming soon or Sold out pill so shoppers know a colour is unavailable

## When to use
Requests like:
- "Shop cards and the product page photo show a centred Coming soon or Sold out pill so shoppers know a colour is unavailable"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/availability.test.tsx
- src/app/shop/shop.test.tsx
- src/components/availability-pill.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/lib/products.ts

Acceptance criteria that passed:
- A shop card for a draft piece shows a "Coming soon" pill centred on its photo.
- A shop card for a colour with every size at 0 shows a "Sold out" pill, and its price line tells screen readers it is sold out.
- A colour with only some sizes at 0, or with unknown counts, shows no pill.
- The product page photo shows the same pill for the colour being viewed.
- Cards with a pill still open their product page when clicked.
- Screenshots of the shop and a product page at desktop and phone width are sent to Alex.

Gate runs: 9 (1 failed)

## Known failures
- build gate, build failed 1 time(s): > Build error occurred

## Notes
- Merged as PR #59 into develop on 2026-11-18.
- The build stopped once on a Next.js security warning (16.4.3 has a known vulnerability; 16.4.6 is out) and passed on retry; the upgrade is logged as debt.
- Review caught that every() on an empty sizes list is true, so a piece with no sizes read as Sold out; guarded. Lesson: an all-of check needs a non-empty guard.
- Alex: pill centred on the photo; Sold out only when every size of a colour is gone; shop cards and the product photo, not Home (Home has no live data; logged).
