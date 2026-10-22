<script setup lang="ts">
import {
  computed,
  nextTick,
  onUnmounted,
  ref,
  useId,
  useTemplateRef,
  watch,
} from 'vue'
import { OVERLAY_ROOT } from '../../constants/overlay'
import QAvatar from './QAvatar.vue'

export type QMentionOption = {
  id: string
  label: string
  description?: string
  avatar?: string
}

const props = withDefaults(
  defineProps<{
    options: QMentionOption[]
    placeholder?: string
    disabled?: boolean
    invalid?: boolean
    id?: string
    rows?: number
    /** Character that opens mentions */
    trigger?: string
  }>(),
  {
    placeholder: '输入 @ 提及某人…',
    disabled: false,
    invalid: false,
    rows: 3,
    trigger: '@',
  },
)

const modelValue = defineModel<string>('modelValue', { default: '' })

const emit = defineEmits<{
  mention: [option: QMentionOption]
}>()

const autoId = useId()
const controlId = computed(() => props.id ?? autoId)
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')
const listRef = useTemplateRef<HTMLElement>('listRef')

const open = ref(false)
const query = ref('')
const mentionStart = ref(-1)
const activeIndex = ref(0)
const coords = ref({ top: 0, left: 0 })

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options.slice(0, 8)
  return props.options
    .filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        (o.description?.toLowerCase().includes(q) ?? false),
    )
    .slice(0, 8)
})

const style = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
  minWidth: '200px',
}))

function getCaretCoordinates(textarea: HTMLTextAreaElement): {
  top: number
  left: number
} {
  const rect = textarea.getBoundingClientRect()
  // Approximate: place menu below the textarea near caret line
  return {
    top: rect.bottom + 4,
    left: Math.min(rect.left + 8, window.innerWidth - 220),
  }
}

function closeMention() {
  open.value = false
  query.value = ''
  mentionStart.value = -1
  activeIndex.value = 0
}

function detectMention() {
  const el = textareaRef.value
  if (!el) return
  const caret = el.selectionStart ?? 0
  const before = modelValue.value.slice(0, caret)
  const at = before.lastIndexOf(props.trigger)
  if (at < 0) {
    closeMention()
    return
  }
  const token = before.slice(at + 1)
  if (/\s/.test(token)) {
    closeMention()
    return
  }
  // Require trigger at start or after whitespace
  if (at > 0 && !/\s/.test(before[at - 1]!)) {
    closeMention()
    return
  }

  mentionStart.value = at
  query.value = token
  open.value = true
  activeIndex.value = 0
  coords.value = getCaretCoordinates(el)
}

async function insertMention(option: QMentionOption) {
  const el = textareaRef.value
  if (!el || mentionStart.value < 0) return
  const caret = el.selectionStart ?? modelValue.value.length
  const before = modelValue.value.slice(0, mentionStart.value)
  const after = modelValue.value.slice(caret)
  const insertion = `${props.trigger}${option.label} `
  modelValue.value = `${before}${insertion}${after}`
  emit('mention', option)
  closeMention()
  await nextTick()
  const pos = before.length + insertion.length
  el.focus()
  el.setSelectionRange(pos, pos)
}

function onInput() {
  detectMention()
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value || filtered.value.length === 0) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % filtered.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value =
        (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
      break
    case 'Enter':
    case 'Tab': {
      event.preventDefault()
      const item = filtered.value[activeIndex.value]
      if (item) void insertMention(item)
      break
    }
    case 'Escape':
      event.preventDefault()
      closeMention()
      break
    default:
      break
  }
}

function onDocClick(event: MouseEvent) {
  if (!open.value) return
  const t = event.target as Node
  if (textareaRef.value?.contains(t) || listRef.value?.contains(t)) return
  closeMention()
}

watch(open, (v) => {
  if (v) document.addEventListener('mousedown', onDocClick, true)
  else document.removeEventListener('mousedown', onDocClick, true)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocClick, true)
})
</script>

<template>
  <div class="q-mention-input relative w-full">
    <textarea
      :id="controlId"
      ref="textareaRef"
      :value="modelValue"
      :rows="rows"
      :disabled="disabled"
      :placeholder="placeholder"
      :aria-invalid="invalid || undefined"
      :aria-expanded="open"
      :aria-controls="open ? `${controlId}-mentions` : undefined"
      class="w-full resize-y rounded-md border bg-surface px-control-x-md py-2 text-control-md text-primary placeholder:text-primary/40 transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      :class="
        invalid
          ? 'border-danger focus:border-danger'
          : 'border-border focus:border-primary/30'
      "
      @input="
        (e) => {
          modelValue = (e.target as HTMLTextAreaElement).value
          onInput()
        }
      "
      @keydown="onKeydown"
      @click="detectMention"
      @keyup="detectMention"
    />

    <Teleport :to="OVERLAY_ROOT">
      <ul
        v-if="open && filtered.length"
        :id="`${controlId}-mentions`"
        ref="listRef"
        role="listbox"
        class="q-mention-list fixed z-[70] max-h-56 overflow-auto rounded-md border border-border bg-surface py-1 shadow-md"
        :style="style"
      >
        <li
          v-for="(item, index) in filtered"
          :key="item.id"
          role="option"
          class="flex cursor-pointer items-center gap-2 px-2.5 py-1.5 text-sm transition-colors duration-150"
          :class="
            index === activeIndex ? 'bg-hover' : 'hover:bg-hover'
          "
          :aria-selected="index === activeIndex"
          @mouseenter="activeIndex = index"
          @mousedown.prevent="insertMention(item)"
        >
          <QAvatar
            :name="item.label"
            :src="item.avatar"
            size="sm"
          />
          <span class="min-w-0 flex-1">
            <span class="block truncate font-medium text-primary">
              {{ item.label }}
            </span>
            <span
              v-if="item.description"
              class="block truncate text-xs text-primary/50"
            >
              {{ item.description }}
            </span>
          </span>
        </li>
      </ul>
    </Teleport>
  </div>
</template>
