<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
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

const router = useRouter();
const selectedPlan = ref<PlanId | null>(null);

const handleSelect = (planId: PlanId) => {
  selectedPlan.value = planId;
  setTimeout(() => {
    document
      .getElementById("checkout")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
};

const handleConfirm = (planId: PlanId) => {
  try {
    localStorage.setItem(
      "sc:active-plan",
      JSON.stringify({ planId, startedAt: Date.now() }),
    );
  } catch {}
  toast.success("สั่งซื้อสำเร็จ", {
    description: `ยืนยันแผน ${planId} แล้ว กำลังไปยังแดชบอร์ด...`,
  });
  setTimeout(() => router.push("/dashboard"), 700);
};
</script>

<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <SiteHeader />
    <main>
      <LandingHero />
      <RevealSection>
        <LandingPlans @select="handleSelect" :selectedId="selectedPlan" />
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
        <LandingCheckout :selectedPlan="selectedPlan" @confirm="handleConfirm" />
      </RevealSection>
    </main>
    <RevealSection>
      <SiteFooter />
    </RevealSection>
    <UiSonner />
  </div>
</template>
