<script setup lang="ts">
import { computed } from 'vue'
import QText from './QText.vue'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    /** Optional hint under the value */
    hint?: string
    /** Soften emphasis */
    muted?: boolean
  }>(),
  {
    muted: false,
  },
)

const valueClass = computed(() => [
  'font-heading text-2xl font-semibold tabular-nums tracking-tight',
  props.muted ? 'text-primary/70' : 'text-primary',
])
</script>

<template>
  <div class="q-stat min-w-0">
    <QText variant="caption" class="mb-1">{{ label }}</QText>
    <div :class="valueClass">
      <slot>{{ value }}</slot>
    </div>
    <QText v-if="hint || $slots.hint" variant="caption" class="mt-1">
      <slot name="hint">{{ hint }}</slot>
    </QText>
  </div>
</template>
