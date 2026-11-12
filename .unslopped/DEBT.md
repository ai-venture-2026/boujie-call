# Debt log

Known deviations we are deliberately not fixing in the change where they were found.
One line each, logged on the spot instead of opening a work item. Sweep the cleanup
items in one batch at a quiet moment; accepted items stay, with the reason, so nobody
re-litigates them.

Categories: cleanup (mechanical, safe to batch), pattern (a wrong shape new code would
copy; fix it before it spreads), soon (costs someone time while it exists), accepted
(evaluated and staying as is).
- [soon] Privacy and Terms pages are missing; the footer leaves them out until they exist, and they are needed before the waitlist collects emails (src/components/site-footer.tsx) :: logged 2026-10-28, cycle 20261028-478322
- [cleanup] Size guide closes when a text selection drag ends on the backdrop; close only when pointerdown and click both hit the dialog (src/components/size-guide.tsx) :: logged 2026-10-29, cycle 20261029-a10368
- [soon] next dev re-adds a Next.js agent block with em dashes to AGENTS.md on every start; decide whether to commit it or turn it off (AGENTS.md) :: logged 2026-10-29, cycle 20261029-abd860
- [cleanup] A lone last Shop card left aligns at 768px to 1023px where the grid is still two columns (src/components/shop-grid.tsx) :: logged 2026-10-29, cycle 20261029-b9e136
- [soon] Landscape on notched iPhones: body side inset padding leaves cream strips beside full bleed sections and offsets the centered nav; move the inset onto inner wrappers (src/app/globals.css) :: logged 2026-10-29, cycle 20261029-b9e136
- [cleanup] Desktop nav left-[38%] measures from the max-w-7xl container since it moved from fixed to absolute; it no longer lines up with the hero photo column above 80rem (src/components/site-header.tsx) :: logged 2026-10-29, cycle 20261029-46cf8d
- [soon] Home detail Romper packshot (object-contain) has no contact shadow; a fixed oval would miss the hem, so add it once the new pink photos set the garment position (src/app/page.tsx) :: logged 2026-10-29, cycle 20261029-a55071
- [cleanup] Hairlines in shop filters, bag, size guide, product quick add bar and menu still use border-ink/10 or /15; move them to border-card-border (src/components/bag-view.tsx) :: logged 2026-10-29, cycle 20261029-a55071
- [accepted] Diptych labels follow each headline, so they sit at different heights when the night headline wraps one line more; pin them to the panel foot if the owner wants them level (src/app/page.tsx) :: logged 2026-10-29, cycle 20261029-c7e0f1
- [cleanup] Product photo blend helper is copied into four test files and checks only the literal mix-blend-multiply class on the img (src/app/bag/bag.test.tsx) :: logged 2026-11-03, cycle 20261103-9fd3c7
- [accepted] Product photo backgrounds encode as #FAEEF2 after lossy webp, one red level off #F9EEF2; invisible today, re-encode lossless if a seam ever shows (public/images/products) :: logged 2026-11-03, cycle 20261103-9fd3c7
- [cleanup] Pink swap test samples one background patch per photo with a 15 degree hue bound; add a second opposite patch for a wider margin over beige (src/lib/images.test.ts) :: logged 2026-11-03, cycle 20261103-1bd081
- [accepted] Gift strip ribbon master is 1200 px wide, below the 2500 px landscape rule; displays sharp at gift strip size, ask Alex for a larger export when convenient (assets/shoot/home/strip-a-ribbon.png) :: logged 2026-11-03, cycle 20261103-1bd081
- [cleanup] Product photo test checks border pixels only; add an interior garment patch compared against the white originals (src/lib/product-photos.test.ts) :: logged 2026-11-03, cycle 20261103-5bb413
- [soon] Live price comes from the first variant only; use priceRange.minVariantPrice if variants ever differ in price (src/lib/shopify.ts) :: logged 2026-11-09, cycle 20261109-ac11c7
- [cleanup] shopify.ts has no server-only guard; add it so a client import fails the build (src/lib/shopify.ts) :: logged 2026-11-09, cycle 20261109-ac11c7
- [accepted] A Coming soon piece keeps its price in the product page header; Alex agreed 2026-11-09 to keep it so visitors see what it will cost (src/app/shop/[slug]/page.tsx) :: logged 2026-11-09, cycle 20261109-ac11c7
- [accepted] Gallery uses matchMedia addEventListener with no addListener fallback; Safari 13 and older would throw, outside Next 16 browser support (src/components/product-view.tsx) :: logged 2026-11-09, cycle 20261109-64b013
- [cleanup] Gallery onScroll builds a new MediaQueryList per scroll event; hold one query in a ref (src/components/product-view.tsx) :: logged 2026-11-09, cycle 20261109-64b013
- [soon] Vercel build warns that engines node >=20.9 floats to each new Node major; pin a major (for example 22.x) so a Node release cannot change the build unannounced (package.json) :: logged 2026-11-11
- [cleanup] eslint 9.39.5 is past end of support (npm deprecation warning on every build); upgrade to the supported major with eslint-config-next (package.json) :: logged 2026-11-11
- [soon] orderPlaced is a public server action with no rate limit; a script could spend the Storefront throttle that real checkouts need. Bind it to a cookie set by startCheckout or rate limit it (src/lib/checkout.ts) :: logged 2026-11-12, cycle 20261112-cd59c4
- [accepted] A second checkout overwrites bc-checkout; if the first cart was paid in another tab its pieces stay in the bag (src/lib/bag.ts) :: logged 2026-11-12, cycle 20261112-cd59c4
- [accepted] Shopify answers null for an expired cart as well as a completed one; a cart expiring inside the 7 day window would clear an abandoned bag. An orders/create webhook would remove the guess (src/lib/checkout.ts) :: logged 2026-11-12, cycle 20261112-cd59c4
- [soon] claimCall has no rate limit; an anonymous caller can force unlimited store lookups with well formed tokens. Throttle per IP at the action or the edge when the database is connected (src/lib/claim.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [soon] The real CallStore.claim must also require expires_at > now in its update, so a link that expires between the check and the write cannot be claimed (src/lib/calls.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [accepted] Two receivers can both claim the last unit of a size; nothing reserves stock without writing to Shopify. Revisit when claims become Shopify orders (src/lib/claim.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [accepted] Claims accept the 50 states and DC only; APO/FPO and territories (PR, GU, VI) are refused and the ZIP is not matched to the state. Owner to confirm (src/lib/claim.ts) :: logged 2026-11-12, cycle 20261112-bc8f4a
- [cleanup] WaitlistForm and its tests in page.test.tsx are unused since Send a Call buttons open the gift pop-up; delete them in part B (src/components/waitlist-form.tsx) :: logged 2026-11-12, cycle 20261112-aaeae7
