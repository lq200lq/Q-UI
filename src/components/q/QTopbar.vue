<script setup lang="ts">
import { inject } from 'vue'
import QIconButton from './QIconButton.vue'
import { Q_SHELL_KEY } from './shellContext'

withDefaults(
  defineProps<{
    title?: string
    /** Show sidebar collapse control (needs QAppShell) */
    showCollapse?: boolean
  }>(),
  {
    showCollapse: true,
  },
)

const shell = inject(Q_SHELL_KEY, null)
</script>

<template>
  <div class="q-topbar flex h-full w-full min-w-0 items-center gap-2 px-3 md:px-4">
    <div class="flex min-w-0 flex-1 items-center gap-2">
      <QIconButton
        v-if="showCollapse && shell?.collapsible.value"
        :label="shell.collapsed.value ? '展开侧栏' : '收起侧栏'"
        :name="shell.collapsed.value ? 'panel-left' : 'panel-right'"
        size="sm"
        @click="shell.toggleCollapsed()"
      />
      <slot name="left" />
      <h1
        v-if="title || $slots.title"
        class="min-w-0 truncate font-heading text-sm font-semibold text-primary md:text-base"
      >
        <slot name="title">{{ title }}</slot>
      </h1>
      <slot />
    </div>

    <div v-if="$slots.right" class="flex shrink-0 items-center gap-1.5">
      <slot name="right" />
    </div>
  </div>
</template>
