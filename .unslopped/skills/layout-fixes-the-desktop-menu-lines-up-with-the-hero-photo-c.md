---
name: layout-fixes-the-desktop-menu-lines-up-with-the-hero-photo-c
title: Layout fixes: the desktop menu lines up with the hero photo column on wide screens, and notched iPhones turned sideways show no pale side strips
created: 2026-11-12T20:53:26.129Z
updated: 2026-11-12T20:53:26.129Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-a5429b
tags: layout, fixes, desktop, menu, lines, hero, photo, column
---
# Layout fixes: the desktop menu lines up with the hero photo column on wide screens, and notched iPhones turned sideways show no pale side strips

## When to use
Requests like:
- "Layout fixes: the desktop menu lines up with the hero photo column on wide screens, and notched iPhones turned sideways show no pale side strips"

## Playbook
Files touched:
- CHANGELOG.md

Acceptance criteria that passed:
- The desktop menu item is removed from the debt log, with the 1280, 1600 and 1920px measurements recorded in this plan
- The notched iPhone item moves to accepted with Alex's reason
- Full test suite passes

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Measuring first showed the menu item was already fixed by later layout changes (15px, invisible), so no code changed. Lesson: measure an old layout note before fixing it. Merged as PR #53 on 2026-11-13.
