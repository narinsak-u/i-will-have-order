<script setup lang="ts">
import { Leaf, HeartPulse, Sparkles, Shield } from 'lucide-vue-next'

const benefits = [
  { icon: Leaf, title: "Plant-forward", body: "Each serving delivers 4g of fiber and a full cup of leafy greens." },
  { icon: HeartPulse, title: "Heart-friendly", body: "Rich in folate, magnesium, and potassium — minerals known to support cardiovascular health." },
  { icon: Sparkles, title: "High in protein", body: "12g of slow-release dairy protein per ramekin to keep you full longer." },
  { icon: Shield, title: "Immunity boost", body: "Iron and vitamin K from spinach, paired with vitamin A from aged cheese." },
]
</script>

<template>
  <section id="benefits" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Benefits</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          Comfort food that does your body a favor.
        </h2>
      </div>
      <div class="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        <div v-for="benefit in benefits" :key="benefit.title" class="bg-background p-8">
          <component :is="benefit.icon" class="h-5 w-5 text-primary" />
          <h3 class="mt-6 text-lg font-medium text-foreground">{{ benefit.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ benefit.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
