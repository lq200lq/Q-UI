<script setup lang="ts">
export type QViewTabItem = {
  value: string
  label: string
  disabled?: boolean
}

defineProps<{
  items: QViewTabItem[]
}>()

const modelValue = defineModel<string>('modelValue', { required: true })
</script>

<template>
  <div
    class="q-view-tabs flex items-center gap-0.5 border-b border-border"
    role="tablist"
    aria-label="视图"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      role="tab"
      class="relative px-3 py-2 text-sm transition-colors duration-150"
      :class="[
        item.disabled
          ? 'cursor-not-allowed text-primary/30'
          : modelValue === item.value
            ? 'font-medium text-primary'
            : 'text-primary/55 hover:text-primary',
      ]"
      :disabled="item.disabled"
      :aria-selected="modelValue === item.value"
      @click="modelValue = item.value"
    >
      {{ item.label }}
      <span
        v-if="modelValue === item.value"
        class="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-btn"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
