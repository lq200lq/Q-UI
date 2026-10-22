<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import QIcon from './QIcon.vue'
import type { IconName } from './icons'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Required for accessibility */
    label: string
    name: IconName
    variant?: 'ghost' | 'outline' | 'secondary' | 'danger'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'ghost',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const attrs = useAttrs()

const isDisabled = computed(() => props.disabled || props.loading)

const iconSize = computed(() => (props.size === 'sm' ? 'sm' : 'md'))

const rootClass = computed(() => {
  const size =
    props.size === 'sm' ? 'h-control-sm w-control-sm' : 'h-control-md w-control-md'

  const variants: Record<NonNullable<typeof props.variant>, string> = {
    ghost: 'bg-transparent text-primary hover:bg-hover active:bg-active',
    secondary: 'bg-transparent text-primary hover:bg-hover active:bg-active',
    outline:
      'bg-transparent text-primary border border-border hover:bg-hover active:bg-active',
    danger: 'bg-transparent text-danger hover:bg-hover active:bg-active',
  }

  return [
    'inline-flex items-center justify-center rounded-md',
    'transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40',
    'disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-40',
    size,
    variants[props.variant],
  ]
})

function onClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-label="label"
    :aria-busy="loading || undefined"
    class="q-icon-button"
    :class="rootClass"
    v-bind="attrs"
    @click="onClick"
  >
    <QIcon
      :name="loading ? 'loader' : name"
      :size="iconSize"
      :class="loading ? 'animate-spin' : undefined"
    />
  </button>
</template>
