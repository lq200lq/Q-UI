<script setup lang="ts">
import type { IconName } from './icons'
import QIcon from './QIcon.vue'

withDefaults(
  defineProps<{
    icon?: IconName
    title?: string
    description?: string
  }>(),
  {
    icon: 'file',
    title: '暂无内容',
  },
)
</script>

<template>
  <div
    class="q-empty flex flex-col items-center justify-center px-6 py-12 text-center"
    role="status"
  >
    <div
      class="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-hover text-primary/45"
    >
      <slot name="icon">
        <QIcon :name="icon" size="lg" />
      </slot>
    </div>
    <h3
      v-if="title || $slots.title"
      class="font-heading text-sm font-semibold text-primary"
    >
      <slot name="title">{{ title }}</slot>
    </h3>
    <p
      v-if="description || $slots.description"
      class="mt-1 max-w-sm text-sm text-primary/60"
    >
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
