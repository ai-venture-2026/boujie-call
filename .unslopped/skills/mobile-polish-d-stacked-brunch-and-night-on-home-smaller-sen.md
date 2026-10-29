---
name: mobile-polish-d-stacked-brunch-and-night-on-home-smaller-sen
title: Mobile polish D: stacked brunch and night on Home, smaller sentence case how-it-works heading, one-column Send a Call steps, footer order on phones, calmer Shop header with gift line below the grid
created: 2026-10-29T15:50:31.710Z
updated: 2026-10-29T15:50:31.710Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 10
lastCycle: 20261029-abd860
tags: mobile, polish, stacked, brunch, night, home, smaller, sentence, src
---
# Mobile polish D: stacked brunch and night on Home, smaller sentence case how-it-works heading, one-column Send a Call steps, footer order on phones, calmer Shop header with gift line below the grid

## When to use
Requests like:
- "Mobile polish D: stacked brunch and night on Home, smaller sentence case how-it-works heading, one-column Send a Call steps, footer order on phones, calmer Shop header with gift line below the grid"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/site-footer.tsx

Acceptance criteria that passed:
- Below md the brunch and night halves stack in one column, brunch first on cream, night on ink with the Shop the collection button at its bottom; desktop keeps two columns.
- Below md the heading "Someone places a call. She receives a moment." displays in sentence case at 2rem; from md up it displays in capitals.
- Send a Call steps are one column below md and four from md.
- Below md the footer shows the monogram first and the copyright last.
- The Shop header shows the tagline and the offer line and no "Every piece is a moment" sentence.
- A centered "Sending it as a gift? Place a Call" link to /send-a-call follows the product grid.
- Rejection: the Shop header contains no link to /send-a-call.

Gate runs: 18 (10 failed)

## Known failures
- plan gate, criteria quality failed 6 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):
- code gate, scope failed 4 time(s): 1 changed file(s) are not in the plan's "## Files to touch":
- code gate, style failed 4 time(s): 3 style problem(s) in the diff. write precisely and directly:

## Notes
- next dev rewrites AGENTS.md on start; revert it before the code gate while the debt entry is open.
- flex-col-reverse changes visual order only; screen readers still follow DOM order, so reorder the DOM when the order matters.
- The plan gate rejects criteria phrased as class or size rules; describe what a person sees at a named width.
