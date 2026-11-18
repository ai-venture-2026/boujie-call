---
name: crop-the-boujie-set-shop-card-photos-closer-so-they-match-th
title: Crop the Boujie Set shop card photos closer so they match the Romper and Slip Dress cards
created: 2026-11-12T16:40:04.383Z
updated: 2026-11-13T18:28:09.889Z
lastCycle: 20261113-e01650
runs: 2
completed: 2
abandoned: 0
gateFailures: 0
tags: crop, boujie, set, shop, card, photos, closer, they, public, src
---
# Crop the Boujie Set shop card photos closer so they match the Romper and Slip Dress cards

## When to use
Requests like:
- "Crop the Boujie Set shop card photos closer so they match the Romper and Slip Dress cards"
- "Swap in the new shop model photos: Slip Dress and Romper in all colours, Boujie Set Rose with a plus-size model"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/banners/menu-black-slip-dress.webp
- public/images/banners/shop-mocha-romper-lace.webp
- public/images/products/studio/the-boujie-set-after-dark-card.webp
- public/images/products/studio/the-boujie-set-powder-blue-card.webp
- public/images/products/studio/the-boujie-set-rose-back.webp
- public/images/products/studio/the-boujie-set-rose-card.webp
- public/images/products/studio/the-boujie-set-rose-front.webp
- public/images/products/studio/the-romper-after-dark-back.webp
- public/images/products/studio/the-romper-after-dark-front.webp
- public/images/products/studio/the-romper-mocha-back.webp
- public/images/products/studio/the-romper-mocha-front.webp
- public/images/products/studio/the-romper-powder-blue-back.webp
- public/images/products/studio/the-romper-powder-blue-front.webp
- public/images/products/studio/the-romper-rose-back.webp
- public/images/products/studio/the-romper-rose-front.webp
- public/images/products/studio/the-romper-rose-side.webp
- public/images/products/studio/the-slip-dress-after-dark-back.webp
- public/images/products/studio/the-slip-dress-after-dark-front.webp
- public/images/products/studio/the-slip-dress-bloom-back.webp
- public/images/products/studio/the-slip-dress-bloom-front.webp
- public/images/products/studio/the-slip-dress-rose-back.webp
- public/images/products/studio/the-slip-dress-rose-front.webp
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/shop-grid.tsx
- src/components/site-header.test.tsx
- src/components/site-header.tsx
- src/lib/products.test.ts
- src/lib/products.ts

Acceptance criteria that passed:
- Every Slip Dress and Romper colour shows its new model photos, front then back, then the piece on its own.
- The Romper in Rose shows three photos, not four, and no gallery points at a missing file.
- The Boujie Set in Rose shows the plus-size model.
- Every shop card, Boujie Set included, shows the full-length front photo, with no close crop.
- Every new photo's background is the site pink #F8D7E3 at the corners and edges.
- The shop page header and the phone menu still show their original photos.
- Screenshots of the shop page and a product page per piece at desktop and phone width are sent to Alex.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Card crops cut from the existing pink front photos with the saved subject masks; no gate failures. Merged as PR #33 on 2026-11-13.
- Merged as PR #57 into develop on 2026-11-14.
- Lesson: product photo files were borrowed outside the shop (shop header, phone menu), so swapping product photos silently changed those pages. Give every non-product use its own file; a grep for products/studio outside src/lib/products.ts finds them.
- Lesson: next/image keeps optimized copies in .next/cache/images; clear it before local screenshots after replacing a file under the same name, or the old photo shows.
- Alex: shop cards show the full-length front photo for every piece (uniformity), so the Boujie Set card crops were removed.
- Owner references were for the plus-size body only (full hourglass), not glam styling; prompts live at https://claude.ai/artifact/EbMFbgSKw1K1LJrAb26YQJ.
- Open: Slip Dress Bloom reads mid-size rather than plus-size; regenerate later if the owner wants a fuller figure.
