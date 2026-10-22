<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Chord keys, e.g. `['⌘', 'K']` or `['Ctrl', 'Shift', 'P']`.
     * When omitted, use default slot for a single keycap.
     */
    keys?: string[]
    size?: 'sm' | 'md'
    /** Borderless, for inline footer hints */
    variant?: 'solid' | 'ghost'
  }>(),
  {
    size: 'sm',
    variant: 'solid',
  },
)

const keyClass = computed(() => {
  const sizes = {
    sm: 'min-w-[1.25rem] px-1 py-0.5 text-[10px] leading-none',
    md: 'min-w-[1.5rem] px-1.5 py-0.5 text-[11px] leading-none',
  } as const

  const variants = {
    solid:
      'border border-border bg-hover text-primary/55 shadow-[0_1px_0_rgb(var(--color-border))]',
    ghost: 'border-0 bg-transparent text-primary/50',
  } as const

  return [
    'inline-flex items-center justify-center rounded font-mono font-medium',
    sizes[props.size],
    variants[props.variant],
  ]
})

const sepClass = computed(() =>
  props.size === 'md' ? 'text-[11px]' : 'text-[10px]',
)
</script>

<template>
  <span class="q-kbd inline-flex items-center gap-0.5 align-middle">
    <template v-if="keys?.length">
      <template v-for="(key, i) in keys" :key="`${key}-${i}`">
        <kbd :class="keyClass">{{ key }}</kbd>
        <span
          v-if="i < keys.length - 1"
          class="font-mono text-primary/35"
          :class="sepClass"
          aria-hidden="true"
        >
          +
        </span>
      </template>
    </template>
    <kbd v-else :class="keyClass">
      <slot />
    </kbd>
  </span>
</template>
