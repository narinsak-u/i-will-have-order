# Checkout Workflow

## Customer Flow

1. **Landing page** — User browses plans and clicks a plan card in `<LandingPlans>`. Page auto-scrolls to the checkout section (`#checkout`).

2. **Checkout form** (`<LandingCheckout>`) — Form auto-fills with demo customer data (name, email, address in Thai). User can edit fields or submit as-is. Order summary sidebar shows plan image, price, and features.

3. **Click "สั่งซื้อ"** — Button shows a loading spinner (`LoaderCircle`), form becomes disabled. A `POST` request is sent to `/api/create-checkout-session` with:
   ```json
   {
     "planId": "week" | "month" | "year",
     "customer": { "name": "string", "email": "string", "address": "string" }
   }
   ```

4. **Server-side session creation** (`server/api/create-checkout-session.post.ts`):
   - Validates `planId` (must be `week`/`month`/`year`) and `customer` fields (all non-empty strings)
   - Looks up price from an internal plans map (prices in THB: 273 / 1053 / 9965)
   - Converts to satang (×100) for Stripe
   - Creates a Stripe Checkout Session with `mode: 'payment'`, `currency: 'thb'`, `billing_address_collection: 'required'`
   - Sets `success_url` to `/dashboard?session_id={CHECKOUT_SESSION_ID}` and `cancel_url` to `/#checkout`
   - Returns `{ url: string }` — the Stripe hosted checkout URL

5. **Stripe redirect** — Browser redirects to Stripe's hosted payment page. Customer fills payment info. In test mode, use card `4242 4242 4242 4242` (any future expiry, any CVC).

6. **Stripe callback** — On successful payment, Stripe redirects to `/dashboard?session_id=cs_test_xxx`. On cancellation, redirects back to `/#checkout` with form state preserved.

7. **Dashboard verification** (`app/pages/dashboard.vue`, `onMounted`):
   - Reads `session_id` from URL query params
   - Calls `GET /api/verify-session?session_id=cs_test_xxx`
   - Server route (`server/api/verify-session.get.ts`) validates `session_id` format (must start with `cs_`), retrieves session from Stripe, checks `payment_status === 'paid'`, and returns `{ planId, paymentStatus }`
   - On success: saves `{ planId, startedAt }` to `localStorage` key `sc:active-plan`, shows success toast, cleans URL (removes `session_id` param)
   - On error: shows error toast "ไม่พบข้อมูลการชำระเงิน", falls back to existing localStorage data (returning users)

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Session creation fails (network, Stripe) | Error toast "ไม่สามารถสร้างคำสั่งซื้อได้ กรุณาลองอีกครั้ง", form stays intact |
| User cancels on Stripe | Redirected to `/#checkout`, no toast, form preserved |
| Invalid/expired `session_id` | Error toast "ไม่พบข้อมูลการชำระเงิน", empty dashboard state |
| No `session_id` + no localStorage | Empty dashboard state with "Browse plans" link |
| Page refresh after success | `localStorage` fallback restores plan data |
| Invalid body (missing fields) | Server returns 400 from `createError()` |

## Technical Notes

- **No auth** — Out of scope. Demo-mode only.
- **No webhooks** — Session verification via GET endpoint is sufficient for dev.
- **One-time payment** — `mode: 'payment'`, not `mode: 'subscription'`.
- **THB pricing** — Prices use 2 decimal places; convert to satang (×100) for Stripe.
- **`payment_status`** — Uses `'paid'` (not `'complete'`).
- **Plans data** — Duplicated in server route (can't import from `app/composables/plans.ts` in server context).
- **Environment** — Requires `NUXT_STRIPE_SECRET_KEY` in `.env` (Stripe test key starting with `sk_test_`).

## Data Flow Diagram

```
User clicks plan card → Plans.vue emits select(planId)
  → index.vue sets selectedPlan, scrolls to #checkout
  → Checkout.vue shows form with auto-filled demo data
  → User clicks "สั่งซื้อ"
  → Checkout.vue POST /api/create-checkout-session { planId, customer }
  → Server validates, calls stripe.checkout.sessions.create()
  → Returns { url }
  → Checkout.vue sets window.location.href = url
  → Stripe Checkout (user pays with test card)
  → On success: redirect to /dashboard?session_id=cs_test_xxx
  → Dashboard.vue onMounted: GET /api/verify-session?session_id=xxx
  → Server retrieves session, checks payment_status === 'paid'
  → Returns { planId, paymentStatus }
  → Dashboard saves to localStorage, shows active plan, cleans URL
```
