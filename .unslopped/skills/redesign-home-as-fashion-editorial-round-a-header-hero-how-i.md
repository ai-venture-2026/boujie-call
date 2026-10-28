---
name: redesign-home-as-fashion-editorial-round-a-header-hero-how-i
title: Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn
created: 2026-10-28T14:30:29.806Z
updated: 2026-10-28T17:40:15.983Z
lastCycle: 20261028-445a13
runs: 3
completed: 3
abandoned: 0
gateFailures: 3
tags: redesign, home, fashion, editorial, round, header, hero, works, src
---
# Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn

## When to use
Requests like:
- "Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn"
- "Redesign Home as fashion editorial, round B: night tiers, socials, waitlist, footer, parallax"
- "Redesign the day to night turn as a quiet split with an evening photograph"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx

Acceptance criteria that passed:
- The turn still shows "Cute enough to open at brunch." on cream and "Irresistible enough to wear that night." on the ink band.
- The ink band shows the Mocha romper photograph and no file from /images/products/.
- The ink band caption "The Romper · Mocha" links to /shop/the-romper.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded
- code gate, scope failed 3 time(s): 1 changed file(s) are not in the plan's "## Files to touch":

## Notes
- A ch-based max width narrowed the headline instead of widening it; set an explicit width to force the overlap.
- Placeholder captions at the bottom of an image collide with overlapping headlines on phones; captions sit top right.
- Alex already runs a dev server on port 3000; check the port before starting another.
- Full-page screenshots never trigger scroll-driven animations, so faded-in text looks missing; review motion pages by scrolling a real viewport.
- Text repeated in the footer (social placeholders) makes page-wide getByText ambiguous; scope tests to main.
- Edge markers collide with headlines on phones; show them from md up.
- Reusing a hero photo in a later section repeats the image for visitors who watch the carousel through; flagged to Alex with a prompt for a dedicated evening image.
