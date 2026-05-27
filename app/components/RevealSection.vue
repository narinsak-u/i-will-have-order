<template>
  <component
    :is="as"
    ref="target"
    class="reveal-section"
    :class="{
      'is-visible': isVisible,
      'is-stagger': stagger > 0 && isVisible,
    }"
    :style="cssVars"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = withDefaults(defineProps<{
  threshold?: number
  stagger?: number
  distance?: number
  duration?: number
  once?: boolean
  as?: keyof HTMLElementTagNameMap
}>(),
  threshold: 0.15,
  stagger: 0,
  distance: 32,
  duration: 600,
  once: true,
  as: 'div',
})

const target = ref<HTMLElement>()
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry.isIntersecting) {
      isVisible.value = true
      if (props.once) stop()
    } else if (!props.once) {
      isVisible.value = false
    }
  },
  { threshold: props.threshold },
)

const staggerVars = computed(() => {
  if (!props.stagger) return undefined
  const vars: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    vars[`--d${i}`] = `${(i - 1) * props.stagger}ms`
  }
  return vars
})

const cssVars = computed(() => ({
  '--distance': `${props.distance}px`,
  '--duration': `${props.duration}ms`,
  ...(staggerVars.value || {}),
}))
</script>

<style scoped>
.reveal-section {
  opacity: 0;
  translate: 0 var(--distance, 32px);
  transition: opacity var(--duration, 600ms) ease,
              translate var(--duration, 600ms) ease;
}
.reveal-section.is-visible {
  opacity: 1;
  translate: 0 0;
}
.reveal-section.is-stagger > :nth-child(1) { transition-delay: var(--d1, 0ms); }
.reveal-section.is-stagger > :nth-child(2) { transition-delay: var(--d2, 0ms); }
.reveal-section.is-stagger > :nth-child(3) { transition-delay: var(--d3, 0ms); }
.reveal-section.is-stagger > :nth-child(4) { transition-delay: var(--d4, 0ms); }
.reveal-section.is-stagger > :nth-child(5) { transition-delay: var(--d5, 0ms); }
.reveal-section.is-stagger > :nth-child(6) { transition-delay: var(--d6, 0ms); }
.reveal-section.is-stagger > :nth-child(7) { transition-delay: var(--d7, 0ms); }
.reveal-section.is-stagger > :nth-child(8) { transition-delay: var(--d8, 0ms); }
.reveal-section.is-stagger > :nth-child(9) { transition-delay: var(--d9, 0ms); }
.reveal-section.is-stagger > :nth-child(10) { transition-delay: var(--d10, 0ms); }
.reveal-section.is-stagger > :nth-child(11) { transition-delay: var(--d11, 0ms); }
.reveal-section.is-stagger > :nth-child(12) { transition-delay: var(--d12, 0ms); }
@media (prefers-reduced-motion: reduce) {
  .reveal-section {
    opacity: 1;
    translate: 0 0;
    transition: none;
  }
}
</style>
