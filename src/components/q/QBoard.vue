<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: '看板',
  },
)
</script>

<template>
  <div
    class="q-board flex gap-3 overflow-x-auto pb-2"
    role="region"
    :aria-label="label"
  >
    <slot />
  </div>
</template>
