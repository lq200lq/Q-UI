<script setup lang="ts">
import QIcon from './QIcon.vue'

withDefaults(
  defineProps<{
    url: string
    title: string
    description?: string
    favicon?: string
    image?: string
  }>(),
  {},
)
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="q-bookmark flex overflow-hidden rounded-md border border-border bg-surface transition-colors duration-150 hover:bg-hover"
  >
    <div class="min-w-0 flex-1 p-3">
      <div class="flex items-center gap-1.5 text-xs text-primary/45">
        <img
          v-if="favicon"
          :src="favicon"
          alt=""
          class="h-3.5 w-3.5 shrink-0 rounded-sm"
        />
        <QIcon v-else name="link" size="sm" class="shrink-0" />
        <span class="truncate">{{ url }}</span>
      </div>
      <div class="mt-1 truncate text-sm font-medium text-primary">
        {{ title }}
      </div>
      <p
        v-if="description"
        class="mt-1 line-clamp-2 text-xs leading-relaxed text-primary/55"
      >
        {{ description }}
      </p>
    </div>
    <div
      v-if="image"
      class="hidden w-28 shrink-0 border-l border-border sm:block"
    >
      <img :src="image" :alt="title" class="h-full w-full object-cover" />
    </div>
  </a>
</template>
