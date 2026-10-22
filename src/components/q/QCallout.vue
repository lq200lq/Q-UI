<script setup lang="ts">
import { computed } from 'vue'
import QIcon from './QIcon.vue'
import QIconButton from './QIconButton.vue'
import type { IconName } from './icons'

export type QCalloutVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

const props = withDefaults(
  defineProps<{
    variant?: QCalloutVariant
    title?: string
    /** Override default icon; `false` hides icon */
    icon?: IconName | false
    dismissible?: boolean
    /** a11y role — use `alert` for urgent live messages */
    role?: 'note' | 'status' | 'alert'
  }>(),
  {
    variant: 'info',
    dismissible: false,
    role: 'note',
  },
)

const emit = defineEmits<{
  dismiss: [event: MouseEvent]
}>()

const defaultIcons: Record<QCalloutVariant, IconName> = {
  neutral: 'info',
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'alert-circle',
}

const resolvedIcon = computed(() => {
  if (props.icon === false) return null
  if (props.icon) return props.icon
  return defaultIcons[props.variant]
})

const rootClass = computed(() => {
  const map: Record<QCalloutVariant, string> = {
    neutral: 'bg-active/80 text-primary',
    info: 'bg-accent-1/10 text-primary',
    success: 'bg-accent-3/10 text-primary',
    warning: 'bg-accent-2/10 text-primary',
    danger: 'bg-danger/10 text-primary',
  }
  return [
    'q-callout flex gap-3 rounded-md px-3.5 py-3 text-sm',
    map[props.variant],
  ]
})

const iconClass = computed(() => {
  const map: Record<QCalloutVariant, string> = {
    neutral: 'text-primary/50',
    info: 'text-accent-1',
    success: 'text-accent-3',
    warning: 'text-accent-2',
    danger: 'text-danger',
  }
  return map[props.variant]
})

function onDismiss(event: MouseEvent) {
  emit('dismiss', event)
}
</script>

<template>
  <div :class="rootClass" :role="role">
    <div
      v-if="resolvedIcon || $slots.icon"
      class="mt-0.5 shrink-0"
      :class="iconClass"
      aria-hidden="true"
    >
      <slot name="icon">
        <QIcon v-if="resolvedIcon" :name="resolvedIcon" size="md" />
      </slot>
    </div>

    <div class="min-w-0 flex-1">
      <div
        v-if="title || $slots.title"
        class="mb-0.5 font-heading text-sm font-semibold text-primary"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="leading-relaxed text-primary/80">
        <slot />
      </div>
    </div>

    <QIconButton
      v-if="dismissible"
      label="关闭"
      name="x"
      size="sm"
      class="-mr-1 -mt-0.5 shrink-0 self-start"
      @click="onDismiss"
    />
  </div>
</template>
