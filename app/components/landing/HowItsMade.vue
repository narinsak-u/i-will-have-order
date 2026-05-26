<script setup lang="ts">
import ingredientsImg from '~/assets/images/ingredients.jpg'
import deliveryImg from '~/assets/images/delivery.jpg'

const steps = [
  { n: "01", title: "Picked at dawn", body: "Organic baby spinach harvested locally each morning before the heat sets in." },
  { n: "02", title: "Folded with cheese", body: "Slow-aged mozzarella and a whisper of nutmeg, folded by hand." },
  { n: "03", title: "Baked golden", body: "Stone-baked in small ceramic ramekins at 200°C until the top is amber." },
  { n: "04", title: "On your doorstep", body: "Chilled, boxed, and delivered within four hours of leaving the oven." },
]

const ingredients = [
  "Organic spinach", "Fresh mozzarella", "Aged parmesan", "Free-range eggs",
  "Cultured butter", "Sea salt", "Black pepper", "Nutmeg",
]
</script>

<template>
  <section id="how" class="border-b border-border/60 bg-muted/40">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="grid gap-16 md:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">How it's made</p>
          <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            Four steps. Nothing more.
          </h2>
          <ol class="mt-10 space-y-8">
            <li v-for="s in steps" :key="s.n" class="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
              <span class="text-xs font-mono text-muted-foreground">{{ s.n }}</span>
              <div>
                <h3 class="text-base font-medium text-foreground">{{ s.title }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ s.body }}</p>
              </div>
            </li>
          </ol>
        </div>
        <div class="space-y-6">
          <img :src="ingredientsImg" alt="Fresh spinach and cheese" width="1024" height="1024" loading="lazy" class="aspect-[4/5] w-full rounded-sm object-cover" />
          <div class="rounded-sm border border-border bg-card p-8">
            <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Ingredients</p>
            <ul class="mt-5 grid grid-cols-2 gap-y-2 text-sm text-foreground">
              <li v-for="i in ingredients" :key="i">· {{ i }}</li>
            </ul>
          </div>
          <img :src="deliveryImg" alt="Boxed for delivery" width="1024" height="1024" loading="lazy" class="aspect-[4/3] w-full rounded-sm object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>
