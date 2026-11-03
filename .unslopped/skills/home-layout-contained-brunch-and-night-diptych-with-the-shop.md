---
name: home-layout-contained-brunch-and-night-diptych-with-the-shop
title: Home layout: contained brunch and night diptych with the Shop button below, aligned pieces header and framed cards, one section spacing rhythm
created: 2026-10-29T21:58:23.228Z
updated: 2026-10-29T21:58:23.228Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261029-c7e0f1
tags: home, layout, contained, brunch, night, diptych, shop, button, src
---
# Home layout: contained brunch and night diptych with the Shop button below, aligned pieces header and framed cards, one section spacing rhythm

## When to use
Requests like:
- "Home layout: contained brunch and night diptych with the Shop button below, aligned pieces header and framed cards, one section spacing rhythm"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx

Acceptance criteria that passed:
- The brunch and night panels sit inside the page container with a 12px gap on phones and 16px from md, and both end on the same line at desktop and phone widths
- Each panel shows a 4:3 photo across its full width, then a centered headline and label; brunch is Cream Lace with a #f0c0d0 hairline, night is soft black with Blush Silk text
- "Shop the collection" sits centered below both panels on the page background, outlined; on phones the panels stack brunch then night with the button below
- "View all pieces" sits on the heading row, vertically centered on the heading block and right-aligned to the container edge
- Every piece card frame, including the Image to come card, has a #f0c0d0 hairline on #f9eef2, with name, price and colorway count below
- Padded Home sections are 120px apart on desktop and 72px on phones, with no 240px double gap between the diptych and the pieces
- Rejection path: no part of the night panel extends past the brunch panel or into the next section, and no button straddles two backgrounds
- No page scrolls sideways at 375px

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Add what a future run must know. This section is never overwritten by Unslopped.
