<script setup lang="ts">
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'
import QTooltip from './QTooltip.vue'
import { Q_SHELL_KEY } from './shellContext'

const props = withDefaults(
  defineProps<{
    icon?: IconName
    active?: boolean
    disabled?: boolean
    /** vue-router location */
    to?: string | Record<string, unknown>
    href?: string
    /** Required for collapsed sidebar tooltip (and a11y when icon-only) */
    label?: string
  }>(),
  {
    active: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const shell = inject(Q_SHELL_KEY, null)
const collapsed = computed(() => shell?.collapsed.value ?? false)

const tag = computed(() => {
  if (props.disabled) return 'button'
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const itemClass = computed(() => [
  'q-nav-item flex w-full items-center gap-2 rounded-md text-sm transition-colors duration-150',
  collapsed.value ? 'justify-center px-0 py-2' : 'px-2.5 py-1.5',
  props.disabled
    ? 'cursor-not-allowed text-primary/35'
    : props.active
      ? 'bg-active font-medium text-primary'
      : 'text-primary/80 hover:bg-hover hover:text-primary',
])

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <QTooltip
    v-if="collapsed"
    :content="label || '菜单'"
    placement="right"
    :disabled="disabled || !label"
  >
    <component
      :is="tag"
      :to="to && !disabled ? to : undefined"
      :href="href && !disabled ? href : undefined"
      :type="tag === 'button' ? 'button' : undefined"
      :aria-label="label"
      :aria-current="active ? 'page' : undefined"
      :aria-disabled="disabled || undefined"
      :class="itemClass"
      @click="onClick"
    >
      <QIcon v-if="icon" :name="icon" size="md" class="shrink-0" />
    </component>
  </QTooltip>

  <component
    v-else
    :is="tag"
    :to="to && !disabled ? to : undefined"
    :href="href && !disabled ? href : undefined"
    :type="tag === 'button' ? 'button' : undefined"
    :aria-current="active ? 'page' : undefined"
    :aria-disabled="disabled || undefined"
    :class="itemClass"
    @click="onClick"
  >
    <QIcon v-if="icon" :name="icon" size="md" class="shrink-0" />
    <span class="min-w-0 flex-1 truncate text-left">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>
