<template>
  <header class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <NuxtLink to="/" class="flex items-center gap-2">
        <span
          class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
          S
        </span>
        <span class="text-sm font-semibold tracking-tight text-foreground">
          Spinach &amp; Cheese Co.</span>
      </NuxtLink>
      <nav class="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <NuxtLink :to="{ path: '/', hash: '#plans' }" class="hover:text-foreground transition-colors">Plans</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#how' }" class="hover:text-foreground transition-colors">How it's made
        </NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#benefits' }" class="hover:text-foreground transition-colors">Benefits
        </NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#delivery' }" class="hover:text-foreground transition-colors">Delivery
        </NuxtLink>
      </nav>
      <NuxtLink to="/dashboard"
        class="inline-flex h-9 items-center rounded-sm bg-primary px-4 text-xs font-medium tracking-wide text-primary-foreground uppercase hover:bg-primary/90 transition-colors">
        Dashboard
      </NuxtLink>
    </div>
  </header>
</template>
