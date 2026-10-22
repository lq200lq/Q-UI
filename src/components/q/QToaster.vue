<script setup lang="ts">
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useToastState, type ToastVariant } from '../../composables/useToast'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'
import QIconButton from './QIconButton.vue'

const { toasts, dismiss } = useToastState()

const variantIcon: Record<ToastVariant, IconName> = {
  default: 'info',
  success: 'check-circle',
  error: 'alert-circle',
  warning: 'alert-triangle',
  info: 'info',
}

const variantClass: Record<ToastVariant, string> = {
  default: 'border-border',
  success: 'border-accent-3/40',
  error: 'border-danger/40',
  warning: 'border-accent-2/40',
  info: 'border-accent-1/40',
}

const variantIconClass: Record<ToastVariant, string> = {
  default: 'text-primary/60',
  success: 'text-accent-3',
  error: 'text-danger',
  warning: 'text-accent-2',
  info: 'text-accent-1',
}

function iconFor(variant: ToastVariant, icon?: IconName) {
  return icon ?? variantIcon[variant]
}
</script>

<template>
  <Teleport :to="OVERLAY_ROOT">
    <div
      class="q-toaster pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      <div
        v-for="item in toasts"
        :key="item.id"
        role="status"
        class="pointer-events-auto flex items-start gap-2 rounded-md border bg-surface p-3 shadow-md"
        :class="variantClass[item.variant]"
      >
        <QIcon
          :name="iconFor(item.variant, item.icon)"
          size="md"
          class="mt-0.5 shrink-0"
          :class="variantIconClass[item.variant]"
        />
        <div class="min-w-0 flex-1">
          <p v-if="item.title" class="text-sm font-medium text-primary">
            {{ item.title }}
          </p>
          <p
            v-if="item.description"
            class="text-sm text-primary/75"
            :class="item.title ? 'mt-0.5' : undefined"
          >
            {{ item.description }}
          </p>
        </div>
        <QIconButton
          label="关闭通知"
          name="x"
          size="sm"
          class="-mr-1 -mt-1"
          @click="dismiss(item.id)"
        />
      </div>
    </div>
  </Teleport>
</template>
