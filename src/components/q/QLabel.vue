<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    htmlFor?: string
    required?: boolean
  }>(),
  {
    required: false,
  },
)
</script>

<template>
  <label
    :for="props.htmlFor"
    class="q-label mb-1.5 block text-sm font-medium text-primary"
  >
    <slot />
    <span v-if="required" class="ml-0.5 text-danger" aria-hidden="true">*</span>
  </label>
</template>
