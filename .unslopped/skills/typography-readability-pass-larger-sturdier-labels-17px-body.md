---
name: typography-readability-pass-larger-sturdier-labels-17px-body
title: Typography readability pass: larger sturdier labels, 17px body, darker muted text, heavier Cormorant, clearer prices and inputs
created: 2026-10-29T22:21:28.269Z
updated: 2026-10-29T22:21:28.269Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261029-42bbf8
tags: typography, readability, pass, larger, sturdier, labels, 17px, body, src
---
# Typography readability pass: larger sturdier labels, 17px body, darker muted text, heavier Cormorant, clearer prices and inputs

## When to use
Requests like:
- "Typography readability pass: larger sturdier labels, 17px body, darker muted text, heavier Cormorant, clearer prices and inputs"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/bag-view.tsx
- src/components/hero-carousel.tsx
- src/components/mini-bag.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/size-guide.tsx
- src/components/waitlist-form.tsx

Acceptance criteria that passed:
- Uppercase labels and buttons render at 13px on desktop and 12px on phones, weight 500, letter spacing about 0.14em to 0.16em
- Body paragraphs render at 17px on desktop and 16px on phones with line height about 1.6, weight 400
- Muted text is darker than before and measures at least 4.5:1 on Cream Lace, Blush Silk and the product frame color
- Display headings render at Cormorant 400 with 400 italic accents; piece names, step titles, panel headlines, box item names and bag line names render at 500, 2px larger
- Prices render in DM Sans 500
- The waitlist input is at least 16px and its placeholder measures at least 4.5:1; size pills are at least 13px
- Rejection path: no page at 1440, 768 or 390 scrolls sideways, and no nav, button or card label wraps onto a second line

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
No gate failed. Review caught that overriding --text-base only reaches elements with the text-base class; set font-size on body too. Bigger labels collided in the header between 768 and 1279; check every breakpoint with a text line count, not element height (44px tap targets look wrapped).
