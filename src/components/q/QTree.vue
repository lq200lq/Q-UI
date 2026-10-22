<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import QTreeItem from './QTreeItem.vue'
import { Q_TREE_KEY, type QTreeNode } from './treeContext'

const props = withDefaults(
  defineProps<{
    nodes: QTreeNode[]
    modelValue?: string | null
    expanded?: string[]
    defaultExpanded?: string[]
    label?: string
  }>(),
  {
    modelValue: null,
    defaultExpanded: () => [],
    label: '树',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'update:expanded': [value: string[]]
  select: [key: string]
}>()

const selected = computed({
  get: () => props.modelValue ?? null,
  set: (value) => emit('update:modelValue', value),
})

const internalExpanded = ref<string[]>([...(props.defaultExpanded ?? [])])

watch(
  () => props.expanded,
  (value) => {
    if (value) internalExpanded.value = [...value]
  },
)

const expandedKeys = computed(() => props.expanded ?? internalExpanded.value)

function setExpanded(keys: string[]) {
  if (props.expanded) {
    emit('update:expanded', keys)
  } else {
    internalExpanded.value = keys
    emit('update:expanded', keys)
  }
}

function isExpanded(key: string) {
  return expandedKeys.value.includes(key)
}

function toggleExpanded(key: string) {
  const next = isExpanded(key)
    ? expandedKeys.value.filter((k) => k !== key)
    : [...expandedKeys.value, key]
  setExpanded(next)
}

function select(key: string) {
  selected.value = key
  emit('select', key)
}

provide(Q_TREE_KEY, {
  selected,
  isExpanded,
  toggleExpanded,
  select,
})
</script>

<template>
  <ul
    class="q-tree m-0 list-none p-0"
    role="tree"
    :aria-label="label"
  >
    <QTreeItem
      v-for="node in nodes"
      :key="node.key"
      :node="node"
      :depth="0"
    />
  </ul>
</template>
