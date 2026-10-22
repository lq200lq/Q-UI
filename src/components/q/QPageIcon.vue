<script setup lang="ts">
import { computed } from 'vue'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    /** Emoji or short text glyph */
    emoji?: string
    /** Fallback icon when no emoji */
    icon?: IconName
    size?: 'sm' | 'md' | 'lg'
    editable?: boolean
  }>(),
  {
    size: 'lg',
    editable: true,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const sizeClass = computed(() => {
  const map = {
    sm: 'h-8 w-8 text-lg',
    md: 'h-12 w-12 text-2xl',
    lg: 'h-16 w-16 text-4xl',
  } as const
  return map[props.size]
})

const iconSize = computed(() =>
  props.size === 'lg' ? 'xl' : props.size === 'md' ? 'lg' : 'md',
)
</script>

<template>
  <button
    type="button"
    class="q-page-icon inline-flex items-center justify-center rounded-md transition-colors duration-150"
    :class="[
      sizeClass,
      editable
        ? 'hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40'
        : 'cursor-default',
    ]"
    :aria-label="emoji ? `页面图标 ${emoji}` : '页面图标'"
    :disabled="!editable"
    @click="emit('click', $event)"
  >
    <span v-if="emoji" class="leading-none" aria-hidden="true">{{ emoji }}</span>
    <QIcon
      v-else-if="icon"
      :name="icon"
      :size="iconSize"
      class="text-primary/55"
    />
    <QIcon
      v-else
      name="smile"
      :size="iconSize"
      class="text-primary/35"
    />
  </button>
</template>
