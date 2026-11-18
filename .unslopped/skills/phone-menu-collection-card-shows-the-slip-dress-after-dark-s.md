---
name: phone-menu-collection-card-shows-the-slip-dress-after-dark-s
title: Phone menu collection card shows the Slip Dress After Dark studio photo instead of the generated hero
created: 2026-11-11T01:39:05.548Z
updated: 2026-11-11T01:39:05.548Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261111-306150
tags: phone, menu, collection, card, shows, slip, dress, dark, src
---
# Phone menu collection card shows the Slip Dress After Dark studio photo instead of the generated hero

## When to use
Requests like:
- "Phone menu collection card shows the Slip Dress After Dark studio photo instead of the generated hero"

## Playbook
Files touched:
- CHANGELOG.md
- src/components/site-header.test.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- The open phone menu's collection card image is studio/the-slip-dress-after-dark-front.
- Rejection: the open phone menu renders no /images/hero/ image.
- At 390 wide the card shows the dress neckline, checked by screenshot.
- npm run build exits 0 and npm test passes.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Inline node fetch in a Bash command is blocked by the context-mode hook; put browser checks in a script file in the scratchpad.
