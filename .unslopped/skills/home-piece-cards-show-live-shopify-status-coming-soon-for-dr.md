---
name: home-piece-cards-show-live-shopify-status-coming-soon-for-dr
title: Home piece cards show live Shopify status: Coming soon for draft pieces, Sold out when every colour is gone
created: 2026-11-18T17:40:38.968Z
updated: 2026-11-18T17:40:38.968Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261118-b29729
tags: home, piece, cards, show, live, shopify, status, coming, src
---
# Home piece cards show live Shopify status: Coming soon for draft pieces, Sold out when every colour is gone

## When to use
Requests like:
- "Home piece cards show live Shopify status: Coming soon for draft pieces, Sold out when every colour is gone"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/availability.test.tsx
- src/app/content-accuracy.test.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/product-links.test.tsx
- src/app/send-a-call/page.test.tsx
- src/app/shop/shop.test.tsx

Acceptance criteria that passed:
- With Shopify pricing The Romper at $52.00, its Home card shows $52.00.
- Without Shopify configured, Home renders the three cards from products.ts with $48.00 as before.
- The full test suite passes.

Gate runs: 13 (5 failed)

## Known failures
- code gate, scope failed 3 time(s): 5 changed file(s) are not in the plan's "## Files to touch":
- code gate, diff size failed 2 time(s): 447 changed line(s) exceeds the limit of 400. split the work into another cycle or raise practices.maxDiffLines
- code gate, lint failed 1 time(s): src/app/availability.test.tsx:4:10 - error TS2724: '"@/components/home-pieces"' has no exported member named 'HomePiecesLive'. Did you mean 
- release gate, clean tree failed 1 time(s): uncommitted changes:
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Code gate failed twice. Scope: a reason written after a colon in "## Files to touch" hid the path from the scope check; write reasons in parentheses. Diff size: turning Home async touched 84 test renders (about 330 lines), so the status pills split into a second cycle. Moving PieceCard into a new file cost 65 more lines and was reverted to fit under 400.
- An async child under Suspense, or use() on a promise prop, does not resolve in jsdom and broke the hero carousel fake timer tests. For live data on a page that tests render, make the page async and await it in tests, as Shop does.
- Release gate failed once: the review record was uncommitted. It needs its own proposed and approved commit; amend is blocked by the hook.
- Next cycle: Coming soon and Sold out pills on Home. Parked tests at the session scratchpad home-status-tests.tsx; rewrite them to render(await Home()) with getCatalog mocked.
