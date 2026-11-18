---
name: match-shopify-colour-and-size-names-regardless-of-capitals-o
title: Match Shopify colour and size names regardless of capitals or spaces, and clear the fixed bag price debt entry
created: 2026-11-12T15:27:19.466Z
updated: 2026-11-12T15:27:19.466Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261112-8a7eaa
tags: match, shopify, colour, size, names, regardless, capitals, spaces, src
---
# Match Shopify colour and size names regardless of capitals or spaces, and clear the fixed bag price debt entry

## When to use
Requests like:
- "Match Shopify colour and size names regardless of capitals or spaces, and clear the fixed bag price debt entry"

## Playbook
Files touched:
- CHANGELOG.md
- src/lib/shopify.test.ts
- src/lib/shopify.ts

Acceptance criteria that passed:
- A Shopify variant named "rose " / "s" maps to the stock key "Rose/S" with its stock count and variant id
- A Shopify value that matches no site name is still dropped by withLive (rejection path)
- The bag price debt entry and the case matching debt entry are gone from .unslopped/DEBT.md
- Full test suite and build pass

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:
- release gate, clean tree failed 2 time(s): uncommitted changes:

## Notes
Code gate failed once on a test name containing "and"; renamed to one outcome. Release gate failed once because the review record was uncommitted; it needs its own approved chore commit. Merged into develop as PR #30 on 2026-11-12.
