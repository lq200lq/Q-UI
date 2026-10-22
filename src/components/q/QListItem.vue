<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: IconName
    active?: boolean
    disabled?: boolean
    to?: string | Record<string, unknown>
    href?: string
  }>(),
  {
    active: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => {
  if (props.disabled) return 'div'
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const rootClass = computed(() => [
  'q-list-item flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors duration-150',
  props.disabled
    ? 'cursor-not-allowed opacity-40'
    : props.active
      ? 'bg-active'
      : 'hover:bg-hover active:bg-active',
  tag.value === 'button' ? 'cursor-pointer' : '',
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
  <li class="list-none">
    <component
      :is="tag"
      :to="to && !disabled ? to : undefined"
      :href="href && !disabled ? href : undefined"
      :type="tag === 'button' ? 'button' : undefined"
      :aria-disabled="disabled || undefined"
      :aria-current="active ? 'page' : undefined"
      :class="rootClass"
      @click="onClick"
    >
      <div
        v-if="icon || $slots.leading"
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-hover text-primary/70"
      >
        <slot name="leading">
          <QIcon v-if="icon" :name="icon" size="md" />
        </slot>
      </div>

      <div class="min-w-0 flex-1">
        <div class="truncate text-sm font-medium text-primary">
          {{ title }}
        </div>
        <div
          v-if="description"
          class="mt-0.5 truncate text-xs text-primary/55"
        >
          {{ description }}
        </div>
      </div>

      <div v-if="$slots.trailing" class="ml-2 flex shrink-0 items-center gap-1">
        <slot name="trailing" />
      </div>
    </component>
  </li>
</template>
