<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    draggable?: boolean
  }>(),
  {
    draggable: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <div
    class="q-board-card rounded-md bg-surface p-2.5 text-left shadow-sm transition-colors duration-150 hover:bg-hover"
    :class="draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'"
    role="button"
    tabindex="0"
    @click="emit('click', $event)"
    @keydown.enter.prevent="emit('click', $event as unknown as MouseEvent)"
  >
    <div class="text-sm font-medium text-primary">{{ title }}</div>
    <p
      v-if="description || $slots.default"
      class="mt-1 text-xs leading-relaxed text-primary/55"
    >
      <slot>{{ description }}</slot>
    </p>
    <div v-if="$slots.meta" class="mt-2 flex flex-wrap items-center gap-1.5">
      <slot name="meta" />
    </div>
  </div>
</template>
