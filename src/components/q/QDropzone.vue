<script setup lang="ts">
/**
 * Drop-first alias of QFileUpload — same API, dropzone-oriented defaults.
 */
import QFileUpload from './QFileUpload.vue'
import type { QUploadFile } from './QFileUpload.vue'

export type { QUploadFile }

withDefaults(
  defineProps<{
    accept?: string
    multiple?: boolean
    disabled?: boolean
    invalid?: boolean
    maxFiles?: number
    maxSize?: number
    label?: string
    hint?: string
  }>(),
  {
    multiple: true,
    disabled: false,
    invalid: false,
    maxFiles: 10,
    label: '拖拽文件到此处上传',
    hint: '也可点击选择文件',
  },
)

const modelValue = defineModel<QUploadFile[]>('modelValue', {
  default: () => [],
})

defineEmits<{
  reject: [reason: string]
}>()
</script>

<template>
  <QFileUpload
    v-model="modelValue"
    :accept="accept"
    :multiple="multiple"
    :disabled="disabled"
    :invalid="invalid"
    :max-files="maxFiles"
    :max-size="maxSize"
    :label="label"
    :hint="hint"
    @reject="$emit('reject', $event)"
  />
</template>
