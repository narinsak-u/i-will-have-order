# Stripe Checkout Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Stripe Checkout Sessions so plan selection + checkout submits to Stripe and redirects to dashboard on success.

**Architecture:** Two Nuxt server routes (`POST /api/create-checkout-session`, `GET /api/verify-session`) handle Stripe API calls using the server-side secret key. The frontend Checkout component posts to the first route, redirects to Stripe's hosted payment page, and the Dashboard verifies the session on arrival.

**Tech Stack:** Nuxt 4 server routes, `stripe` Node.js SDK, Vue 3 Composition API, vue-sonner toasts.

**No test framework configured** — verify via `vue-tsc --noEmit` type-check + dev server visual inspection.

---

### Task 1: Install Stripe SDK & configure env

**Files:**
- Modify: `package.json`
- Create: `.env.example`
- Modify: `.gitignore` (verify `.env` is ignored)

- [ ] **Step 1: Install the Stripe Node.js SDK**

```bash
bun add stripe
```

- [ ] **Step 2: Create `.env.example`**

```
NUXT_STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
```

- [ ] **Step 3: Verify `.env` is gitignored**

Check `.gitignore` has `.env` listed. If not, add it. Create a `.env` file with a placeholder for local dev:

```
NUXT_STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

- [ ] **Step 4: Run type-check to verify no breakage**

```bash
bun x vue-tsc --noEmit
```

Expected: No errors (existing project state is clean).

- [ ] **Step 5: Commit**

```bash
git add .env.example package.json bun.lock
git commit -m "feat: add stripe SDK and env config"
```

---

### Task 2: Create POST /api/create-checkout-session

**Files:**
- Create: `server/api/create-checkout-session.post.ts`

This Nuxt server route receives `{ planId, customer }`, looks up the plan price, creates a Stripe Checkout Session, and returns the session URL.

- [ ] **Step 1: Create server route file**

```typescript
// server/api/create-checkout-session.post.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NUXT_STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { planId, customer } = body as {
    planId: 'week' | 'month' | 'year'
    customer: { name: string; email: string; address: string }
  }

  const plans: Record<string, { name: string; price: number }> = {
    week: { name: '1 Week', price: 273 },
    month: { name: '1 Month', price: 1053 },
    year: { name: '1 Year', price: 9965 },
  }

  const plan = plans[planId]
  if (!plan) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid plan' })
  }

  const amount = plan.price * 100 // THB uses 2 decimal places

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'thb',
    line_items: [
      {
        price_data: {
          currency: 'thb',
          product_data: { name: `Spinach & Cheese — ${plan.name}` },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_email: customer.email,
    metadata: {
      planId,
      customerName: customer.name,
      customerAddress: customer.address,
    },
    billing_address_collection: 'required',
    success_url: `${getRequestURL(event).origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getRequestURL(event).origin}/#checkout`,
  })

  return { url: session.url }
})
```

- [ ] **Step 2: Verify with Nuxt type generation**

```bash
bun run postinstall
bun x vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add server/api/create-checkout-session.post.ts
git commit -m "feat: add create-checkout-session server route"
```

---

### Task 3: Create GET /api/verify-session

**Files:**
- Create: `server/api/verify-session.get.ts`

This route receives `session_id` as a query param, retrieves the Stripe Checkout Session, and returns plan data only if payment was completed.

- [ ] **Step 1: Create server route file**

```typescript
// server/api/verify-session.get.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NUXT_STRIPE_SECRET_KEY!)

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId || !sessionId.startsWith('cs_')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid session ID' })
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'complete') {
    throw createError({ statusCode: 400, statusMessage: 'Payment not completed' })
  }

  const planId = session.metadata?.planId
  if (!planId) {
    throw createError({ statusCode: 400, statusMessage: 'Session missing plan data' })
  }

  return { planId, paymentStatus: session.payment_status }
})
```

- [ ] **Step 2: Run type-check**

```bash
bun x vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add server/api/verify-session.get.ts
git commit -m "feat: add verify-session server route"
```

---

### Task 4: Update Checkout.vue — API call instead of emit

**Files:**
- Modify: `app/components/landing/Checkout.vue`

Replace the `@confirm` emit with a direct API call to `/api/create-checkout-session`. Add loading state, error toast, and redirect to Stripe URL.

- [ ] **Step 1: Rewrite the script section**

```typescript
// app/components/landing/Checkout.vue — script section
import { ref, computed, watch } from "vue"
import { toast } from "vue-sonner"
import { Check, ShoppingBag, ArrowUpFromDot, LoaderCircle } from "lucide-vue-next"
import type { PlanId } from "~/composables/plans"
import { getPlan, planImages } from "~/composables/plans"

