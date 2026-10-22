<script setup lang="ts">
import { computed } from 'vue'
import QButton from './QButton.vue'
import QModal from './QModal.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    /** destructive → danger confirm button */
    variant?: 'default' | 'danger'
    confirmLoading?: boolean
  }>(),
  {
    title: '确认',
    confirmText: '确认',
    cancelText: '取消',
    variant: 'default',
    confirmLoading: false,
  },
)

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const confirmVariant = computed(() =>
  props.variant === 'danger' ? 'danger' : 'primary',
)

function onCancel(close: () => void) {
  emit('cancel')
  close()
}

function onConfirm(close: () => void) {
  emit('confirm')
  // Caller may keep open while async; only auto-close when not loading
  if (!props.confirmLoading) close()
}
</script>

<template>
  <QModal
    v-model:open="open"
    :title="title"
    :description="description"
    size="sm"
  >
    <slot />
    <template #footer="{ close }">
      <div class="ml-auto flex items-center gap-2">
        <QButton
          variant="secondary"
          size="sm"
          :disabled="confirmLoading"
          @click="onCancel(close)"
        >
          {{ cancelText }}
        </QButton>
        <QButton
          :variant="confirmVariant"
          size="sm"
          :loading="confirmLoading"
          @click="onConfirm(close)"
        >
          {{ confirmText }}
        </QButton>
      </div>
    </template>
  </QModal>
</template>
