<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'text' | 'title' | 'avatar' | 'rect'
    /** CSS width, e.g. 100% / 12rem */
    width?: string
    /** CSS height */
    height?: string
    /** Disable pulse */
    animated?: boolean
  }>(),
  {
    variant: 'text',
    animated: true,
  },
)

const rootClass = computed(() => {
  const base = [
    'q-skeleton block bg-active/80',
    props.animated ? 'animate-pulse' : '',
  ]

  switch (props.variant) {
    case 'avatar':
      return [...base, 'h-8 w-8 rounded-md']
    case 'title':
      return [...base, 'h-5 w-2/5 rounded']
    case 'rect':
      return [...base, 'h-24 w-full rounded-md']
    case 'text':
    default:
      return [...base, 'h-3 w-full rounded']
  }
})

const style = computed(() => ({
  width: props.width,
  height: props.height,
}))
</script>

<template>
  <span
    class="inline-block align-middle"
    :class="rootClass"
    :style="style"
    aria-hidden="true"
  />
</template>
