<script setup lang="ts">
import { computed } from 'vue'

export type QDescriptionItem = {
  term: string
  description: string
}

const props = withDefaults(
  defineProps<{
    items?: QDescriptionItem[]
    /** stacked (default) or side-by-side columns */
    layout?: 'stacked' | 'horizontal'
    size?: 'sm' | 'md'
  }>(),
  {
    items: () => [],
    layout: 'stacked',
    size: 'md',
  },
)

const rootClass = computed(() => [
  'q-description-list',
  props.layout === 'horizontal'
    ? 'grid grid-cols-[minmax(6rem,30%)_1fr] gap-x-4 gap-y-3'
    : 'flex flex-col gap-3',
])

const termClass = computed(() => [
  'font-medium text-primary/55',
  props.size === 'sm' ? 'text-xs' : 'text-xs',
])

const descClass = computed(() => [
  'text-primary',
  props.size === 'sm' ? 'text-sm' : 'text-sm',
  props.layout === 'stacked' ? 'mt-0.5' : undefined,
])
</script>

<template>
  <dl :class="rootClass">
    <slot>
      <template v-for="(item, i) in items" :key="`${item.term}-${i}`">
        <dt :class="termClass">{{ item.term }}</dt>
        <dd :class="descClass">{{ item.description }}</dd>
      </template>
    </slot>
  </dl>
</template>
