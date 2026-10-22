<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from 'vue'
import QButton from './QButton.vue'
import QIcon from './QIcon.vue'
import QIconButton from './QIconButton.vue'

export type QUploadFile = {
  id: string
  name: string
  size: number
  type: string
  file: File
}

const props = withDefaults(
  defineProps<{
    /** Accept attribute, e.g. "image/*,.pdf" */
    accept?: string
    multiple?: boolean
    disabled?: boolean
    invalid?: boolean
    /** Max files when multiple */
    maxFiles?: number
    /** Max bytes per file */
    maxSize?: number
    label?: string
    hint?: string
  }>(),
  {
    multiple: false,
    disabled: false,
    invalid: false,
    maxFiles: 10,
    label: '点击上传或拖拽文件到此处',
    hint: '支持常见文档与图片',
  },
)

const modelValue = defineModel<QUploadFile[]>('modelValue', {
  default: () => [],
})

const emit = defineEmits<{
  reject: [reason: string]
}>()

const autoId = useId()
const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const dragging = ref(false)

const rootClass = computed(() => [
  'q-file-upload relative flex w-full flex-col items-center justify-center rounded-md border border-dashed px-4 py-8 text-center transition-colors duration-150',
  props.invalid
    ? 'border-danger bg-danger/5'
    : dragging.value
      ? 'border-btn bg-btn/5'
      : 'border-border bg-surface hover:border-primary/25 hover:bg-hover/40',
  props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
])

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function toUploadFile(file: File): QUploadFile {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    size: file.size,
    type: file.type,
    file,
  }
}

function mergeFiles(incoming: FileList | File[]) {
  if (props.disabled) return
  const list = Array.from(incoming)
  if (list.length === 0) return

  const next = props.multiple ? [...modelValue.value] : []
  for (const file of list) {
    if (props.maxSize && file.size > props.maxSize) {
      emit('reject', `「${file.name}」超过大小限制`)
      continue
    }
    if (props.multiple && next.length >= props.maxFiles) {
      emit('reject', `最多上传 ${props.maxFiles} 个文件`)
      break
    }
    next.push(toUploadFile(file))
    if (!props.multiple) break
  }
  modelValue.value = next
}

function openPicker() {
  if (props.disabled) return
  inputRef.value?.click()
}

function onInputChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) mergeFiles(input.files)
  input.value = ''
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  dragging.value = false
  if (props.disabled) return
  if (event.dataTransfer?.files) mergeFiles(event.dataTransfer.files)
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (!props.disabled) dragging.value = true
}

function onDragLeave() {
  dragging.value = false
}

function removeAt(id: string) {
  modelValue.value = modelValue.value.filter((f) => f.id !== id)
}

function clear() {
  modelValue.value = []
}

defineExpose({ openPicker, clear })
</script>

<template>
  <div class="q-file-upload-root w-full space-y-2">
    <div
      :class="rootClass"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-disabled="disabled || undefined"
      :aria-invalid="invalid || undefined"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <input
        :id="autoId"
        ref="inputRef"
        type="file"
        class="sr-only"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="onInputChange"
        @click.stop
      />
      <QIcon name="upload" size="lg" class="mb-2 text-primary/40" />
      <p class="text-sm font-medium text-primary">{{ label }}</p>
      <p v-if="hint" class="mt-1 text-xs text-primary/50">{{ hint }}</p>
      <QButton
        class="pointer-events-none mt-3"
        size="sm"
        variant="outline"
        tabindex="-1"
      >
        选择文件
      </QButton>
    </div>

    <ul v-if="modelValue.length" class="space-y-1.5" aria-label="已选文件">
      <li
        v-for="item in modelValue"
        :key="item.id"
        class="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5"
      >
        <QIcon name="file" size="sm" class="shrink-0 text-primary/45" />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-primary">{{ item.name }}</p>
          <p class="text-[11px] text-primary/45">{{ formatSize(item.size) }}</p>
        </div>
        <QIconButton
          label="移除文件"
          name="x"
          size="sm"
          :disabled="disabled"
          @click="removeAt(item.id)"
        />
      </li>
    </ul>
  </div>
</template>
