---
name: add-size-choice-add-to-bag-with-validation-saved-bag-and-nav
title: Add size choice, add to bag with validation, saved bag and nav bag count
created: 2026-10-28T09:43:37.223Z
updated: 2026-10-28T09:43:37.223Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261028-5d8935
tags: add, size, choice, bag, validation, saved, src
---
# Add size choice, add to bag with validation, saved bag and nav bag count

## When to use
Requests like:
- "Add size choice, add to bag with validation, saved bag and nav bag count"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/site-header.tsx
- src/lib/bag.test.ts
- src/lib/bag.ts

Acceptance criteria that passed:
- With no colorway and no size, "Add to your bag" shows "Choose a colorway and a size first." and the bag stays empty.
- With a colorway but no size, it shows "Choose a size first." and the bag stays empty.
- With both chosen, the bag gains one line with that slug, colorway and size, and a status confirms it.
- Adding the same piece, colorway and size twice gives one line with qty 2.
- A bag saved in localStorage is read back after a reload.
- A tampered saved bag (unknown slug, qty 99, or invalid JSON) reads back without the bad lines.
- The nav bag link is named "Your bag, 2 pieces" when the bag holds 2 pieces.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- jsdom tests passed while Next prefetched /bag (404); a real browser run is what showed it. Keep a browser pass per round.
- The "live store" premise was unverified; the store is password-gated and boujiecall.com is a Squarespace placeholder. Verify external claims before building on them.
