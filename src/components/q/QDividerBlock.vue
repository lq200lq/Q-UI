<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Narrow content width vs full page width */
    width?: 'narrow' | 'full'
  }>(),
  {
    width: 'narrow',
  },
)
</script>

<template>
  <div
    class="q-divider-block py-3"
    :class="width === 'full' ? 'w-full' : 'mx-auto max-w-2xl'"
    role="separator"
  >
    <div class="h-px w-full bg-border" />
  </div>
</template>
