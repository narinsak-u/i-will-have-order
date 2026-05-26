<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Package, Calendar, Truck, RotateCcw } from "lucide-vue-next";
import type { PlanId } from "~/composables/plans";
import { getPlan } from "~/composables/plans";

useHead({
  htmlAttrs: { lang: "th" },
  title: "Dashboard — Spinach & Cheese Co.",
  meta: [
    {
      name: "description",
      content:
        "Track your subscription, remaining servings, and next delivery.",
    },
  ],
});

const plan = ref<{ planId: PlanId; startedAt: number } | null>(null);

onMounted(() => {
  try {
    const raw = localStorage.getItem("sc:active-plan");
    if (raw) plan.value = JSON.parse(raw);
  } catch {}
});

const reset = () => {
  localStorage.removeItem("sc:active-plan");
  plan.value = null;
};

const activeMeta = computed(() =>
  plan.value ? getPlan(plan.value.planId) : null,
);
const elapsedDays = computed(() =>
  plan.value
    ? Math.floor((Date.now() - plan.value.startedAt) / (1000 * 60 * 60 * 24))
    : 0,
);
const remaining = computed(() =>
  activeMeta.value ? Math.max(0, activeMeta.value.days - elapsedDays.value) : 0,
);
const used = computed(() =>
  activeMeta.value ? activeMeta.value.days - remaining.value : 0,
);
const pct = computed(() =>
  activeMeta.value
    ? Math.min(100, Math.max(0, (used.value / activeMeta.value.days) * 100))
    : 0,
);
// const nextDelivery = computed(() => new Date(Date.now() + 1000 * 60 * 60 * 18))
</script>

<template>
  <div class="min-h-screen bg-background font-sans">
    <SiteHeader />
    <main class="mx-auto max-w-6xl px-6 py-16">
      <div
        class="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8"
      >
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Account
          </p>
          <h1 class="mt-3 text-4xl font-light tracking-tight text-foreground">
            การสมัครสมาชิกของคุณ
          </h1>
        </div>
        <button
          v-if="plan"
          @click="reset"
          class="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <RotateCcw class="h-3.5 w-3.5" /> รีเซ็ตตัวอย่าง
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="!plan"
        class="mt-16 rounded-sm border border-dashed border-border p-16 text-center"
      >
        <Package class="mx-auto h-6 w-6 text-muted-foreground" />
        <h2 class="mt-6 text-xl font-light text-foreground">
          ไม่มีแผนสมาชิกที่ใช้งาน
        </h2>
        <p class="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          เลือกแผนเพื่อเริ่มรับผักโขมอบชีสสดใหม่ทุกวัน
        </p>
        <NuxtLink
          :to="{ path: '/', hash: '#plans' }"
          class="mt-8 inline-flex h-11 items-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
        >
          ดูแพ็กเกจ
        </NuxtLink>
      </div>

      <!-- Active Plan -->
      <div v-else-if="activeMeta" class="mt-12 grid gap-6 lg:grid-cols-3">
        <section
          class="lg:col-span-2 rounded-sm border border-border bg-card p-8"
        >
          <div class="flex items-start justify-between">
            <div>
              <p
                class="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                แผนปัจจุบัน
              </p>
              <h2
                class="mt-2 text-3xl font-light tracking-tight text-foreground"
              >
                {{ activeMeta.name }}
              </h2>
            </div>
            <span
              class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary"
              >ใช้งานอยู่</span
            >
          </div>

          <div class="mt-10">
            <div class="flex items-baseline justify-between">
              <span
                class="text-5xl font-light tracking-tight text-foreground"
                >{{ remaining }}</span
              >
              <span class="text-sm text-muted-foreground"
                >จาก {{ activeMeta.days }} วัน</span
              >
            </div>
            <div
              class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted"
            >
              <div
                class="h-full bg-primary transition-all"
                :style="{ width: `${pct}%` }"
              />
            </div>
            <p class="mt-3 text-xs text-muted-foreground">
              ส่งแล้ว {{ used }} ที่ · เหลืออีก {{ remaining }} ที่
            </p>
          </div>

          <div
            class="mt-10 grid gap-6 sm:grid-cols-3 border-t border-border pt-8"
          >
            <div>
              <p
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                เริ่ม
              </p>
              <p class="mt-2 text-base font-medium text-foreground">
                {{
                  new Date(plan.startedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                }}
              </p>
            </div>
            <div>
              <p
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                ต่ออายุ
              </p>
              <p class="mt-2 text-base font-medium text-foreground">
                {{
                  new Date(
                    plan.startedAt + activeMeta.days * 86400000,
                  ).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                }}
              </p>
            </div>
            <div>
              <p
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                มูลค่าแผน
              </p>
              <p class="mt-2 text-base font-medium text-foreground">
                ฿{{ activeMeta.price.toLocaleString() }}
              </p>
            </div>
          </div>
        </section>

        <aside class="space-y-6">
          <div class="rounded-sm border border-border bg-card p-6">
            <div
              class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Truck class="h-3.5 w-3.5" /> จัดส่งครั้งถัดไป
            </div>
            <p class="mt-3 text-lg font-medium text-foreground">
              พรุ่งนี้, 8:00 AM
              <!-- {{
                nextDelivery.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })
              }} -->
            </p>
            <p class="mt-1 text-xs text-muted-foreground">
              ออกจากเตา · สดได้ 24 ชม. ในตู้เย็น
            </p>
          </div>
          <div class="rounded-sm border border-border bg-card p-6">
            <div
              class="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Calendar class="h-3.5 w-3.5" /> จังหวะรายสัปดาห์
            </div>
            <ul class="mt-4 space-y-3 text-sm text-foreground">
              <li class="flex justify-between">
                <span>จันทร์ – ศุกร์</span
                ><span class="text-muted-foreground">8:00 AM</span>
              </li>
              <li class="flex justify-between">
                <span>เสาร์</span
                ><span class="text-muted-foreground">9:30 AM</span>
              </li>
              <li class="flex justify-between">
                <span>อาทิตย์</span
                ><span class="text-muted-foreground">วันหยุด</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
