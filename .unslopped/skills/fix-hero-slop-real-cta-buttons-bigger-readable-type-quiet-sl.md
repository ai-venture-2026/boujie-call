---
name: fix-hero-slop-real-cta-buttons-bigger-readable-type-quiet-sl
title: Fix hero slop: real CTA buttons, bigger readable type, quiet slide controls, clear-to-white nav
created: 2026-10-28T18:02:39.398Z
updated: 2026-10-28T18:02:39.398Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-1995b8
tags: fix, hero, slop, real, cta, buttons, bigger, readable, src
---
# Fix hero slop: real CTA buttons, bigger readable type, quiet slide controls, clear-to-white nav

## When to use
Requests like:
- "Fix hero slop: real CTA buttons, bigger readable type, quiet slide controls, clear-to-white nav"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/not-found.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/shop.test.tsx
- src/components/hero-carousel.tsx
- src/components/image-slot.tsx
- src/components/product-view.tsx
- src/components/site-header.tsx
- src/components/waitlist-form.tsx
- src/lib/content.ts
- src/lib/hero-tone.ts

Acceptance criteria that passed:
- The hero CTA "Shop the collection" links to /shop, has the cta class, a 1px border and no underline, and nothing follows it inside its link.
- Hovering the CTA fills it solid (browser check: background fill scale goes from 0 to 1).
- No ✦ appears in the hero text or in image placeholders.
- The hero shows no "01 / 04" counter text and no "Pause" text; four "Show slide" buttons and a "Pause slideshow" icon button are present.
- After 7 seconds the second slide is current; pressing "Pause slideshow" keeps the current slide for 20 seconds; "Show slide 3" makes slide 3 visible.
- With prefers-reduced-motion set, the slide does not advance on its own.
- The header and mobile menu CTA read "Shop the collection" and link to /shop.
- On Home the header is transparent at the top and white after scrolling; on /shop it is white.
- At 1440x900 the h1 renders at 72px or more, and at 390px nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 9 (1 failed)

## Known failures
- code gate, changes failed 1 time(s): no changes since the cycle started

## Notes
- Alex caught slop I had signed off: a decorative hairline after the CTA, an underlined text link as the main CTA, sparkles, small type, a text counter. Judge every section against the reference boards, not only the deslop catalog.
- The main CTA wording must follow the owner's latest design (Shop the collection), not an early prompt.
