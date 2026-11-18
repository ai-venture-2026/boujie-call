---
name: bag-tick-boxes-shoppers-choose-which-pieces-go-to-checkout-u
title: Bag tick boxes: shoppers choose which pieces go to checkout; unticked pieces stay in the bag
created: 2026-11-11T02:16:52.929Z
updated: 2026-11-11T02:16:52.929Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261111-df4f30
tags: bag, tick, boxes, shoppers, choose, pieces, go, checkout, src
---
# Bag tick boxes: shoppers choose which pieces go to checkout; unticked pieces stay in the bag

## When to use
Requests like:
- "Bag tick boxes: shoppers choose which pieces go to checkout; unticked pieces stay in the bag"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/components/bag-view.tsx
- src/components/mini-bag.test.tsx
- src/components/mini-bag.tsx
- src/lib/bag.test.ts
- src/lib/bag.ts

Acceptance criteria that passed:
- Every bag line shows a tick box labelled "Check out <piece>, <colorway>, <size>", ticked on first view.
- Unticking a piece keeps it in the bag and the untick survives a reload.
- With one of two pieces unticked, the subtotal shows one piece and the Any 2 line is gone.
- Checkout sends only the ticked pieces to startCheckout.
- Rejection: with nothing ticked, Checkout is disabled and the page says "Tick a piece to check out."
- Rejection: a stored line with skip set to anything other than true reads as ticked.
- Adding a piece that was unticked ticks it again.
- With a piece unticked, the mini bag shows no Checkout button and says "Choose what to check out in your bag."
- npm run build exits 0 and npm test passes.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- When totals switch to a filtered list, re-check every empty-state test that used the old count: the mini bag nearly showed "Your bag is empty" with every piece unticked.
- vi.spyOn on the "use server" checkout module works in vitest, so a test can assert exactly what reaches startCheckout.
