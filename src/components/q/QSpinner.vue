<script setup lang="ts">
import { computed } from 'vue'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    /** Accessible label */
    label?: string
  }>(),
  {
    size: 'md',
    label: '加载中',
  },
)

const iconSize = computed(() => props.size)
</script>

<template>
  <span
    class="q-spinner inline-flex items-center justify-center text-primary/55"
    role="status"
    :aria-label="label"
  >
    <QIcon
      name="loader"
      :size="iconSize"
      class="animate-spin"
      aria-hidden="true"
    />
  </span>
</template>
