<template>
  <footer class="border-t border-border/60 bg-background py-12 md:py-16">
    <div class="mx-auto max-w-6xl px-6">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">S</span>
          <p class="mt-4 text-sm text-muted-foreground">Baked fresh, delivered daily. The simplest routine for your day.</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-foreground">Product</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><NuxtLink :to="{ path: '/', hash: '#plans' }" class="hover:text-foreground">Plans</NuxtLink></li>
            <li><NuxtLink :to="{ path: '/', hash: '#how' }" class="hover:text-foreground">Sourcing</NuxtLink></li>
            <li><NuxtLink :to="{ path: '/', hash: '#faq' }" class="hover:text-foreground">FAQ</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-foreground">Company</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" class="hover:text-foreground">About</a></li>
            <li><a href="#" class="hover:text-foreground">Careers</a></li>
            <li><a href="#" class="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-foreground">Legal</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" class="hover:text-foreground">Terms</a></li>
            <li><a href="#" class="hover:text-foreground">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-12 flex items-center justify-between border-t border-border/60 pt-8 text-xs text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} Spinach &amp; Cheese Co.</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-foreground">Twitter</a>
          <a href="#" class="hover:text-foreground">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
</template>
