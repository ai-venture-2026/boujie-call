---
name: make-the-product-photo-backgrounds-a-deeper-pink-and-give-th
title: Make the product photo backgrounds a deeper pink and give the Shop and Send a Call lace close-up a pink background
created: 2026-11-03T17:41:06.996Z
updated: 2026-11-03T17:41:06.996Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261103-5bb413
tags: make, product, photo, backgrounds, deeper, pink, give, shop, assets, public, src
---
# Make the product photo backgrounds a deeper pink and give the Shop and Send a Call lace close-up a pink background

## When to use
Requests like:
- "Make the product photo backgrounds a deeper pink and give the Shop and Send a Call lace close-up a pink background"

## Playbook
Files touched:
- CHANGELOG.md
- assets/pink-batch/README.md
- public/images/details/brown-romper-lace.webp
- public/images/products/the-romper-after-dark.webp
- public/images/products/the-romper-mocha.webp
- public/images/products/the-romper-powder-blue.webp
- public/images/products/the-romper-rose.webp
- public/images/products/the-slip-dress-after-dark.webp
- public/images/products/the-slip-dress-bloom.webp
- public/images/products/the-slip-dress-rose.webp
- src/app/globals.css
- src/lib/images.test.ts
- src/lib/product-photos.test.ts

Acceptance criteria that passed:
- All 7 product photos have a #F8D7E3 border (every border pixel within 2 levels per channel)
- The stone colour token is #f8d7e3, so every product card matches its photo
- The lace close-up has a pink background sample (hue 300 to 15 degrees)
- Rejection: the photo, token and lace tests fail on the current #F9EEF2 and beige files, shown by the red run
- The drop folder README lists no photo as waiting

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- A deeper photo ground needs a background only mask, not a multiply; multiply tints light garments (Powder Blue to lavender).
- Derived crops can be traced to their source by template matching on downscaled greyscale; the lace close-up was a crop of the brown romper hero.
- Before changing a shared token, list every use; bg-stone also colours the Home detail panel, which shows without its photo on phones.
