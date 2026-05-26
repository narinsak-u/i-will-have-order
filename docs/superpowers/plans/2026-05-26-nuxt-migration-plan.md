# Nuxt Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the React TanStack Router SPA to Nuxt 3 (Vue.js) while maintaining the exact same visual design, OKLCH theme, and functionality.

**Architecture:** We will create a fresh Nuxt 3 project in a subdirectory `nuxt-app`, configure Tailwind v4, add `shadcn-vue` for `accordion` and `sonner`, and translate all React `.tsx` components and pages to Vue `.vue` Single File Components using the Composition API. State management will use Vue's `ref` and `localStorage` directly in component setup.

**Tech Stack:** Nuxt 3, Vue 3, Tailwind CSS v4, shadcn-vue, lucide-vue-next.

---

### Task 1: Scaffold Nuxt App & Basic Config

**Files:**
- Create: `nuxt-app/package.json`
- Create: `nuxt-app/nuxt.config.ts`
- Create: `nuxt-app/app.vue`

- [ ] **Step 1: Scaffold the Nuxt project**

Run: `npx nuxi@latest init nuxt-app --force --no-install`
Expected: Nuxt project created in `nuxt-app` folder.

- [ ] **Step 2: Install core dependencies**

Run: `cd nuxt-app && npm install && npm install -D @tailwindcss/vite tailwindcss vue-tsc typescript`

- [ ] **Step 3: Configure Nuxt**

Update `nuxt-app/nuxt.config.ts`:
```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [
      require('@tailwindcss/vite')()
    ]
  },
  css: ['~/assets/css/styles.css']
})
```

- [ ] **Step 4: Update app.vue**

