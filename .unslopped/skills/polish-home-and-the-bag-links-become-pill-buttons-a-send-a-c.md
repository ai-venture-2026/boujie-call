---
name: polish-home-and-the-bag-links-become-pill-buttons-a-send-a-c
title: Polish Home and the bag: links become pill buttons, a Send a Call button under how it works, the bag summary aligned and piece names on one line on phones
created: 2026-11-12T19:11:47.424Z
updated: 2026-11-12T19:11:47.424Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 13
lastCycle: 20261112-7937a7
tags: polish, home, bag, links, become, pill, buttons, send, src
---
# Polish Home and the bag: links become pill buttons, a Send a Call button under how it works, the bag summary aligned and piece names on one line on phones

## When to use
Requests like:
- "Polish Home and the bag: links become pill buttons, a Send a Call button under how it works, the bag summary aligned and piece names on one line on phones"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/bag-view.tsx
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx

Acceptance criteria that passed:
- Continue shopping is a cta pill linking to /shop
- Home shows a Send a Call button below the three Call steps, and pressing it opens the gift pop-up
- On phones the bag summary has no side padding, so it aligns with the items; from md it keeps the card
- On phones the piece name and price stack, so the name is not squeezed; from sm they share a row
- Full test suite and build pass; Home and the bag checked at phone width

Gate runs: 21 (13 failed)

## Known failures
- plan gate, criteria quality failed 13 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):

## Notes
The plan gate rejected four wordings of one criterion; it treats 'how it works' as description, so name the visible thing instead. Existing tests protected two earlier decisions (View all pieces as a quiet link, only the hero pill filled on Home); the first was raised with Alex and kept, the second was followed. Building the pop-up contents on first open fixed a hidden tier leak on Home. Merged as PR #47 on 2026-11-13.
