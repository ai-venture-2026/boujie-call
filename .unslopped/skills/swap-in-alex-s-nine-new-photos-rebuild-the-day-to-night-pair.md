---
name: swap-in-alex-s-nine-new-photos-rebuild-the-day-to-night-pair
title: Swap in Alex's nine new photos, rebuild the day to night pair and the closing waitlist banner on Home
created: 2026-10-28T22:40:59.260Z
updated: 2026-11-03T16:06:22.181Z
lastCycle: 20261103-e8bd70
runs: 2
completed: 2
abandoned: 0
gateFailures: 2
tags: swap, alex, nine, new, photos, rebuild, day, night, assets, public, src
---
# Swap in Alex's nine new photos, rebuild the day to night pair and the closing waitlist banner on Home

## When to use
Requests like:
- "Swap in Alex's nine new photos, rebuild the day to night pair and the closing waitlist banner on Home"
- "Remove the brunch and night pair from Home and delete both photos"

## Playbook
Files touched:
- CHANGELOG.md
- assets/pink-batch/README.md
- assets/shoot/home/day-rose-slip.png
- assets/shoot/home/night-after-dark.png
- public/images/brunch-night/day-rose-slip.webp
- public/images/brunch-night/night-after-dark.webp
- src/app/page.test.tsx
- src/app/page.tsx
- src/lib/images.test.ts

Acceptance criteria that passed:
- Home renders no "From brunch to after dark" region and neither panel headline (page test)
- Rejection: the new absence tests fail while the pair is still on Home, shown by the red run
- The pieces section has py-18 and md:py-section, and in a 1440 and 390 screenshot its heading sits clear of the gift section
- public/images has no brunch-night folder and assets/shoot/home has no day-rose-slip.png or night-after-dark.png
- assets/pink-batch/README.md lists 14 photos to replace and no brunch or night photo
- npm run build exits 0 and npm test passes

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy
- code gate, tests kept failed 1 time(s): tests were removed:
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- Text set straight on a photo needs its contrast checked against the actual wall colour; rose on the blush-beige wall was unreadable at small sizes.
- Alex sends many mid-round layout requests; fold small related ones into the open round and record each in the plan as it lands.
- Live after PR #13: neither panel headline on Home, Home images 18 to 16, all four pages 200 at 1440 and 390 with 0 broken images.
- Starting a cycle with the previous cycle's notes uncommitted made the branch checkout fail and the cycle start on the old branch. Commit the notes before starting the next cycle.
- Removing a feature trips the tests kept check; a ## Removed tests section with the reason clears it.
- unslopped pr took the PR title type from the last commit (chore notes) and opened against main; retitle and retarget to develop.
