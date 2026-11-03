---
name: soften-the-dark-pink-version-black-ribbon-darks-dusty-rose-f
title: Soften the dark pink version: Black Ribbon darks, Dusty Rose for large pink, one filled pill per view, paler product frames with contact shadow, more spacing
created: 2026-10-29T21:43:10.806Z
updated: 2026-10-29T21:43:10.806Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 2
lastCycle: 20261029-a55071
tags: soften, dark, pink, version, black, ribbon, darks, dusty, src
---
# Soften the dark pink version: Black Ribbon darks, Dusty Rose for large pink, one filled pill per view, paler product frames with contact shadow, more spacing

## When to use
Requests like:
- "Soften the dark pink version: Black Ribbon darks, Dusty Rose for large pink, one filled pill per view, paler product frames with contact shadow, more spacing"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.tsx
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/closing-banner.tsx
- src/components/hero-carousel.tsx
- src/components/mini-bag.test.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/waitlist-form.tsx

Acceptance criteria that passed:
- Header, heroes, Shop header, night half, gift section, founder quote, Send a Call close and footer render on Black Ribbon #1a1018; body text on light stays #141014
- The offer bar is Dusty Rose with Black Ribbon text, 32px tall, letter spacing 0.12em
- Filled pills are Dusty Rose with Black Ribbon text; Home shows exactly one filled pill (the hero); the header Shop button is outlined Blush Silk
- Outlined pills show a Black Ribbon border on light and a Blush Silk border on dark
- Product frames fill #f9eef2, and frames holding a photo show the contact shadow while "Image to come" tiles show none
- Section padding grows about 20 percent at both widths
- Every text pair used measures at least 4.5:1, and no page scrolls sideways at 375px
- Rejection path: no section uses a gradient other than the legibility scrims (Send a Call close, menu panel photo label), and no Boujie Pink text sits on a light or pink ground

Gate runs: 10 (2 failed)

## Known failures
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:
- monitor gate, monitor notes failed 1 time(s): 1 gate run(s) failed this cycle. write what happened and what to do next time under "## Monitor" in the plan

## Notes
Code gate failed once on a test name that bundled two outcomes ("pink on dark and rose on light"); split it into one test per outcome. Outlined pills that straddle two grounds (the Home seam button) lose their text on one side; check each outlined button against both grounds. The owner rejected the plum blacks (#1a1018, #141014) as purple; the darks are now neutral #1c1b1b, and the light pink logo file reads lilac on black, so pink marks are CSS masks over the ink files in Boujie Pink.
