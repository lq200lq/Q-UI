<script setup lang="ts">
import { computed, inject } from 'vue'
import type { IconName } from './icons'
import QIcon from './QIcon.vue'
import { Q_TREE_KEY, type QTreeNode } from './treeContext'

const props = withDefaults(
  defineProps<{
    node: QTreeNode
    depth?: number
  }>(),
  {
    depth: 0,
  },
)

const tree = inject(Q_TREE_KEY, null)

const hasChildren = computed(
  () => Array.isArray(props.node.children) && props.node.children.length > 0,
)

const expanded = computed(() => tree?.isExpanded(props.node.key) ?? false)
const selected = computed(() => tree?.selected.value === props.node.key)

function toggleExpand(event: MouseEvent) {
  event.stopPropagation()
  if (!hasChildren.value || props.node.disabled) return
  tree?.toggleExpanded(props.node.key)
}

function onSelect() {
  if (props.node.disabled) return
  tree?.select(props.node.key)
}
</script>

<template>
  <li class="q-tree-item list-none" role="none">
    <div
      role="treeitem"
      class="group flex w-full items-center gap-0.5 rounded-md text-sm transition-colors duration-150"
      :class="[
        node.disabled
          ? 'cursor-not-allowed text-primary/35'
          : selected
            ? 'bg-active font-medium text-primary'
            : 'text-primary/85 hover:bg-hover',
      ]"
      :style="{ paddingLeft: `${depth * 12 + 4}px` }"
      :aria-expanded="hasChildren ? expanded : undefined"
      :aria-selected="selected"
      :aria-disabled="node.disabled || undefined"
      :tabindex="node.disabled ? -1 : 0"
      @click="onSelect"
      @keydown.enter.prevent="onSelect"
      @keydown.space.prevent="onSelect"
    >
      <button
        type="button"
        class="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-primary/45 transition-colors duration-150"
        :class="
          hasChildren && !node.disabled
            ? 'hover:bg-hover hover:text-primary'
            : 'pointer-events-none opacity-0'
        "
        tabindex="-1"
        :aria-hidden="!hasChildren"
        :aria-label="expanded ? '折叠' : '展开'"
        @click="toggleExpand"
      >
        <QIcon
          v-if="hasChildren"
          :name="expanded ? 'chevron-down' : 'chevron-right'"
          size="sm"
        />
      </button>

      <span
        class="flex min-w-0 flex-1 items-center gap-2 py-1 pr-2"
        :class="node.disabled ? '' : 'cursor-pointer'"
      >
        <QIcon
          v-if="node.icon"
          :name="node.icon as IconName"
          size="md"
          class="shrink-0 text-primary/60"
        />
        <span class="truncate">{{ node.label }}</span>
      </span>
    </div>

    <ul
      v-if="hasChildren && expanded"
      role="group"
      class="m-0 list-none p-0"
    >
      <QTreeItem
        v-for="child in node.children"
        :key="child.key"
        :node="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>
