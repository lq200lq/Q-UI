<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import QIcon from './QIcon.vue'
import type { IconName } from './icons'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    icon?: IconName
    iconRight?: IconName
    block?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    block: false,
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
    props.size === 'sm'
      ? 'h-control-sm px-control-x-sm text-control-sm gap-1'
      : 'h-control-md px-control-x-md text-control-md gap-1.5'

  const variants: Record<NonNullable<typeof props.variant>, string> = {
    primary:
      'bg-btn text-on-btn hover:bg-btn-hover active:bg-btn-active disabled:bg-btn/50',
    secondary:
      'bg-hover text-primary hover:bg-active active:bg-active disabled:bg-hover/50 disabled:text-primary/40',
    outline:
      'bg-transparent text-primary border border-border hover:bg-hover active:bg-active disabled:text-primary/40 disabled:border-border/60',
    ghost:
      'bg-transparent text-primary hover:bg-hover active:bg-active disabled:text-primary/40',
    danger:
      'bg-danger text-on-danger hover:bg-danger-hover active:bg-danger-active disabled:bg-danger/50',
  }

  return [
    'inline-flex items-center justify-center font-medium rounded-md',
    'transition-colors duration-150',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40',
    'disabled:cursor-not-allowed disabled:pointer-events-none',
    size,
    variants[props.variant],
    props.block ? 'w-full' : '',
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
    :aria-busy="loading || undefined"
    class="q-button"
    :class="rootClass"
    v-bind="attrs"
    @click="onClick"
  >
    <QIcon
      v-if="loading"
      name="loader"
      :size="iconSize"
      class="animate-spin"
    />
    <QIcon v-else-if="icon" :name="icon" :size="iconSize" />
    <span v-if="$slots.default" class="truncate">
      <slot />
    </span>
    <QIcon v-if="iconRight && !loading" :name="iconRight" :size="iconSize" />
  </button>
</template>
