import { onMounted, onUnmounted, toValue, type MaybeRefOrGetter } from 'vue'

/**
 * Fire `handler` on pointerdown outside `target` (Element or template ref).
 */
export function useClickOutside(
  target: MaybeRefOrGetter<EventTarget | null | undefined>,
  handler: (event: PointerEvent) => void,
) {
  function onPointerDown(event: PointerEvent) {
    const el = toValue(target)
    if (!(el instanceof Element)) return
    const path = event.composedPath()
    if (path.includes(el)) return
    handler(event)
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onPointerDown, true)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', onPointerDown, true)
  })
}
