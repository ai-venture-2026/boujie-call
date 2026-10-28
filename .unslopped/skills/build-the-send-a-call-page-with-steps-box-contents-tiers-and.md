---
name: build-the-send-a-call-page-with-steps-box-contents-tiers-and
title: Build the Send a Call page with steps, box contents, tiers and waitlist
created: 2026-10-28T21:47:36.868Z
updated: 2026-10-28T21:47:36.868Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261028-e9cd15
tags: build, send, call, page, steps, box, contents, tiers, src
---
# Build the Send a Call page with steps, box contents, tiers and waitlist

## When to use
Requests like:
- "Build the Send a Call page with steps, box contents, tiers and waitlist"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/app/seo.test.tsx
- src/app/sitemap.ts
- src/lib/content.ts

Acceptance criteria that passed:
- /send-a-call renders the h1 "Place your Boujie Call." and one "Join the waitlist" button linking to the page's waitlist form.
- The page lists the four steps in order: You choose her tier, You write her message, She gets the Call, She picks up.
- The page lists five things inside every box and the three tiers, each tier showing "Price to come".
- No page says "name and email"; the Call is described as a text message on both Home and Send a Call.
- The sitemap includes /send-a-call.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 3 time(s): 2 style problem(s) in the diff. write precisely and directly:

## Notes
- The style gate reads "X and Y" inside test names as two outcomes even when it is one phrase; avoid "and" in test names.
