<script setup lang="ts">
import { Check } from "@lucide/vue";
import type { PlanId } from "~/composables/plans";
import { plans, planImages } from "~/composables/plans";

const props = defineProps<{
  selectedId: PlanId | null;
}>();

const emit = defineEmits<{
  (e: "select", id: PlanId): void;
}>();
</script>

<template>
  <section id="plans" class="border-b border-border/60 bg-background">
    <div class="mx-auto max-w-6xl px-6 py-24">
      <div class="mb-16">
        <p class="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Subscription
        </p>
        <h2
          class="mt-4 text-3xl font-light tracking-tight text-foreground md:text-4xl"
        >
          สามวิธีให้ครัวคุณมีของพร้อมเสมอ
        </h2>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="plan in plans"
          :key="plan.id"
          @click="emit('select', plan.id)"
          :class="[
            'relative overflow-hidden rounded-3xl transition-all cursor-pointer',
            plan.popular
              ? 'bg-[#1a3a2a] text-white ring-2 ring-[#1a3a2a]'
              : 'bg-white border border-border/40 hover:border-border/60',
          ]"
        >
          <!-- Plan image placeholder -->
          <img
            :src="planImages[plan.id]"
            :alt="`${plan.name} plan`"
            class="aspect-video w-full object-cover h-64"
          />

          <!-- Plan content -->
          <div class="px-6 py-8">
            <p
              :class="[
                'mb-4 text-xs uppercase tracking-widest',
                plan.popular ? 'text-gray-300' : 'text-muted-foreground',
              ]"
            >
              {{ plan.label }}
            </p>
            <h3
              :class="[
                'text-2xl font-light tracking-tight',
                plan.popular ? 'text-white' : 'text-foreground',
              ]"
            >
              {{ plan.name }}
            </h3>

            <div class="mt-6 flex items-baseline gap-1">
              <span
                :class="[
                  'text-5xl font-light',
                  plan.popular ? 'text-white' : 'text-foreground',
                ]"
              >
                ฿{{ plan.price.toLocaleString() }}
              </span>
              <span
                :class="[
                  'text-sm',
                  plan.popular ? 'text-gray-300' : 'text-muted-foreground',
                ]"
              >
                {{ plan.cadence }}
              </span>
            </div>

            <p
              :class="[
                'mt-2 text-xs',
                plan.popular ? 'text-gray-300' : 'text-muted-foreground',
              ]"
            >
              {{ plan.servings }} · {{ plan.billing }}
            </p>

            <ul
              :class="[
                'mt-8 space-y-3',
                plan.popular ? 'text-white' : 'text-foreground',
              ]"
            >
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center gap-3 text-sm"
              >
                <Check
                  class="h-4 w-4 shrink-0"
                  :class="plan.popular ? 'text-white' : 'text-foreground'"
                />
                {{ feature }}
              </li>
            </ul>

            <button
              :class="[
                'mt-8 w-full cursor-pointer rounded-full py-3 text-sm font-semibold uppercase tracking-wide transition-all',
                plan.popular
                  ? 'bg-white text-[#1a3a2a] hover:bg-gray-100'
                  : 'bg-foreground text-background hover:bg-foreground/90',
              ]"
            >
              เลือกแพ็กเกจ
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
