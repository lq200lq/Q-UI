<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string
    alt?: string
    /** Cover height */
    height?: 'sm' | 'md' | 'lg'
    changeable?: boolean
  }>(),
  {
    alt: '封面',
    height: 'md',
    changeable: true,
  },
)

const emit = defineEmits<{
  change: []
  remove: []
}>()

const heightClass = {
  sm: 'h-32',
  md: 'h-48',
  lg: 'h-64',
} as const
</script>

<template>
  <div
    class="q-cover group relative w-full overflow-hidden bg-hover"
    :class="heightClass[height]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center text-sm text-primary/40"
    >
      <slot name="empty">添加封面</slot>
    </div>

    <div
      v-if="changeable"
      class="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-surface/90 p-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
    >
      <button
        type="button"
        class="rounded-md bg-surface/95 px-2.5 py-1 text-xs font-medium text-primary shadow-sm transition-colors duration-150 hover:bg-surface"
        @click="emit('change')"
      >
        更换封面
      </button>
      <button
        v-if="src"
        type="button"
        class="rounded-md bg-surface/95 px-2.5 py-1 text-xs font-medium text-primary shadow-sm transition-colors duration-150 hover:bg-surface"
        @click="emit('remove')"
      >
        移除
      </button>
    </div>
  </div>
</template>
