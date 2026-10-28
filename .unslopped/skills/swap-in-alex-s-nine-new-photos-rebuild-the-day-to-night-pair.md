---
name: swap-in-alex-s-nine-new-photos-rebuild-the-day-to-night-pair
title: Swap in Alex's nine new photos, rebuild the day to night pair and the closing waitlist banner on Home
created: 2026-10-28T22:40:59.260Z
updated: 2026-10-28T22:40:59.260Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-b0aacd
tags: swap, alex, nine, new, photos, rebuild, day, night, assets, public, src
---
# Swap in Alex's nine new photos, rebuild the day to night pair and the closing waitlist banner on Home

## When to use
Requests like:
- "Swap in Alex's nine new photos, rebuild the day to night pair and the closing waitlist banner on Home"

## Playbook
Files touched:
- CHANGELOG.md
- assets/DAY.png
- assets/NIGHT.png
- assets/boujieA.png
- assets/boujieB.png
- assets/boujieC.png
- assets/boujieD.png
- assets/boujieE.png
- assets/lastCTAsect.png
- assets/section2imagereplacement.png
- public/boujie-call-monogram-ink.png
- public/images/close/blue-romper-banner.webp
- public/images/details/brown-romper-hip.webp
- public/images/details/pink-slip-hem.webp
- public/images/hero/black-slip-studio.webp
- public/images/hero/mocha-romper.webp
- public/images/strip/card.webp
- public/images/strip/mist.webp
- public/images/strip/open-box.webp
- public/images/strip/ribbon.webp
- public/images/strip/unboxing.webp
- public/images/turn/day-rose-slip.webp
- public/images/turn/night-after-dark.webp
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/site-footer.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- Section two shows the new brown romper photo, not a crop of the hero photo
- The strip shows five photos, none of them a hero photo
- The day and night pair shows the two new photos with each heading outside the photo frame
- The night caption links to The Slip Dress in After Dark
- The closing section shows the banner photo, the closing headline and the waitlist form
- Rejection: an invalid email in the closing form is refused and shows no confirmation
- At 1440x900 the closing section is shorter than the screen
- At 1440x900 the closing text sits left of the model without overlapping her
- At 1536x730 the first hero model's head clears the nav with less headroom than before
- The footer is plain white edge to edge, with no dark frame or gap after the closing section, and carries the ink BC monogram and small Shop, Company and Socials columns, and no form
- The day and night section is exactly one screen under the nav at 1440x900 and 1536x730, with the button inside it
- Instagram in the footer links to https://www.instagram.com/boujiecall/; TikTok stays plain text
- The closing section sets every word in ink, not rose or pink, over the banner photo
- No horizontal overflow at 390px on Home

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Text set straight on a photo needs its contrast checked against the actual wall colour; rose on the blush-beige wall was unreadable at small sizes.
- Alex sends many mid-round layout requests; fold small related ones into the open round and record each in the plan as it lands.
