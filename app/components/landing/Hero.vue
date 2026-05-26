<script setup lang="ts">
import { Leaf, Clock, Truck } from "@lucide/vue";
import heroBake from "~/assets/images/hero-bake.jpg";

const benefits = [
  { icon: Leaf, text: "วัตถุดิบออร์แกนิก 100% ไม่ผ่านการแปรรูป" },
  { icon: Clock, text: "อบสดใหม่ในเช้าวันที่จัดส่ง" },
  { icon: Truck, text: "จัดส่งฟรี · หยุดหรือยกเลิกได้ทุกเมื่อ" },
];
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-border/60 bg-background"
  >
    <div
      class="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-2 lg:py-32"
    >
      <div class="flex flex-col justify-center">
        <div
          class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2"
        >
          <span class="h-2 w-2 rounded-full bg-primary" />
          <span
            class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >Fresh-baked daily subscription</span
          >
        </div>
        <h1
          class="text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.1]"
        >
          ราเมกิ้นผักโขมอบชีสร้อนๆ หนึ่งถ้วย
          <br />
          <span class="italic">ผักโขมและชีส</span>
          <br />
          ส่งถึงหน้าประตูทุกเช้า
        </h1>
        <p
          class="mt-6 max-w-[420px] text-base text-muted-foreground leading-relaxed"
        >
          เราอบผักโขมสดออร์แกนิกและชีสแก่ทุกเช้าก่อนพระอาทิตย์ขึ้น และจัดส่งถึงคุณภายในไม่กี่ชั่วโมง เลือกแผน — 1 สัปดาห์ 1 เดือน หรือ 1 ปี — แล้วเราจะจัดการที่เหลือให้เอง
        </p>
        <div class="mt-8 space-y-3">
          <div
            v-for="benefit in benefits"
            :key="benefit.text"
            class="flex items-center gap-3"
          >
            <component
              :is="benefit.icon"
              class="h-5 w-5 flex-shrink-0 text-muted-foreground"
            />
            <span class="text-sm text-muted-foreground">{{
              benefit.text
            }}</span>
          </div>
        </div>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <NuxtLink
            :to="{ path: '/', hash: '#plans' }"
            class="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            ดูแพ็กเกจ — เริ่มต้น $24
          </NuxtLink>
          <NuxtLink
            :to="{ path: '/', hash: '#how' }"
            class="inline-flex h-12 items-center justify-center border-b-2 border-foreground px-4 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-muted-foreground"
          >
            How it's made
          </NuxtLink>
        </div>
      </div>
      <div class="relative mx-auto w-full max-w-[500px] lg:max-w-none">
        <div class="aspect-square overflow-hidden rounded-3xl bg-muted">
          <img
            :src="heroBake"
            alt="ผักโขมอบชีสสดใหม่"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
