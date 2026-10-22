<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Grow to fill available space in flex parents */
    grow?: boolean
    /** Fixed size when not growing (CSS length) */
    size?: string
  }>(),
  {
    grow: true,
  },
)
</script>

<template>
  <div
    class="q-spacer"
    :class="grow ? 'flex-1' : 'flex-none'"
    :style="!grow && size ? { width: size, height: size } : undefined"
    aria-hidden="true"
  />
</template>
