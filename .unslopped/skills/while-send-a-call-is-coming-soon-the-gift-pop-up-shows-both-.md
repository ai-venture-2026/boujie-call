---
name: while-send-a-call-is-coming-soon-the-gift-pop-up-shows-both-
title: While Send a Call is coming soon the gift pop-up shows both steps; the final button is greyed and reads Opens soon
created: 2026-11-12T19:35:47.876Z
updated: 2026-11-12T19:35:47.876Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261112-c9c3c7
tags: while, send, call, coming, soon, gift, pop-up, shows, src
---
# While Send a Call is coming soon the gift pop-up shows both steps; the final button is greyed and reads Opens soon

## When to use
Requests like:
- "While Send a Call is coming soon the gift pop-up shows both steps; the final button is greyed and reads Opens soon"

## Playbook
Files touched:
- CHANGELOG.md
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx

Acceptance criteria that passed:
- While closed, Next opens step 2 with the names, emails and note fields
- While closed, the final button reads Opens soon and is disabled
- While closed, a note above it says nothing is sent yet
- While closed, pressing the final button calls nothing (rejection path)
- While open, the final button reads Continue and sends (existing tests)
- Full test suite and build pass

Gate runs: 12 (4 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
Code gate failed once on the filler words 'note that' in the changelog. Alex overrode my earlier stop at step 1. Merged as PR #50 on 2026-11-13.
