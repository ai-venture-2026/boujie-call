---
name: redesign-home-as-fashion-editorial-round-a-header-hero-how-i
title: Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn
created: 2026-10-28T14:30:29.806Z
updated: 2026-10-28T14:35:50.348Z
lastCycle: 20261028-141c93
runs: 2
completed: 2
abandoned: 0
gateFailures: 3
tags: redesign, home, fashion, editorial, round, header, hero, works, src
---
# Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn

## When to use
Requests like:
- "Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn"
- "Redesign Home as fashion editorial, round B: night tiers, socials, waitlist, footer, parallax"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/image-slot.tsx
- src/components/site-footer.tsx
- src/components/waitlist-form.tsx

Acceptance criteria that passed:
- The three tiers render as spreads in order: The Mini Call, The Signature Call, The Boujie Experience.
- The Boujie Experience spread sits on the ink #141014 background.
- Each tier still shows "Price to come".
- Social channels without a URL render as text such as "Instagram, link to come", not as links.
- The waitlist section sits on ribbon #1a1018 and its button reads "Join the waitlist".
- With prefers-reduced-motion set, no element on Home has a running animation (browser check).
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 11 (3 failed)

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
