---
name: make-the-waitlist-email-field-obviously-an-email-field-visib
title: Make the waitlist email field obviously an email field: visible label, boxed input, example placeholder, joined button
created: 2026-10-28T23:44:58.790Z
updated: 2026-10-28T23:44:58.790Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-c04793
tags: make, waitlist, email, field, obviously, visible, src
---
# Make the waitlist email field obviously an email field: visible label, boxed input, example placeholder, joined button

## When to use
Requests like:
- "Make the waitlist email field obviously an email field: visible label, boxed input, example placeholder, joined button"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/components/waitlist-form.tsx

Acceptance criteria that passed:
- Every waitlist form shows a visible "Email address" label above a boxed field with the placeholder "name@email.com"
- On the Home banner, the Send a Call close and a 390px phone the field reads clearly against its background
- Rejection: an invalid email is refused by the browser and shows no confirmation
- Keyboard focus on the field is visible on both light and ink grounds
- No horizontal overflow at 390px on Home or Send a Call

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- flex-1 in a column flex collapses an input to its content height; scope it to the row breakpoint.
