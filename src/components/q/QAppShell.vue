<script setup lang="ts">
import { computed, provide } from 'vue'
import { Q_SHELL_KEY } from './shellContext'

const props = withDefaults(
  defineProps<{
    /** Allow collapsing the sidebar */
    collapsible?: boolean
  }>(),
  {
    collapsible: true,
  },
)

const collapsed = defineModel<boolean>('collapsed', { default: false })

function toggleCollapsed() {
  if (!props.collapsible) return
  collapsed.value = !collapsed.value
}

provide(Q_SHELL_KEY, {
  collapsed,
  collapsible: computed(() => props.collapsible),
  toggleCollapsed,
})
</script>

<template>
  <div class="q-app-shell flex h-dvh min-h-0 w-full overflow-hidden bg-page text-primary">
    <aside
      v-if="$slots.sidebar"
      class="q-app-shell__sidebar flex h-full shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-150"
      :style="{
        width: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
      }"
    >
      <slot name="sidebar" :collapsed="collapsed" :toggle-collapsed="toggleCollapsed" />
    </aside>

    <div class="flex min-h-0 min-w-0 flex-1 flex-col">
      <header
        v-if="$slots.topbar"
        class="q-app-shell__topbar flex h-topbar shrink-0 items-stretch border-b border-border bg-surface"
      >
        <slot
          name="topbar"
          :collapsed="collapsed"
          :toggle-collapsed="toggleCollapsed"
        />
      </header>

      <main class="q-app-shell__main min-h-0 flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
