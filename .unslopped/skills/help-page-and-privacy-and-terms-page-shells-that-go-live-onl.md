---
name: help-page-and-privacy-and-terms-page-shells-that-go-live-onl
title: Help page and Privacy and Terms page shells that go live only once their text is filled in, plus a footer Help column
created: 2026-11-12T20:48:28.027Z
updated: 2026-11-12T20:48:28.027Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-3b2e2d
tags: help, page, privacy, terms, shells, go, live, src
---
# Help page and Privacy and Terms page shells that go live only once their text is filled in, plus a footer Help column

## When to use
Requests like:
- "Help page and Privacy and Terms page shells that go live only once their text is filled in, plus a footer Help column"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/help/help.test.tsx
- src/app/help/page.tsx
- src/app/privacy/page.tsx
- src/app/sitemap.ts
- src/app/terms/page.tsx
- src/components/policy-page.tsx
- src/components/site-footer.tsx
- src/lib/help.ts

Acceptance criteria that passed:
- With no contact email, /help returns not found (rejection path)
- With a contact email, /help shows it as an email link and lists only questions that have answers
- With no policy text, /privacy and /terms return not found (rejection path)
- With privacy text, /privacy shows the title, last updated date and each section
- The footer shows a Help column only for pages that are live
- The sitemap lists /help, /privacy and /terms only when live
- Full test suite and build pass

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Two tests failed first because helpLinks called getHelp internally, which a spy on the module cannot replace; callers now pass getHelp() in. Preview checked with sample text, reverted. Merged as PR #52 on 2026-11-13.
