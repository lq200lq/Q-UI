<script setup lang="ts">
import QCallout from './QCallout.vue'
import type { QCalloutVariant } from './QCallout.vue'
import type { IconName } from './icons'

/**
 * Page / form feedback alert — QCallout with role="alert".
 * Prefer QCallout for static Notion-style tips in content.
 */
withDefaults(
  defineProps<{
    variant?: QCalloutVariant
    title?: string
    icon?: IconName | false
    dismissible?: boolean
  }>(),
  {
    variant: 'info',
    dismissible: true,
  },
)

const emit = defineEmits<{
  dismiss: [event: MouseEvent]
}>()
</script>

<template>
  <QCallout
    class="q-alert"
    role="alert"
    :variant="variant"
    :title="title"
    :icon="icon"
    :dismissible="dismissible"
    @dismiss="emit('dismiss', $event)"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <slot />
  </QCallout>
</template>
