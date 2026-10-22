<script setup lang="ts">
import { computed, provide, useId } from 'vue'
import { QRadioGroupKey } from './radioContext'
import QRadio from './QRadio.vue'

export type QRadioOption = {
  value: string | number | boolean
  label: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    options?: QRadioOption[]
    name?: string
    label?: string
    description?: string
    disabled?: boolean
    invalid?: boolean
    /** vertical (default) or horizontal */
    orientation?: 'vertical' | 'horizontal'
  }>(),
  {
    options: () => [],
    disabled: false,
    invalid: false,
    orientation: 'vertical',
  },
)

const modelValue = defineModel<string | number | boolean>('modelValue')

const autoName = useId()
const groupName = computed(() => props.name ?? autoName)

provide(QRadioGroupKey, {
  name: groupName,
  modelValue,
  disabled: computed(() => props.disabled),
  invalid: computed(() => props.invalid),
  setValue(value) {
    if (props.disabled) return
    modelValue.value = value
  },
})
</script>

<template>
  <fieldset
    class="q-radio-group min-w-0 border-0 p-0"
    :disabled="disabled || undefined"
    :aria-invalid="invalid || undefined"
  >
    <legend
      v-if="label"
      class="mb-2 px-0 text-sm font-medium text-primary"
    >
      {{ label }}
    </legend>
    <p v-if="description" class="mb-2.5 text-xs text-primary/55">
      {{ description }}
    </p>

    <div
      class="flex"
      :class="
        orientation === 'horizontal'
          ? 'flex-row flex-wrap gap-x-5 gap-y-2'
          : 'flex-col gap-2.5'
      "
      role="radiogroup"
      :aria-label="label || undefined"
    >
      <slot>
        <QRadio
          v-for="opt in options"
          :key="String(opt.value)"
          :value="opt.value"
          :label="opt.label"
          :description="opt.description"
          :disabled="opt.disabled"
        />
      </slot>
    </div>
  </fieldset>
</template>
