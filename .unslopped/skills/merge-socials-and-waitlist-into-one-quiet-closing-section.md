---
name: merge-socials-and-waitlist-into-one-quiet-closing-section
title: Merge socials and waitlist into one quiet closing section
created: 2026-10-28T17:52:38.839Z
updated: 2026-10-28T17:52:38.839Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-12be62
tags: merge, socials, waitlist, one, quiet, closing, section, src
---
# Merge socials and waitlist into one quiet closing section

## When to use
Requests like:
- "Merge socials and waitlist into one quiet closing section"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/waitlist-form.tsx

Acceptance criteria that passed:
- The section with id waitlist contains the waitlist headline, the email form, both social rows and the closing line "The call is coming. Are you going to pick up?".
- Home has no separate socials section: "Catch us before we drop." sits inside the waitlist section.
- The waitlist section contains no centered text block and sits on blush.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Merging the closing sections exposed a duplicate social list in the footer directly below; flagged to Alex.
