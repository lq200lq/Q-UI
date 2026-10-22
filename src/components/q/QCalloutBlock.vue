<script setup lang="ts">
import QCallout from './QCallout.vue'
import type { QCalloutVariant } from './QCallout.vue'
import QPageIcon from './QPageIcon.vue'

withDefaults(
  defineProps<{
    variant?: QCalloutVariant
    emoji?: string
    title?: string
  }>(),
  {
    variant: 'info',
    emoji: '💡',
  },
)

const emit = defineEmits<{
  iconClick: [event: MouseEvent]
}>()
</script>

<template>
  <QCallout :variant="variant" :icon="false" class="q-callout-block" :title="title">
    <template #icon>
      <QPageIcon
        :emoji="emoji"
        size="sm"
        @click="emit('iconClick', $event)"
      />
    </template>
    <slot />
  </QCallout>
</template>
