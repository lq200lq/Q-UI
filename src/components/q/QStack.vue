<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Vertical gap between children */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    align?: 'stretch' | 'start' | 'center' | 'end'
    as?: 'div' | 'section' | 'ul' | 'ol' | 'nav'
  }>(),
  {
    gap: 'md',
    align: 'stretch',
    as: 'div',
  },
)

const rootClass = computed(() => {
  const gaps = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6',
  } as const

  const aligns = {
    stretch: 'items-stretch',
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  } as const

  return ['q-stack flex flex-col', gaps[props.gap], aligns[props.align]]
})
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
