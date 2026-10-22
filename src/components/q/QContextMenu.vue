<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useClickOutside, useDisclosure } from '../../composables'
import type { QDropdownItem } from './QDropdownMenu.vue'

export type QContextMenuItem = QDropdownItem

const props = withDefaults(
  defineProps<{
    items: QContextMenuItem[]
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  select: [item: QContextMenuItem]
}>()

const { open, show, hide } = useDisclosure()
const menuRef = useTemplateRef<HTMLElement>('menuRef')
const activeIndex = ref(-1)
const coords = ref({ top: 0, left: 0 })

useClickOutside(menuRef, () => {
  if (open.value) hide()
})

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  minWidth: '160px',
}))

const enabledIndexes = computed(() =>
  props.items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !item.disabled && !item.separator)
    .map(({ i }) => i),
)

async function updatePosition(clientX: number, clientY: number) {
  const menu = menuRef.value
  if (!menu) {
    coords.value = { top: clientY, left: clientX }
    return
  }

  const menuRect = menu.getBoundingClientRect()
  let top = clientY
  let left = clientX

  if (top + menuRect.height > window.innerHeight - 8) {
    top = Math.max(8, clientY - menuRect.height)
  }
  if (left + menuRect.width > window.innerWidth - 8) {
    left = Math.max(8, clientX - menuRect.width)
  }

  coords.value = { top, left }
}

async function openAt(clientX: number, clientY: number) {
  if (props.disabled) return
  show()
  activeIndex.value = enabledIndexes.value[0] ?? -1
  coords.value = { top: clientY, left: clientX }
  await nextTick()
  await updatePosition(clientX, clientY)
  menuRef.value?.focus()
}

function closeMenu() {
  hide()
  activeIndex.value = -1
}

function onContextMenu(event: MouseEvent) {
  if (props.disabled) return
  event.preventDefault()
  event.stopPropagation()
  void openAt(event.clientX, event.clientY)
}

function selectItem(item: QContextMenuItem, index: number) {
  if (item.disabled || item.separator) return
  emit('select', item)
  closeMenu()
  activeIndex.value = index
}

function move(delta: number) {
  const list = enabledIndexes.value
  if (list.length === 0) return
  const currentPos = list.indexOf(activeIndex.value)
  const nextPos =
    currentPos === -1
      ? 0
      : (currentPos + delta + list.length) % list.length
  activeIndex.value = list[nextPos]!
}

function onMenuKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      closeMenu()
      break
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Enter':
    case ' ': {
      event.preventDefault()
      const item = props.items[activeIndex.value]
      if (item) selectItem(item, activeIndex.value)
      break
    }
    default:
      break
  }
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    closeMenu()
  }
}

function onScrollOrResize() {
  if (open.value) closeMenu()
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('keydown', onDocKeydown, true)
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
  } else {
    document.removeEventListener('keydown', onDocKeydown, true)
    window.removeEventListener('scroll', onScrollOrResize, true)
    window.removeEventListener('resize', onScrollOrResize)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKeydown, true)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})

defineExpose({ open, show: openAt, hide: closeMenu })
</script>

<template>
  <div class="q-context-menu" @contextmenu="onContextMenu">
    <slot :open="open" />
  </div>

  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="menuRef"
      role="menu"
      tabindex="-1"
      class="q-context-menu-panel fixed z-[70] overflow-hidden rounded-md border border-border bg-surface py-1 shadow-md outline-none"
      :style="style"
      @keydown="onMenuKeydown"
      @contextmenu.prevent
    >
      <template
        v-for="(item, index) in items"
        :key="item.key ?? `${item.label}-${index}`"
      >
        <div
          v-if="item.separator"
          role="separator"
          class="my-1 h-px bg-border"
        />
        <button
          v-else
          type="button"
          role="menuitem"
          class="flex w-full items-center px-3 py-1.5 text-left text-sm transition-colors duration-150"
          :class="[
            item.disabled
              ? 'cursor-not-allowed text-primary/35'
              : item.danger
                ? 'text-danger'
                : 'text-primary',
            !item.disabled && activeIndex === index ? 'bg-hover' : '',
            !item.disabled && activeIndex !== index ? 'hover:bg-hover' : '',
          ]"
          :disabled="item.disabled"
          @mouseenter="activeIndex = index"
          @click="selectItem(item, index)"
        >
          {{ item.label }}
        </button>
      </template>
    </div>
  </Teleport>
</template>
