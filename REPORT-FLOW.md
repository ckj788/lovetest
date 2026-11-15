# Report flow — 2026-11-03

Visual CSS and design tokens unchanged. Duo links hidden and /dual redirects home. Solo contains exactly 8 questions; background setup removed. Bestie asks each person for their own 8 preferences, with no separate guess round.

## Access and purchase

Owner finishes → encrypted report record and independent invitation token → owner sends guest link → guest completes → both see a brief free snapshot → owner chooses one shared unlock → both personal links open the full report once payment is confirmed. Guest cannot purchase. New checkout sessions and local preview unlocks require both people to have completed; incomplete reports receive REPORT_NOT_READY (409). Waiting pages focus on the invitation, disclose the total price and show no purchase button. Existing paid or preview-unlocked records retain their entitlement and open after the invited friend finishes, without a second purchase.

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

In next dev only (NODE_ENV=development), the purchase button calls /api/reports/preview and immediately enables preview access. Bestie requires both answer sets before this button appears or the endpoint grants access. This is saved separately from paid/Stripe fields. Only the initiating person unlocks; both personal links can then open the full report. Refresh preserves the local preview grant. Production ignores the grant and returns 404 from the preview endpoint; the real Stripe flow remains available for later integration.

Question navigation uses selected feedback → fade/slide out → direction-aware fade/slide in, with a light option cascade and smoothly updated progress. Back navigation cancels pending advances; reduced-motion preference bypasses transition delays.

## Friendship report depth

Full reports now include the specific answers shaping the profile, shared preferences and prioritized differences, eight preference-specific interpretations (each person’s stated need, a potential misunderstanding, a practical agreement and an opening question), a seven-day joint plan, five adaptable scripts, a three-part response guide, and a day-seven checkpoint. Matching answers are not treated as proof of relationship health; no exact matches produces complementary opportunities rather than invented agreements. Expanded fields remain absent from unpaid API previews. Existing report links recompute this richer report from their saved answers.

The latest Bestie report groups this material into six chapters. All eight exact option pairs now receive specific interpretation and agreement guidance, including different shared-choice cases. Related question combinations influence one recommended first conversation and supply quoted evidence. Individual scripts and follow-through criteria use that recommendation. Exact shared-choice count, the ten broad types, and the suggested conversation priority are separate descriptive outputs. Preferences and hypothetical situations do not establish actual behavior or relationship quality. A human validation protocol is prepared in RESEARCH-VALIDATION.md; it has not yet been run.

## Vercel Solo completion fix — 2026-11-04

Production report persistence previously threw if Redis or DATA_ENCRYPTION_KEY was absent, making /api/reports return 503 after Solo question 8. Solo now falls back to a stateless server-calculated free report; answers are retained in the browser for up to 30 days and never placed in a share URL. Full report restoration and demo unlock are recalculated from saved answers via /api/reports/solo-preview. Unpaid requests do not receive full content. No database is needed for this Solo fallback. Friend cross-device sessions still require persistent encrypted storage.

For this browser-only Solo demo, REPORT_PREVIEW_MODE=true explicitly enables click-to-preview; false disables it. With no override, demo unlock is available only when real Stripe key+webhook configuration is incomplete or in local development. When both Stripe credentials exist, the fallback never grants paid access; payment is unavailable until persistent storage is repaired. Real checkout and paid entitlements remain unchanged.

Client report requests time out after 15 seconds with a retry message; the last question includes an explicit Retry my result button and keeps existing answers. Tests run NODE_ENV=production with no Redis, encryption or Stripe secrets to reproduce this deployment condition.

## Completion reveal

Solo, friend initiator and friend guest show role-specific completion screens after the eighth answer. Successful requests share a minimum 2.1-second presentation beat (350 ms with reduced motion). Network time is included, not added; errors return to the answered question immediately for retry. New submissions show the animation; refreshing an existing report does not replay it. Animation state masks results until the beat ends, and leaving the page invalidates late UI updates. No simulated analysis percentage or scientific-processing claim is shown.

## Vercel friendship storage — 2026-11-13

Production returned 503 after friend question 8 because no Redis database was connected. Cross-device invitations require persistent storage; this cannot use Solo's browser-only fallback. Storage now accepts either a complete UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN pair or Vercel's KV_REST_API_URL / KV_REST_API_TOKEN pair. DATA_ENCRYPTION_KEY remains required. Setup instructions are in VERCEL-SETUP.md; connecting storage and redeploying are required to restore the online flow.

GET /api/reports/availability checks encrypted storage configuration and performs a read before the friend quiz starts. Missing setup and temporary outages show a retry notice using existing styles. Owner and guest drafts are separated by invitation, validated, and retained in the browser for seven days. Failed final submissions have an explicit retry button; successful submissions remove their draft. No payment or report entitlement rules change.
