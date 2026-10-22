import { onMounted, onUnmounted, watch, type Ref } from 'vue'

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

function getFocusable(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.offsetParent !== null,
  )
}

/**
 * Keep Tab / Shift+Tab cycling inside `container` while `active`.
 * Also moves initial focus into the container when activated.
 */
export function useFocusTrap(
  container: Ref<HTMLElement | null | undefined>,
  active: Ref<boolean>,
) {
  let lastActive: HTMLElement | null = null

  function focusFirst() {
    const root = container.value
    if (!root) return
    const items = getFocusable(root)
    ;(items[0] ?? root).focus()
  }

  function onKeydown(event: KeyboardEvent) {
    if (!active.value || event.key !== 'Tab') return
    const root = container.value
    if (!root) return

    const items = getFocusable(root)
    if (items.length === 0) {
      event.preventDefault()
      root.focus()
      return
    }

    const first = items[0]!
    const last = items[items.length - 1]!
    const current = document.activeElement as HTMLElement | null

    if (event.shiftKey) {
      if (current === first || !root.contains(current)) {
        event.preventDefault()
        last.focus()
      }
    } else if (current === last) {
      event.preventDefault()
      first.focus()
    }
  }

  watch(active, (v) => {
    if (v) {
      lastActive = document.activeElement as HTMLElement | null
      // next frame so Teleport content is mounted
      requestAnimationFrame(() => focusFirst())
    } else if (lastActive && typeof lastActive.focus === 'function') {
      lastActive.focus()
      lastActive = null
    }
  })

  onMounted(() => {
    document.addEventListener('keydown', onKeydown, true)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown, true)
  })
}
