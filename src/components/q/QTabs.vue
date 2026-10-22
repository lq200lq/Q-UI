<script setup lang="ts">
import { computed, useId } from 'vue'

export type QTabItem = {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    items: QTabItem[]
    /** underline (default) | pills */
    variant?: 'underline' | 'pills'
    size?: 'sm' | 'md'
  }>(),
  {
    variant: 'underline',
    size: 'md',
  },
)

const model = defineModel<string>({ required: true })

const listId = useId()

const enabledValues = computed(() =>
  props.items.filter((i) => !i.disabled).map((i) => i.value),
)

function select(value: string, disabled?: boolean) {
  if (disabled) return
  model.value = value
}

function move(delta: number) {
  const list = enabledValues.value
  if (list.length === 0) return
  const idx = list.indexOf(model.value)
  const next =
    idx === -1 ? list[0]! : list[(idx + delta + list.length) % list.length]!
  model.value = next
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    move(1)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    move(-1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    const first = enabledValues.value[0]
    if (first) model.value = first
  } else if (event.key === 'End') {
    event.preventDefault()
    const last = enabledValues.value[enabledValues.value.length - 1]
    if (last) model.value = last
  }
}

const sizeClass = computed(() =>
  props.size === 'sm' ? 'text-control-sm px-2.5 py-1.5' : 'text-sm px-3 py-2',
)
</script>

<template>
  <div class="q-tabs w-full">
    <div
      :id="listId"
      role="tablist"
      class="flex items-center gap-0.5"
      :class="
        variant === 'underline'
          ? 'border-b border-border'
          : 'rounded-md bg-hover/80 p-0.5'
      "
      @keydown="onKeydown"
    >
      <button
        v-for="item in items"
        :id="`${listId}-${item.value}`"
        :key="item.value"
        type="button"
        role="tab"
        :aria-selected="model === item.value"
        :aria-controls="`${listId}-panel-${item.value}`"
        :tabindex="model === item.value ? 0 : -1"
        :disabled="item.disabled"
        class="relative shrink-0 rounded-md font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-not-allowed disabled:opacity-40"
        :class="[
          sizeClass,
          variant === 'pills'
            ? model === item.value
              ? 'bg-surface text-primary shadow-sm'
              : 'text-primary/65 hover:text-primary'
            : model === item.value
              ? 'text-primary'
              : 'text-primary/60 hover:bg-hover hover:text-primary',
        ]"
        @click="select(item.value, item.disabled)"
      >
        {{ item.label }}
        <span
          v-if="variant === 'underline' && model === item.value"
          class="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
          aria-hidden="true"
        />
      </button>
    </div>

    <div
      v-for="item in items"
      :id="`${listId}-panel-${item.value}`"
      :key="`panel-${item.value}`"
      role="tabpanel"
      :aria-labelledby="`${listId}-${item.value}`"
      :hidden="model !== item.value"
      class="pt-4"
    >
      <slot
        v-if="model === item.value"
        :name="item.value"
        :item="item"
      />
    </div>
  </div>
</template>
