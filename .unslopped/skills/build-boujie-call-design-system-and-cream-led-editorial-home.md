---
name: build-boujie-call-design-system-and-cream-led-editorial-home
title: Build Boujie Call design system and cream-led editorial Home page
created: 2026-10-28T09:06:15.317Z
updated: 2026-10-28T09:06:15.317Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 2
lastCycle: 20261028-f8d354
tags: build, boujie, call, design, system, cream-led, editorial, home, src
---
# Build Boujie Call design system and cream-led editorial Home page

## When to use
Requests like:
- "Build Boujie Call design system and cream-led editorial Home page"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/waitlist-form.tsx
- src/lib/content.test.ts
- src/lib/content.ts
- tsconfig.json

Acceptance criteria that passed:
- Home renders exactly one h1 reading "The gift that makes her feel like the moment."
- Home renders the three steps in order: Place the Call, She Gets the Call, She Picks Up.
- Home renders the three tiers, each showing "Price to come" while its price is unset.
- formatPrice(4000) returns "$40.00" and a negative amount throws a RangeError.
- Submitting a valid email shows a status saying the list opens soon; an invalid email is rejected by the browser and shows no status.
- Social links with no URL render as text, not as links.
- Header nav is a labelled nav landmark with links to How it works, The boxes and Join the list.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 10 (2 failed)

## Known failures
- code gate, scope failed 1 time(s): 10 changed file(s) are not in the plan's "## Files to touch":
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:
- release gate, clean tree failed 1 time(s): uncommitted changes:
- release gate, commits failed 1 time(s): no commits since cycle start

## Notes
- Scope parser reads "path (reason)", not "path: reason"; the colon form failed the scope check.
- unslopped commit does not stage; run git add before it.
- next build rewrites tsconfig.json; declare it in any cycle that builds.
- Diff hit 400 of 400 lines; keep later rounds to one page or one feature each.
- No host, healthcheck or monitor command yet; deploy, operate and monitor were skipped.
