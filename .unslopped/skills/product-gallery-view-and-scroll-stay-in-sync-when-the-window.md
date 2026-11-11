---
name: product-gallery-view-and-scroll-stay-in-sync-when-the-window
title: Product gallery view and scroll stay in sync when the window crosses md
created: 2026-11-11T00:07:20.205Z
updated: 2026-11-11T00:07:20.205Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261109-64b013
tags: product, gallery, view, scroll, stay, sync, window, crosses, src
---
# Product gallery view and scroll stay in sync when the window crosses md

## When to use
Requests like:
- "Product gallery view and scroll stay in sync when the window crosses md"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx

Acceptance criteria that passed:
- After choosing the back photo at md and narrowing the window below md, the track scrolls to the back photo, so the photo and the active dot match.
- Rejection: a scroll event on the track while the window is md or wider leaves the chosen photo and its pressed thumbnail unchanged.
- Without matchMedia (jsdom, old browsers), tapping the second dot marks it current and every existing product page test passes.

Gate runs: 11 (3 failed)

## Known failures
- plan gate, criteria quality failed 1 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):
- release gate, clean tree failed 1 time(s): uncommitted changes:
- monitor gate, monitor notes failed 1 time(s): 2 gate run(s) failed this cycle. write what happened and what to do next time under "## Monitor" in the plan

## Notes
- Plan gate failed once before the approach named a rung; name the rung first.
- Release gate failed because unslopped commit does not stage files; run git add on the cycle's files before unslopped commit.
- unslopped pr opened PR #23 against main because pullRequest.base is null; it was retargeted to develop with gh pr edit. Check the base after every PR until a human sets base to develop in the config.
- unslopped pr has no --help; running it with --help pushes the branch.
