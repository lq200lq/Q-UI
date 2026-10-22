<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    poster?: string
    caption?: string
    controls?: boolean
    fullWidth?: boolean
  }>(),
  {
    controls: true,
    fullWidth: false,
  },
)
</script>

<template>
  <figure
    class="q-video-block"
    :class="fullWidth ? 'w-full' : 'mx-auto max-w-2xl'"
  >
    <video
      class="w-full rounded-md border border-border bg-primary/5"
      :src="src"
      :poster="poster"
      :controls="controls"
      playsinline
    />
    <figcaption
      v-if="caption || $slots.caption"
      class="mt-2 text-center text-xs text-primary/55"
    >
      <slot name="caption">{{ caption }}</slot>
    </figcaption>
  </figure>
</template>
