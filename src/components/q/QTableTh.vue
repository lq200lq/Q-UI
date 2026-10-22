<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'left' | 'center' | 'right'
    /** Sticky header cell when scrolling (needs overflow parent) */
    sticky?: boolean
  }>(),
  {
    align: 'left',
    sticky: false,
  },
)
</script>

<template>
  <th
    scope="col"
    class="q-table-th h-10 whitespace-nowrap px-3 text-xs font-medium leading-5 text-primary/55 [[data-dense]_&]:h-8 [[data-dense]_&]:px-2"
    :class="[
      align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
      sticky ? 'sticky top-0 z-10 bg-hover/40 backdrop-blur-sm' : undefined,
    ]"
  >
    <slot />
  </th>
</template>
