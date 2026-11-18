---
name: home-piece-cards-show-live-shopify-status-coming-soon-for-dr
title: Home piece cards show live Shopify status: Coming soon for draft pieces, Sold out when every colour is gone
created: 2026-11-18T17:40:38.968Z
updated: 2026-11-18T18:02:51.126Z
lastCycle: 20261118-891515
runs: 2
completed: 2
abandoned: 0
gateFailures: 6
tags: home, piece, cards, show, live, shopify, status, coming, src
---
# Home piece cards show live Shopify status: Coming soon for draft pieces, Sold out when every colour is gone

## When to use
Requests like:
- "Home piece cards show live Shopify status: Coming soon for draft pieces, Sold out when every colour is gone"
- "Home piece cards show Coming soon for draft pieces and Sold out when every colour is gone, matching Shop; PRs target develop"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/availability.test.tsx
- src/app/page.tsx
- unslopped.config.json

Acceptance criteria that passed:
- With Shopify not listing the Boujie Set, its Home card shows Coming soon in place of $48.00 and a Coming soon pill on the photo.
- With every Romper colour at 0, its Home card shows a Sold out pill, keeps $48.00 and reads ", sold out" to screen readers.
- With one Romper colour in stock and the rest at 0, its Home card shows no pill.
- unslopped pr opens pull requests against develop.

Gate runs: 9 (1 failed)

## Known failures
- code gate, scope failed 3 time(s): 5 changed file(s) are not in the plan's "## Files to touch":
- code gate, diff size failed 2 time(s): 447 changed line(s) exceeds the limit of 400. split the work into another cycle or raise practices.maxDiffLines
- code gate, lint failed 1 time(s): src/app/availability.test.tsx:4:10 - error TS2724: '"@/components/home-pieces"' has no exported member named 'HomePiecesLive'. Did you mean
- release gate, clean tree failed 1 time(s): uncommitted changes:
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy
- test gate, test failed 1 time(s): FAIL  src/components/mini-bag.test.tsx > Mini bag > opens when a piece is added

## Notes
- Code gate failed twice. Scope: a reason written after a colon in "## Files to touch" hid the path from the scope check; write reasons in parentheses. Diff size: turning Home async touched 84 test renders (about 330 lines), so the status pills split into a second cycle. Moving PieceCard into a new file cost 65 more lines and was reverted to fit under 400.
- An async child under Suspense, or use() on a promise prop, does not resolve in jsdom and broke the hero carousel fake timer tests. For live data on a page that tests render, make the page async and await it in tests, as Shop does.
- Release gate failed once: the review record was uncommitted. It needs its own proposed and approved commit; amend is blocked by the hook.
- Next cycle: Coming soon and Sold out pills on Home. Parked tests at the session scratchpad home-status-tests.tsx; rewrite them to render(await Home()) with getCatalog mocked.
- Test gate failed once: under load the full run timed out 4 UI tests at the 5s default (mini bag, header, bag, product photos); all 88 passed alone and the rerun passed. Logged as soon debt against vitest.config.ts.
- unslopped pr now targets develop from pullRequest.base; PR #71 opened against develop without a manual retarget. Still confirm the base with gh pr view before asking Alex to merge.

Fix for next run: when a page that tests render needs live Shopify data, make the page async and use render(await Page()) in tests; an async child or use() under Suspense breaks fake timer tests in jsdom. Budget about 4 diff lines per existing test render, so plan a split early if a page has many tests. Write file reasons in parentheses, and confirm the PR base is develop.
