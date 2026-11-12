---
name: clear-bought-pieces-from-the-bag-after-a-completed-shopify-c
title: Clear bought pieces from the bag after a completed Shopify checkout by checking the Shopify cart on return
created: 2026-11-12T16:25:36.149Z
updated: 2026-11-12T16:25:36.149Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261112-cd59c4
tags: clear, bought, pieces, bag, completed, shopify, checkout, checking, src
---
# Clear bought pieces from the bag after a completed Shopify checkout by checking the Shopify cart on return

## When to use
Requests like:
- "Clear bought pieces from the bag after a completed Shopify checkout by checking the Shopify cart on return"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/components/bag-view.tsx
- src/components/mini-bag.tsx
- src/components/site-header.tsx
- src/lib/bag.test.ts
- src/lib/bag.ts
- src/lib/checkout.test.ts
- src/lib/checkout.ts

Acceptance criteria that passed:
- startCheckout returns the Shopify cart id with the checkout address
- orderPlaced is true when Shopify answers cart null, false when the cart still exists, false on a failed request, and false without asking Shopify for an id that is not a Shopify cart id
- After a placed order, the sent quantities leave the bag and unsent lines stay
- When the cart still exists, the bag and the saved record stay unchanged (rejection path)
- A record older than 7 days is dropped without changing the bag
- Pressing Checkout with a successful handoff saves the cart id and the sent lines
- Two overlapping returns subtract once, a failed Shopify check keeps the bag, and a line unticked after checkout stays
- Full test suite and build pass

Gate runs: 9 (1 failed)

## Known failures
- release gate, clean tree failed 1 time(s): uncommitted changes:
- release gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
An independent review after the first commit found three major issues: overlapping returns subtracted twice, a rejected check threw, and unticked lines were cut. Fixed with a shared in-flight promise, a re-read of the record after the await, and skipping unticked lines; three tests added. Lesson: async read, await, write flows on localStorage need an overlap test from the start. Real order test still pending on staging. Merged as PR #31 on 2026-11-13.
