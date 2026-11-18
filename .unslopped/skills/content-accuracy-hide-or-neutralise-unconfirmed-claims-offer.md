---
name: content-accuracy-hide-or-neutralise-unconfirmed-claims-offer
title: Content accuracy: hide or neutralise unconfirmed claims (offer, fabric, care, size guide) per Alex's approved audit table
created: 2026-11-13T01:21:25.075Z
updated: 2026-11-13T01:21:25.075Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 2
lastCycle: 20261113-40c9db
tags: content, accuracy, hide, neutralise, unconfirmed, claims, offer, fabric, src
---
# Content accuracy: hide or neutralise unconfirmed claims (offer, fabric, care, size guide) per Alex's approved audit table

## When to use
Requests like:
- "Content accuracy: hide or neutralise unconfirmed claims (offer, fabric, care, size guide) per Alex's approved audit table"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.tsx
- src/app/bag/bag.test.tsx
- src/app/content-accuracy.test.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/bag-view.tsx
- src/components/mini-bag.tsx
- src/components/product-view.tsx
- src/components/site-header.tsx
- src/components/size-guide.tsx
- src/lib/bag.ts
- src/lib/products.ts

Acceptance criteria that passed:
- With no confirmed offer, no page shows "Free shipping on 2 or more. Any 2 for $85." (header bar, phone menu, product page).
- A bag with two pieces shows neither "Any 2 for $85 applied at checkout" nor "You've unlocked free shipping", in the bag page and the mini bag.
- A bag with one piece does not show "Add one more piece for free shipping".
- Once getOffer() returns text, the header bar, phone menu and product page show that text.
- Product pages show no Fabric or Care row while both are unset.
- Product pages show no Size guide button while no measurements exist; with measurements, the guide lists them by size.
- The Boujie Set description reads "A cami and shorts set, cute enough for brunch and soft enough to sleep in."
- The Slip Dress description reads "The one you reach for when the night is yours."
- Home reads "Made to be gifted. Sizes S to XL." and the Shop description reads "Nightwear pieces in sizes S to XL."
- The About photo text reads "A woman in a rose slip dress rests her hand on a gift box beside her".
- Screenshots of every changed section at desktop and phone width are sent to Alex.

Gate runs: 10 (2 failed)

## Known failures
- code gate, scope failed 1 time(s): 4 changed file(s) are not in the plan's "## Files to touch":
- release gate, clean tree failed 1 time(s): uncommitted changes:

## Notes
- Merged as PR #54 into develop on 2026-11-13; staging rebuilds from develop.
- Gate failures, both fixed: code (the scope check reads one path per bullet, so a comma separated list of test files failed it) and release (the review record and debt log must be committed through the approve prompt before the tree is clean).
- Lesson: hiding unconfirmed owner content works best as a getter returning null (getOffer, getSizeChart) or a nullable field; tests spy the getter to cover the confirmed state, as help.test.tsx does.
- The audit table missed the bag's free shipping nudges; a repo wide search for the claim's words caught them. Search every phrase of a claim, not only its main sentence.
- Open: Alex confirms @boujiecall on TikTok and Instagram; three minor review findings are logged as debt.
