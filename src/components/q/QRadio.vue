<script setup lang="ts">
import { computed, inject, useId } from 'vue'
import { QRadioGroupKey } from './radioContext'

const props = withDefaults(
  defineProps<{
    value: string | number | boolean
    label?: string
    description?: string
    disabled?: boolean
    id?: string
  }>(),
  {
    disabled: false,
  },
)

const group = inject(QRadioGroupKey, null)

if (!group) {
  console.warn('[QRadio] must be used inside QRadioGroup')
}

const autoId = useId()
const inputId = computed(() => props.id ?? autoId)

const checked = computed(() => group?.modelValue.value === props.value)

const isDisabled = computed(
  () => props.disabled || Boolean(group?.disabled.value),
)

const invalid = computed(() => Boolean(group?.invalid.value))

const dotClass = computed(() => [
  'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-150',
  checked.value ? 'border-btn bg-btn' : 'border-border bg-surface',
  invalid.value && !checked.value ? 'border-danger' : undefined,
  isDisabled.value
    ? 'opacity-50'
    : 'group-hover:border-primary/30 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-btn/40',
])

function onChange() {
  if (isDisabled.value || !group) return
  group.setValue(props.value)
}
</script>

<template>
  <label
    class="q-radio group inline-flex max-w-full cursor-pointer items-start gap-2.5"
    :class="isDisabled ? 'cursor-not-allowed' : undefined"
  >
    <span class="relative mt-0.5 inline-flex">
      <input
        :id="inputId"
        type="radio"
        class="peer sr-only"
        :name="group?.name.value"
        :value="String(value)"
        :checked="checked"
        :disabled="isDisabled"
        :aria-invalid="invalid || undefined"
        @change="onChange"
      />
      <span aria-hidden="true" :class="dotClass">
        <span
          v-if="checked"
          class="h-1.5 w-1.5 rounded-full bg-on-btn"
        />
      </span>
    </span>

    <span v-if="label || $slots.default || description" class="min-w-0">
      <span
        v-if="label || $slots.default"
        class="block text-sm font-medium text-primary"
        :class="isDisabled ? 'opacity-50' : undefined"
      >
        <slot>{{ label }}</slot>
      </span>
      <span
        v-if="description"
        class="mt-0.5 block text-xs text-primary/55"
        :class="isDisabled ? 'opacity-50' : undefined"
      >
        {{ description }}
      </span>
    </span>
  </label>
</template>
