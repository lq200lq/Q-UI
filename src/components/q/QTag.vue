<script setup lang="ts">
import { computed } from 'vue'
import QIcon from './QIcon.vue'
import type { QBadgeVariant } from './QBadge.vue'

const props = withDefaults(
  defineProps<{
    variant?: QBadgeVariant
    size?: 'sm' | 'md'
    /** Soft fill (default) or border-only */
    appearance?: 'soft' | 'outline'
    /** Show dismiss control */
    dismissible?: boolean
  }>(),
  {
    variant: 'neutral',
    size: 'sm',
    appearance: 'soft',
    dismissible: false,
  },
)

const emit = defineEmits<{
  dismiss: [event: MouseEvent]
}>()

const rootClass = computed(() => {
  const sizes = {
    sm: 'gap-1 px-1.5 py-0.5 text-[11px] leading-4',
    md: 'gap-1.5 px-2 py-0.5 text-xs leading-5',
  } as const

  const soft: Record<QBadgeVariant, string> = {
    neutral: 'bg-active text-primary/70',
    info: 'bg-accent-1/15 text-accent-1',
    success: 'bg-accent-3/15 text-accent-3',
    warning: 'bg-accent-2/15 text-accent-2',
    danger: 'bg-danger/15 text-danger',
    purple: 'bg-accent-4/15 text-accent-4',
  }

  const outline: Record<QBadgeVariant, string> = {
    neutral: 'border border-border bg-transparent text-primary/70',
    info: 'border border-accent-1/35 bg-transparent text-accent-1',
    success: 'border border-accent-3/35 bg-transparent text-accent-3',
    warning: 'border border-accent-2/35 bg-transparent text-accent-2',
    danger: 'border border-danger/35 bg-transparent text-danger',
    purple: 'border border-accent-4/35 bg-transparent text-accent-4',
  }

  return [
    'q-tag inline-flex max-w-full items-center rounded-md font-medium',
    sizes[props.size],
    props.appearance === 'outline' ? outline[props.variant] : soft[props.variant],
  ]
})

function onDismiss(event: MouseEvent) {
  event.stopPropagation()
  emit('dismiss', event)
}
</script>

<template>
  <span :class="rootClass">
    <span class="truncate"><slot /></span>
    <button
      v-if="dismissible"
      type="button"
      class="-mr-0.5 inline-flex shrink-0 items-center justify-center rounded-sm p-0.5 opacity-60 transition-colors duration-150 hover:bg-primary/10 hover:opacity-100"
      aria-label="移除"
      @click="onDismiss"
    >
      <QIcon name="x" size="sm" class="!h-3 !w-3" />
    </button>
  </span>
</template>
