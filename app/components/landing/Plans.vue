<script setup lang="ts">
import { Check } from "@lucide/vue";

const props = defineProps<{
  selectedId: "week" | "month" | "year" | null;
}>();

const emit = defineEmits<{
  (e: "select", id: "week" | "month" | "year"): void;
}>();

const plans = [
  {
    id: "week" as const,
    label: "TRY IT OUT",
    name: "1 Week",
    price: 24,
    cadence: "/ week",
    servings: "7 servings",
    billing: "billed once",
    features: [
      "Daily fresh delivery",
      "Cancel anytime",
      "Single household size",
    ],
  },
  {
    id: "month" as const,
    label: "MOST POPULAR",
    name: "1 Month",
    price: 89,
    cadence: "/ month",
    servings: "30 servings",
    billing: "save 8%",
    popular: true,
    features: [
      "Daily fresh delivery",
      "Free recipe card weekly",
      "Pause anytime",
    ],
  },
  {
    id: "year" as const,
    label: "BEST VALUE",
    name: "1 Year",
    price: 899,
    cadence: "/ year",
    servings: "365 servings",
    billing: "save 18%",
    features: [
      "Daily fresh delivery",
      "Seasonal limited editions",
      "Priority support",
    ],
  },
] as const;
</script>

<template>
  <section id="plans" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="mb-16">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Subscription
        </p>
        <h2
          class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl"
        >
          Three ways to keep your kitchen stocked.
        </h2>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.id"
          @click="emit('select', plan.id)"
          :class="[
            'relative overflow-hidden rounded-3xl transition-all cursor-pointer',
            plan.popular
              ? 'bg-[#1a3a2a] text-white ring-2 ring-[#1a3a2a]'
              : 'bg-white border border-border/40 hover:border-border/60',
          ]"
        >
          <!-- Plan image placeholder -->
          <div
            class="aspect-video bg-gradient-to-br from-muted to-muted-foreground/20"
          />

          <!-- Plan label -->
          <div
            :class="[
              'px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider',
              plan.popular
                ? 'bg-[#1a3a2a] text-muted-foreground'
                : 'bg-background text-muted-foreground',
            ]"
          >
            {{ plan.label }}
          </div>

          <!-- Plan content -->
          <div class="px-6 py-8">
            <h3
              :class="[
                'text-2xl font-light tracking-tight',
                plan.popular ? 'text-white' : 'text-foreground',
              ]"
            >
              {{ plan.name }}
            </h3>

            <div class="mt-6 flex items-baseline gap-1">
              <span
                :class="[
                  'text-5xl font-light',
                  plan.popular ? 'text-white' : 'text-foreground',
                ]"
                >${{ plan.price }}</span
              >
              <span
                :class="[
                  'text-sm',
                  plan.popular ? 'text-gray-300' : 'text-muted-foreground',
                ]"
                >{{ plan.cadence }}</span
              >
            </div>

            <p
              :class="[
                'mt-2 text-xs',
                plan.popular ? 'text-gray-300' : 'text-muted-foreground',
              ]"
            >
              {{ plan.servings }} · {{ plan.billing }}
            </p>

            <ul
              :class="[
                'mt-8 space-y-3',
                plan.popular ? 'text-white' : 'text-foreground',
              ]"
            >
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center gap-3 text-sm"
              >
                <Check
                  class="h-4 w-4 flex-shrink-0"
                  :class="plan.popular ? 'text-white' : 'text-foreground'"
                />
                {{ feature }}
              </li>
            </ul>

            <button
              :class="[
                'mt-8 w-full rounded-full py-3 text-sm font-semibold uppercase tracking-wide transition-all',
                plan.popular
                  ? 'bg-white text-[#1a3a2a] hover:bg-gray-100'
                  : 'bg-foreground text-background hover:bg-foreground/90',
              ]"
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
