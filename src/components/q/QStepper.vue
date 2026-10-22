<script setup lang="ts">
import { computed } from 'vue'
import QIcon from './QIcon.vue'

export type QStepperItem = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    items: QStepperItem[]
    modelValue: string
    /** Allow clicking completed / previous steps */
    interactive?: boolean
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    interactive: true,
    orientation: 'horizontal',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const currentIndex = computed(() =>
  props.items.findIndex((item) => item.value === props.modelValue),
)

function statusOf(index: number): 'complete' | 'current' | 'upcoming' {
  if (index < currentIndex.value) return 'complete'
  if (index === currentIndex.value) return 'current'
  return 'upcoming'
}

function onSelect(item: QStepperItem, index: number) {
  if (!props.interactive || item.disabled) return
  if (index > currentIndex.value) return
  if (item.value === props.modelValue) return
  emit('update:modelValue', item.value)
}
</script>

<template>
  <nav
    class="q-stepper"
    :aria-label="'步骤'"
    :data-orientation="orientation"
  >
    <ol
      class="flex"
      :class="
        orientation === 'vertical'
          ? 'flex-col gap-0'
          : 'flex-row flex-wrap items-start gap-0'
      "
    >
      <li
        v-for="(item, index) in items"
        :key="item.value"
        class="relative flex"
        :class="
          orientation === 'vertical'
            ? 'gap-3 pb-6 last:pb-0'
            : 'min-w-0 flex-1 items-start gap-0'
        "
      >
        <!-- connector -->
        <div
          v-if="index < items.length - 1"
          aria-hidden="true"
          class="pointer-events-none absolute bg-border"
          :class="
            orientation === 'vertical'
              ? 'left-[11px] top-6 bottom-0 w-px'
              : 'left-[calc(1.5rem+0.5rem)] right-2 top-[11px] h-px'
          "
        />

        <button
          type="button"
          class="relative z-[1] flex items-start gap-3 text-left outline-none transition-colors duration-150"
          :class="[
            orientation === 'horizontal' ? 'pr-4' : '',
            item.disabled || !interactive || index > currentIndex
              ? 'cursor-default'
              : 'cursor-pointer',
            interactive &&
              !item.disabled &&
              index <= currentIndex &&
              'rounded-md focus-visible:ring-2 focus-visible:ring-btn/40',
          ]"
          :disabled="
            item.disabled || !interactive || index > currentIndex
          "
          :aria-current="statusOf(index) === 'current' ? 'step' : undefined"
          @click="onSelect(item, index)"
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-medium transition-colors duration-150"
            :class="{
              'border-btn bg-btn text-on-btn': statusOf(index) === 'current',
              'border-accent-3 bg-accent-3 text-white':
                statusOf(index) === 'complete',
              'border-border bg-surface text-primary/45':
                statusOf(index) === 'upcoming',
            }"
          >
            <QIcon
              v-if="statusOf(index) === 'complete'"
              name="check"
              size="sm"
              class="text-white"
            />
            <template v-else>{{ index + 1 }}</template>
          </span>

          <span class="min-w-0 pt-0.5">
            <span
              class="block truncate text-sm font-medium"
              :class="
                statusOf(index) === 'upcoming'
                  ? 'text-primary/45'
                  : 'text-primary'
              "
            >
              {{ item.label }}
            </span>
            <span
              v-if="item.description"
              class="mt-0.5 block text-xs text-primary/55"
            >
              {{ item.description }}
            </span>
          </span>
        </button>
      </li>
    </ol>
  </nav>
</template>
