# Decision 0001: Send a Call delivers through a swappable channel and saves Calls through a storage slot

Status: accepted
Date: 2026-11-13
Cycle: 20261112-4d20b1

## Context

Send a Call sends a gift message with a private claim link to the receiver. The owner plans text messages through Twilio, but her Twilio account and US business texting registration (A2P 10DLC, often 1 to 3 weeks) are not ready. Saving Calls needs a database the developer has not set up yet. Without a rule, the first version would hard-code email and an ad hoc store, and switching later would touch every part of the flow.

## Decision

- Delivery goes through `deliverCall(call, url, channels)` in `src/lib/calls.ts`. Each channel is one function keyed by name. Email ships first through Resend (`src/lib/mail.ts`, env `RESEND_API_KEY` and `MAIL_FROM`). SMS is added later as a second channel; nothing else in the flow changes.
- Calls are read and written only through a `CallStore` interface. Tests use an in-memory store. The developer implements the same interface on the real database.
- A claim link carries a random 32-byte token (base64url). Only its SHA-256 hash is stored, so a leaked database row cannot be turned back into a working link.
- Without its env vars, a channel reports "not configured" and sends nothing, so preview and local builds never email real people.

## Options considered

- Hard-code email now, rewrite for SMS later: rejected because the switch would touch the sender form, the store and the claim flow.
- Wait for the database before building anything: rejected because the email, link and claim logic do not depend on which database is chosen.
- Signed links that carry the whole Call (no database): rejected because a claim must be one-time and unclaimed Calls must turn into credit, which needs stored state.

## Consequences

- Adding SMS is one channel function plus a phone field on the sender form.
- The developer owns one adapter: the `CallStore` methods on his database.
- Every message body is built from escaped text; the sender's note is never inserted as HTML.
