---
name: mobile-round-1-full-screen-hero-two-column-grids-and-tighter
title: Mobile round 1: full-screen hero, two-column grids and tighter Home, Shop and product page on phones
created: 2026-10-29T00:09:29.491Z
updated: 2026-10-29T00:09:29.491Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261029-879909
tags: mobile, round, full-screen, hero, two-column, grids, tighter, home, src
---
# Mobile round 1: full-screen hero, two-column grids and tighter Home, Shop and product page on phones

## When to use
Requests like:
- "Mobile round 1: full-screen hero, two-column grids and tighter Home, Shop and product page on phones"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/shop.test.tsx
- src/components/hero-carousel.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx

Acceptance criteria that passed:
- At 390x844 the Home hero headline and Shop the collection button are visible on the first screen over the photo
- Home at 390px is at least 25% shorter than 8631px
- Home pieces, the gift strip and the day and night portraits show two per row at 390px
- The seam button stays on one line at 390px
- Shop filters wrap with no clipped label and no repeated "All pieces" at 390px
- A product colorway with one photo shows no thumbnail squares
- Desktop at 1440 wide keeps its current section heights within 2px on Home and Shop
- No horizontal overflow at 390px on Home, Shop and a product page

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Comparing desktop section heights against the live production URL proved max-md changes left desktop identical.
