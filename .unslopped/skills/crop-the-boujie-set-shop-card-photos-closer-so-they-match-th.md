---
name: crop-the-boujie-set-shop-card-photos-closer-so-they-match-th
title: Crop the Boujie Set shop card photos closer so they match the Romper and Slip Dress cards
created: 2026-11-12T16:40:04.383Z
updated: 2026-11-12T16:40:04.383Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-90d496
tags: crop, boujie, set, shop, card, photos, closer, they, public, src
---
# Crop the Boujie Set shop card photos closer so they match the Romper and Slip Dress cards

## When to use
Requests like:
- "Crop the Boujie Set shop card photos closer so they match the Romper and Slip Dress cards"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/products/studio/the-boujie-set-after-dark-card.webp
- public/images/products/studio/the-boujie-set-powder-blue-card.webp
- public/images/products/studio/the-boujie-set-rose-card.webp
- src/app/shop/shop.test.tsx
- src/components/shop-grid.tsx
- src/lib/products.test.ts
- src/lib/products.ts

Acceptance criteria that passed:
- The Boujie Set Rose shop card shows /studio/the-boujie-set-rose-card
- The Boujie Set product page still opens on "The Boujie Set in After Dark, front" (full length)
- Romper and Slip Dress cards still show their studio front photos (rejection path: no card field, no change)
- Every card file exists, has #F8D7E3 top corners, and is 3:4
- Full test suite and build pass; the shop grid checked in a browser

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Card crops cut from the existing pink front photos with the saved subject masks; no gate failures. Merged as PR #33 on 2026-11-13.
