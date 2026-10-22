<script setup lang="ts">
import { computed } from 'vue'
import QIcon from './QIcon.vue'

const props = withDefaults(
  defineProps<{
    /** Total item count (used with pageSize) */
    total?: number
    pageSize?: number
    /** Or pass pageCount directly */
    pageCount?: number
    /** Pages shown on each side of current */
    siblingCount?: number
    size?: 'sm' | 'md'
    disabled?: boolean
    /** Show "第 x / y 页" */
    showTotal?: boolean
  }>(),
  {
    total: 0,
    pageSize: 10,
    siblingCount: 1,
    size: 'sm',
    disabled: false,
    showTotal: false,
  },
)

const page = defineModel<number>('page', { default: 1 })

const totalPages = computed(() => {
  if (props.pageCount != null && props.pageCount > 0) return props.pageCount
  if (props.pageSize <= 0) return 1
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

const current = computed(() =>
  Math.min(Math.max(1, page.value), totalPages.value),
)

type Token = number | 'ellipsis'

const items = computed((): Token[] => {
  const total = totalPages.value
  const siblings = Math.max(0, props.siblingCount)
  const currentPage = current.value

  const range = (start: number, end: number) => {
    const out: number[] = []
    for (let i = start; i <= end; i++) out.push(i)
    return out
  }

  // first + last + current + 2*siblings + 2 ellipsis slots
  const totalNumbers = siblings * 2 + 5

  if (total <= totalNumbers) {
    return range(1, total)
  }

  const leftSibling = Math.max(currentPage - siblings, 1)
  const rightSibling = Math.min(currentPage + siblings, total)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings
    return [...range(1, leftItemCount), 'ellipsis', total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings
    return [1, 'ellipsis', ...range(total - rightItemCount + 1, total)]
  }

  return [
    1,
    'ellipsis',
    ...range(leftSibling, rightSibling),
    'ellipsis',
    total,
  ]
})

const btnSize = computed(() =>
  props.size === 'sm'
    ? 'h-control-sm min-w-[28px] px-1.5 text-control-sm'
    : 'h-control-md min-w-[32px] px-2 text-control-md',
)

function go(next: number) {
  if (props.disabled) return
  const clamped = Math.min(Math.max(1, next), totalPages.value)
  if (clamped === page.value) return
  page.value = clamped
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    go(current.value - 1)
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    go(current.value + 1)
  }
}
</script>

<template>
  <nav
    class="q-pagination inline-flex flex-wrap items-center gap-1"
    :aria-label="'分页'"
    @keydown="onKeydown"
  >
    <span
      v-if="showTotal"
      class="mr-2 text-xs text-primary/55"
    >
      第 {{ current }} / {{ totalPages }} 页
    </span>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md text-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-not-allowed disabled:opacity-35"
      :class="[btnSize, 'hover:bg-hover active:bg-active']"
      :disabled="disabled || current <= 1"
      aria-label="上一页"
      @click="go(current - 1)"
    >
      <QIcon name="chevron-left" size="sm" />
    </button>

    <template v-for="(item, i) in items" :key="`${item}-${i}`">
      <span
        v-if="item === 'ellipsis'"
        class="inline-flex items-center justify-center px-1 text-xs text-primary/40"
        aria-hidden="true"
      >
        …
      </span>
      <button
        v-else
        type="button"
        class="inline-flex items-center justify-center rounded-md font-medium tabular-nums transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-not-allowed disabled:opacity-35"
        :class="[
          btnSize,
          item === current
            ? 'bg-active text-primary'
            : 'text-primary hover:bg-hover active:bg-active',
        ]"
        :disabled="disabled"
        :aria-label="`第 ${item} 页`"
        :aria-current="item === current ? 'page' : undefined"
        @click="go(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-md text-primary transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-not-allowed disabled:opacity-35"
      :class="[btnSize, 'hover:bg-hover active:bg-active']"
      :disabled="disabled || current >= totalPages"
      aria-label="下一页"
      @click="go(current + 1)"
    >
      <QIcon name="chevron-right" size="sm" />
    </button>
  </nav>
</template>