Update `nuxt-app/app.vue`:
```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

- [ ] **Step 5: Commit**

```bash
git add nuxt-app/
git commit -m "chore: scaffold nuxt app and configure base"
```

### Task 2: Migrate Styles and Assets

**Files:**
- Create: `nuxt-app/assets/css/styles.css`
- Copy: `src/assets/*` -> `nuxt-app/assets/images/`

- [ ] **Step 1: Copy and adapt styles**

Run: `mkdir -p nuxt-app/assets/css && cp src/styles.css nuxt-app/assets/css/`

- [ ] **Step 2: Install tw-animate-css**

Run: `cd nuxt-app && npm install tw-animate-css`

- [ ] **Step 3: Copy assets**

Run: `cp -r src/assets nuxt-app/assets/images`

- [ ] **Step 4: Commit**

```bash
git add nuxt-app/assets/
git commit -m "feat: migrate styles and static assets"
```

### Task 3: Initialize shadcn-vue & Icons

**Files:**
- Modify: `nuxt-app/components.json`
- Create: `nuxt-app/components/ui/*`

- [ ] **Step 1: Install lucide-vue-next and class-variance-authority**

Run: `cd nuxt-app && npm install lucide-vue-next class-variance-authority clsx tailwind-merge`

- [ ] **Step 2: Initialize shadcn-vue**

Run: `cd nuxt-app && npx shadcn-vue@latest init -y`

- [ ] **Step 3: Add Accordion and Sonner**

Run: `cd nuxt-app && npx shadcn-vue@latest add accordion sonner -y`

- [ ] **Step 4: Commit**

```bash
git add nuxt-app/
git commit -m "feat: setup shadcn-vue and install ui components"
```

### Task 4: Migrate Shared Components (Header, Footer)

**Files:**
- Create: `nuxt-app/components/SiteHeader.vue`
- Create: `nuxt-app/components/SiteFooter.vue`

- [ ] **Step 1: Implement SiteHeader**

Create `nuxt-app/components/SiteHeader.vue`:
```vue
<template>
  <header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">S</span>
        <span class="text-sm font-semibold tracking-tight text-foreground">Spinach &amp; Cheese Co.</span>
      </NuxtLink>
      <nav class="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <NuxtLink :to="{ path: '/', hash: '#plans' }" class="hover:text-foreground transition-colors">Plans</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#how' }" class="hover:text-foreground transition-colors">How it's made</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#benefits' }" class="hover:text-foreground transition-colors">Benefits</NuxtLink>
        <NuxtLink to="/dashboard" class="hover:text-foreground transition-colors">Dashboard</NuxtLink>
      </nav>
      <NuxtLink
        to="/dashboard"
        class="inline-flex h-9 items-center rounded-sm bg-primary px-4 text-xs font-medium tracking-wide text-primary-foreground uppercase hover:bg-primary/90 transition-colors"
      >
        Order
      </NuxtLink>
    </div>
  </header>
</template>
```

- [ ] **Step 2: Implement SiteFooter**

Create `nuxt-app/components/SiteFooter.vue`:
```vue
<template>
  <footer class="border-t border-border/60 bg-background py-12 md:py-16">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">S</span>
          <p class="mt-4 text-sm text-muted-foreground">Baked fresh, delivered daily. The simplest routine for your day.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-foreground">Product</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><NuxtLink :to="{ path: '/', hash: '#plans' }" class="hover:text-foreground">Plans</NuxtLink></li>
            <li><NuxtLink :to="{ path: '/', hash: '#how' }" class="hover:text-foreground">Sourcing</NuxtLink></li>
            <li><NuxtLink :to="{ path: '/', hash: '#faq' }" class="hover:text-foreground">FAQ</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-foreground">Company</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" class="hover:text-foreground">About</a></li>
            <li><a href="#" class="hover:text-foreground">Careers</a></li>
            <li><a href="#" class="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-foreground">Legal</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" class="hover:text-foreground">Terms</a></li>
            <li><a href="#" class="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-12 flex items-center justify-between border-t border-border/60 pt-8 text-xs text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} Spinach &amp; Cheese Co.</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-foreground">Twitter</a>
          <a href="#" class="hover:text-foreground">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
</template>
```

- [ ] **Step 3: Commit**

```bash
git add nuxt-app/components/Site*.vue
git commit -m "feat: migrate SiteHeader and SiteFooter components"
```

### Task 5: Migrate Core Landing Components

**Files:**
- Create: `nuxt-app/components/landing/Hero.vue`
- Create: `nuxt-app/components/landing/Plans.vue`
- Create: `nuxt-app/components/landing/Checkout.vue`

- [ ] **Step 1: Implement Hero Component**

Create `nuxt-app/components/landing/Hero.vue`:
```vue
<script setup lang="ts">
import heroBake from '~/assets/images/hero-bake.jpg'
</script>

<template>
  <section class="relative overflow-hidden border-b border-border/60 bg-background">
    <div class="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:py-32">
      <div class="flex flex-col justify-center">
        <h1 class="text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.1]">
          Baked fresh.<br />
          <span class="text-muted-foreground">Delivered daily.</span>
        </h1>
        <p class="mt-6 max-w-[420px] text-lg text-muted-foreground leading-relaxed">
          One ramekin of organic spinach and melted cheese, arriving at your door every morning. A simple, nourishing routine.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <NuxtLink
            :to="{ path: '/', hash: '#plans' }"
            class="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View plans
          </NuxtLink>
        </div>
      </div>
      <div class="relative mx-auto w-full max-w-[500px] lg:max-w-none">
        <div class="aspect-[4/5] overflow-hidden rounded-2xl bg-muted md:aspect-[3/4]">
          <img :src="heroBake" alt="Fresh baked spinach and cheese" class="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Implement Plans Component**

Create `nuxt-app/components/landing/Plans.vue`:
```vue
<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  selectedId: 'week' | 'month' | 'year' | null
}>()

const emit = defineEmits<{
  (e: 'select', id: 'week' | 'month' | 'year'): void
}>()

const plans = [
  { id: 'week', name: '1 Week', price: 24, cadence: '/ week', note: '7 servings', features: ['Daily morning delivery', 'Cancel anytime'] },
  { id: 'month', name: '1 Month', price: 89, cadence: '/ month', note: '30 servings', popular: true, features: ['Daily morning delivery', 'Save 8%', 'Pause anytime'] },
  { id: 'year', name: '1 Year', price: 899, cadence: '/ year', note: '365 servings', features: ['Daily morning delivery', 'Save 18%', 'Pause anytime'] },
] as const
</script>

<template>
  <section id="plans" class="border-b border-border/60 bg-secondary/30">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="text-center">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Subscription</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">Choose your routine.</h2>
      </div>
      <div class="mt-16 grid gap-8 md:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.id"
          @click="emit('select', plan.id)"
          :class="[
            'relative cursor-pointer rounded-3xl border p-8 transition-all hover:border-primary/50',
            selectedId === plan.id ? 'border-primary ring-1 ring-primary bg-card' : 'border-border bg-background'
          ]"
        >
          <div v-if="plan.popular" class="absolute -top-3 right-8 rounded-full bg-foreground px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
            Most Popular
          </div>
          <h3 class="text-2xl font-light tracking-tight text-foreground">{{ plan.name }}</h3>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-light text-foreground">${{ plan.price }}</span>
            <span class="text-sm text-muted-foreground">{{ plan.cadence }}</span>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">{{ plan.note }}</p>
          <ul class="mt-8 space-y-3">
            <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3 text-sm text-muted-foreground">
              <Check class="h-4 w-4 text-primary" />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Implement Checkout Component**

Create `nuxt-app/components/landing/Checkout.vue`:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, ShoppingBag } from 'lucide-vue-next'
import planWeek from '~/assets/images/plan-week.jpg'
import planMonth from '~/assets/images/plan-month.jpg'
import planYear from '~/assets/images/plan-year.jpg'

export type PlanId = 'week' | 'month' | 'year'

const props = defineProps<{
  selectedPlan: PlanId | null
}>()

const emit = defineEmits<{
  (e: 'confirm', id: PlanId, customer: { name: string; email: string; address: string }): void
}>()

const PLAN_DETAILS: Record<PlanId, { name: string; price: number; cadence: string; note: string; image: string }> = {
  week: { name: "1 Week", price: 24, cadence: "/ week", note: "7 servings · billed once", image: planWeek },
  month: { name: "1 Month", price: 89, cadence: "/ month", note: "30 servings · save 8%", image: planMonth },
  year: { name: "1 Year", price: 899, cadence: "/ year", note: "365 servings · save 18%", image: planYear },
}

const name = ref("")
const email = ref("")
const address = ref("")

const plan = computed(() => props.selectedPlan ? PLAN_DETAILS[props.selectedPlan] : null)

const handleSubmit = () => {
  if (!props.selectedPlan) return;
  emit('confirm', props.selectedPlan, { name: name.value, email: email.value, address: address.value })
}
</script>

<template>
  <section id="checkout" class="border-b border-border/60 bg-secondary/30">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Checkout</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          {{ plan ? `Confirm your ${plan.name.toLowerCase()} plan.` : "Pick a plan to begin checkout." }}
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">
          {{ plan ? "Review your selection and add your delivery details. You can pause or cancel anytime." : "Choose any plan above and we'll bring you down here to complete the order." }}
        </p>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-5">
        <aside class="lg:col-span-2 rounded-3xl border border-border bg-card p-6">
          <template v-if="plan">
            <div class="overflow-hidden rounded-2xl">
              <img :src="plan.image" :alt="plan.name" class="aspect-[4/3] w-full object-cover" />
            </div>
            <div class="mt-6 flex items-baseline justify-between">
              <h3 class="text-2xl font-light tracking-tight text-foreground">{{ plan.name }}</h3>
              <div class="text-right">
                <div class="text-3xl font-light text-foreground">${{ plan.price }}</div>
                <div class="text-xs text-muted-foreground">{{ plan.cadence }}</div>
              </div>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">{{ plan.note }}</p>
            <ul class="mt-6 space-y-2 border-t border-border pt-6 text-sm text-foreground">
              <li class="flex items-center gap-2"><Check class="h-4 w-4 text-primary" /> Daily fresh delivery</li>
              <li class="flex items-center gap-2"><Check class="h-4 w-4 text-primary" /> Free delivery included</li>
              <li class="flex items-center gap-2"><Check class="h-4 w-4 text-primary" /> Pause or cancel anytime</li>
            </ul>
          </template>
          <div v-else class="flex h-full flex-col items-center justify-center py-16 text-center">
            <ShoppingBag class="h-8 w-8 text-muted-foreground" />
            <p class="mt-4 text-sm text-muted-foreground">No plan selected yet.</p>
          </div>
        </aside>

        <form @submit.prevent="handleSubmit" class="lg:col-span-3 rounded-3xl border border-border bg-card p-8">
          <div class="grid gap-5">
            <div>
              <label for="co-name" class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Full name</label>
              <input id="co-name" type="text" v-model="name" required placeholder="Jane Doe" class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary" />
            </div>
            <div>
              <label for="co-email" class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
              <input id="co-email" type="email" v-model="email" required placeholder="jane@example.com" class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary" />
            </div>
            <div>
              <label for="co-addr" class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Delivery address</label>
              <input id="co-addr" type="text" v-model="address" required placeholder="221B Baker Street, London" class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary" />
            </div>
          </div>

          <div class="mt-8 flex items-center justify-between border-t border-border pt-6">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total today</p>
              <p class="mt-1 text-2xl font-light text-foreground">{{ plan ? `$${plan.price}` : "—" }}</p>
            </div>
            <button type="submit" :disabled="!selectedPlan" class="inline-flex h-12 items-center rounded-full bg-primary px-8 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
              Place order
            </button>
          </div>
          <p class="mt-4 text-xs text-muted-foreground">
            Demo checkout — no payment is processed. Your selection is saved to your dashboard.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add nuxt-app/components/landing/
git commit -m "feat: migrate core landing components"
```

### Task 6: Migrate Secondary Landing Components (FAQ, etc.)

**Files:**
- Create: `nuxt-app/components/landing/Faq.vue`
- Create: `nuxt-app/components/landing/HowItsMade.vue`
- Create: `nuxt-app/components/landing/Benefits.vue`
- Create: `nuxt-app/components/landing/DeliveryTiming.vue`
- Create: `nuxt-app/components/landing/Testimonials.vue`

- [ ] **Step 1: Implement Faq Component**

Create `nuxt-app/components/landing/Faq.vue`:
```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'

const faqs = [
  { q: "How does the subscription work?", a: "Pick a 1-week, 1-month, or 1-year plan. We bake a fresh ramekin each morning and deliver it to your door before lunch. Your plan auto-renews at the end of the cycle — you stay in control from your dashboard." },
  { q: "Can I pause or cancel anytime?", a: "Yes. Pause for a weekend, a holiday, or as long as you need from the dashboard — no fees, no questions. Cancel with one click before your next renewal and you won't be charged again." },
  { q: "Where do the ingredients come from?", a: "Spinach is harvested at dawn from certified-organic farms within 80 km of our kitchen. Mozzarella and parmesan come from a single family dairy, and eggs are free-range from pasture-raised hens. Every batch is traceable to the farm." },
  { q: "Are there any additives or preservatives?", a: "None. Just spinach, cheese, eggs, butter, sea salt, pepper, and a touch of nutmeg. Because we bake and deliver the same day, nothing needs to be preserved." },
  { q: "What if I have allergies or dietary needs?", a: "Our ramekins contain dairy, eggs, and gluten-free ingredients. We can't currently offer vegan or dairy-free versions, but we're happy to flag allergens — just reach out after subscribing." },
  { q: "When and how is it delivered?", a: "Deliveries arrive chilled between 9am and noon, within four hours of leaving the oven. Reheat for 8 minutes at 180°C and it's as good as fresh from our kitchen." },
]
</script>

<template>
  <section id="faq" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-3xl px-6 py-24">
      <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">FAQ</p>
      <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">Questions, answered.</h2>
      <Accordion type="single" collapsible class="mt-12">
        <AccordionItem v-for="(f, i) in faqs" :key="i" :value="`item-${i}`" class="border-border">
          <AccordionTrigger class="text-left text-base font-medium text-foreground hover:no-underline">{{ f.q }}</AccordionTrigger>
          <AccordionContent class="text-sm leading-relaxed text-muted-foreground">{{ f.a }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Port remaining simple components**

Since `HowItsMade`, `Benefits`, `DeliveryTiming`, and `Testimonials` are mostly static HTML, copy the HTML from the React components (`src/components/landing/how-its-made.tsx`, etc.), change `className` to `class`, and wrap in a Vue `<template>`.
Create the following files similarly in `nuxt-app/components/landing/`:
- `HowItsMade.vue`
- `Benefits.vue`
- `DeliveryTiming.vue`
- `Testimonials.vue`

- [ ] **Step 3: Commit**

```bash
git add nuxt-app/components/landing/
git commit -m "feat: migrate secondary landing components"
```

### Task 7: Migrate Pages

**Files:**
- Create: `nuxt-app/pages/index.vue`
- Create: `nuxt-app/pages/dashboard.vue`

- [ ] **Step 1: Implement Index Page**

Create `nuxt-app/pages/index.vue`:
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toaster } from '~/components/ui/sonner'
import { toast } from 'vue-sonner'
import type { PlanId } from '~/components/landing/Checkout.vue'

useHead({
  title: 'Spinach & Cheese Co. — Baked fresh, delivered daily',
  meta: [
    { name: 'description', content: 'Subscribe to a daily ramekin of organic baked spinach and melted cheese. 1 week, 1 month, and 1 year plans.' },
    { property: 'og:title', content: 'Spinach & Cheese Co.' },
    { property: 'og:description', content: 'Baked fresh, delivered daily.' },
  ]
})

const router = useRouter()
const selectedPlan = ref<PlanId | null>(null)

const handleSelect = (planId: PlanId) => {
  selectedPlan.value = planId
  setTimeout(() => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, 50)
}

const handleConfirm = (planId: PlanId) => {
  try {
    localStorage.setItem("sc:active-plan", JSON.stringify({ planId, startedAt: Date.now() }))
  } catch {}
  toast.success("Order placed", { description: `${planId} plan confirmed. Heading to dashboard...` })
  setTimeout(() => router.push('/dashboard'), 700)
}
</script>

<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <SiteHeader />
    <main>
      <LandingHero />
      <LandingPlans @select="handleSelect" :selectedId="selectedPlan" />
      <LandingHowItsMade />
      <LandingBenefits />
      <LandingDeliveryTiming />
      <LandingTestimonials />
      <LandingFaq />
      <LandingCheckout :selectedPlan="selectedPlan" @confirm="handleConfirm" />
    </main>
    <SiteFooter />
    <Toaster />
  </div>
</template>
```

- [ ] **Step 2: Implement Dashboard Page**

Create `nuxt-app/pages/dashboard.vue`:
```vue
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Package, Calendar, Truck, RotateCcw } from 'lucide-vue-next'

useHead({
  title: 'Dashboard — Spinach & Cheese Co.',
  meta: [
    { name: 'description', content: 'Track your subscription, remaining servings, and next delivery.' },
  ]
})

type PlanId = "week" | "month" | "year"
const PLAN_META: Record<PlanId, { name: string; days: number; price: number }> = {
  week: { name: "1 Week", days: 7, price: 24 },
  month: { name: "1 Month", days: 30, price: 89 },
  year: { name: "1 Year", days: 365, price: 899 },
}

const plan = ref<{ planId: PlanId; startedAt: number } | null>(null)

onMounted(() => {
  try {
    const raw = localStorage.getItem("sc:active-plan")
    if (raw) plan.value = JSON.parse(raw)
  } catch {}
})

const reset = () => {
  localStorage.removeItem("sc:active-plan")
  plan.value = null
}

const activeMeta = computed(() => plan.value ? (PLAN_META[plan.value.planId] ?? PLAN_META.week) : null)
const elapsedDays = computed(() => plan.value ? Math.floor((Date.now() - plan.value.startedAt) / (1000 * 60 * 60 * 24)) : 0)
const remaining = computed(() => activeMeta.value ? Math.max(0, activeMeta.value.days - elapsedDays.value) : 0)
const used = computed(() => activeMeta.value ? activeMeta.value.days - remaining.value : 0)
const pct = computed(() => activeMeta.value ? Math.min(100, Math.max(0, (used.value / activeMeta.value.days) * 100)) : 0)
const nextDelivery = computed(() => new Date(Date.now() + 1000 * 60 * 60 * 18))
</script>

<template>
  <div class="min-h-screen bg-background font-sans">
    <SiteHeader />
    <main class="mx-auto max-w-6xl px-6 py-16">
      <div class="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Account</p>
          <h1 class="mt-3 text-4xl font-light tracking-tight text-foreground">Your subscription</h1>
        </div>
        <button v-if="plan" @click="reset" class="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
          <RotateCcw class="h-3.5 w-3.5" /> Reset demo
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="!plan" class="mt-16 rounded-sm border border-dashed border-border p-16 text-center">
        <Package class="mx-auto h-6 w-6 text-muted-foreground" />
        <h2 class="mt-6 text-xl font-light text-foreground">No active subscription</h2>
        <p class="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">Choose a plan to start receiving daily baked spinach &amp; cheese.</p>
        <NuxtLink :to="{ path: '/', hash: '#plans' }" class="mt-8 inline-flex h-11 items-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
          Browse plans
        </NuxtLink>
      </div>

      <!-- Active Plan -->
      <div v-else-if="activeMeta" class="mt-12 grid gap-6 lg:grid-cols-3">
        <section class="lg:col-span-2 rounded-sm border border-border bg-card p-8">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Current plan</p>
              <h2 class="mt-2 text-3xl font-light tracking-tight text-foreground">{{ activeMeta.name }}</h2>
            </div>
            <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">Active</span>
          </div>

          <div class="mt-10">
            <div class="flex items-baseline justify-between">
              <span class="text-5xl font-light tracking-tight text-foreground">{{ remaining }}</span>
              <span class="text-sm text-muted-foreground">of {{ activeMeta.days }} days remaining</span>
            </div>
            <div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div class="h-full bg-primary transition-all" :style="{ width: `${pct}%` }" />
            </div>
            <p class="mt-3 text-xs text-muted-foreground">{{ used }} servings delivered · {{ remaining }} to go</p>
          </div>

          <div class="mt-10 grid gap-6 sm:grid-cols-3 border-t border-border pt-8">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Started</p>
              <p class="mt-2 text-base font-medium text-foreground">{{ new Date(plan.startedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}</p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Renews</p>
              <p class="mt-2 text-base font-medium text-foreground">{{ new Date(plan.startedAt + activeMeta.days * 86400000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}</p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Plan value</p>
              <p class="mt-2 text-base font-medium text-foreground">${{ activeMeta.price }}</p>
            </div>
          </div>
        </section>

        <aside class="space-y-6">
          <div class="rounded-sm border border-border bg-card p-6">
            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Truck class="h-3.5 w-3.5" /> Next delivery
            </div>
            <p class="mt-3 text-lg font-medium text-foreground">
              Tomorrow, {{ nextDelivery.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) }}
            </p>
            <p class="mt-1 text-xs text-muted-foreground">Left the oven · stays fresh 24h refrigerated</p>
          </div>
          <div class="rounded-sm border border-border bg-card p-6">
            <div class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Calendar class="h-3.5 w-3.5" /> Weekly rhythm
            </div>
            <ul class="mt-4 space-y-3 text-sm text-foreground">
              <li class="flex justify-between"><span>Mon – Fri</span><span class="text-muted-foreground">8:00 AM</span></li>
              <li class="flex justify-between"><span>Saturday</span><span class="text-muted-foreground">9:30 AM</span></li>
              <li class="flex justify-between"><span>Sunday</span><span class="text-muted-foreground">Rest day</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
```

- [ ] **Step 3: Commit**

```bash
git add nuxt-app/pages/
git commit -m "feat: migrate index and dashboard pages"
```
