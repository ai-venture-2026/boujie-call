---
name: home-sections-round-1-detail-split-statement-with-photo-stri
title: Home sections round 1: detail split, statement with photo strip, adaptive glass nav
created: 2026-10-28T20:19:39.462Z
updated: 2026-10-28T20:19:39.462Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261028-e813f5
tags: home, sections, round, detail, split, statement, photo, strip, assets, public, src
---
# Home sections round 1: detail split, statement with photo strip, adaptive glass nav

## When to use
Requests like:
- "Home sections round 1: detail split, statement with photo strip, adaptive glass nav"

## Playbook
Files touched:
- CHANGELOG.md
- assets/uptb2.png
- public/images/details/black-slip-lace.webp
- public/images/details/brown-romper-lace.webp
- public/images/details/pink-slip-hem.webp
- public/images/hero/black-slip-studio.webp
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/hero-carousel.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- Home shows The Romper in Mocha beside a close-up of its lace, with one "Discover the piece" button linking to /shop/the-romper.
- Home shows the statement headline, a strip of five photos and the three steps in order.
- Home no longer shows the gift tiers.
- Scrolled over a light section the nav renders translucent with a backdrop blur and ink text; scrolled over the night band or footer it renders cream text and the pink logo (browser check).
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 11 (3 failed)

## Known failures
- code gate, tests kept failed 3 time(s): tests were removed:

## Notes
- Removing a section removes its tests; document each under ## Removed tests before the code gate, not after.
- A one-line caption plus controls overflowed a 390px phone by 1px; let captions wrap on phones.
- Crop coordinates for a new photo must be re-measured; reusing the old photo's numbers cropped empty wall.
