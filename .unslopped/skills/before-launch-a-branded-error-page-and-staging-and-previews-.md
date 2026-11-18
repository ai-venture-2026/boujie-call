---
name: before-launch-a-branded-error-page-and-staging-and-previews-
title: Before launch: a branded error page, and staging and previews hidden from search engines while the live site stays indexed
created: 2026-11-12T18:41:48.476Z
updated: 2026-11-12T18:41:48.476Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261112-13c1b8
tags: launch, branded, error, page, staging, previews, hidden, search, src
---
# Before launch: a branded error page, and staging and previews hidden from search engines while the live site stays indexed

## When to use
Requests like:
- "Before launch: a branded error page, and staging and previews hidden from search engines while the live site stays indexed"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/error.tsx
- src/app/layout.tsx
- src/app/robots.ts
- src/app/seo.test.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- The error page says the page did not load, offers Try again (calls reset) and Back to the shop
- On production, robots allows all paths and points to the sitemap
- On preview or development, robots disallows all paths (rejection path)
- On preview or development, pages carry a noindex robots meta; on production they do not
- Full test suite and build pass

Gate runs: 13 (5 failed)

## Known failures
- plan gate, plan sections failed 2 time(s): fill in "## Goal", "## Approach", "## Files to touch" before leaving plan. one line each is enough; the point is to decide before coding
- plan gate, leanness ladder failed 2 time(s): "## Approach" names no rung. read the code the change touches, walk the ladder, then write the rung you stopped at, for example "Rung 2":
- plan gate, acceptance criteria failed 2 time(s): add at least one item under "## Acceptance criteria"
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
Plan gate failed once: a helper picked the newest plan by name sort and wrote into an archived plan; restored, and plans are now addressed by cycle id. Code gate failed once on a bundled test name. Lighthouse (local, simulated mobile): accessibility and best practices 100 on six pages, CLS 0, LCP 3.5 to 5.5 s with render delay dominant; logged to re-measure on staging. Merged as PR #44 on 2026-11-13.
