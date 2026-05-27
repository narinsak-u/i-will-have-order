# Scroll-Reveal Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add fade-up entrance animations triggered on scroll for landing page sections, with optional staggered child reveal.

**Architecture:** A single `<RevealSection>` wrapper component using `@vueuse/core`'s `useIntersectionObserver` detects viewport entry, toggles a CSS class for opacity+translate transitions. Stagger is handled via CSS `nth-child` with computed custom properties. `prefers-reduced-motion` is respected via a CSS media query.

**Tech Stack:** Vue 3, Nuxt 4, TypeScript, @vueuse/core (already installed), Tailwind CSS v4

**Files:**
- Create: `app/components/RevealSection.vue`
- Modify: `app/pages/index.vue`

---

### Task 1: Create `<RevealSection>` component

**File:** Create `app/components/RevealSection.vue`

- [ ] **Step 1: Create the component**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = withDefaults(defineProps<{
  threshold?: number
  stagger?: number
  distance?: number
  duration?: number
  once?: boolean
  as?: string
}>(), {
  threshold: 0.15,
  stagger: 0,
  distance: 32,
  duration: 600,
  once: true,
  as: 'div',
})

const target = ref<HTMLElement>()
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry.isIntersecting) {
      isVisible.value = true
      if (props.once) stop()
    } else if (!props.once) {
      isVisible.value = false
    }
  },
  { threshold: props.threshold },
)

const staggerVars = computed(() => {
  if (!props.stagger) return undefined
  const vars: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    vars[`--d${i}`] = `${(i - 1) * props.stagger}ms`
  }
  return vars
})

const cssVars = computed(() => ({
  '--distance': `${props.distance}px`,
  '--duration': `${props.duration}ms`,
  ...(staggerVars.value || {}),
}))
</script>

<template>
  <component
    :is="as"
    ref="target"
    class="reveal-section"
    :class="{
      'is-visible': isVisible,
      'is-stagger': stagger > 0 && isVisible,
    }"
    :style="cssVars"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal-section {
  opacity: 0;
  translate: 0 var(--distance, 32px);
  transition: opacity var(--duration, 600ms) ease,
              translate var(--duration, 600ms) ease;
}
.reveal-section.is-visible {
  opacity: 1;
  translate: 0 0;
}
.reveal-section.is-stagger > :nth-child(1) { transition-delay: var(--d1, 0ms); }
.reveal-section.is-stagger > :nth-child(2) { transition-delay: var(--d2, 0ms); }
.reveal-section.is-stagger > :nth-child(3) { transition-delay: var(--d3, 0ms); }
.reveal-section.is-stagger > :nth-child(4) { transition-delay: var(--d4, 0ms); }
.reveal-section.is-stagger > :nth-child(5) { transition-delay: var(--d5, 0ms); }
.reveal-section.is-stagger > :nth-child(6) { transition-delay: var(--d6, 0ms); }
.reveal-section.is-stagger > :nth-child(7) { transition-delay: var(--d7, 0ms); }
.reveal-section.is-stagger > :nth-child(8) { transition-delay: var(--d8, 0ms); }
.reveal-section.is-stagger > :nth-child(9) { transition-delay: var(--d9, 0ms); }
.reveal-section.is-stagger > :nth-child(10) { transition-delay: var(--d10, 0ms); }
.reveal-section.is-stagger > :nth-child(11) { transition-delay: var(--d11, 0ms); }
.reveal-section.is-stagger > :nth-child(12) { transition-delay: var(--d12, 0ms); }
@media (prefers-reduced-motion: reduce) {
  .reveal-section {
    opacity: 1;
    translate: 0 0;
    transition: none;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/RevealSection.vue
git commit -m "feat: add RevealSection scroll-reveal component"
```

---

### Task 2: Integrate into landing page

**File:** Modify `app/pages/index.vue`

The landing page wraps each section in `<RevealSection>`. The hero section stays unwrapped (visible on load).

- [ ] **Step 1: Add import and wrap sections in `<RevealSection>`**

Edit `app/pages/index.vue`. The `<script>` section needs no changes (components are auto-imported by Nuxt). Only the `<template>` changes:

Old template (lines 47–63):

```vue
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
    <UiSonner />
  </div>
</template>
```

New template:

```vue
<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <SiteHeader />
    <main>
      <LandingHero />
      <RevealSection>
        <LandingPlans @select="handleSelect" :selectedId="selectedPlan" />
      </RevealSection>
      <RevealSection :stagger="150">
        <LandingHowItsMade />
      </RevealSection>
      <RevealSection :stagger="120">
        <LandingBenefits />
      </RevealSection>
      <RevealSection :stagger="120">
        <LandingDeliveryTiming />
      </RevealSection>
      <RevealSection :stagger="100">
        <LandingTestimonials />
      </RevealSection>
      <RevealSection>
        <LandingFaq />
      </RevealSection>
      <RevealSection>
        <LandingCheckout :selectedPlan="selectedPlan" @confirm="handleConfirm" />
      </RevealSection>
    </main>
    <RevealSection>
      <SiteFooter />
    </RevealSection>
    <UiSonner />
  </div>
</template>
```

- [ ] **Step 2: Verify type-check**

```bash
bun run postinstall && bun x vue-tsc --noEmit
```

Expected: No type errors (RevealSection is auto-imported by Nuxt from `components/`).

- [ ] **Step 3: Commit**

```bash
git add app/pages/index.vue
git commit -m "feat: wrap landing sections with RevealSection for scroll animations"
```

---

### Task 3: Visual verification with dev server

- [ ] **Step 1: Start the dev server**

```bash
bun run dev
```

- [ ] **Step 2: Verify in browser**
  - Open `http://localhost:3000`
  - Scroll down — each section should fade + slide up as it enters the viewport
  - Benefits, DeliveryTiming, and Testimonials sections should have staggered card reveals
  - If using a screen reader or `prefers-reduced-motion: reduce`, animations should be suppressed
  - Hero section should be visible immediately without animation
