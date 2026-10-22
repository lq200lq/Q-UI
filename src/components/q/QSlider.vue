<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    invalid?: boolean
    id?: string
    showValue?: boolean
    label?: string
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    invalid: false,
    showValue: false,
  },
)

const modelValue = defineModel<number>('modelValue', { default: 0 })

const autoId = useId()
const controlId = computed(() => props.id ?? autoId)

const percent = computed(() => {
  const span = props.max - props.min
  if (span <= 0) return 0
  const clamped = Math.min(props.max, Math.max(props.min, modelValue.value))
  return ((clamped - props.min) / span) * 100
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  modelValue.value = Number(target.value)
}
</script>

<template>
  <div class="q-slider w-full" :class="disabled ? 'opacity-50' : ''">
    <div
      v-if="label || showValue"
      class="mb-1.5 flex items-center justify-between gap-2"
    >
      <label
        v-if="label"
        :for="controlId"
        class="text-sm font-medium text-primary"
      >
        {{ label }}
      </label>
      <span
        v-if="showValue"
        class="text-xs tabular-nums text-primary/55"
      >
        {{ modelValue }}
      </span>
    </div>

    <div class="relative flex h-6 items-center">
      <div
        class="pointer-events-none absolute inset-x-0 h-1.5 rounded-full bg-border"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute left-0 h-1.5 rounded-full bg-btn"
        aria-hidden="true"
        :style="{ width: `${percent}%` }"
      />
      <input
        :id="controlId"
        type="range"
        class="q-slider-input relative z-[1] h-6 w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        @input="onInput"
      />
    </div>
  </div>
</template>

<style scoped>
.q-slider-input::-webkit-slider-runnable-track {
  height: 6px;
  background: transparent;
  border-radius: 9999px;
}
.q-slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -4px;
  border-radius: 9999px;
  border: 2px solid rgb(var(--color-btn));
  background: rgb(var(--color-surface));
  box-shadow: 0 0 0 1px rgb(var(--color-border));
  transition: background-color 150ms ease, border-color 150ms ease;
}
.q-slider-input:hover:not(:disabled)::-webkit-slider-thumb {
  background: rgb(var(--color-hover));
}
.q-slider-input:focus-visible::-webkit-slider-thumb {
  outline: 2px solid rgb(var(--color-btn) / 0.4);
  outline-offset: 2px;
}
.q-slider-input::-moz-range-track {
  height: 6px;
  background: transparent;
  border-radius: 9999px;
}
.q-slider-input::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  border: 2px solid rgb(var(--color-btn));
  background: rgb(var(--color-surface));
  box-shadow: 0 0 0 1px rgb(var(--color-border));
}
</style>
