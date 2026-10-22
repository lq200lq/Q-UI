<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Max content width */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    /** Horizontal padding */
    padding?: 'none' | 'sm' | 'md' | 'lg'
    as?: 'div' | 'section' | 'main' | 'article'
  }>(),
  {
    size: 'md',
    padding: 'md',
    as: 'div',
  },
)

const rootClass = computed(() => {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  } as const

  const pads = {
    none: '',
    sm: 'px-3',
    md: 'px-4 md:px-6',
    lg: 'px-4 md:px-8',
  } as const

  return ['q-container mx-auto w-full', sizes[props.size], pads[props.padding]]
})
</script>

<template>
  <component :is="as" :class="rootClass">
    <slot />
  </component>
</template>
