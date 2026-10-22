<script setup lang="ts">
import QSearch from './QSearch.vue'

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: '筛选…',
  },
)

const query = defineModel<string>('query', { default: '' })
</script>

<template>
  <div
    class="q-filter-bar flex flex-wrap items-center gap-2"
    role="search"
    aria-label="筛选栏"
  >
    <div class="min-w-[160px] flex-1 basis-40">
      <QSearch v-model="query" :placeholder="placeholder" size="sm" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <slot />
    </div>
  </div>
</template>
