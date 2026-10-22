<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
    emptyLabel?: string
  }>(),
  {
    placeholder: '输入…',
    disabled: false,
    emptyLabel: '空',
  },
)

const modelValue = defineModel<string>('modelValue', { default: '' })

const emit = defineEmits<{
  commit: [value: string]
  cancel: []
}>()

const editing = ref(false)
const draft = ref(modelValue.value)
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

watch(modelValue, (v) => {
  if (!editing.value) draft.value = v
})

async function startEdit() {
  if (props.disabled) return
  draft.value = modelValue.value
  editing.value = true
  await nextTick()
  inputRef.value?.focus()
  inputRef.value?.select()
}

function commit() {
  modelValue.value = draft.value
  editing.value = false
  emit('commit', draft.value)
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
  <div class="q-inline-editable inline-flex min-w-0 max-w-full">
    <input
      v-if="editing"
      ref="inputRef"
      v-model="draft"
      type="text"
      class="h-control-sm min-w-[6rem] max-w-full rounded-md border border-border bg-surface px-2 text-sm text-primary outline-none focus:border-primary/30"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown="onKeydown"
      @blur="commit"
    />
    <button
      v-else
      type="button"
      class="max-w-full truncate rounded-sm px-1 -mx-1 py-0.5 text-left text-sm transition-colors duration-150 hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-default"
      :class="modelValue ? 'text-primary' : 'text-primary/40'"
      :disabled="disabled"
      @click="startEdit"
    >
      {{ modelValue || emptyLabel }}
    </button>
  </div>
</template>
