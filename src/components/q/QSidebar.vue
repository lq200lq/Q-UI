<script setup lang="ts">
import { computed, inject } from 'vue'
import { Q_SHELL_KEY } from './shellContext'

const props = withDefaults(
  defineProps<{
    /** Override shell collapsed state when used standalone */
    collapsed?: boolean
  }>(),
  {},
)

const shell = inject(Q_SHELL_KEY, null)

const isCollapsed = computed(() => {
  if (props.collapsed !== undefined) return props.collapsed
  return shell?.collapsed.value ?? false
})
</script>

<template>
  <div
    class="q-sidebar flex h-full min-h-0 w-full flex-col"
    :data-collapsed="isCollapsed ? '' : undefined"
  >
    <div
      v-if="$slots.brand || $slots.header"
      class="flex h-topbar shrink-0 items-center gap-2 border-b border-border px-2"
      :class="isCollapsed ? 'justify-center' : 'px-3'"
    >
      <slot name="brand" :collapsed="isCollapsed" />
      <slot name="header" :collapsed="isCollapsed" />
    </div>

    <nav class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-2">
      <slot :collapsed="isCollapsed" />
    </nav>

    <div
      v-if="$slots.footer"
      class="shrink-0 border-t border-border p-2"
    >
      <slot name="footer" :collapsed="isCollapsed" />
    </div>
  </div>
</template>
