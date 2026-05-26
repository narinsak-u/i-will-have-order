<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import type { PlanId } from '~/app/components/landing/Checkout.vue'

useHead({
  title: 'Spinach & Cheese Co. — Baked fresh, delivered daily',
  meta: [
    { name: 'description', content: 'Subscribe to a daily ramekin of organic baked spinach and melted cheese. 1 week, 1 month, and 1 year plans.' },
    { property: 'og:title', content: 'Spinach & Cheese Co.' },
    { property: 'og:description', content: 'Baked fresh, delivered daily.' },
  ]
})

const router = useRouter()
const selectedPlan = ref<PlanId | null>(null)

const handleSelect = (planId: PlanId) => {
  selectedPlan.value = planId
  setTimeout(() => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, 50)
}

const handleConfirm = (planId: PlanId) => {
  try {
    localStorage.setItem("sc:active-plan", JSON.stringify({ planId, startedAt: Date.now() }))
  } catch {}
  toast.success("Order placed", { description: `${planId} plan confirmed. Heading to dashboard...` })
  setTimeout(() => router.push('/dashboard'), 700)
}
</script>

<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <SiteHeader />
    <main>
      <LandingHero />
      <LandingPlans @select="handleSelect" :selectedId="selectedPlan" />
      <LandingHowItsMade />
      <LandingBenefits />
      <LandingDeliveryTiming />
      <LandingTestimonials />
      <LandingFaq />
      <LandingCheckout :selectedPlan="selectedPlan" @confirm="handleConfirm" />
    </main>
    <SiteFooter />
    <UiSonner />
  </div>
</template>
