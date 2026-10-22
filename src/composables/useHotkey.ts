import { onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

export type UseHotkeyOptions = {
  /** When false, listener is ignored */
  enabled?: MaybeRefOrGetter<boolean>
  /** Ignore when focus is in editable fields (default true) */
  ignoreInputs?: boolean
  /** Use capture phase (default true) */
  capture?: boolean
}

function normalizeCombo(combo: string) {
  return combo
    .toLowerCase()
    .replace(/\s+/g, '')
    .split('+')
    .filter(Boolean)
    .sort()
    .join('+')
}

function eventCombo(event: KeyboardEvent) {
  const parts: string[] = []
  if (event.metaKey) parts.push('meta')
  if (event.ctrlKey) parts.push('ctrl')
  if (event.altKey) parts.push('alt')
  if (event.shiftKey) parts.push('shift')

  const key = event.key.toLowerCase()
  if (!['meta', 'control', 'ctrl', 'alt', 'shift'].includes(key)) {
    parts.push(key === ' ' ? 'space' : key)
  }

  return parts.sort().join('+')
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (target.isContentEditable) return true
  return Boolean(target.closest('[contenteditable="true"]'))
}

/**
 * Register one or more keyboard shortcuts (e.g. `meta+k`, `ctrl+k`).
 */
export function useHotkey(
  combos: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: UseHotkeyOptions = {},
) {
  const list = (Array.isArray(combos) ? combos : [combos]).map(normalizeCombo)
  const ignoreInputs = options.ignoreInputs ?? true
  const capture = options.capture ?? true

  function onKeydown(event: KeyboardEvent) {
    if (toValue(options.enabled) === false) return
    if (ignoreInputs && isEditableTarget(event.target)) return

    const pressed = eventCombo(event)
    if (!list.includes(pressed)) return

    event.preventDefault()
    handler(event)
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown, capture)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown, capture)
  })
}
