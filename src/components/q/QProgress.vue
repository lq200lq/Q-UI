<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Current value */
    value?: number
    max?: number
    size?: 'sm' | 'md'
    variant?: 'default' | 'success' | 'warning' | 'danger'
    /** Show percent text */
    showValue?: boolean
    label?: string
    indeterminate?: boolean
  }>(),
  {
    value: 0,
    max: 100,
    size: 'md',
    variant: 'default',
    showValue: false,
    indeterminate: false,
  },
)

const ratio = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(1, Math.max(0, props.value / props.max))
})

const percent = computed(() => Math.round(ratio.value * 100))

const trackClass = computed(() => [
  'q-progress-track relative w-full overflow-hidden rounded-sm bg-active',
  props.size === 'sm' ? 'h-1' : 'h-1.5',
])

const barClass = computed(() => {
  const colors = {
    default: 'bg-btn',
    success: 'bg-accent-3',
    warning: 'bg-accent-2',
    danger: 'bg-danger',
  } as const

  return [
    'h-full rounded-sm transition-[width] duration-150 ease-out',
    colors[props.variant],
    props.indeterminate ? 'q-progress-indeterminate w-1/3' : undefined,
  ]
})

const barStyle = computed(() =>
  props.indeterminate ? undefined : { width: `${ratio.value * 100}%` },
)
</script>

<template>
  <div class="q-progress w-full">
    <div
      v-if="label || showValue"
      class="mb-1.5 flex items-center justify-between gap-3 text-xs"
    >
      <span v-if="label" class="font-medium text-primary">{{ label }}</span>
      <span
        v-if="showValue && !indeterminate"
        class="tabular-nums text-primary/55"
      >
        {{ percent }}%
      </span>
    </div>

    <div
      :class="trackClass"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="indeterminate ? undefined : max"
      :aria-label="label || undefined"
      :aria-busy="indeterminate || undefined"
    >
      <div :class="barClass" :style="barStyle" />
    </div>
  </div>
</template>

<style scoped>
.q-progress-indeterminate {
  animation: q-progress-slide 1.1s ease-in-out infinite;
}

@keyframes q-progress-slide {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(420%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .q-progress-indeterminate {
    animation: none;
    width: 100%;
    opacity: 0.5;
  }
}
</style>
