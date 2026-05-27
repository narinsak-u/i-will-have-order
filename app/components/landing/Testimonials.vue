<script setup lang="ts">
import { ref, computed } from 'vue'
import { Star, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const testimonials = [
  {
    quote:
      'ราเมกิ้นยามเช้ากลายเป็นกิจวัตรที่ฉันโปรดปราน รสชาติเหมือนมาจากครัวทัสคานี ไม่ใช่กล่องจัดส่ง',
    name: "Elena Rossi",
    role: 'สมาชิก, 8 เดือน',
    initials: "ER",
  },
  {
    quote:
      'ฉันยกเลิกชุดอาหารสำเร็จรูปและไม่เคยหันกลับไปมองอีก สิ่งอบอุ่นที่สมบูรณ์แบบสักอย่าง แทนที่จะเป็นตู้เย็นที่เต็มไปด้วยวัตถุดิบที่ใช้ไม่หมด',
    name: "Marcus Chen",
    role: 'สมาชิก, 1 ปี',
    initials: "MC",
  },
  {
    quote:
      'คุณสามารถสัมผัสได้ว่าผักโขมถูกเก็บในเช้าวันนั้น ไม่มีอะไรที่จัดส่งมาสดเท่านี้มาก่อน',
    name: "Priya Anand",
    role: 'สมาชิก, 4 เดือน',
    initials: "PA",
  },
  {
    quote:
      'ลูกสาวของฉันซึ่งเป็นคนกินยากขอเพิ่มทุกครั้งที่เห็นกล่อง arriveFreshness และรสชาติที่พิสูจน์แล้ว',
    name: "Sarah Mitchell",
    role: 'สมาชิก, 6 เดือน',
    initials: "SM",
  },
  {
    quote:
      'ในฐานะคนทำงานฟรีแลนซ์ที่ยุ่ง การมีอาหารเช้าที่มีคุณค่าทางโภชนาการพร้อมอุ่นใน 3 นาทีคือสิ่งที่เปลี่ยนชีวิต',
    name: "Thanakorn Wong",
    role: 'สมาชิก, 3 เดือน',
    initials: "TW",
  },
]

const visibleCount = 3
const pageCount = computed(() => testimonials.length - visibleCount + 1)
const currentPage = ref(0)

const visibleTestimonials = computed(() =>
  testimonials.slice(currentPage.value, currentPage.value + visibleCount),
)

const prev = () => {
  currentPage.value = currentPage.value === 0
    ? pageCount.value - 1
    : currentPage.value - 1
}

const next = () => {
  currentPage.value = currentPage.value === pageCount.value - 1
    ? 0
    : currentPage.value + 1
}
</script>

<template>
  <section id="testimonials" class="border-b border-border/60 bg-muted/40">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl">
          <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">Loved by households</p>
          <h2 class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            2,000+ ครัวเรือนเริ่มต้นวันใหม่กับเรา
          </h2>
        </div>
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <div class="flex items-center gap-0.5 text-primary">
            <Star v-for="i in 5" :key="i" class="h-4 w-4 fill-current" />
          </div>
          <span>คะแนนเฉลี่ย 4.9 · 1,240 รีวิว</span>
        </div>
      </div>
      <div class="mt-14 flex items-center gap-4">
        <button @click="prev" aria-label="Previous testimonials"
          class="hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground md:inline-flex">
          <ChevronLeft class="h-5 w-5" />
        </button>

        <!-- Testimonials card -->
        <div class="grid flex-1 gap-6 md:grid-cols-3">
          <figure v-for="t in visibleTestimonials" :key="t.name"
            class="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 min-h-66.5">
            <blockquote class="text-base font-light leading-relaxed text-foreground">
              "{{ t.quote }}"
            </blockquote>
            <figcaption class="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-medium tracking-wider text-primary">
                {{ t.initials }}
              </span>
              <div>
                <p class="text-sm font-medium text-foreground">{{ t.name }}</p>
                <p class="text-xs text-muted-foreground">{{ t.role }}</p>
              </div>
            </figcaption>
          </figure>
        </div>

        <button @click="next" aria-label="Next testimonials"
          class="hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground md:inline-flex">
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>

      <!-- Dots -->
      <div class="mt-8 flex items-center justify-center gap-2">
        <button v-for="i in pageCount" :key="i" @click="currentPage = i - 1" :aria-label="`Go to testimonial page ${i}`"
          class="h-2 cursor-pointer rounded-full transition-all"
          :class="i - 1 === currentPage ? 'w-6 bg-foreground' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'" />
      </div>
    </div>
  </section>
</template>
