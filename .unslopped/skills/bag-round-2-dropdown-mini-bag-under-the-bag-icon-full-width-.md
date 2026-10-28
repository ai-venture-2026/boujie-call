---
name: bag-round-2-dropdown-mini-bag-under-the-bag-icon-full-width-
title: Bag round 2: dropdown mini bag under the bag icon, full-width panel on phones, and open the bag for 3 seconds after adding a piece
created: 2026-10-28T23:08:15.444Z
updated: 2026-10-28T23:08:15.444Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-2cbbba
tags: bag, round, dropdown, mini, icon, full-width, src
---
# Bag round 2: dropdown mini bag under the bag icon, full-width panel on phones, and open the bag for 3 seconds after adding a piece

## When to use
Requests like:
- "Bag round 2: dropdown mini bag under the bag icon, full-width panel on phones, and open the bag for 3 seconds after adding a piece"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/page.test.tsx
- src/components/mini-bag.test.tsx
- src/components/mini-bag.tsx
- src/components/product-view.tsx
- src/components/site-header.tsx
- src/lib/bag.ts

Acceptance criteria that passed:
- Pressing the bag icon opens the mini bag instead of leaving the page
- The mini bag closes on Escape, on a click outside and on the icon
- It shows up to three pieces with "+ X more" for the rest, the offer line and the subtotal
- View bag links to /bag
- Rejection: Checkout shows that checkout opens soon and reports no payment
- Empty state shows "Your bag is empty" with Shop the collection
- Adding a piece on a product page opens the bag, which closes after about 3 seconds unless hovered
- On phones the panel spans the full width under the header with no horizontal overflow at 390px

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- An absolutely positioned panel still counts as a flex item through its wrapper; wrap it in display contents so justify-between does not move siblings. Only the browser check caught this.
