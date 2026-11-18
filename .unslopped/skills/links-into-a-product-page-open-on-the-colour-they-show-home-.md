---
name: links-into-a-product-page-open-on-the-colour-they-show-home-
title: Links into a product page open on the colour they show (Home Discover the piece, hero slideshow names, bag piece names)
created: 2026-11-18T03:55:23.311Z
updated: 2026-11-18T03:55:23.311Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261118-e04b2a
tags: links, product, page, open, colour, they, show, home, src
---
# Links into a product page open on the colour they show (Home Discover the piece, hero slideshow names, bag piece names)

## When to use
Requests like:
- "Links into a product page open on the colour they show (Home Discover the piece, hero slideshow names, bag piece names)"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/product-links.test.tsx
- src/components/bag-view.tsx
- src/components/hero-carousel.tsx
- src/components/shop-grid.tsx
- src/lib/products.ts

Acceptance criteria that passed:
- Home "Discover the piece" links to /shop/the-romper?colorway=mocha.
- Each hero slide's piece name links to that slide's piece and colour.
- A bag line for The Romper in Mocha links to /shop/the-romper?colorway=mocha.
- Home piece cards and shop cards link to the colour of the photo they show.
- In a browser, clicking Discover the piece opens the product page with Mocha selected.

Gate runs: 9 (1 failed)

## Known failures
- build gate, build failed 1 time(s): > Build error occurred

## Notes
- Merged as PR #62 into develop on 2026-11-18.
- Lesson: when every link builds its own address, colours drift; one helper (productHref) now builds every product link that shows a colour.
- Review tightened tests that built their expectation with the helper under test; assert literal addresses instead.
