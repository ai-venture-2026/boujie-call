---
name: design-refinement-a-pink-pill-buttons-pink-accents-and-small
title: Design refinement A: pink pill buttons, pink accents, and small fixes (US spelling, shop filters, mobile cards, footer, socials)
created: 2026-10-29T15:08:37.989Z
updated: 2026-10-29T15:08:37.989Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261029-1073d2
tags: design, refinement, pink, pill, buttons, accents, small, src
---
# Design refinement A: pink pill buttons, pink accents, and small fixes (US spelling, shop filters, mobile cards, footer, socials)

## When to use
Requests like:
- "Design refinement A: pink pill buttons, pink accents, and small fixes (US spelling, shop filters, mobile cards, footer, socials)"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/shop.test.tsx
- src/components/bag-view.tsx
- src/components/mini-bag.test.tsx
- src/components/mini-bag.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/waitlist-form.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- "Add to your bag", the Home hero "Shop the collection", the waitlist submit and the bag "Checkout" carry the `cta-primary` class.
- "Discover the piece", "View all pieces", "Back to the shop" and the nav "Shop the collection" carry `cta` without `cta-primary`.
- `.cta` renders with a fully rounded border (border-radius 9999px) in the built CSS.
- A chosen size pill gets the blush fill and pink border classes; a chosen swatch gets the pink ring.
- The shop shows "All colors" and no "All colours"; "All pieces" appears once in the shop filters.
- On mobile the piece and color filters sit in one container that scrolls sideways and does not wrap.
- Each shop card puts the product name on its own line, with colorway and price together on the next.
- The footer shows "Luxury nightwear gifts." and links TikTok to https://www.tiktok.com/@boujiecall and Instagram to https://www.instagram.com/boujiecall.
- Rejection: the shop and product pages still contain no exclamation points and none of the words purchase, item, cart or order.

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 2 time(s): 3 style problem(s) in the diff. write precisely and directly:
- release gate, clean tree failed 1 time(s): uncommitted changes:

## Notes
- Style gate rejects test names joined by "and"; write one outcome per test from the start.
- Shared button classes need a dark-section variant: a pink fill that sweeps to ink vanishes on ink panels, so check hover and focus on every background a class lands on.
- A scrolling row (overflow-x auto) clips focus outlines vertically; pad it by outline width plus offset.
