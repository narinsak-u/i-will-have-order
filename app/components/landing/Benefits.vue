<script setup lang="ts">
import { Leaf, HeartPulse, Sparkles, Shield } from 'lucide-vue-next'

const benefits = [
  { icon: Leaf, title: 'พืชเป็นหลัก', body: 'แต่ละที่ให้ไฟเบอร์ 4 กรัมและผักใบเขียวเต็มถ้วย' },
  { icon: HeartPulse, title: 'ดีต่อหัวใจ', body: 'อุดมด้วยโฟเลต แมกนีเซียม และโพแทสเซียม — แร่ธาตุที่ช่วยสนับสนุนสุขภาพหัวใจและหลอดเลือด' },
  { icon: Sparkles, title: 'โปรตีนสูง', body: 'โปรตีนนมที่ย่อยช้า 12 กรัมต่อราเมกิ้น ช่วยให้คุณอิ่มนานขึ้น' },
  { icon: Shield, title: 'เสริมภูมิคุ้มกัน', body: 'ธาตุเหล็กและวิตามินเคจากผักโขม ผสานกับวิตามินเอจากชีสแก่' },
]
</script>

<template>
  <section id="benefits" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="max-w-2xl">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Benefits</p>
        <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          อาหารที่ทั้งอร่อยและดีต่อร่างกาย
        </h2>
      </div>
      <div class="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        <div v-for="benefit in benefits" :key="benefit.title" class="bg-background p-8">
          <component :is="benefit.icon" class="h-5 w-5 text-primary" />
          <h3 class="mt-6 text-lg font-medium text-foreground">{{ benefit.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ benefit.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
