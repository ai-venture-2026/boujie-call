---
name: dark-pink-color-treatment-on-darkpink-version-after-dark-bas
title: Dark pink color treatment on darkpink-version: After Dark base, Boujie Pink accents, Cream Lace light sections, via theme tokens; preview only, never merged
created: 2026-10-29T21:24:40.128Z
updated: 2026-10-29T21:24:40.128Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 2
lastCycle: 20261029-46cf8d
tags: dark, pink, color, treatment, darkpink-version, base, boujie, src
---
# Dark pink color treatment on darkpink-version: After Dark base, Boujie Pink accents, Cream Lace light sections, via theme tokens; preview only, never merged

## When to use
Requests like:
- "Dark pink color treatment on darkpink-version: After Dark base, Boujie Pink accents, Cream Lace light sections, via theme tokens; preview only, never merged"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.test.tsx
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
- src/components/site-footer.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- The header renders on After Dark with the pink logo, and a Boujie Pink bar above it reads "Free shipping on 2 or more. Any 2 for $85."
- The header's "Shop the collection" is a pink pill (`cta-primary`)
- Home, About and Send a Call heroes sit in dark sections, and on phones their words sit below the photo, not over it
- The footer is After Dark with a Boujie Pink monogram named "Boujie Call"
- The Home and About closing banners sit on Cream Lace; the Send a Call close stays After Dark with a scrim behind its words on desktop
- The Shop header is After Dark; Shop, product and bag pages sit on Cream Lace with soft pink image frames
- Secondary buttons are outlined After Dark on light sections and Blush Silk on dark sections
- No page scrolls sideways at 375px, and every text pair used measures at least 4.5:1 (3:1 for headline accents)
- Rejection path: no photo sits on a Blush Silk section, and no pink text sits on a pink background

Gate runs: 10 (2 failed)

## Known failures
- code gate, scope failed 1 time(s): 14 changed file(s) are not in the plan's "## Files to touch":
- code gate, diff size failed 1 time(s): 426 changed line(s) exceeds the limit of 400. split the work into another cycle or raise practices.maxDiffLines
- monitor gate, monitor notes failed 1 time(s): 1 gate run(s) failed this cycle. write what happened and what to do next time under "## Monitor" in the plan

## Notes
Code gate failed once: the Files to touch list used "path: reason" (the scope check reads "path (reason)"), and wrapping the header in a fragment reindented 120 lines, pushing the diff to 426. Next time: write "path (reason)", and add rows inside an existing element instead of wrapping it. Review caught light panels nested in the dark header (mini bag, menu dialog) inheriting dark ground rules; scope dark rules with :not(dialog *, #mini-bag *). The preview alias is boujie-call-git-<branch>-ai-ventures-projects.vercel.app, and preview protection is on until Alex disables it.
