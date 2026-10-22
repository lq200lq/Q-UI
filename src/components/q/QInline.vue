<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Horizontal gap between children */
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    align?: 'start' | 'center' | 'end' | 'baseline'
    justify?: 'start' | 'center' | 'end' | 'between'
    wrap?: boolean
    as?: 'div' | 'span' | 'ul' | 'ol' | 'nav'
  }>(),
  {
    gap: 'sm',
    align: 'center',
    justify: 'start',
    wrap: true,
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
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
  } as const

  const justifies = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  } as const

  return [
    'q-inline flex',
    props.wrap ? 'flex-wrap' : 'flex-nowrap',
    gaps[props.gap],
    aligns[props.align],
    justifies[props.justify],
  ]
})
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
