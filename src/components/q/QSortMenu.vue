<script setup lang="ts">
import { computed } from 'vue'
import QDropdownMenu from './QDropdownMenu.vue'
import type { QDropdownItem } from './QDropdownMenu.vue'
import QButton from './QButton.vue'

export type QSortOption = {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    options: QSortOption[]
    placeholder?: string
  }>(),
  {
    placeholder: '排序',
  },
)

const modelValue = defineModel<string | null>('modelValue', { default: null })

const items = computed<QDropdownItem[]>(() =>
  props.options.map((o) => ({
    key: o.value,
    label: o.label,
    disabled: o.disabled,
  })),
)

const currentLabel = computed(
  () =>
    props.options.find((o) => o.value === modelValue.value)?.label ??
    props.placeholder,
)

function onSelect(item: QDropdownItem) {
  if (item.key) modelValue.value = item.key
}
</script>

<template>
  <QDropdownMenu :items="items" align="start" @select="onSelect">
    <template #default="{ toggle }">
      <QButton size="sm" variant="outline" icon="sort" @click="toggle">
        {{ currentLabel }}
      </QButton>
    </template>
  </QDropdownMenu>
</template>
