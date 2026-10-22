import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * Reactive match for a CSS media query string.
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)
  let mql: MediaQueryList | undefined

  function onChange(event: MediaQueryListEvent) {
    matches.value = event.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    mql = window.matchMedia(query)
    matches.value = mql.matches
    mql.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    mql?.removeEventListener('change', onChange)
  })

  return matches
}

/** Prefer reduced motion (a11y). */
export function usePrefersReducedMotion(): Ref<boolean> {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
