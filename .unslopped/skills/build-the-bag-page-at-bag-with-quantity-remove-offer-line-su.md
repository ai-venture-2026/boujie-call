---
name: build-the-bag-page-at-bag-with-quantity-remove-offer-line-su
title: Build the bag page at /bag with quantity, remove, offer line, subtotal and a checkout handler in its own file
created: 2026-10-28T23:03:44.010Z
updated: 2026-10-28T23:03:44.010Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261028-814f28
tags: build, bag, page, quantity, remove, offer, line, src
---
# Build the bag page at /bag with quantity, remove, offer line, subtotal and a checkout handler in its own file

## When to use
Requests like:
- "Build the bag page at /bag with quantity, remove, offer line, subtotal and a checkout handler in its own file"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/app/bag/page.tsx
- src/components/bag-view.tsx
- src/lib/bag.ts
- src/lib/checkout.ts
- vitest.config.ts

Acceptance criteria that passed:
- /bag shows "Your bag is empty" and a Shop the collection link when the bag is empty
- /bag lists each piece with photo, name, colour, size, price and quantity
- Plus raises a quantity up to the maximum; minus is disabled at one
- Remove takes a piece out of the bag and the count in the nav follows
- One piece shows "Add one more piece for free shipping"; two or more show "You've unlocked free shipping"
- Rejection: pressing Checkout shows that checkout opens soon, reports no payment and leaves the bag unchanged
- From two pieces up the subtotal carries "Any 2 for $85 applied at checkout"
- The bag survives a page refresh
- No horizontal overflow at 390px on /bag

Gate runs: 13 (5 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- A worktree under .unslopped puts a second copy of the tests inside the repo; vitest now excludes .unslopped.
- Async handlers need findBy queries in tests.
