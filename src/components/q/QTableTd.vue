<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'left' | 'center' | 'right'
    /** Muted secondary cell text */
    muted?: boolean
  }>(),
  {
    align: 'left',
    muted: false,
  },
)
</script>

<template>
  <td
    class="q-table-td h-10 px-3 text-sm leading-5 [[data-dense]_&]:h-8 [[data-dense]_&]:px-2"
    :class="[
      align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
      muted ? 'text-primary/55' : 'text-primary',
    ]"
  >
    <slot />
  </td>
</template>
