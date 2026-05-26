<script setup lang="ts">
import { Clock, Truck, Package } from 'lucide-vue-next'

const schedules = [
  {
    plan: "1 Week",
    ship: "Same-day dispatch",
    arrive: "Next morning, 7–9 AM",
    cadence: "7 consecutive daily drops",
    icon: Package,
  },
  {
    plan: "1 Month",
    ship: "Daily dispatch at 5 AM",
    arrive: "Each morning, 7–9 AM",
    cadence: "30 daily drops · pause anytime",
    icon: Truck,
  },
  {
    plan: "1 Year",
    ship: "Daily dispatch at 5 AM",
    arrive: "Each morning, 6:30–8:30 AM (priority)",
    cadence: "365 daily drops · seasonal menu rotations",
    icon: Clock,
  },
]
</script>

<template>
  <section id="delivery" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Delivery timing</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          When each plan ships and arrives.
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          Every ramekin leaves the oven before sunrise and reaches your door within four hours — chilled, sealed, and ready to warm.
        </p>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <article
          v-for="s in schedules"
          :key="s.plan"
          class="rounded-3xl border border-border bg-card p-8"
        >
          <component :is="s.icon" class="h-5 w-5 text-primary" />
          <h3 class="mt-6 text-xl font-light tracking-tight text-foreground">{{ s.plan }}</h3>
          <dl class="mt-6 space-y-4 border-t border-border pt-6 text-sm">
            <div>
              <dt class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ships</dt>
              <dd class="mt-1 text-foreground">{{ s.ship }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Arrives</dt>
              <dd class="mt-1 text-foreground">{{ s.arrive }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cadence</dt>
              <dd class="mt-1 text-muted-foreground">{{ s.cadence }}</dd>
            </div>
          </dl>
        </article>
      </div>

      <p class="mt-10 text-xs text-muted-foreground">
        Cut-off for next-day arrival: 8 PM local time. Sundays are a rest day — Saturday orders arrive Monday morning.
      </p>
    </div>
  </section>
</template>
