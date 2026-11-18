---
name: bag-add-the-line-untick-a-piece-to-leave-it-out-of-checkout-
title: Bag: add the line "Untick a piece to leave it out of checkout." above the bag list
created: 2026-11-13T01:38:06.473Z
updated: 2026-11-13T01:38:06.473Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261113-59232a
tags: bag, add, line, untick, piece, leave, checkout, above, src
---
# Bag: add the line "Untick a piece to leave it out of checkout." above the bag list

## When to use
Requests like:
- "Bag: add the line "Untick a piece to leave it out of checkout." above the bag list"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/components/bag-view.tsx

Acceptance criteria that passed:
- A bag with pieces shows "Untick a piece to leave it out of checkout." above the list of pieces.
- An empty bag does not show the line.
- On desktop the summary's top line sits level with the list's top line.
- Screenshots of the bag at desktop and phone width are sent to Alex.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Merged as PR #55 into develop on 2026-11-13.
- Review caught one real issue: removing the summary's desktop top padding left the offer note flush at the top once an offer returns; fixed by giving the note its own md:pt-8. Lesson: when a hidden element used to fill a gap, check the layout both with and without it.
- The hint is tied to each tick box with aria-describedby, so screen readers hear it too.
- Prettier is not this repo's formatter: running it rewrote the whole bag view. Edit by hand and indent only the wrapped block.
