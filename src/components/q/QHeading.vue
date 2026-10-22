<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Semantic level; also drives default visual size */
    level?: 1 | 2 | 3 | 4
    /** Override visual size without changing semantics */
    size?: 'xl' | 'lg' | 'md' | 'sm'
    /** Soften color for secondary headings */
    muted?: boolean
    align?: 'left' | 'center' | 'right'
    truncate?: boolean
  }>(),
  {
    level: 2,
    muted: false,
    align: 'left',
    truncate: false,
  },
)

const tag = computed(() => `h${props.level}` as 'h1' | 'h2' | 'h3' | 'h4')

const visualSize = computed(() => {
  if (props.size) return props.size
  const map = {
    1: 'xl',
    2: 'lg',
    3: 'md',
    4: 'sm',
  } as const
  return map[props.level]
})

const rootClass = computed(() => {
  const sizes = {
    xl: 'font-heading text-3xl font-semibold tracking-tight md:text-4xl',
    lg: 'font-heading text-2xl font-semibold tracking-tight',
    md: 'font-heading text-lg font-semibold',
    sm: 'font-heading text-base font-semibold',
  } as const

  const align = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  } as const

  return [
    'q-heading',
    sizes[visualSize.value],
    props.muted ? 'text-primary/70' : 'text-primary',
    align[props.align],
    props.truncate ? 'truncate' : undefined,
  ]
})
</script>

<template>
  <component :is="tag" :class="rootClass">
    <slot />
  </component>
</template>
