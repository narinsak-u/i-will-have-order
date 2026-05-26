# AGENTS.md — i-will-have-order

## Project Overview

Nuxt 4 + Vue 3 + TypeScript SPA with Tailwind CSS v4, shadcn-vue (New York style), Reka UI, Lucide icons, and Vue Sonner.

## Build / Lint / Test Commands

```bash
# Install dependencies (bun is preferred — bun.lock present)
bun install

# Dev server with HMR on localhost:3000
bun run dev

# Type-check (via vue-tsc — run after nuxt prepare)
bun run postinstall   # generates .nuxt/tsconfig — needed before typecheck
bun x vue-tsc --noEmit

# Build for production
bun run build

# Preview production build
bun run preview

# Generate static site
bun run generate
```

**Note:** No test framework or linting (ESLint/Prettier) is configured. Install if needed:
- Tests: `bun add -D vitest @vue/test-utils`
- Lint: `bun add -D eslint @nuxt/eslint`

## Code Style Guidelines

### Imports

- Use `@/` alias for `app/` references: `import { cn } from '@/lib/utils'`
- Use `~assets/` or `~/assets/` for assets: `import heroBake from '~/assets/images/hero-bake.jpg'`
- Use `~app/` for cross-component type imports: `import type { PlanId } from '~/app/components/landing/Checkout.vue'`
- Group imports: 3rd-party first, then internal. Separate groups with a blank line.
- Import type separately: `import type { ClassValue } from "clsx"` then `import { clsx } from "clsx"`
- Prefer `@lucide/vue` for individual icon imports over `lucide-vue-next`

### Formatting

- No semicolons
- Single quotes (consistent with current usage in most files)
- Indent with 2 spaces
- Max line length ~100 chars
- Trailing comma in multiline objects/arrays

### TypeScript

- Use `lang="ts"` in Vue `<script setup>` — prefer `<script setup lang="ts">` order
- Use `defineProps<T>()` and `defineEmits<T>()` with type generics (inline or local)
- Export types used across components: `export type PlanId = 'week' | 'month' | 'year'`
- Prefer `as const` for object arrays
- Use `Record<K, V>` for lookup maps with inline types
- Explicitly type refs: `const plan = ref<PlanId | null>(null)`
- Use `computed()` over inline template expressions for derived state

### Naming

- **Components:** PascalCase, always multi-word. Prefix by directory:
  - `Ui` prefix for `components/ui/` → `UiAccordion`, `UiSonner`
  - `Landing` prefix for `components/landing/` → `LandingHero`, `LandingPlans`
  - Top-level components in `components/` → `SiteHeader`, `SiteFooter`
- **Files:** PascalCase for components, camelCase for utilities
- **Variables/functions:** camelCase
- **Events:** camelCase, emitted via `defineEmits` with typed payloads
- **Props:** camelCase in `defineProps`, kebab-case in templates

### Vue / Nuxt Conventions

- Use `<script setup lang="ts">` (composition API only, no Options API)
- Template structure: `<template>` → `<script>` → `<style>` (order: script first if no style)
- `useHead()` for per-page SEO metadata (title, meta)
- `useRouter()` from `vue-router` for programmatic navigation
- Auto-imported components via Nuxt (no manual import needed in templates)
- Use `v-bind="forwarded"` pattern with `useForwardPropsEmits` / `reactiveOmit` for UI wrappers around Reka UI primitives
- Reka UI components use `v-slot="slotProps"` passthrough pattern

### Tailwind CSS v4

- Use `@theme inline` for design tokens in CSS (not tailwind.config)
- CSS variables in `oklch()` for colors
- Class merging via `cn()` utility: `import { cn } from '@/lib/utils'`
- Prefer `rounded-sm` / `rounded-2xl` / `rounded-3xl` / `rounded-full` (radius variants from CSS vars)
- Utility-first, no custom CSS classes unless necessary
- Dark mode via `.dark` class on ancestor: `dark:bg-xxx`
- Use `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`, `text-primary-foreground` semantic tokens

### Error Handling

- Wrap `localStorage` access in try/catch (quota/private browsing)
- Use `vue-sonner` toasts for user-facing feedback: `import { toast } from 'vue-sonner'`
- `<UiSonner />` placed once at app root (in each layout/page shell)

### Component Patterns (shadcn-vue UI)

- UI components wrap Reka UI primitives with full type passthrough:
  - `defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()`
  - `reactiveOmit(props, "class")` → `useForwardProps(delegatedProps)`
  - `data-slot="component-name"` attribute on root element
  - `cn('base-classes', props.class)` on root wrapper
- Override icons via named slots with default fallback
