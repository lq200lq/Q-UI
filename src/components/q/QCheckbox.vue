<script setup lang="ts">
import { computed, useId, useTemplateRef, watch } from 'vue'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    description?: string
    disabled?: boolean
    indeterminate?: boolean
    invalid?: boolean
    id?: string
  }>(),
  {
    modelValue: false,
    disabled: false,
    indeterminate: false,
    invalid: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const autoId = useId()
const inputId = computed(() => props.id ?? autoId)
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

watch(
  () => [props.indeterminate, inputRef.value] as const,
  ([indeterminate, el]) => {
    if (el) el.indeterminate = indeterminate
  },
  { immediate: true, flush: 'post' },
)

const boxClass = computed(() => [
  'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150',
  props.modelValue || props.indeterminate
    ? 'border-btn bg-btn text-on-btn'
    : 'border-border bg-surface text-transparent',
  props.invalid && !props.modelValue && !props.indeterminate
    ? 'border-danger'
    : undefined,
  props.disabled
    ? 'opacity-50'
    : 'group-hover:border-primary/30 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-btn/40',
])

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <label
    class="q-checkbox group inline-flex max-w-full cursor-pointer items-start gap-2.5"
    :class="disabled ? 'cursor-not-allowed' : undefined"
  >
    <span class="relative mt-0.5 inline-flex">
      <input
        :id="inputId"
        ref="inputRef"
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-checked="indeterminate ? 'mixed' : modelValue"
        @change="onChange"
      />
      <span aria-hidden="true" :class="boxClass">
        <QIcon
          v-if="indeterminate"
          name="minus"
          size="sm"
          class="!h-3 !w-3"
        />
        <QIcon
          v-else-if="modelValue"
          name="check"
          size="sm"
          class="!h-3 !w-3"
        />
      </span>
    </span>

    <span v-if="label || $slots.default || description" class="min-w-0">
      <span
        v-if="label || $slots.default"
        class="block text-sm font-medium text-primary"
        :class="disabled ? 'opacity-50' : undefined"
      >
        <slot>{{ label }}</slot>
      </span>
      <span
        v-if="description"
        class="mt-0.5 block text-xs text-primary/55"
        :class="disabled ? 'opacity-50' : undefined"
      >
        {{ description }}
      </span>
    </span>
  </label>
</template>
