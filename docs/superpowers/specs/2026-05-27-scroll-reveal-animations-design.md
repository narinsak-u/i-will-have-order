# Scroll-Triggered Reveal Animations

**Date:** 2026-05-27
**Status:** Approved design

## Goal

Add fade-up entrance animations triggered on scroll for all major sections on the landing page, with optional staggered child reveal.

## Component: `<RevealSection>`

A single reusable wrapper component at `app/components/RevealSection.vue`.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `threshold` | `number` | `0.15` | Intersection ratio before triggering |
| `stagger` | `number` | `0` | ms delay between each direct child |
| `distance` | `number` | `32` | px to translate up on reveal |
| `duration` | `number` | `600` | transition duration in ms |
| `once` | `boolean` | `true` | animate once or re-trigger on re-enter |
| `as` | `string` | `'div'` | rendered element tag |

### Intersection Logic

Uses `useIntersectionObserver` from the already-installed `@vueuse/core`. When `threshold` is met:

1. Set `isVisible = true` → applies `.is-visible` class
2. If `once` is true, call `stop()` to disconnect observer
3. If `once` is false, remove class when element scrolls back out of view

Guard: `prefers-reduced-motion` via `window.matchMedia`. If detected, render with full opacity and no transform — skip the animation entirely.

### CSS Transitions

```css
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
```

`--distance` and `--duration` are set as CSS custom properties from the Vue component's `v-bind` in scoped style.

### Stagger Mechanism

When `stagger > 0`, up to 12 `--d1` through `--d12` CSS custom properties are computed from the stagger value and inlined on the root element via `:style`:

```ts
const staggerVars = computed(() => {
  if (!props.stagger) return undefined
  const vars: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    vars[`--d${i}`] = `${(i - 1) * props.stagger}ms`
  }
  return vars
})
```

CSS applies delays to direct children via `nth-child`:

```css
.reveal-section.is-stagger > :nth-child(1) { transition-delay: var(--d1, 0ms); }
.reveal-section.is-stagger > :nth-child(2) { transition-delay: var(--d2, 0ms); }
/* ... up to :nth-child(12) */
```

No DOM wrapper is injected — the slot content renders directly.

### Reduced Motion

On mount, check `window.matchMedia('(prefers-reduced-motion: reduce)')`. If matched:
- Bypass the IntersectionObserver entirely
- Render with `opacity: 1` and no translate
- No observer is created (saves resources)

### SSR Safety

VueUse's `useIntersectionObserver` handles SSR internally — no special guards needed. The component renders server-side with default opacity/translate values (which are invisible), then transitions on client hydration + scroll.

## Landing Page Integration (`app/pages/index.vue`)

```vue
<RevealSection>
  <LandingPlans />
</RevealSection>
<RevealSection>
  <LandingHowItsMade />
</RevealSection>
<RevealSection>
  <LandingBenefits />
</RevealSection>
<RevealSection>
  <LandingDeliveryTiming />
</RevealSection>
<RevealSection>
  <LandingTestimonials />
</RevealSection>
<RevealSection>
  <LandingFaq />
</RevealSection>
<RevealSection>
  <LandingCheckout />
</RevealSection>
<RevealSection>
  <SiteFooter />
</RevealSection>
```

`LandingHero` is NOT wrapped — it's the initial viewport section and doesn't need entrance animation.

Note: `stagger` is not used in the current landing page. Every landing component renders a single root `<section>` element, so `nth-child` on direct children would only ever target one element. The stagger feature remains available in `<RevealSection>` for future use when components might use Vue fragments (no root wrapper).

## Edge Cases

| Case | Handling |
|------|----------|
| Section with 0 children | Stagger vars exist but no children to apply to — no-op |
| Section with >12 children | Children 13+ fall back to `--d12` delay |
| Nested `<RevealSection>` | Not recommended but harmless — outer triggers first, inner on its own |
| Resize/orientation change | IntersectionObserver fires on scroll, not resize — no special handling |
| Serverside rendering | Component renders with base styles; client hydration activates observer |
