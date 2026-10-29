---
name: design-refinement-c-product-gallery-with-thumbnails-and-phon
title: Design refinement C: product gallery with thumbnails and phone carousel, colorway image switch, size guide modal
created: 2026-10-29T15:28:55.265Z
updated: 2026-10-29T15:28:55.265Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261029-a10368
tags: design, refinement, product, gallery, thumbnails, phone, carousel, colorway, src
---
# Design refinement C: product gallery with thumbnails and phone carousel, colorway image switch, size guide modal

## When to use
Requests like:
- "Design refinement C: product gallery with thumbnails and phone carousel, colorway image switch, size guide modal"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/size-guide.tsx

Acceptance criteria that passed:
- A product page shows three thumbnail buttons (front, back, detail) for a colorway with one photo; views without a photo read "Image to come".
- Choosing a thumbnail shows that view as the main slide on desktop.
- Choosing a colorway shows that colorway's front photo as the main image.
- On phones the slide track scrolls sideways with snap, with one dot per view.
- The Size guide button opens a dialog titled "Size guide" with S, M, L, XL rows and Bust, Waist, Hip columns, marked as a placeholder.
- Rejection: the close button dismisses the size guide, and the product page still contains no exclamation points and none of the words cart, item, order or purchase.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- A swipe carousel needs reachable controls on phones: decorative dots leave keyboard and screen reader users stuck on slide one. Make the dots buttons with aria-current from the start.
- A floated legend lets a button sit beside a fieldset label without breaking the fieldset's name.
- jsdom ignores CSS, so a gallery with md:hidden slides needs one set of named images in the DOM; separate phone and desktop galleries would duplicate every image name.
