---
name: strict-home-pass-readable-text-warm-white-base-no-fade-or-de
title: Strict Home pass: readable text, warm white base, no fade or decorative line, single socials
created: 2026-10-28T18:07:10.217Z
updated: 2026-10-28T18:07:10.217Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-757de3
tags: strict, home, pass, readable, text, warm, white, base, src
---
# Strict Home pass: readable text, warm white base, no fade or decorative line, single socials

## When to use
Requests like:
- "Strict Home pass: readable text, warm white base, no fade or decorative line, single socials"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/image-slot.tsx
- src/components/site-footer.tsx

Acceptance criteria that passed:
- The page background renders as rgb(250, 248, 245).
- Step, tier and social body paragraphs on Home render at 16px.
- The steps list shows no 01, 02 or 03 labels.
- The ink band has no scroll fade class and its caption renders at 12px.
- The closing line has no border above it, and the footer shows no "link to come" text.
- The day image placeholder uses no blush gradient.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Changing the cream token value moved every surface at once; cheaper and safer than renaming classes, but it also changes the Shop pages, so say so in the report.
- Scroll-driven colour fades between light and dark pass through grey mid-scroll; prefer clean cuts.
