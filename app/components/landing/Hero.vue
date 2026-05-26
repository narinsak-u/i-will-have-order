<script setup lang="ts">
import { Leaf, Clock, Truck } from "@lucide/vue";
import heroBake from "~/assets/images/hero-bake.jpg";

const benefits = [
  { icon: Leaf, text: "100% organic ingredients, nothing processed" },
  { icon: Clock, text: "Baked the same morning it arrives" },
  { icon: Truck, text: "Free delivery · pause or cancel anytime" },
];
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-border/60 bg-background"
  >
    <div
      class="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:py-32"
    >
      <div class="flex flex-col justify-center">
        <div
          class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
        >
          <span class="h-2 w-2 rounded-full bg-primary" />
          <span
            class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >Fresh-baked daily subscription</span
          >
        </div>
        <h1
          class="text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.1]"
        >
          One warm ramekin of
          <br />
          <span class="italic">spinach & cheese</span>, at
          <br />
          your door every morning.
        </h1>
        <p
          class="mt-6 max-w-[420px] text-base text-muted-foreground leading-relaxed"
        >
          We bake each serving before sunrise with organic baby spinach and
          slow-aged cheese, then deliver it to you within hours. Pick a plan — 1
          week, 1 month, or 1 year — and we'll handle the rest.
        </p>
        <div class="mt-8 space-y-3">
          <div
            v-for="benefit in benefits"
            :key="benefit.text"
            class="flex items-center gap-3"
          >
            <component
              :is="benefit.icon"
              class="h-5 w-5 flex-shrink-0 text-muted-foreground"
            />
            <span class="text-sm text-muted-foreground">{{
              benefit.text
            }}</span>
          </div>
        </div>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <NuxtLink
            :to="{ path: '/', hash: '#plans' }"
            class="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See plans — from $24
          </NuxtLink>
          <NuxtLink
            :to="{ path: '/', hash: '#how' }"
            class="inline-flex h-12 items-center justify-center border-b-2 border-foreground px-4 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-muted-foreground"
          >
            How it's made
          </NuxtLink>
        </div>
      </div>
      <div class="relative mx-auto w-full max-w-[500px] lg:max-w-none">
        <div class="aspect-square overflow-hidden rounded-3xl bg-muted">
          <img
            :src="heroBake"
            alt="Fresh baked spinach and cheese"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
