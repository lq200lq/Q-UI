<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
    level?: 1 | 2 | 3
  }>(),
  {
    placeholder: '无标题',
    disabled: false,
    level: 1,
  },
)

const modelValue = defineModel<string>('modelValue', { default: '' })

const emit = defineEmits<{
  commit: [value: string]
  cancel: []
}>()

const editing = ref(false)
const draft = ref(modelValue.value)
const inputRef = useTemplateRef<HTMLInputElement | HTMLTextAreaElement>('inputRef')

watch(modelValue, (v) => {
  if (!editing.value) draft.value = v
})

const sizeClass = computed(() =>
  props.level === 1
    ? 'text-3xl font-semibold tracking-tight'
    : props.level === 2
      ? 'text-2xl font-semibold'
      : 'text-xl font-semibold',
)

async function startEdit() {
  if (props.disabled) return
  draft.value = modelValue.value
  editing.value = true
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function commit() {
  const next = draft.value.trim()
  modelValue.value = next
  editing.value = false
  emit('commit', next)
}

function cancel() {
  draft.value = modelValue.value
  editing.value = false
  emit('cancel')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    commit()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    cancel()
  }
}
</script>

<template>
  <div class="q-editable-title w-full">
    <input
      v-if="editing"
      ref="inputRef"
      v-model="draft"
      type="text"
      class="w-full border-0 bg-transparent font-heading text-primary outline-none placeholder:text-primary/30"
      :class="sizeClass"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown="onKeydown"
      @blur="commit"
    />
    <button
      v-else
      type="button"
      class="w-full rounded-md px-1 -mx-1 py-0.5 text-left font-heading transition-colors duration-150 hover:bg-hover/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-default"
      :class="[
        sizeClass,
        modelValue ? 'text-primary' : 'text-primary/30',
      ]"
      :disabled="disabled"
      @click="startEdit"
    >
      {{ modelValue || placeholder }}
    </button>
  </div>
</template>
