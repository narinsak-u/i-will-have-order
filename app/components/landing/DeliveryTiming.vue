<script setup lang="ts">
import { Clock, Truck, Package } from 'lucide-vue-next'

const schedules = [
  {
    plan: "1 Week",
    ship: "จัดส่งในวันเดียวกัน",
    arrive: "เช้าวันถัดไป 7–9 น.",
    cadence: "จัดส่งทุกวันติดต่อกัน 7 วัน",
    icon: Package,
  },
  {
    plan: "1 Month",
    ship: "จัดส่งทุกวันเวลา 5 น.",
    arrive: "ทุกเช้า 7–9 น.",
    cadence: "จัดส่ง 30 วัน · หยุดพักได้ทุกเมื่อ",
    icon: Truck,
  },
  {
    plan: "1 Year",
    ship: "จัดส่งทุกวันเวลา 5 น.",
    arrive: "ทุกเช้า 6:30–8:30 น. (จัดส่งก่อน)",
    cadence: "จัดส่ง 365 วัน · เมนูตามฤดูกาล",
    icon: Clock,
  },
]
</script>

<template>
  <section id="delivery" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Delivery timing</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          แต่ละแผนจัดส่งและมาถึงเมื่อไหร่
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
          ราเมกิ้นทุกถ้วยออกจากเตาก่อนพระอาทิตย์ขึ้นและถึงหน้าประตูคุณภายในสี่ชั่วโมง — แช่เย็น ปิดผนึก และพร้อมอุ่นทาน
        </p>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <article
          v-for="s in schedules"
          :key="s.plan"
          class="rounded-3xl border border-border bg-card p-8"
        >
          <component :is="s.icon" class="h-5 w-5 text-primary" />
          <h3 class="mt-6 text-xl font-light tracking-tight text-foreground">{{ s.plan }}</h3>
          <dl class="mt-6 space-y-4 border-t border-border pt-6 text-sm">
            <div>
              <dt class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ships</dt>
              <dd class="mt-1 text-foreground">{{ s.ship }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Arrives</dt>
              <dd class="mt-1 text-foreground">{{ s.arrive }}</dd>
            </div>
            <div>
              <dt class="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cadence</dt>
              <dd class="mt-1 text-muted-foreground">{{ s.cadence }}</dd>
            </div>
          </dl>
        </article>
      </div>

      <p class="mt-10 text-xs text-muted-foreground">
        เวลาตัดรอบสำหรับการจัดส่งในวันถัดไป: 20:00 น. ตามเวลาท้องถิ่น วันอาทิตย์เป็นวันหยุด — คำสั่งซื้อวันเสาร์จะจัดส่งในเช้าวันจันทร์
      </p>
    </div>
  </section>
</template>
