import { onScopeDispose, watch, type Ref } from 'vue'

/** Lock document scroll while `locked` is true. */
export function useBodyScrollLock(locked: Ref<boolean>) {
  let previous: string | null = null

  function lock() {
    if (previous !== null) return
    previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  function unlock() {
    if (previous === null) return
    document.body.style.overflow = previous
    previous = null
  }

  watch(
    locked,
    (v) => {
      if (v) lock()
      else unlock()
    },
    { immediate: true },
  )

  onScopeDispose(unlock)
}
