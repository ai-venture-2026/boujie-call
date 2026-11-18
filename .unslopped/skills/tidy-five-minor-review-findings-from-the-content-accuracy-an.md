---
name: tidy-five-minor-review-findings-from-the-content-accuracy-an
title: Tidy five minor review findings from the content accuracy and bag line cycles
created: 2026-11-13T16:47:44.564Z
updated: 2026-11-13T16:47:44.564Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261113-391407
tags: tidy, five, minor, review, findings, content, accuracy, bag, src
---
# Tidy five minor review findings from the content accuracy and bag line cycles

## When to use
Requests like:
- "Tidy five minor review findings from the content accuracy and bag line cycles"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/app/content-accuracy.test.tsx
- src/app/shop/shop.test.tsx
- src/components/bag-view.tsx
- src/components/product-view.tsx

Acceptance criteria that passed:
- With no offer set, the header contains no offer bar element.
- After the fabric row test, the Slip Dress keeps the fabric and care values it had before the test.
- A size chart missing one of a piece's sizes shows no Size guide button.
- The bag summary is a region named "Summary" that screen readers can reach.
- The full test suite passes and the bag page looks unchanged at desktop and phone width.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Merged as PR #56 into develop on 2026-11-14. No visible change: bag screenshots were byte identical before and after.
- Review: 1 minor kept (the header test checks the offer bar class; the paired test proves where a confirmed offer renders).
- Lesson: when a review finding is about future data (the owner's chart or fabric), guard it in code (show only with complete data) rather than with placeholder copy.
