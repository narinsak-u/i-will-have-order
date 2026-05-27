<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { PlanId } from "~/composables/plans";

useHead({
  htmlAttrs: { lang: "th" },
  title: "Spinach & Cheese Co. — อบสดใหม่ จัดส่งทุกวัน",
  meta: [
    {
      name: "description",
      content:
        "สมัครรับราเมกิ้นผักโขมอบชีสออร์แกนิกทุกวัน แผน 1 สัปดาห์ 1 เดือน และ 1 ปี",
    },
    { property: "og:title", content: "Spinach & Cheese Co." },
    { property: "og:description", content: "อบสดใหม่ จัดส่งทุกวัน" },
  ],
});

const selectedPlan = ref<PlanId | null>(null);

// If the plan was selected, scroll to the checkout section
const handleSelect = (planId: PlanId) => {
  selectedPlan.value = planId;
  nextTick(() => {
    document
      .getElementById("checkout")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

</script>

<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <SiteHeader />
    <main>
      <LandingHero />
      <RevealSection>
        <LandingPlans @select="handleSelect" />
      </RevealSection>
      <RevealSection>
        <LandingHowItsMade />
      </RevealSection>
      <RevealSection>
        <LandingBenefits />
      </RevealSection>
      <RevealSection>
        <LandingDeliveryTiming />
      </RevealSection>
      <RevealSection>
        <LandingTestimonials />
      </RevealSection>
      <RevealSection>
        <LandingFaq />
      </RevealSection>
      <RevealSection>
        <LandingCheckout :selectedPlan="selectedPlan" />
      </RevealSection>
    </main>
    <RevealSection>
      <SiteFooter />
    </RevealSection>
    <UiSonner />
  </div>
</template>
