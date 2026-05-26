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
