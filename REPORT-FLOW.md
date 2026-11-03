# Report flow — 2026-11-03

Visual CSS and design tokens unchanged. Duo links hidden and /dual redirects home. Solo contains exactly 8 questions; background setup removed. Bestie asks each person for their own 8 preferences, with no separate guess round.

## Access and purchase

Owner finishes → encrypted report record and independent invitation token → owner sends guest link and purchases → guest completes → both personal links open full report only when payment is confirmed and both have submitted. Guest cannot purchase. Payment before guest completion and guest completion before payment are both supported.

Solo free preview contains pattern name, short summary and one immediate action. Bestie free preview contains a brief archetype after completion. Neither free API response contains raw answers, full comparisons, detailed plans or scripts. No hidden paid content is rendered behind blur.

Full report authorization is server-side. URL success parameters do not authorize access. Stripe webhook signature, checkout ID, currency, amount and report mode must match. Repeated webhook delivery preserves the same purchase. Refunded purchases are revoked.

Both report links and invitations use random 192-bit bearer tokens in URL fragments. Treat these links as private. Responses use Cache-Control: no-store. Reports expire after 30 days, including paid reports; this is disclosed before checkout.

## Environment

- APP_URL: canonical https origin for Stripe redirects; required in production.
- STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET: checkout is disabled unless both exist.
- Webhook endpoint: /api/stripe/webhook; checkout.session.completed, checkout.session.async_payment_succeeded, charge.refunded.
- UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN: production persistence.
- DATA_ENCRYPTION_KEY: 64 hex characters; required in production.
- Local next dev uses encrypted .data files with a development-only key; do not deploy this fallback.

Prices are server-set: Solo USD 7.99, Bestie USD 9.99, one-time. No SQL migration; new report: / report-token: / payment-report: Redis keys coexist with old records. Old Solo v2 browser progress is not reused because question indices changed.

Do not deploy until production Redis, encryption, canonical origin, support contact and signed Stripe test-mode success/cancel/refund delivery have been verified. No real charge was made during implementation.

## Result coverage and answer navigation

Solo keeps seven deterministic behavioral outcomes (including insufficient evidence). Existing unit fixtures exercise every one. Friend results now use ten content-based profile affinities, not just the count of identical answers: Same Braincell, Low-Maintenance Legends, The Comfort Crew, Adventure Allies, Social Spark Duo, Safe-Harbor Besties, The Practical Pact, Steady Anchors, Golden Retriever × Black Cat, and Plot-Twist Besties. Each has a distinct explanation, challenge and script. Tests include a concrete reachable fixture for every profile, swapped-partner invariance, same-count/different-pattern cases, and real answer quotes. Profiles are playful heuristics, not validated personality measures.

Single choices advance after 180 ms of selection feedback. Answer ID is passed directly to submission so the last answer cannot be lost to a stale React state. Double clicks are locked out; back navigation cancels a pending advance. Multi-select never auto-advances and retains its confirm button.

## Local review unlock

In next dev only (NODE_ENV=development), the existing purchase button calls /api/reports/preview and immediately enables preview access. This is saved separately from paid/Stripe fields. The initiating person unlocks; guest access still requires both people to have answered. Refresh preserves the local preview grant. Production ignores the grant and returns 404 from the preview endpoint; the real Stripe flow remains available for later integration.

Question navigation uses selected feedback → fade/slide out → direction-aware fade/slide in, with a light option cascade and smoothly updated progress. Back navigation cancels pending advances; reduced-motion preference bypasses transition delays.

## Friendship report depth

Full reports now include the specific answers shaping the profile, shared preferences and prioritized differences, eight preference-specific interpretations (each person’s stated need, a potential misunderstanding, a practical agreement and an opening question), a seven-day joint plan, five adaptable scripts, a three-part response guide, and a day-seven checkpoint. Matching answers are not treated as proof of relationship health; no exact matches produces complementary opportunities rather than invented agreements. Expanded fields remain absent from unpaid API previews. Existing report links recompute this richer report from their saved answers.
