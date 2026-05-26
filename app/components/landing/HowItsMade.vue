<script setup lang="ts">
import ingredientsImg from "~/assets/images/ingredients.jpg";

const steps = [
  {
    n: "01",
    title: "เก็บในยามเช้า",
    body: "ผักโขมเด็กออร์แกนิกที่เก็บจากท้องถิ่นทุกเช้าก่อนอากาศจะร้อน",
  },
  {
    n: "02",
    title: "คลุกเคล้ากับชีส",
    body: "มอสซาเรลลาชีสแก่และลูกจันทน์เทศเล็กน้อย คลุกเคล้าด้วยมือ",
  },
  {
    n: "03",
    title: "อบจนเป็นสีทอง",
    body: "อบในราเมกิ้นเซรามิกที่อุณหภูมิ 200°C จนด้านบนเป็นสีเหลืองอำพัน",
  },
  {
    n: "04",
    title: "ถึงหน้าประตูคุณ",
    body: "แช่เย็น บรรจุกล่อง และจัดส่งภายในสี่ชั่วโมงหลังจากออกจากเตา",
  },
];

const ingredients = [
  "ผักโขมอินทรีย์",
  "มอสซาเรลลาสด",
  "พาร์เมซานแก่",
  "ไข่ไก่เลี้ยงปล่อย",
  "เนยหมัก",
  "เกลือทะเล",
  "พริกไทยดำ",
  "ลูกจันทน์เทศ",
];
</script>

<template>
  <section id="how" class="border-b border-border/60 bg-muted/40">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="grid gap-16 md:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            How it's made
          </p>
          <h2
            class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl"
          >
            สี่ขั้นตอน เท่านั้นเอง
          </h2>
          <ol class="mt-10 space-y-8">
            <li
              v-for="s in steps"
              :key="s.n"
              class="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6"
            >
              <span class="text-xs font-mono text-muted-foreground">
                {{ s.n }}
              </span>
              <div>
                <h3 class="text-base font-medium text-foreground">
                  {{ s.title }}
                </h3>
                <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {{ s.body }}
                </p>
              </div>
            </li>
          </ol>

          <div class="rounded-sm border border-border bg-card p-8 mt-10">
            <p
              class="text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              Organic Ingredients
            </p>
            <ul class="mt-5 grid grid-cols-2 gap-y-2 text-sm text-foreground">
              <li v-for="i in ingredients" :key="i">· {{ i }}</li>
            </ul>
          </div>
        </div>
        <div class="space-y-6">
          <img
            :src="ingredientsImg"
            alt="Fresh spinach and cheese"
            loading="lazy"
            class="aspect-4/5 w-full h-full rounded-sm object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
