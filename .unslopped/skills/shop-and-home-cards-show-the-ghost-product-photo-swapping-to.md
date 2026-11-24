---
name: shop-and-home-cards-show-the-ghost-product-photo-swapping-to
title: Shop and Home cards show the ghost product photo, swapping to the model on hover; product pages keep the model first
created: 2026-11-24T14:11:02.228Z
updated: 2026-11-24T14:11:02.228Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261124-c097cf
tags: shop, home, cards, show, ghost, product, photo, swapping, src
---
# Shop and Home cards show the ghost product photo, swapping to the model on hover; product pages keep the model first

## When to use
Requests like:
- "Shop and Home cards show the ghost product photo, swapping to the model on hover; product pages keep the model first"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/shop.test.tsx
- src/components/card-photo.tsx
- src/components/shop-grid.tsx

Acceptance criteria that passed:
- Every Shop card's first image is its colour's product-only cutout, not a studio photo.
- Every Shop card with a studio front photo also holds that photo, hidden until hover or keyboard focus.
- Each Home piece card shows the cutout with the model front photo hidden until hover or keyboard focus.
- A colour without a studio photo shows only its cutout, with no hover image.
- The cutout's contact shadow fades out while the model photo shows.
- Product pages still open on the model front photo.
- In a production build, hovering a Shop card on desktop shows the model and a phone width shows the cutout, checked by screenshot.

Gate runs: 9 (1 failed)

## Known failures
- code gate, lint failed 1 time(s): /Users/alexjoyflorentino/Documents/GitHub/boujie-call/assets/inbox/_tools/recolour.cjs

## Notes
- Merged as PR #76 into develop on 2026-11-24; staging /shop served all 10 hover photos about a minute after the merge.
- One gate failed: eslint linted a local .cjs tool in the git-ignored assets/inbox/_tools; keep local scripts as .txt there or outside the repo.
- Review major: a hidden lazy image still downloads if it is only opacity 0; display none on devices without hover stops the fetch (measured 0 of 10 at phone width). Check network requests, not just looks, when hiding images.
- Old tests that encode a rule the owner replaces get rewritten to the new rule and named in the plan, never deleted.
