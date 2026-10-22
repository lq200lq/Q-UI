<script setup lang="ts">
import { RouterLink } from 'vue-router'
import QIcon from './QIcon.vue'

export type QBreadcrumbItem = {
  label: string
  to?: string | Record<string, unknown>
  href?: string
  /** Current page — renders as plain text */
  current?: boolean
}

withDefaults(
  defineProps<{
    items: QBreadcrumbItem[]
    /** Visually hide but keep for SR */
    label?: string
  }>(),
  {
    label: '面包屑',
  },
)
</script>

<template>
  <nav class="q-breadcrumb" :aria-label="label">
    <ol class="flex min-w-0 flex-wrap items-center gap-1 text-sm">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="flex min-w-0 items-center gap-1"
      >
        <QIcon
          v-if="index > 0"
          name="chevron-right"
          size="sm"
          class="shrink-0 text-primary/35"
        />

        <span
          v-if="item.current || (!item.to && !item.href)"
          class="truncate text-primary"
          :class="item.current ? 'font-medium' : 'text-primary/70'"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
        <RouterLink
          v-else-if="item.to"
          :to="item.to"
          class="truncate text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary rounded-sm px-0.5 -mx-0.5"
        >
          {{ item.label }}
        </RouterLink>
        <a
          v-else
          :href="item.href"
          class="truncate text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary rounded-sm px-0.5 -mx-0.5"
        >
          {{ item.label }}
        </a>
      </li>
    </ol>
  </nav>
</template>
