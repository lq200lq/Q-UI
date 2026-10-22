<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    description?: string
    disabled?: boolean
    id?: string
    /** Place label on the left (settings rows) */
    labelPosition?: 'right' | 'left'
  }>(),
  {
    modelValue: false,
    disabled: false,
    labelPosition: 'right',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const autoId = useId()
const switchId = computed(() => props.id ?? autoId)

const trackClass = computed(() => [
  'relative inline-flex h-5 w-9 shrink-0 items-center rounded-md border transition-colors duration-150',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40',
  props.modelValue
    ? 'border-btn bg-btn'
    : 'border-border bg-active',
  props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
])

const thumbClass = computed(() => [
  'pointer-events-none absolute top-0.5 h-3.5 w-3.5 rounded-sm bg-surface shadow-sm transition-transform duration-150',
  props.modelValue ? 'translate-x-[1.125rem]' : 'translate-x-0.5',
])

function toggle() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <div
    class="q-switch inline-flex max-w-full items-start gap-2.5"
    :class="labelPosition === 'left' ? 'w-full justify-between' : undefined"
  >
    <label
      v-if="(label || $slots.default || description) && labelPosition === 'left'"
      :for="switchId"
      class="min-w-0 cursor-pointer pr-3"
      :class="disabled ? 'cursor-not-allowed opacity-50' : undefined"
    >
      <span
        v-if="label || $slots.default"
        class="block text-sm font-medium text-primary"
      >
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description" class="mt-0.5 block text-xs text-primary/55">
        {{ description }}
      </span>
    </label>

    <button
      :id="switchId"
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="!(label || $slots.default) ? label : undefined"
      :disabled="disabled"
      :class="trackClass"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span :class="thumbClass" aria-hidden="true" />
    </button>

    <label
      v-if="(label || $slots.default || description) && labelPosition === 'right'"
      :for="switchId"
      class="min-w-0 cursor-pointer"
      :class="disabled ? 'cursor-not-allowed opacity-50' : undefined"
    >
      <span
        v-if="label || $slots.default"
        class="block text-sm font-medium text-primary"
      >
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description" class="mt-0.5 block text-xs text-primary/55">
        {{ description }}
      </span>
    </label>
  </div>
</template>
