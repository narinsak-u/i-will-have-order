<script setup lang="ts">
import { ref, computed } from 'vue'
import { Check, ShoppingBag } from 'lucide-vue-next'
import planWeek from '~/assets/images/plan-week.jpg'
import planMonth from '~/assets/images/plan-month.jpg'
import planYear from '~/assets/images/plan-year.jpg'

export type PlanId = 'week' | 'month' | 'year'

const props = defineProps<{
  selectedPlan: PlanId | null
}>()

const emit = defineEmits<{
  (e: 'confirm', id: PlanId, customer: { name: string; email: string; address: string }): void
}>()

const PLAN_DETAILS: Record<PlanId, { name: string; price: number; cadence: string; note: string; image: string }> = {
  week: { name: "1 Week", price: 24, cadence: "/ week", note: "7 servings · billed once", image: planWeek },
  month: { name: "1 Month", price: 89, cadence: "/ month", note: "30 servings · save 8%", image: planMonth },
  year: { name: "1 Year", price: 899, cadence: "/ year", note: "365 servings · save 18%", image: planYear },
}

const name = ref("")
const email = ref("")
const address = ref("")

const plan = computed(() => props.selectedPlan ? PLAN_DETAILS[props.selectedPlan] : null)

const handleSubmit = () => {
  if (!props.selectedPlan) return;
  emit('confirm', props.selectedPlan, { name: name.value, email: email.value, address: address.value })
}
</script>

<template>
  <section id="checkout" class="border-b border-border/60 bg-secondary/30">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Checkout</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          {{ plan ? `ยืนยันแผน ${plan.name.toLowerCase()} ของคุณ` : "เลือกแผนเพื่อเริ่มการชำระเงิน" }}
        </h2>
        <p class="mt-3 text-sm text-muted-foreground">
          {{ plan ? "ตรวจสอบการเลือกของคุณและเพิ่มรายละเอียดการจัดส่ง คุณสามารถหยุดพักหรือยกเลิกได้ทุกเมื่อ" : "เลือกแผนใดก็ได้ด้านบนแล้วเราจะพาคุณมาที่นี่เพื่อทำการสั่งซื้อ" }}
        </p>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-5">
        <aside class="lg:col-span-2 rounded-3xl border border-border bg-card p-6">
          <template v-if="plan">
            <div class="overflow-hidden rounded-2xl">
              <img :src="plan.image" :alt="plan.name" class="aspect-[4/3] w-full object-cover" />
            </div>
            <div class="mt-6 flex items-baseline justify-between">
              <h3 class="text-2xl font-light tracking-tight text-foreground">{{ plan.name }}</h3>
              <div class="text-right">
                <div class="text-3xl font-light text-foreground">${{ plan.price }}</div>
                <div class="text-xs text-muted-foreground">{{ plan.cadence }}</div>
              </div>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">{{ plan.note }}</p>
            <ul class="mt-6 space-y-2 border-t border-border pt-6 text-sm text-foreground">
              <li class="flex items-center gap-2"><Check class="h-4 w-4 text-primary" /> จัดส่งสดใหม่ทุกวัน</li>
              <li class="flex items-center gap-2"><Check class="h-4 w-4 text-primary" /> รวมค่าจัดส่งฟรี</li>
              <li class="flex items-center gap-2"><Check class="h-4 w-4 text-primary" /> หยุดพักหรือยกเลิกได้ทุกเมื่อ</li>
            </ul>
          </template>
          <div v-else class="flex h-full flex-col items-center justify-center py-16 text-center">
            <ShoppingBag class="h-8 w-8 text-muted-foreground" />
            <p class="mt-4 text-sm text-muted-foreground">ยังไม่ได้เลือกแผน</p>
          </div>
        </aside>

        <form @submit.prevent="handleSubmit" class="lg:col-span-3 rounded-3xl border border-border bg-card p-8">
          <div class="grid gap-5">
            <div>
              <label for="co-name" class="text-xs uppercase tracking-[0.2em] text-muted-foreground">ชื่อ-นามสกุล</label>
              <input id="co-name" type="text" v-model="name" required placeholder="Jane Doe" class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary" />
            </div>
            <div>
              <label for="co-email" class="text-xs uppercase tracking-[0.2em] text-muted-foreground">อีเมล</label>
              <input id="co-email" type="email" v-model="email" required placeholder="jane@example.com" class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary" />
            </div>
            <div>
              <label for="co-addr" class="text-xs uppercase tracking-[0.2em] text-muted-foreground">ที่อยู่จัดส่ง</label>
              <input id="co-addr" type="text" v-model="address" required placeholder="221B Baker Street, London" class="mt-2 h-11 w-full rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition-colors focus:border-primary" />
            </div>
          </div>

          <div class="mt-8 flex items-center justify-between border-t border-border pt-6">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-muted-foreground">รวมวันนี้</p>
              <p class="mt-1 text-2xl font-light text-foreground">{{ plan ? `$${plan.price}` : "—" }}</p>
            </div>
            <button type="submit" :disabled="!selectedPlan" class="inline-flex h-12 items-center rounded-full bg-primary px-8 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">
              สั่งซื้อ
            </button>
          </div>
          <p class="mt-4 text-xs text-muted-foreground">
            ตัวอย่างการชำระเงิน — ไม่มีการดำเนินการชำระเงินจริง การเลือกของคุณจะถูกบันทึกไปยังแดชบอร์ด
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
