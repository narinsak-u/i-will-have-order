<template>
  <footer class="border-t border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-12">
      <div
        class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
      >
        <div>
          <h3 class="text-lg font-semibold text-foreground">
            Spinach & Cheese Co.
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Baked fresh. Delivered daily.
          </p>
        </div>
        <nav
          class="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:gap-8"
        >
          <NuxtLink
            :to="{ path: '/', hash: '#plans' }"
            class="hover:text-foreground transition-colors"
            >Subscription</NuxtLink
          >
          <NuxtLink
            :to="{ path: '/', hash: '#how' }"
            class="hover:text-foreground transition-colors"
            >How it's made</NuxtLink
          >
          <NuxtLink
            :to="{ path: '/', hash: '#benefits' }"
            class="hover:text-foreground transition-colors"
            >Benefits</NuxtLink
          >
          <a href="#" class="hover:text-foreground transition-colors"
            >Support</a
          >
        </nav>
      </div>
      <div class="mt-8 border-t border-border/60 pt-8">
        <p class="text-xs text-muted-foreground">
          &copy; 2026 Spinach & Cheese Co. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
