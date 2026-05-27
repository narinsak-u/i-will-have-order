# Stripe Checkout Integration Design

## Overview

Integrate Stripe Checkout Sessions into the existing spinach-and-cheese bake subscription landing page. When a user selects a plan and submits the checkout form, the app creates a Stripe Checkout Session server-side, redirects the user to Stripe's hosted payment page, and on success redirects to the dashboard with session verification.

## Architecture

Two Nuxt server routes + frontend modifications:

```
POST /api/create-checkout-session   → creates session, returns { url }
GET  /api/verify-session             → verifies payment, returns { planId, paymentStatus }
```

All Stripe API calls use the server-side secret key. No Stripe publishable key is needed client-side — the frontend only talks to our API.

## Data Flow

1. **Plans.vue** — user clicks a plan card, emits `select(planId)`
2. **index.vue** — sets `selectedPlan` ref, scrolls to `#checkout`
3. **Checkout.vue** — user fills name/email/address (auto-filled with demo data), clicks "สั่งซื้อ"
4. **Checkout.vue** → POST `/api/create-checkout-session` with `{ planId, customer: { name, email, address } }`
5. **Server** → creates Stripe Checkout Session with plan price from `composables/plans.ts`, planId in metadata, customer_email pre-filled
6. **Checkout.vue** → `window.location.href = session.url` — redirects to Stripe
7. **Stripe** → user pays with test card (`4242 4242 4242 4242`), redirects to `/dashboard?session_id=cs_test_xxx`
8. **Dashboard onMount** → reads `session_id` from URL, calls GET `/api/verify-session?session_id=xxx`
9. **Server** → retrieves session, returns `{ planId, paymentStatus }` only if `payment_status === 'complete'`
10. **Dashboard** → saves plan to localStorage (for refresh resilience), renders plan view

## Server Routes

### POST /api/create-checkout-session

- **Input:** `{ planId: 'week' | 'month' | 'year', customer: { name: string, email: string, address: string } }`
- **Logic:**
  - Look up plan from `composables/plans.ts` (price, name)
  - Convert price to Stripe amount (smallest currency unit — THB uses 2 decimal places, so ฿1053 → 105300)
  - `stripe.checkout.sessions.create()` with:
    - `line_items`: unit_amount in satang, quantity 1
    - `mode: 'payment'`
    - `customer_email`: from request body (pre-fills Stripe's email field)
    - `metadata: { planId, customerName, customerAddress }` (for record-keeping; Stripe collects billing address independently)
    - `success_url`: `/dashboard?session_id={CHECKOUT_SESSION_ID}`
    - `cancel_url`: `/#checkout`
    - `billing_address_collection: 'required'`
    - `currency: 'thb'`
  - Stripe uses the secret key from `NUXT_STRIPE_SECRET_KEY` env var
- **Output:** `{ url: string }` — the Stripe Checkout Session URL

### GET /api/verify-session

- **Query:** `?session_id=cs_test_xxx`
- **Logic:**
  - `stripe.checkout.sessions.retrieve(session_id)`
  - If `payment_status === 'complete'`, return `{ planId, paymentStatus }` from metadata
  - Otherwise return error
- **Output:** `{ planId: string, paymentStatus: string }` or `{ error: string }`

## Frontend Changes

### Checkout.vue

- Remove `@confirm` emit — checkout is now self-contained
- On submit: POST to `/api/create-checkout-session`, redirect to Stripe URL
- Loading state: button shows spinner, disabled while API call is in-flight
- Error: toast via `vue-sonner` — "ไม่สามารถสร้างคำสั่งซื้อได้ กรุณาลองอีกครั้ง"
- Form fields (name, email, address) unchanged — still collect customer info
- Order summary sidebar (plan image, price, features) unchanged
- Auto-fill demo data on plan selection unchanged
- All Thai labels and layout preserved

### index.vue

- Remove `handleConfirm` function entirely
- Remove `@confirm` event binding on `<LandingCheckout>`
- `selectedPlan` ref and `handleSelect` remain (drive plan selection + scroll)
- `localStorage` write removed from here (moves to dashboard after Stripe success)

### dashboard.vue

- `onMounted`: check URL for `session_id` query param
- If present: call `GET /api/verify-session?session_id=xxx`
  - On success: save `{ planId, startedAt: Date.now() }` to localStorage, clean URL (remove `session_id`), render plan
  - On error: toast "ไม่พบข้อมูลการชำระเงิน", show empty state
- If no session_id: fall back to existing localStorage behavior (returning users)
- Existing dashboard layout (plan card, progress bar, delivery info, cancel button) unchanged
- `confirm()` dialog for cancel preserved

## Error & Edge Cases

| Scenario | Behavior |
|----------|----------|
| Session creation fails | Toast error, user stays on checkout page with form intact |
| User cancels on Stripe | Stripe redirects to `/#checkout`, form state preserved, no toast |
| Invalid/expired session_id | Dashboard toast, show empty state |
| Network error during verification | Toast, dashboard shows empty state |
| No session_id + no localStorage | Dashboard empty state with link to plans |
| Page refresh on dashboard | localStorage fallback works (plan saved after verification) |

## Dependencies

- `bun add stripe` — Stripe Node.js SDK (server-side)

## Environment Variables

- `NUXT_STRIPE_SECRET_KEY` — Stripe secret key (test mode, starts with `sk_test_`)

Add to `.env` file at project root. `.env` should be gitignored. Create `.env.example` documenting the variable.

## Testing in Dev Mode

1. Run `bun run dev`
2. Select a plan on landing page
3. Fill checkout form (or use auto-filled demo data)
4. Click "สั่งซื้อ" → redirected to Stripe Checkout
5. Use test card `4242 4242 4242 4242` with any future expiry and any CVC
6. Submit → redirected to `/dashboard` with plan active

## Files Changed

| File | Action |
|------|--------|
| `server/api/create-checkout-session.post.ts` | CREATE |
| `server/api/verify-session.get.ts` | CREATE |
| `app/components/landing/Checkout.vue` | MODIFY |
| `app/pages/index.vue` | MODIFY |
| `app/pages/dashboard.vue` | MODIFY |
| `.env.example` | CREATE |

## Out of Scope

- Stripe webhook handling (not needed for dev mode)
- Real user authentication / user database
- Subscription (recurring) — this is single-payment in dev mode
- Refund handling
- Order history beyond current plan
