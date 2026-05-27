# Improvement Plan

Derived from full codebase review on 2026-05-27. Categorized by priority.

## Priority: Critical (fix before production)

### 1. Validate Stripe secret key at startup

**Files:** `server/api/create-checkout-session.post.ts:3`, `server/api/verify-session.get.ts:3`

Both server files do `new Stripe(process.env.NUXT_STRIPE_SECRET_KEY!)` with no runtime validation. If the env var is missing or undefined, Stripe constructor receives `undefined` and throws a confusing error at request time.

**Fix:** Add a startup check in a Nitro plugin or module-level guard:

```ts
const key = process.env.NUXT_STRIPE_SECRET_KEY
if (!key) {
  throw new Error('NUXT_STRIPE_SECRET_KEY is not set')
}
const stripe = new Stripe(key)
```

Better yet, centralize the stripe instance into `server/utils/stripe.ts` to avoid duplication.

### 2. Eliminate pricing duplication

**Files:** `app/composables/plans.ts`, `server/api/create-checkout-session.post.ts:40-44`

Plan prices exist in two places. If frontend prices change without updating the server, customers will be charged the wrong amount (or the UI will show different prices than what's charged).

**Option A — Server as source of truth (recommended):**
- Remove pricing data from `app/composables/plans.ts`
- Add a `/api/plans` GET endpoint that returns plans with prices from the server
- Frontend fetches plans on load

**Option B — Shared constants:**
- Extract `PLANS` constant into a shared file (e.g. `composables/plans.ts`)
- Import it in the server endpoint
- (Nuxt 4 server can import from `app/` if tsconfig is configured correctly)

**Option C — Validation (minimal):**
- Keep both copies but add a build-time or test-time assertion that prices match

### 3. Fix Checkout form overwrite on plan re-selection

**File:** `app/components/landing/Checkout.vue:21-30`

The `watch` on `selectedPlan` resets name/email/address to hardcoded demo values every time a plan is selected. If a user edits their info then clicks a different plan, their edits are silently lost.

**Fix:** Only set demo values if the fields are empty (i.e., first selection), or remove the auto-fill entirely and use placeholders instead.

```ts
watch(() => props.selectedPlan, (plan) => {
  if (plan && !name.value && !email.value && !address.value) {
    name.value = 'ผักโขม อบชีส'
    email.value = 'spinachandcheese@example.com'
    address.value = '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110'
  }
})
```

## Priority: Medium

### 4. Centralize Stripe instance

**Files:** `server/api/create-checkout-session.post.ts`, `server/api/verify-session.get.ts`

Both files create their own `Stripe` instance with the same key. Extract into `server/utils/stripe.ts`:

```ts
import Stripe from 'stripe'

const key = process.env.NUXT_STRIPE_SECRET_KEY
if (!key) throw new Error('NUXT_STRIPE_SECRET_KEY is not set')

export const stripe = new Stripe(key)
```

Then import from both API handlers.

### 5. Remove dead code

**File:** `app/pages/dashboard.vue:93`

Remove the commented-out `nextDelivery` computed property. It serves no purpose and confuses readers.

```diff
- // const nextDelivery = computed(() => new Date(Date.now() + 1000 * 60 * 60 * 18))
```

### 6. Make `getPlan()` type-safe

**File:** `app/composables/plans.ts:64-66`

The non-null assertion `!` masks the possibility of undefined:

```ts
export function getPlan(id: PlanId): Plan {
  return plans.find(p => p.id === id)!
}
```

If an invalid `PlanId` is ever passed, this returns `undefined` at runtime (typed as `Plan`, so callers won't guard against it). Better approaches:

**Option A — Return `Plan | undefined`:**
```ts
export function getPlan(id: PlanId): Plan | undefined {
  return plans.find(p => p.id === id)
}
```
(Callers must handle undefined — already guarded by `selectedPlan` being nullable.)

**Option B — Use Record lookup:**
```ts
const planMap: Record<PlanId, Plan> = {
  week: plans[0],
  month: plans[1],
  year: plans[2],
}
export function getPlan(id: PlanId): Plan {
  return planMap[id]
}
```
(Impossible to return undefined if `PlanId` is the union type.)

## Priority: Low (cleanup / style)

### 7. Remove redundant `as const` on individual properties

**File:** `app/composables/plans.ts:32`

The entire `plans` array is typed with `as const` on line 54, which already infers literal types for all properties. The individual `as const` annotations on properties like `popular: true as const` are redundant.

```diff
-    popular: true as const,
+    popular: true,
```

### 8. Fix AccordionTrigger useForwardProps inconsistency

**File:** `app/components/ui/AccordionTrigger.vue`

AccordionItem.vue uses `reactiveOmit` + `useForwardProps`, but AccordionTrigger.vue uses `reactiveOmit` directly in the template without `useForwardProps`. For consistency with the codebase pattern, use `useForwardProps`.

### 9. Remove render-blocking Google Fonts

**File:** `nuxt.config.ts:10`

Consider downloading the IBM Plex Sans Thai font and hosting it locally, or using `display=swap` on the Google Fonts URL to prevent render blocking:

```
https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap
```

### 10. Add image optimization

Consider using Nuxt's `<NuxtImg>` or `<NuxtPicture>` with a provider for automatic resizing, WebP conversion, and srcset generation. Low priority for a prototype.

## Summary

| # | Issue | Priority | Effort |
|---|-------|----------|--------|
| 1 | Validate Stripe secret key | Critical | 5 min |
| 2 | Pricing duplication | Critical | 15-30 min |
| 3 | Checkout form overwrite | Critical | 5 min |
| 4 | Centralize Stripe instance | Medium | 5 min |
| 5 | Remove dead code | Medium | <1 min |
| 6 | Type-safe getPlan() | Medium | 5 min |
| 7 | Redundant as const | Low | 2 min |
| 8 | AccordionTrigger inconsistency | Low | 3 min |
| 9 | Google Fonts render blocking | Low | 2 min |
| 10 | Image optimization | Low | varies |
