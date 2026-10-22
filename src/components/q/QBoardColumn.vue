<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    count?: number
  }>(),
  {},
)
</script>

<template>
  <section
    class="q-board-column flex w-64 shrink-0 flex-col rounded-md bg-page"
  >
    <header class="flex items-center gap-2 px-2 py-2">
      <h3 class="min-w-0 flex-1 truncate text-sm font-medium text-primary">
        {{ title }}
      </h3>
      <span
        v-if="count != null"
        class="rounded-md bg-hover px-1.5 py-0.5 text-[11px] tabular-nums text-primary/55"
      >
        {{ count }}
      </span>
      <slot name="actions" />
    </header>
    <div class="flex flex-col gap-2 px-2 pb-2">
      <slot />
    </div>
  </section>
</template>
