<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    title?: string
    /** Aspect ratio helper */
    ratio?: '16/9' | '4/3' | '1/1'
    allowFullscreen?: boolean
  }>(),
  {
    title: '嵌入内容',
    ratio: '16/9',
    allowFullscreen: true,
  },
)

const paddingTop = computed(() => {
  const map = {
    '16/9': '56.25%',
    '4/3': '75%',
    '1/1': '100%',
  } as const
  return map[props.ratio]
})
</script>

<template>
  <div
    class="q-embed relative w-full overflow-hidden rounded-md border border-border bg-hover"
    :style="{ paddingTop }"
  >
    <iframe
      class="absolute inset-0 h-full w-full border-0"
      :src="src"
      :title="title"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      :allowfullscreen="allowFullscreen || undefined"
    />
  </div>
</template>
