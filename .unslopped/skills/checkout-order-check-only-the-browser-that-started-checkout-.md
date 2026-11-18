---
name: checkout-order-check-only-the-browser-that-started-checkout-
title: Checkout order check: only the browser that started checkout can ask Shopify about its cart, via an httpOnly cookie, and the check stays off until launch
created: 2026-11-18T18:28:15.507Z
updated: 2026-11-18T18:28:15.507Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261118-16bdad
tags: checkout, order, check, browser, started, ask, shopify, src
---
# Checkout order check: only the browser that started checkout can ask Shopify about its cart, via an httpOnly cookie, and the check stays off until launch

## When to use
Requests like:
- "Checkout order check: only the browser that started checkout can ask Shopify about its cart, via an httpOnly cookie, and the check stays off until launch"

## Playbook
Files touched:
- CHANGELOG.md
- src/lib/checkout.test.ts
- src/lib/checkout.ts

Acceptance criteria that passed:
- orderPlaced returns false and never calls Shopify while SHOPIFY_CHECKOUT_ENABLED is not "true".
- With checkout on, orderPlaced still reports a placed order, a cart that still exists, Shopify errors and an unreachable Shopify as before.
- startCheckout still says checkout opens soon while the switch is off.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- The first approach, an httpOnly cookie binding orderPlaced to the cart, was planned on a wrong claim: that it stops scripted calls. A script sends its own Cookie header. Before proposing a security control, ask what an attacker who is not a browser can do. Rate limiting belongs at the edge (Vercel firewall), not in a cookie.
- I also overstated the risk at first: the Storefront API has no fixed request limit for buyer traffic. Check Shopify's documented limits before calling something urgent.
- Two commits went in for one change (cookie, then its removal) because amend is blocked; the PR diff against develop stayed at 3 code lines.
