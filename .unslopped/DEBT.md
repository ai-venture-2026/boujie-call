# Debt log

Known deviations we are deliberately not fixing in the change where they were found.
One line each, logged on the spot instead of opening a work item. Sweep the cleanup
items in one batch at a quiet moment; accepted items stay, with the reason, so nobody
re-litigates them.

Categories: cleanup (mechanical, safe to batch), pattern (a wrong shape new code would
copy; fix it before it spreads), soon (costs someone time while it exists), accepted
(evaluated and staying as is).
- [soon] Privacy and Terms pages are missing; the footer leaves them out until they exist, and they are needed before the waitlist collects emails (src/components/site-footer.tsx) :: logged 2026-10-28, cycle 20261028-478322
- [soon] next dev re-adds a Next.js agent block with em dashes to AGENTS.md on every start; decide whether to commit it or turn it off (AGENTS.md) :: logged 2026-10-29, cycle 20261029-abd860
- [accepted] Landscape on notched iPhones: body side inset padding leaves cream strips beside full bleed sections and offsets the centered nav; move the inset onto inner wrappers (src/app/globals.css) :: logged 2026-10-29, cycle 20261029-b9e136 :: accepted by Alex 2026-11-13: rare view, the fix touches 34 padding uses in 18 files; revisit if anyone notices
- [soon] Home detail Romper packshot (object-contain) has no contact shadow; a fixed oval would miss the hem, so add it once the new pink photos set the garment position (src/app/page.tsx) :: logged 2026-10-29, cycle 20261029-a55071
- [accepted] Diptych labels follow each headline, so they sit at different heights when the night headline wraps one line more; pin them to the panel foot if the owner wants them level (src/app/page.tsx) :: logged 2026-10-29, cycle 20261029-c7e0f1
- [cleanup] Product photo blend helper is copied into four test files and checks only the literal mix-blend-multiply class on the img (src/app/bag/bag.test.tsx) :: logged 2026-11-03, cycle 20261103-9fd3c7
- [accepted] Product photo backgrounds encode as #FAEEF2 after lossy webp, one red level off #F9EEF2; invisible today, re-encode lossless if a seam ever shows (public/images/products) :: logged 2026-11-03, cycle 20261103-9fd3c7
- [cleanup] Pink swap test samples one background patch per photo with a 15 degree hue bound; add a second opposite patch for a wider margin over beige (src/lib/images.test.ts) :: logged 2026-11-03, cycle 20261103-1bd081
- [accepted] Gift strip ribbon master is 1200 px wide, below the 2500 px landscape rule; displays sharp at gift strip size, ask Alex for a larger export when convenient (assets/shoot/home/strip-a-ribbon.png) :: logged 2026-11-03, cycle 20261103-1bd081
- [cleanup] Product photo test checks border pixels only; add an interior garment patch compared against the white originals (src/lib/product-photos.test.ts) :: logged 2026-11-03, cycle 20261103-5bb413
- [soon] Live price comes from the first variant only; use priceRange.minVariantPrice if variants ever differ in price (src/lib/shopify.ts) :: logged 2026-11-09, cycle 20261109-ac11c7
- [accepted] A Coming soon piece keeps its price in the product page header; Alex agreed 2026-11-09 to keep it so visitors see what it will cost (src/app/shop/[slug]/page.tsx) :: logged 2026-11-09, cycle 20261109-ac11c7
- [accepted] Gallery uses matchMedia addEventListener with no addListener fallback; Safari 13 and older would throw, outside Next 16 browser support (src/components/product-view.tsx) :: logged 2026-11-09, cycle 20261109-64b013
- [cleanup] eslint 9.39.5 is past end of support (npm deprecation warning on every build); upgrade to the supported major with eslint-config-next (package.json) :: logged 2026-11-11
- [accepted] A second checkout overwrites bc-checkout; if the first cart was paid in another tab its pieces stay in the bag (src/lib/bag.ts) :: logged 2026-11-12, cycle 20261112-cd59c4
- [accepted] Shopify answers null for an expired cart as well as a completed one; a cart expiring inside the 7 day window would clear an abandoned bag. An orders/create webhook would remove the guess (src/lib/checkout.ts) :: logged 2026-11-12, cycle 20261112-cd59c4
- [soon] claimCall has no rate limit; an anonymous caller can force unlimited store lookups with well formed tokens. Throttle per IP at the action or the edge when the database is connected (src/lib/claim.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [soon] The real CallStore.claim must also require expires_at > now in its update, so a link that expires between the check and the write cannot be claimed (src/lib/calls.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [accepted] Two receivers can both claim the last unit of a size; nothing reserves stock without writing to Shopify. Revisit when claims become Shopify orders (src/lib/claim.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [accepted] Claims accept the 50 states and DC only; APO/FPO and territories (PR, GU, VI) are refused and the ZIP is not matched to the state. Owner to confirm (src/lib/claim.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [soon] Lighthouse (local build, simulated mobile): LCP 3.5 to 5.5 s on Home, Shop, product, Send a Call, About; the image loads fast but render delay is 1 to 4 s. Re-measure on staging with PageSpeed Insights before tuning (hero carousel hydration is the first suspect on Home) (src/app/page.tsx) :: logged 2026-11-12, cycle 20261112-13c1b8
- [soon] content-accuracy tests check only the old offer text; also assert the offer bar element is absent (src/app/content-accuracy.test.tsx) :: logged 2026-11-13, cycle 20261113-40c9db
- [soon] fabric row test restores the Slip Dress to null instead of its saved fabric and care (src/app/shop/shop.test.tsx) :: logged 2026-11-13, cycle 20261113-40c9db
- [soon] size guide shows a blank cell when the chart lacks a listed size; type chart keys against sizes or show a dash (src/components/size-guide.tsx) :: logged 2026-11-13, cycle 20261113-40c9db
- [soon] Home piece cards show the Boujie Set with a price while it is a draft in Shopify; Home reads the built-in product list, not live data, so it cannot show Coming soon or Sold out (src/app/page.tsx) :: logged 2026-11-18, cycle 20261118-770798
- [soon] Once Send a Call takes payment, clear the gift pop-up after a successful send so the next gift starts empty (Alex 2026-11-18: keep choices on close until then) (src/components/gift-button.tsx) :: logged 2026-11-18
- [soon] Full test run under load times out 4 to 8 UI tests at the 5s default (mini bag, header, bag, product photos); they pass alone. Raise testTimeout or cut slow renders (vitest.config.ts) :: logged 2026-11-18, cycle 20261118-891515
- [soon] Checkout server actions (startCheckout, orderPlaced) have no rate limit; add a Vercel firewall rate limit on them at launch. A cookie does not help: scripts send their own (review 2026-11-18) (src/lib/checkout.ts) :: logged 2026-11-18, cycle 20261118-16bdad
- [accepted] Switching checkout off after launch pauses the order check, so a shopper who paid just before keeps a full bag; it clears when checkout is back on within 7 days, never after. Put this in the launch rollback notes (src/lib/checkout.ts) :: logged 2026-11-18, cycle 20261118-16bdad
- [cleanup] A hero slide tapped before the page load event fades out empty when a second slide is tapped, until load; keep visited slides mounted (track them in state) (src/components/hero-carousel.tsx) :: logged 2026-11-18, cycle 20261118-8648b7
