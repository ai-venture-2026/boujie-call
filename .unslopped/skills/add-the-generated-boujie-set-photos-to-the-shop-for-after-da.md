---
name: add-the-generated-boujie-set-photos-to-the-shop-for-after-da
title: Add the generated Boujie Set photos to the shop for After Dark, Powder Blue and Rose on the site pink
created: 2026-11-12T16:35:01.650Z
updated: 2026-11-12T16:35:01.650Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-4a8915
tags: add, generated, boujie, set, photos, shop, dark, powder, public, src
---
# Add the generated Boujie Set photos to the shop for After Dark, Powder Blue and Rose on the site pink

## When to use
Requests like:
- "Add the generated Boujie Set photos to the shop for After Dark, Powder Blue and Rose on the site pink"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/products/studio/the-boujie-set-after-dark-back.webp
- public/images/products/studio/the-boujie-set-after-dark-front.webp
- public/images/products/studio/the-boujie-set-powder-blue-front.webp
- public/images/products/studio/the-boujie-set-powder-blue-side.webp
- public/images/products/studio/the-boujie-set-rose-back.webp
- public/images/products/studio/the-boujie-set-rose-front.webp
- public/images/products/the-boujie-set-after-dark.webp
- public/images/products/the-boujie-set-powder-blue.webp
- public/images/products/the-boujie-set-rose.webp
- src/app/shop/shop.test.tsx
- src/lib/products.test.ts
- src/lib/products.ts

Acceptance criteria that passed:
- The Boujie Set in After Dark opens on "The Boujie Set in After Dark, front" and its gallery is front, back, on its own
- Powder Blue is front, side, on its own; Rose is front, back, on its own
- Every new photo exists in public, cutouts are 1024x1024, and every border or top corner pixel is within 2 of #F8D7E3 (existing photo test)
- A colorway with no photos still shows Image to come frames (rejection path, on a fixture)
- No brown colorway appears on the set
- The shop grid shows the set's studio front photo on its cards
- Full test suite and build pass; shop and set pages checked in a browser at desktop and phone width

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Background swap reused the Romper cycle's Vision mask; it removed the white floor band in the black front shot cleanly. Gallery path count test needed the new total (22 to 31). Tests that used the set as the no photo fixture moved to a stand in product. Playwright is not a repo dependency; it ran from the npx cache. Merged as PR #32 on 2026-11-13.
