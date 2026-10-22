<script setup lang="ts">
/**
 * Collapsible toggle block (Notion-style), not a switch control.
 * For binary switches use QSwitch.
 */
import { computed } from 'vue'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    disabled?: boolean
  }>(),
  {
    title: '折叠块',
    disabled: false,
  },
)

const open = defineModel<boolean>('open', { default: false })

const chevron = computed(() => (open.value ? 'chevron-down' : 'chevron-right'))

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}
</script>

<template>
  <div class="q-toggle rounded-md">
    <button
      type="button"
      class="flex w-full items-center gap-1 rounded-md px-1 py-1 text-left text-sm font-medium text-primary transition-colors duration-150 hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-not-allowed disabled:opacity-50"
      :aria-expanded="open"
      :disabled="disabled"
      @click="toggle"
    >
      <QIcon :name="chevron" size="sm" class="shrink-0 text-primary/45" />
      <span class="min-w-0 flex-1 truncate">
        <slot name="title">{{ title }}</slot>
      </span>
    </button>
    <div v-if="open" class="px-1 pb-2 pl-6 text-sm leading-relaxed text-primary/80">
      <slot />
    </div>
  </div>
</template>