const props = defineProps<{
  selectedPlan: PlanId | null
}>()

const name = ref("")
const email = ref("")
const address = ref("")
const loading = ref(false)

const plan = computed(() =>
  props.selectedPlan ? getPlan(props.selectedPlan) : null,
)

watch(
  () => props.selectedPlan,
  (plan) => {
    if (plan) {
      name.value = "ผักโขม อบชีส"
      email.value = "spinachandcheese@example.com"
      address.value = "123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110"
    }
  },
)

const handleSubmit = async () => {
  if (!props.selectedPlan) return

  loading.value = true
  try {
    const { url } = await $fetch("/api/create-checkout-session", {
      method: "POST",
      body: {
        planId: props.selectedPlan,
        customer: {
          name: name.value,
          email: email.value,
          address: address.value,
        },
      },
    })
    window.location.href = url
  } catch {
    toast.error("ไม่สามารถสร้างคำสั่งซื้อได้", {
      description: "กรุณาลองอีกครั้ง",
    })
  } finally {
    loading.value = false
  }
}
```

- [ ] **Step 2: Update the submit button in template**

Change the submit button to show a loading spinner when `loading` is true. The current button text is "สั่งซื้อ". Update to:

```vue
<button
  type="submit"
  :disabled="!selectedPlan || loading"
  class="inline-flex cursor-pointer h-12 items-center gap-2 rounded-full bg-primary px-8 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
>
  <LoaderCircle v-if="loading" class="h-4 w-4 animate-spin" />
  {{ loading ? "กำลังดำเนินการ..." : "สั่งซื้อ" }}
</button>
```

- [ ] **Step 3: Add LoaderCircle to the icon imports**

Import `LoaderCircle` alongside the existing icons. The import at the top of the script section already includes it from Step 1.

- [ ] **Step 4: Remove the "ตัวอย่างการชำระเงิน" disclaimer paragraph**

Remove this paragraph from the template:

```vue
<p class="mt-4 text-xs text-muted-foreground">
  ตัวอย่างการชำระเงิน — ไม่มีการดำเนินการชำระเงินจริง
  การเลือกของคุณจะถูกบันทึกไปยังแดชบอร์ด
</p>
```

Replace with:

```vue
<p class="mt-4 text-xs text-muted-foreground">
  ชำระเงินอย่างปลอดภัยด้วย Stripe · ทดสอบด้วยบัตร 4242 4242 4242 4242
</p>
```

- [ ] **Step 5: Remove the `defineEmits` declaration**

The component no longer emits `@confirm`. Delete these lines:

```typescript
const emit = defineEmits<{
  (
    e: "confirm",
    id: PlanId,
    customer: { name: string; email: string; address: string },
  ): void;
}>();
```

- [ ] **Step 6: Run type-check**

```bash
bun x vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 7: Commit**

```bash
git add app/components/landing/Checkout.vue
git commit -m "feat: wire Checkout to create-checkout-session API"
```

---

### Task 5: Update index.vue — remove handleConfirm

**Files:**
- Modify: `app/pages/index.vue`

The landing page no longer handles the confirm event. Remove `handleConfirm` and the `@confirm` binding on `<LandingCheckout>`. `handleSelect` and `selectedPlan` remain.

- [ ] **Step 1: Remove `handleConfirm` and unused imports**

```typescript
// Before:
import { ref, nextTick } from "vue"
import { useRouter } from "vue-router"
import { toast } from "vue-sonner"
import type { PlanId } from "~/composables/plans"

const router = useRouter()
const selectedPlan = ref<PlanId | null>(null)
// ... handleSelect
const handleConfirm = (planId: PlanId) => {
  try {
    localStorage.setItem(...)
  } catch {}
  toast.success(...)
  setTimeout(() => router.push("/dashboard"), 700)
}

// After:
import { ref, nextTick } from "vue"
import type { PlanId } from "~/composables/plans"

const selectedPlan = ref<PlanId | null>(null)
// ... handleSelect unchanged
// handleConfirm removed
```

