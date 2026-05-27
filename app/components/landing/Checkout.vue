<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { toast } from "vue-sonner";
import { Check, ShoppingBag, ArrowUpFromDot, LoaderCircle } from "lucide-vue-next";
import type { PlanId } from "~/composables/plans";
import { getPlan, planImages } from "~/composables/plans";

const props = defineProps<{
  selectedPlan: PlanId | null;
}>();

const name = ref("");
const email = ref("");
const address = ref("");
const loading = ref(false);

const plan = computed(() =>
  props.selectedPlan ? getPlan(props.selectedPlan) : null,
);

watch(
  () => props.selectedPlan,
  (plan) => {
    if (plan) {
      name.value = "ผักโขม อบชีส";
      email.value = "spinachandcheese@example.com";
      address.value = "123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110";
    }
  },
);

const handleSubmit = async () => {
  if (!props.selectedPlan) return;

  loading.value = true;
  try {
    const { url } = await $fetch("/api/create-checkout-session", {
      method: "POST",
      body: {
        planId: props.selectedPlan,
        customer: {
          name: name.value,
          email: email.value,
          address: address.value,
        },
      },
    });
    window.location.href = url;
  } catch {
    toast.error("ไม่สามารถสร้างคำสั่งซื้อได้", {
      description: "กรุณาลองอีกครั้ง",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section id="checkout" class="border-b border-border/60 bg-secondary/30">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Checkout
        </p>
        <h2
          class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl"
        >
          {{
            plan
              ? `ยืนยันแผน ${plan.name.toLowerCase()} ของคุณ`
              : "เลือกแผนเพื่อเริ่มการชำระเงิน"
          }}
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">
          {{
            plan
              ? "ตรวจสอบการเลือกของคุณและเพิ่มรายละเอียดการจัดส่ง คุณสามารถหยุดพักหรือยกเลิกได้ทุกเมื่อ"
              : "เลือกแผนใดก็ได้ด้านบนแล้วเราจะพาคุณมาที่นี่เพื่อทำการสั่งซื้อ"
          }}
        </p>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-5">
        <aside
          class="lg:col-span-2 rounded-3xl border border-border bg-card p-6"
        >
          <template v-if="plan">
            <div class="overflow-hidden rounded-2xl">
              <img
                :src="planImages[props.selectedPlan!]"
                :alt="plan.name"
                class="aspect-4/3 w-full object-cover"
              />
            </div>
            <div class="mt-6 flex items-baseline justify-between">
              <h3 class="text-2xl font-light tracking-tight text-foreground">
                {{ plan.name }}
              </h3>
              <div class="text-right">
                <div class="text-3xl font-light text-foreground">
                  ฿{{ plan.price.toLocaleString() }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ plan.cadence }}
                </div>
              </div>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">
              {{ plan.servings }} · {{ plan.billing }}
            </p>
            <ul
              class="mt-6 space-y-2 border-t border-border pt-6 text-sm text-foreground"
            >
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-primary" /> จัดส่งสดใหม่ทุกวัน
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-primary" /> รวมค่าจัดส่งฟรี
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-primary" />
                หยุดพักหรือยกเลิกได้ทุกเมื่อ
              </li>
            </ul>
          </template>
          <div
            v-else
            class="flex h-full flex-col items-center justify-center py-16 text-center"
          >
            <ShoppingBag class="h-8 w-8 text-muted-foreground" />
            <p class="mt-4 text-sm text-muted-foreground">ยังไม่ได้เลือกแผน</p>
            <NuxtLink
              :to="{ path: '/', hash: '#plans' }"
              class="mt-6 inline-flex h-11 items-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              <ArrowUpFromDot class="h-3.5 w-3.5 mr-1" />
              ดูแผนทั้งหมด
            </NuxtLink>
          </div>
        </aside>

        <form
          @submit.prevent="handleSubmit"
          class="lg:col-span-3 rounded-3xl border border-border bg-card p-8"
        >
          <div class="grid gap-5">
            <div>
              <label
                for="co-name"
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                ชื่อ-นามสกุล
              </label>
              <input
                id="co-name"
                type="text"
                v-model="name"
                required
                placeholder="Jane Doe"
                class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label
                for="co-email"
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                อีเมล
              </label>
              <input
                id="co-email"
                type="email"
                v-model="email"
                required
                placeholder="jane@example.com"
                class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label
                for="co-addr"
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                ที่อยู่จัดส่ง
              </label>
              <input
                id="co-addr"
                type="text"
                v-model="address"
                required
                placeholder="221B Baker Street, London"
                class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>

          <div
            class="mt-8 flex items-center justify-between border-t border-border pt-6"
          >
            <div>
              <p
                class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                รวมวันนี้
              </p>
              <p class="mt-1 text-2xl font-light text-foreground">
                {{ plan ? `฿${plan.price.toLocaleString()}` : "—" }}
              </p>
            </div>
            <button
              type="submit"
              :disabled="!selectedPlan || loading"
              class="inline-flex cursor-pointer h-12 items-center gap-2 rounded-full bg-primary px-8 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LoaderCircle v-if="loading" class="h-4 w-4 animate-spin" />
              {{ loading ? "กำลังดำเนินการ..." : "สั่งซื้อ" }}
            </button>
          </div>
          <p class="mt-4 text-xs text-muted-foreground">
            ชำระเงินอย่างปลอดภัยด้วย Stripe · ทดสอบด้วยบัตร 4242 4242 4242 4242
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
