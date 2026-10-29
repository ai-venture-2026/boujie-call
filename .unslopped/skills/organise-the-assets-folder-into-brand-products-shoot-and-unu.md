---
name: organise-the-assets-folder-into-brand-products-shoot-and-unu
title: Organise the assets folder into brand, products, shoot and unused with readable names, and remove unused public images
created: 2026-10-28T23:51:41.544Z
updated: 2026-10-28T23:51:41.544Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261028-faf760
tags: organise, assets, folder, brand, products, shoot, unused, readable, public
---
# Organise the assets folder into brand, products, shoot and unused with readable names, and remove unused public images

## When to use
Requests like:
- "Organise the assets folder into brand, products, shoot and unused with readable names, and remove unused public images"

## Playbook
Files touched:
- CHANGELOG.md
- assets/Pink And Black Elegant Beauty Logo - 2 (1).png
- assets/brand/logo-original.png
- assets/products/romper-after-dark.webp
- assets/products/romper-mocha.webp
- assets/products/romper-powder-blue.webp
- assets/products/romper-rose.webp
- assets/products/slip-dress-after-dark.webp
- assets/products/slip-dress-bloom.webp
- assets/products/slip-dress-rose.webp
- assets/shoot/banners/about-banner-rose-dress.png
- assets/shoot/banners/home-banner-blue-romper.png
- assets/shoot/banners/send-a-call-banner-mocha-romper.png
- assets/shoot/hero/hero-1-black-slip.png
- assets/shoot/hero/hero-2-blue-romper.png
- assets/shoot/hero/hero-3-pink-slip.png
- assets/shoot/hero/hero-4-brown-romper.png
- assets/shoot/home/day-rose-slip.png
- assets/shoot/home/night-after-dark.png
- assets/shoot/home/section-2-mocha-romper.png
- assets/shoot/home/strip-a-ribbon.png
- assets/shoot/home/strip-b-open-box.png
- assets/shoot/home/strip-c-card.png
- assets/shoot/home/strip-d-unboxing.png
- assets/shoot/home/strip-e-mist.png
- assets/shoot/pages/about-hero-blue-romper.png
- assets/shoot/pages/about-story-after-dark.png
- assets/shoot/pages/send-a-call-hero-rose-slip.png
- assets/unused/hero-black-slip-first-take.png
- assets/unused/mocha-romper-dresser.png
- public/images/details/black-slip-lace.webp

Acceptance criteria that passed:
- Listing assets/ shows exactly four folders: brand, products, shoot, unused
- next build exits 0 and all page tests pass after the move
- Every page returns 200 with no broken image in the browser

Gate runs: 13 (5 failed)

## Known failures
- plan gate, criteria quality failed 4 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- A name search over-reports unused public images; product and logo files are built from templates. Check templates before deleting.
