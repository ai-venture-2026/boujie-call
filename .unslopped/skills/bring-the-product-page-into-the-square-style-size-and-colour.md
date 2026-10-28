---
name: bring-the-product-page-into-the-square-style-size-and-colour
title: Bring the product page into the square style: size and colour choices, photo frame and gallery thumbnails
created: 2026-10-28T23:13:51.364Z
updated: 2026-10-28T23:13:51.364Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-dbdeef
tags: bring, product, page, square, style, size, colour, choices, src
---
# Bring the product page into the square style: size and colour choices, photo frame and gallery thumbnails

## When to use
Requests like:
- "Bring the product page into the square style: size and colour choices, photo frame and gallery thumbnails"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx

Acceptance criteria that passed:
- No element on a product page has rounded corners
- The product photo and thumbnails sit on stone
- Size and colour choices remain 44px tall, show a clear checked state, and keep a visible keyboard focus
- No horizontal overflow at 390px on a product page

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Class-only restyles still need a browser look; the tests can only prove the absence of rounded classes.
