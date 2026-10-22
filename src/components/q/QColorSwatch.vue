<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'
import { useClickOutside, useDisclosure } from '../../composables'
import QIcon from './QIcon.vue'
import { DEFAULT_COLOR_SWATCHES, type QColorOption } from './colorSwatch'

const props = withDefaults(
  defineProps<{
    colors?: QColorOption[]
    disabled?: boolean
    clearable?: boolean
    /** Allow typing a custom hex */
    customizable?: boolean
    size?: 'sm' | 'md'
  }>(),
  {
    disabled: false,
    clearable: true,
    customizable: true,
    size: 'md',
  },
)

const modelValue = defineModel<string | null>('modelValue', { default: null })

const { open, show, hide } = useDisclosure()
const rootRef = useTemplateRef<HTMLElement>('rootRef')
const panelRef = useTemplateRef<HTMLElement>('panelRef')
const coords = ref({ top: 0, left: 0 })
const customHex = ref('')

const palette = computed(() => props.colors ?? DEFAULT_COLOR_SWATCHES)

useClickOutside(panelRef, (event) => {
  if (!open.value) return
  const root = rootRef.value
  if (root && event.composedPath().includes(root)) return
  close()
})

const swatchSize = computed(() =>
  props.size === 'sm' ? 'h-6 w-6' : 'h-7 w-7',
)

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}))

async function updatePosition() {
  const root = rootRef.value
  const panel = panelRef.value
  if (!root || !panel) return
  const rect = root.getBoundingClientRect()
  const panelRect = panel.getBoundingClientRect()
  const gap = 4
  let top = rect.bottom + gap
  let left = rect.left
  if (top + panelRect.height > window.innerHeight - 8) {
    top = Math.max(8, rect.top - panelRect.height - gap)
  }
  left = Math.min(Math.max(8, left), window.innerWidth - panelRect.width - 8)
  coords.value = { top, left }
}

async function openPanel() {
  if (props.disabled) return
  customHex.value = modelValue.value?.startsWith('#') ? modelValue.value : ''
  show()
  await nextTick()
  await updatePosition()
  panelRef.value?.focus()
}

function close() {
  hide()
}

function toggle() {
  if (open.value) close()
  else void openPanel()
}

function selectColor(value: string) {
  modelValue.value = value
  close()
}

function clear() {
  modelValue.value = null
  close()
}

function applyCustom() {
  const raw = customHex.value.trim()
  if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(raw)) return
  modelValue.value = raw.length === 4
    ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
    : raw
  close()
}

function onDocKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    close()
  }
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('keydown', onDocKeydown, true)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
  } else {
    document.removeEventListener('keydown', onDocKeydown, true)
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onDocKeydown, true)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>

<template>
  <div ref="rootRef" class="q-color-swatch inline-flex">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1.5 text-sm transition-colors duration-150 hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40 disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="disabled"
      :aria-expanded="open"
      aria-label="选择颜色"
      @click="toggle"
    >
      <span
        class="inline-block rounded-md border border-border"
        :class="swatchSize"
        :style="{ backgroundColor: modelValue || 'transparent' }"
      >
        <span
          v-if="!modelValue"
          class="flex h-full w-full items-center justify-center text-primary/30"
        >
          <QIcon name="x" size="sm" />
        </span>
      </span>
      <span class="text-primary/70">{{ modelValue || '无颜色' }}</span>
      <QIcon name="chevron-down" size="sm" class="text-primary/40" />
    </button>

    <Teleport :to="OVERLAY_ROOT">
      <div
        v-if="open"
        ref="panelRef"
        role="dialog"
        aria-label="颜色面板"
        tabindex="-1"
        class="q-color-swatch-panel fixed z-[70] w-56 rounded-md border border-border bg-surface p-3 shadow-md outline-none"
        :style="style"
      >
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="color in palette"
            :key="color.value"
            type="button"
            class="h-7 w-7 rounded-md border border-border transition-transform duration-150 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn/40"
            :class="
              modelValue === color.value ? 'ring-2 ring-btn ring-offset-1' : ''
            "
            :style="{ backgroundColor: color.value }"
            :title="color.label || color.value"
            :aria-label="color.label || color.value"
            @click="selectColor(color.value)"
          />
        </div>

        <div
          v-if="customizable"
          class="mt-3 flex items-center gap-2 border-t border-border pt-3"
        >
          <input
            v-model="customHex"
            type="text"
            placeholder="#2383e2"
            class="h-control-sm min-w-0 flex-1 rounded-md border border-border bg-surface px-2 text-xs text-primary placeholder:text-primary/35 focus:border-primary/30 focus:outline-none"
            @keydown.enter.prevent="applyCustom"
          />
          <button
            type="button"
            class="h-control-sm shrink-0 rounded-md bg-btn px-2 text-xs text-on-btn transition-colors duration-150 hover:bg-btn-hover"
            @click="applyCustom"
          >
            应用
          </button>
        </div>

        <button
          v-if="clearable"
          type="button"
          class="mt-2 w-full rounded-md px-2 py-1.5 text-left text-xs text-primary/60 transition-colors duration-150 hover:bg-hover hover:text-primary"
          @click="clear"
        >
          清除颜色
        </button>
      </div>
    </Teleport>
  </div>
</template>
