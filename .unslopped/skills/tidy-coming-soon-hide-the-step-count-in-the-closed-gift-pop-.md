---
name: tidy-coming-soon-hide-the-step-count-in-the-closed-gift-pop-
title: Tidy Coming soon: hide the step count in the closed gift pop-up and keep the menu underline off the Soon pill
created: 2026-11-12T18:57:26.159Z
updated: 2026-11-12T18:57:26.159Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-6cc517
tags: tidy, coming, soon, hide, step, count, closed, gift, src
---
# Tidy Coming soon: hide the step count in the closed gift pop-up and keep the menu underline off the Soon pill

## When to use
Requests like:
- "Tidy Coming soon: hide the step count in the closed gift pop-up and keep the menu underline off the Soon pill"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx
- src/components/soon.tsx

Acceptance criteria that passed:
- While closed, the pop-up eyebrow reads Coming soon and no step count shows
- While open, the eyebrow reads Step 1 of 2 (rejection path)
- The Soon pill is inline-block, so the link underline stops at it
- Full test suite and build pass

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
No gate failures. inline-block on the pill stops the link underline, a CSS rule that saved a wrapper. Merged as PR #46 on 2026-11-13.
