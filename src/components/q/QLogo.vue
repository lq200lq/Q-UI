<script setup lang="ts">
withDefaults(defineProps<{ decorative?: boolean }>(), { decorative: false })
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    class="inline-block shrink-0 align-middle"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : 'Q-UI'"
    :aria-hidden="decorative ? true : undefined"
    focusable="false"
  >
    <rect x="5" y="5" width="21" height="21" rx="7.5" stroke="currentColor" stroke-width="3.5" />
    <path d="m20 20 8 8" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
  </svg>
</template>
