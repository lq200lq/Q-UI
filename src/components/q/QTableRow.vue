<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean
    /** Row hover highlight */
    hoverable?: boolean
  }>(),
  {
    active: false,
    hoverable: true,
  },
)
</script>

<template>
  <tr
    class="q-table-row transition-colors duration-150"
    :class="[
      active ? 'bg-active' : undefined,
      hoverable ? 'hover:bg-hover/70' : undefined,
    ]"
  >
    <slot />
  </tr>
</template>
