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

export type QDropdownItem = {
  key?: string
  label: string
  disabled?: boolean
  danger?: boolean
  /** Divider before this item */
  separator?: boolean
}

const props = withDefaults(
  defineProps<{
    items: QDropdownItem[]
    align?: 'start' | 'end'
    disabled?: boolean
  }>(),
  {
    align: 'end',
    disabled: false,
  },
)

const emit = defineEmits<{
  select: [item: QDropdownItem]
}>()

const { open, show, hide } = useDisclosure()
const triggerRef = useTemplateRef<HTMLElement>('triggerRef')
const menuRef = useTemplateRef<HTMLElement>('menuRef')
const activeIndex = ref(-1)
const coords = ref({ top: 0, left: 0, minWidth: 0 })

useClickOutside(menuRef, (event) => {
  if (!open.value) return
  const t = triggerRef.value
  if (t && event.composedPath().includes(t)) return
  hide()
})

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  minWidth: `${Math.max(coords.value.minWidth, 160)}px`,
}))

const enabledIndexes = computed(() =>
  props.items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !item.disabled && !item.separator)
    .map(({ i }) => i),
)

async function updatePosition() {
  const trigger = triggerRef.value
  const menu = menuRef.value
  if (!trigger || !menu) return

  const rect = trigger.getBoundingClientRect()
  const menuRect = menu.getBoundingClientRect()
  const gap = 4

  let top = rect.bottom + gap
  let left =
    props.align === 'end' ? rect.right - menuRect.width : rect.left

  if (top + menuRect.height > window.innerHeight - 8) {
    top = rect.top - menuRect.height - gap
  }
  left = Math.min(Math.max(8, left), window.innerWidth - menuRect.width - 8)

  coords.value = {
    top,
    left,
    minWidth: rect.width,
  }
}

async function openMenu() {
  if (props.disabled) return
  show()
  activeIndex.value = enabledIndexes.value[0] ?? -1
  await nextTick()
  await updatePosition()
  menuRef.value?.focus()
}

function closeMenu() {
  hide()
  activeIndex.value = -1
}

function onTriggerClick() {
  if (open.value) closeMenu()
  else void openMenu()
}

function selectItem(item: QDropdownItem, index: number) {
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
      triggerRef.value?.querySelector('button')?.focus()
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

watch(open, (v) => {
  if (v) document.addEventListener('keydown', onDocKeydown, true)
  else document.removeEventListener('keydown', onDocKeydown, true)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKeydown, true)
})

defineExpose({ open, show: openMenu, hide: closeMenu, toggle: onTriggerClick })
</script>

<template>
  <div ref="triggerRef" class="q-dropdown inline-flex">
    <slot :open="open" :toggle="onTriggerClick" />
  </div>

  <Teleport :to="OVERLAY_ROOT">
    <div
      v-if="open"
      ref="menuRef"
      role="menu"
      tabindex="-1"
      class="q-dropdown-menu fixed z-[70] overflow-hidden rounded-md border border-border bg-surface py-1 shadow-md outline-none"
      :style="style"
      @keydown="onMenuKeydown"
    >
      <template v-for="(item, index) in items" :key="item.key ?? `${item.label}-${index}`">
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
