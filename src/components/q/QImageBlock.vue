<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt?: string
    caption?: string
    /** Full bleed within page content */
    fullWidth?: boolean
  }>(),
  {
    alt: '',
    fullWidth: false,
  },
)
</script>

<template>
  <figure
    class="q-image-block"
    :class="fullWidth ? 'w-full' : 'mx-auto max-w-2xl'"
  >
    <img
      :src="src"
      :alt="alt"
      class="w-full rounded-md border border-border object-cover"
      loading="lazy"
    />
    <figcaption
      v-if="caption || $slots.caption"
      class="mt-2 text-center text-xs text-primary/55"
    >
      <slot name="caption">{{ caption }}</slot>
    </figcaption>
  </figure>
</template>
