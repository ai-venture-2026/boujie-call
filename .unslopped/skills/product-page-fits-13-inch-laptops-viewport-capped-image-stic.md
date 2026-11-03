---
name: product-page-fits-13-inch-laptops-viewport-capped-image-stic
title: Product page fits 13-inch laptops: viewport-capped image, sticky info column, fluid type and spacing; fluid header, headings and section spacing site-wide between 1024 and 1440
created: 2026-10-29T22:49:44.455Z
updated: 2026-10-29T22:49:44.455Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261029-b87a87
tags: product, page, fits, 13-inch, laptops, viewport-capped, image, sticky, src
---
# Product page fits 13-inch laptops: viewport-capped image, sticky info column, fluid type and spacing; fluid header, headings and section spacing site-wide between 1024 and 1440

## When to use
Requests like:
- "Product page fits 13-inch laptops: viewport-capped image, sticky info column, fluid type and spacing; fluid header, headings and section spacing site-wide between 1024 and 1440"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.tsx
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/site-header.test.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- At 1280x720 and 1440x800 the product name, price, colorway swatches, sizes and Add to your bag are all inside the viewport without scrolling
- From md the main image frame ends inside the viewport at 1280x720 and 1440x800, keeps its 3:4 shape, and shows no inner box on the soft pink frame
- From md the info column is sticky under the header (no travel at these sizes: it is taller than the image column)
- The product title follows clamp(36px, 3.2vw, 52px); swatch dots are 32px; size pills are 48 by 40 from md; Add to your bag is 48px tall
- Below 1024 the image column is narrower than the info column; below 768 the phone layout shows
- Labels, buttons, body text and section spacing measure smaller at 1024 than at 1440, and match the earlier values at 1440
- On Home, clicking the logo or Home (header or phone menu) returns to the top of the page; links to other pages keep their normal navigation
- Rejection path: no page scrolls sideways and no label or button wraps at 1024, 1280, 1440 and 1920

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
No gate failed. The brief formula for the image cap (header plus 48px) ignored the Back to the shop row above the photo; measure where the frame starts before sizing a viewport cap. Capping the column, not object-contain, avoids an inner box from the photo ground. Viewport height caps need a floor for landscape phones.
