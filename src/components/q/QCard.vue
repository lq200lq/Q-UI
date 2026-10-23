<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'flat' | 'elevated' | 'outlined'
    padding?: 'none' | 'sm' | 'md'
  }>(),
  {
    variant: 'default',
    padding: 'md',
  },
)

const slots = useSlots()

const padClass = computed(() => {
  const map = {
    none: '',
    sm: 'p-4',
    md: 'p-4 md:p-6',
  } as const
  return map[props.padding]
})

/** Header / footer share the same bar metrics */
const chromeClass = computed(() => {
  const x =
    props.padding === 'sm' || props.padding === 'none'
      ? 'px-4'
      : 'px-4 md:px-6'

  return [
    'flex min-h-12 items-center gap-2',
    x,
  ]
})

const rootClass = computed(() => {
  /* Content surfaces: tonal hierarchy (page → surface). Keep hairline only on `outlined`. */
  const variants = {
    default: 'bg-surface shadow-sm',
    flat: 'bg-surface',
    elevated: 'bg-surface shadow-md',
    outlined: 'border border-border bg-surface',
  } as const

  const hasChrome = Boolean(slots.header || slots.footer)

  return [
    'q-card rounded-lg text-primary',
    variants[props.variant],
    hasChrome ? 'overflow-hidden' : padClass.value,
  ]
})
</script>

<template>
  <div :class="rootClass">
    <div
      v-if="$slots.header"
      class="border-b border-border"
      :class="chromeClass"
    >
      <slot name="header" />
    </div>
    <div :class="$slots.header || $slots.footer ? padClass : undefined">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="border-t border-border"
      :class="chromeClass"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
