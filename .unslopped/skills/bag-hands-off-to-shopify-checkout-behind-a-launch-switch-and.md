---
name: bag-hands-off-to-shopify-checkout-behind-a-launch-switch-and
title: Bag hands off to Shopify checkout behind a launch switch, and bag prices come from Shopify
created: 2026-11-11T01:21:59.589Z
updated: 2026-11-11T01:21:59.589Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 7
lastCycle: 20261111-2df675
tags: bag, hands, off, shopify, checkout, behind, launch, switch, src
---
# Bag hands off to Shopify checkout behind a launch switch, and bag prices come from Shopify

## When to use
Requests like:
- "Bag hands off to Shopify checkout behind a launch switch, and bag prices come from Shopify"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/api/prices/route.ts
- src/app/bag/bag.test.tsx
- src/components/bag-view.tsx
- src/components/mini-bag.tsx
- src/lib/bag.test.ts
- src/lib/bag.ts
- src/lib/checkout.test.ts
- src/lib/checkout.ts
- src/lib/products.ts
- src/lib/shopify.test.ts
- src/lib/shopify.ts

Acceptance criteria that passed:
- With SHOPIFY_CHECKOUT_ENABLED unset, Checkout returns "Checkout opens soon. Your bag is saved for launch." and makes no Shopify call.
- With the switch on, a valid bag creates a Shopify cart whose lines carry each piece's variant id and quantity, and the result is the cart's checkoutUrl.
- Rejection: a bag line with an unknown piece, colorway or size, or a quantity of 0, 1.5 or above 10, returns a message and makes no cart call.
- Rejection: a sold-out size returns "<piece> in <colorway>, <size> is sold out" and makes no cart call.
- When Shopify fails or returns userErrors, Checkout returns "We couldn't open checkout. Please try again."
- getCatalog returns each variant's id keyed by colorway and size.
- /api/prices returns each piece's Shopify price in cents.
- The bag and mini bag show the Shopify price and a subtotal from it; without an answer they show products.ts prices.
- npm run build exits 0 and npm test passes; /bag returns 200 locally and Checkout shows the opens soon message.

Gate runs: 15 (7 failed)

## Known failures
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:
- build gate, build failed 2 time(s): > Build error occurred
- release gate, clean tree failed 2 time(s): uncommitted changes:
- release gate, commits failed 2 time(s): no commits since cycle start
- release gate, criteria verified failed 2 time(s): 9 acceptance criterion(s) not ticked [x] in the plan. verify each one, then tick it:
- release gate, changelog failed 2 time(s): CHANGELOG.md exists but was not updated this cycle. add an entry for this change, or set practices.changelog to false

## Notes
- A "use server" file must not import a module that holds client hooks (bag.ts): the build fails with useEffect/useState in a Server Component. Keep shared constants in products.ts.
- The code gate passed while the build failed on that import; run npm run build before calling the code phase done.
- The real end to end cart was not created while the store is password locked; test it on staging with the switch on at launch.
