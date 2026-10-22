<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    /** Softer border */
    muted?: boolean
    /** Vertical spacing around horizontal divider */
    spacing?: 'none' | 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  {
    orientation: 'horizontal',
    muted: false,
    spacing: 'md',
  },
)

const lineClass = computed(() =>
  props.muted ? 'border-border/60' : 'border-border',
)

const spacingClass = computed(() => {
  if (props.orientation === 'vertical') return undefined
  const map = {
    none: 'my-0',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
  } as const
  return map[props.spacing]
})
</script>

<template>
  <div
    v-if="orientation === 'horizontal' && (label || $slots.default)"
    class="q-divider flex items-center gap-3"
    :class="spacingClass"
    role="separator"
  >
    <div class="h-px flex-1 border-t" :class="lineClass" />
    <span class="shrink-0 text-xs font-medium text-primary/45">
      <slot>{{ label }}</slot>
    </span>
    <div class="h-px flex-1 border-t" :class="lineClass" />
  </div>

  <hr
    v-else-if="orientation === 'horizontal'"
    class="q-divider border-0 border-t"
    :class="[lineClass, spacingClass]"
  />

  <div
    v-else
    class="q-divider inline-stretch self-stretch border-0 border-l"
    :class="[lineClass, 'mx-2 min-h-4']"
    role="separator"
    aria-orientation="vertical"
  />
</template>
