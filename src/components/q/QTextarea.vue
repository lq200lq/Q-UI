<script setup lang="ts">
import { computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    variant?: 'bordered' | 'underline'
    size?: 'sm' | 'md'
    rows?: number
    disabled?: boolean
    placeholder?: string
    id?: string
    invalid?: boolean
    /** CSS resize; default vertical */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
    maxlength?: number
    /** Show character count when maxlength is set */
    showCount?: boolean
  }>(),
  {
    modelValue: '',
    variant: 'bordered',
    size: 'md',
    rows: 3,
    disabled: false,
    invalid: false,
    resize: 'vertical',
    showCount: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const count = computed(() => String(props.modelValue ?? '').length)

const resizeClass = computed(() => {
  const map = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  } as const
  return map[props.resize]
})

const rootClass = computed(() => {
  const pad =
    props.size === 'sm'
      ? 'px-control-x-sm py-1.5 text-control-sm'
      : 'px-control-x-md py-2 text-control-md'

  const base = [
    'w-full text-primary placeholder:text-primary/40 transition-colors duration-150',
    'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    resizeClass.value,
  ]

  if (props.variant === 'underline') {
    return [
      ...base,
      'bg-transparent border-0 border-b rounded-none px-0',
      props.invalid
        ? 'border-danger focus:border-danger'
        : 'border-border focus:border-primary/40',
      props.size === 'sm' ? 'py-1.5 text-control-sm' : 'py-2 text-control-md',
    ]
  }

  return [
    ...base,
    pad,
    'rounded-md border bg-surface',
    props.invalid
      ? 'border-danger focus:border-danger'
      : 'border-border focus:border-primary/30',
  ]
})

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="q-textarea-wrap w-full">
    <textarea
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :rows="rows"
      :maxlength="maxlength"
      :aria-invalid="invalid || undefined"
      class="q-textarea"
      :class="rootClass"
      v-bind="attrs"
      @input="onInput"
    />
    <div
      v-if="showCount && maxlength != null"
      class="mt-1 text-right text-[11px] tabular-nums text-primary/45"
      :class="count >= maxlength ? 'text-danger' : undefined"
    >
      {{ count }} / {{ maxlength }}
    </div>
  </div>
</template>
