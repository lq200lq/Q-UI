<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Tighter cell padding */
    dense?: boolean
    /** Full-bleed: no outer border/radius (for use inside Card) */
    flush?: boolean
  }>(),
  {
    dense: false,
    flush: false,
  },
)
</script>

<template>
  <div
    class="q-table-wrap w-full overflow-x-auto"
    :class="
      flush
        ? undefined
        : 'rounded-lg border border-border bg-surface shadow-sm'
    "
  >
    <table
      class="w-full border-collapse text-left text-sm text-primary"
      :data-dense="dense || undefined"
    >
      <slot />
    </table>
  </div>
</template>
