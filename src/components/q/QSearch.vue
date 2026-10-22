<script setup lang="ts">
import { computed, useAttrs, useId, useTemplateRef } from 'vue'
import QIcon from './QIcon.vue'
import QIconButton from './QIconButton.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    size?: 'sm' | 'md'
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    id?: string
  }>(),
  {
    modelValue: '',
    size: 'md',
    placeholder: '搜索…',
    disabled: false,
    clearable: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
  submit: [value: string]
}>()

const attrs = useAttrs()
const autoId = useId()
const inputId = computed(() => props.id ?? autoId)
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

const hasValue = computed(() => String(props.modelValue ?? '').length > 0)

const wrapClass = computed(() => {
  const h = props.size === 'sm' ? 'h-control-sm' : 'h-control-md'
  return [
    'q-search group relative flex w-full items-center rounded-md border border-border bg-surface text-primary',
    'transition-colors duration-150',
    'focus-within:border-primary/30',
    props.disabled ? 'cursor-not-allowed opacity-50' : undefined,
    h,
  ]
})

const inputClass = computed(() => {
  const text =
    props.size === 'sm' ? 'text-control-sm' : 'text-control-md'
  const pl = props.size === 'sm' ? 'pl-8' : 'pl-9'
  const pr = props.clearable ? (props.size === 'sm' ? 'pr-8' : 'pr-9') : 'pr-3'
  return [
    'h-full w-full min-w-0 bg-transparent text-primary placeholder:text-primary/40',
    'outline-none disabled:cursor-not-allowed',
    text,
    pl,
    pr,
  ]
})

const iconLeftClass = computed(() =>
  props.size === 'sm' ? 'left-2' : 'left-2.5',
)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && hasValue.value) {
    event.preventDefault()
    clear()
    return
  }
  if (event.key === 'Enter') {
    emit('submit', String(props.modelValue ?? ''))
  }
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div :class="wrapClass">
    <span
      class="pointer-events-none absolute top-1/2 -translate-y-1/2 text-primary/40"
      :class="iconLeftClass"
      aria-hidden="true"
    >
      <QIcon name="search" :size="size === 'sm' ? 'sm' : 'md'" />
    </span>

    <input
      :id="inputId"
      ref="inputRef"
      type="search"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      class="q-search-input appearance-none [&::-webkit-search-cancel-button]:hidden"
      :class="inputClass"
      autocomplete="off"
      v-bind="attrs"
      @input="onInput"
      @keydown="onKeydown"
    />

    <QIconButton
      v-if="clearable && hasValue && !disabled"
      label="清除搜索"
      name="x"
      size="sm"
      class="absolute right-0.5 top-1/2 -translate-y-1/2"
      @click="clear"
    />
  </div>
</template>