- [ ] **Step 2: Remove `@confirm="handleConfirm"` from template**

Change:
```vue
<LandingCheckout :selectedPlan="selectedPlan" @confirm="handleConfirm" />
```
To:
```vue
<LandingCheckout :selectedPlan="selectedPlan" />
```

- [ ] **Step 3: Verify `toast` and `router` are fully removed**

Check no references to `toast` or `router` remain in the file after removing `handleConfirm`.

- [ ] **Step 4: Run type-check**

```bash
bun x vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add app/pages/index.vue
git commit -m "refactor: remove handleConfirm from landing page"
```

---

### Task 6: Update dashboard.vue — session verification on mount

**Files:**
- Modify: `app/pages/dashboard.vue`

On mount, check URL for `session_id`. If present, verify via `/api/verify-session`, save plan to localStorage, and clean the URL.

- [ ] **Step 1: Add session verification to the script section**

Modify the `onMounted` block:

```typescript
// app/pages/dashboard.vue — add to onMounted
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  // Try Stripe session verification first
  const sessionId = route.query.session_id as string | undefined
  if (sessionId) {
    try {
      const data = await $fetch<{ planId: PlanId; paymentStatus: string }>(
        "/api/verify-session",
        { params: { session_id: sessionId } },
      )
      if (data.planId) {
        try {
          localStorage.setItem(
            "sc:active-plan",
            JSON.stringify({ planId: data.planId, startedAt: Date.now() }),
          )
        } catch {}
        toast.success("สั่งซื้อสำเร็จ", {
          description: `ยืนยันแผน ${data.planId} แล้ว`,
        })
        // Clean URL — remove session_id query param
        router.replace({ query: {} })
      }
    } catch {
      toast.error("ไม่พบข้อมูลการชำระเงิน", {
        description: "กรุณาลองใหม่อีกครั้ง",
      })
    }
  }

  // Fallback: read from localStorage (existing behavior)
  try {
    const raw = localStorage.getItem("sc:active-plan")
    if (raw) plan.value = JSON.parse(raw)
  } catch {}
})
```

- [ ] **Step 2: Add `toast` and route imports**

Add to the existing imports at the top of the script:

```typescript
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue-sonner"
```

If `useRoute`/`useRouter` or `toast` aren't already imported, add them. Check current imports:

Current:
```typescript
import { ref, onMounted, computed } from "vue"
import {
  Package, Calendar, Truck, RotateCcw, XCircle, ArrowRight,
} from "lucide-vue-next"
import type { PlanId } from "~/composables/plans"
import { getPlan } from "~/composables/plans"
```

After:
```typescript
import { ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { toast } from "vue-sonner"
import {
  Package, Calendar, Truck, RotateCcw, XCircle, ArrowRight,
} from "lucide-vue-next"
import type { PlanId } from "~/composables/plans"
import { getPlan } from "~/composables/plans"
```

- [ ] **Step 3: Run type-check**

```bash
bun x vue-tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add app/pages/dashboard.vue
git commit -m "feat: add Stripe session verification on dashboard mount"
```

---

### Task 7: Final verification

- [ ] **Step 1: Full type-check**

```bash
bun run postinstall
bun x vue-tsc --noEmit
```

Expected: Zero type errors.

- [ ] **Step 2: Start dev server and test flow**

```bash
bun run dev
```

1. Open http://localhost:3000
2. Select a plan → confirm scroll to checkout works
3. Form is auto-filled with demo data
4. Click "สั่งซื้อ" → should POST to API and redirect
5. Expected: If NUXT_STRIPE_SECRET_KEY is set, redirects to Stripe. If not set, error toast appears.
6. On Stripe checkout page (with valid key): use test card `4242 4242 4242 4242`
7. After payment → redirected to `/dashboard?session_id=cs_test_xxx`
8. Dashboard shows active plan

Note: Step 6-7 requires a valid Stripe test key in `.env`.

- [ ] **Step 3: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final adjustments after Stripe integration verification"
```
