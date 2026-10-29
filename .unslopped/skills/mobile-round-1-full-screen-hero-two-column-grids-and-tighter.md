---
name: mobile-round-1-full-screen-hero-two-column-grids-and-tighter
title: Mobile round 1: full-screen hero, two-column grids and tighter Home, Shop and product page on phones
created: 2026-10-29T00:09:29.491Z
updated: 2026-10-29T00:19:33.154Z
lastCycle: 20261029-f03ec1
runs: 2
completed: 2
abandoned: 0
gateFailures: 2
tags: mobile, round, full-screen, hero, two-column, grids, tighter, home, src
---
# Mobile round 1: full-screen hero, two-column grids and tighter Home, Shop and product page on phones

## When to use
Requests like:
- "Mobile round 1: full-screen hero, two-column grids and tighter Home, Shop and product page on phones"
- "Mobile round 2: Send a Call and About on phones"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/globals.css
- src/app/page.test.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/shop.test.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- At 390x844 the Send a Call and About headlines are visible on the first screen over the photo
- Send a Call at 390px is at least 25% shorter than 6357px; About is shorter than 4458px
- The four Send a Call steps show two per row at 390px
- The phone menu fills the screen in cream with the four pages, a collection photo card, the offer line, a solid Shop the collection button and Instagram
- The menu still closes on the close button, a chosen link and Escape
- Desktop section heights on Send a Call and About match the live site within 2px
- Back to the shop on product pages shows a back arrow
- No horizontal overflow at 390px on Send a Call, About or the open menu

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Comparing desktop section heights against the live production URL proved max-md changes left desktop identical.
- Adding the menu to every page duplicated the offer text; tests that look up page text should scope to main.
- Set the length target before trimming and measure after; the first pass fell short at 24% and needed one more trim.
