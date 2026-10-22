<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    variant?: 'bordered' | 'underline'
    size?: 'sm' | 'md'
    type?: string
    disabled?: boolean
    placeholder?: string
    id?: string
    invalid?: boolean
  }>(),
  {
    modelValue: '',
    variant: 'bordered',
    size: 'md',
    type: 'text',
    disabled: false,
    invalid: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const rootClass = computed(() => {
  const size =
    props.size === 'sm'
      ? 'h-control-sm px-control-x-sm text-control-sm'
      : 'h-control-md px-control-x-md text-control-md'

  const base =
    'w-full text-primary placeholder:text-primary/40 transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'

  if (props.variant === 'underline') {
    return [
      base,
      'bg-transparent border-0 border-b rounded-none px-0',
      props.invalid
        ? 'border-danger focus:border-danger'
        : 'border-border focus:border-primary/40',
      props.size === 'sm' ? 'h-control-sm text-control-sm' : 'h-control-md text-control-md',
    ]
  }

  return [
    base,
    size,
    'rounded-md border bg-surface',
    props.invalid
      ? 'border-danger focus:border-danger'
      : 'border-border focus:border-primary/30',
  ]
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :aria-invalid="invalid || undefined"
    class="q-input"
    :class="rootClass"
    v-bind="attrs"
    @input="onInput"
  />
</template>
