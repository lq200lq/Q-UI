<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: number
    max?: number
    /** Outer diameter in px */
    size?: number
    strokeWidth?: number
    variant?: 'default' | 'success' | 'warning' | 'danger'
    showValue?: boolean
    label?: string
  }>(),
  {
    value: 0,
    max: 100,
    size: 40,
    strokeWidth: 3,
    variant: 'default',
    showValue: true,
  },
)

const ratio = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(1, Math.max(0, props.value / props.max))
})

const percent = computed(() => Math.round(ratio.value * 100))

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - ratio.value))

const strokeClass = computed(() => {
  const map = {
    default: 'stroke-btn',
    success: 'stroke-accent-3',
    warning: 'stroke-accent-2',
    danger: 'stroke-danger',
  } as const
  return map[props.variant]
})
</script>

<template>
  <div
    class="q-progress-circle inline-flex flex-col items-center gap-1.5"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="label || undefined"
  >
    <svg
      :width="size"
      :height="size"
      class="-rotate-90"
      :viewBox="`0 0 ${size} ${size}`"
      aria-hidden="true"
    >
      <circle
        class="fill-none stroke-active"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="strokeWidth"
      />
      <circle
        class="fill-none transition-[stroke-dashoffset] duration-150 ease-out"
        :class="strokeClass"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <span
      v-if="showValue"
      class="text-[11px] font-medium tabular-nums text-primary/70"
    >
      {{ percent }}%
    </span>
    <span v-if="label" class="text-xs text-primary/55">{{ label }}</span>
  </div>
</template>
