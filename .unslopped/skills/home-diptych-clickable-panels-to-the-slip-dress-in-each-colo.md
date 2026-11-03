---
name: home-diptych-clickable-panels-to-the-slip-dress-in-each-colo
title: Home diptych: clickable panels to the Slip Dress in each colorway, quiet Shop links, gentle photo hover, aligned text blocks
created: 2026-10-29T22:31:37.898Z
updated: 2026-10-29T22:31:37.898Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 6
lastCycle: 20261029-5dd6f7
tags: home, diptych, clickable, panels, slip, dress, each, colorway, src
---
# Home diptych: clickable panels to the Slip Dress in each colorway, quiet Shop links, gentle photo hover, aligned text blocks

## When to use
Requests like:
- "Home diptych: clickable panels to the Slip Dress in each colorway, quiet Shop links, gentle photo hover, aligned text blocks"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx

Acceptance criteria that passed:
- Clicking anywhere on the brunch panel opens The Slip Dress with Rose checked and its photo showing; the night panel does the same with After Dark
- Each panel shows "Shop the Slip Dress in Rose →" or "... in After Dark →" in the label style, with a Boujie Pink underline on hover on desktop and always on phones
- On desktop hover the photo scales to about 1.02 over 400ms with a pointer cursor; with reduced motion the photo does not scale
- Both headlines wrap to two lines and both Shop lines sit at the same height at 1440, 1024 and 768; the text block is centered in the area under the photo
- Both panels keep exactly the same height
- Rejection path: the panels are reachable by keyboard with a visible focus ring, and no link sits inside another link

Gate runs: 14 (6 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:
- release gate, style failed 2 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
Code and release gates failed on test names joined with "and" twice; name each test for one outcome before running the gate. Tailwind 4 scale utilities set the CSS scale property, so read computed scale, not transform, when verifying hover.
