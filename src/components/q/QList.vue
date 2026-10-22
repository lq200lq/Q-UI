<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Show dividers between items */
    divided?: boolean
  }>(),
  {
    divided: false,
  },
)
</script>

<template>
  <ul
    class="q-list"
    :class="divided ? 'divide-y divide-border' : 'space-y-0.5'"
    role="list"
  >
    <slot />
  </ul>
</template>
