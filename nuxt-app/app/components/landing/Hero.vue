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
