<script setup lang="ts">
import { computed } from 'vue'

export type QBadgeVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'purple'

const props = withDefaults(
  defineProps<{
    variant?: QBadgeVariant
    size?: 'sm' | 'md'
    /** Leading status dot */
    dot?: boolean
  }>(),
  {
    variant: 'neutral',
    size: 'sm',
    dot: false,
  },
)

const rootClass = computed(() => {
  const sizes = {
    sm: 'gap-1 px-1.5 py-0.5 text-[11px] leading-4',
    md: 'gap-1.5 px-2 py-0.5 text-xs leading-5',
  } as const

  const variants: Record<QBadgeVariant, string> = {
    neutral: 'bg-active text-primary/70',
    info: 'bg-accent-1/15 text-accent-1',
    success: 'bg-accent-3/15 text-accent-3',
    warning: 'bg-accent-2/15 text-accent-2',
    danger: 'bg-danger/15 text-danger',
    purple: 'bg-accent-4/15 text-accent-4',
  }

  return [
    'q-badge inline-flex max-w-full items-center rounded-md font-medium',
    sizes[props.size],
    variants[props.variant],
  ]
})

const dotClass = computed(() => {
  const map: Record<QBadgeVariant, string> = {
    neutral: 'bg-primary/45',
    info: 'bg-accent-1',
    success: 'bg-accent-3',
    warning: 'bg-accent-2',
    danger: 'bg-danger',
    purple: 'bg-accent-4',
  }
  return ['h-1.5 w-1.5 shrink-0 rounded-sm', map[props.variant]]
})
</script>

<template>
  <span :class="rootClass">
    <span v-if="dot" aria-hidden="true" :class="dotClass" />
    <span class="truncate"><slot /></span>
  </span>
</template>
