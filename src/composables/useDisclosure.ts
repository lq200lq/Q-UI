import { readonly, ref, watch, type MaybeRefOrGetter, toValue } from 'vue'

export type UseDisclosureOptions = {
  initial?: boolean
  /** When set, open state follows this ref/getter (controlled) */
  open?: MaybeRefOrGetter<boolean>
  onOpenChange?: (open: boolean) => void
}

/**
 * Open / close / toggle for overlays (Modal, Popover, Dropdown, etc.).
 */
export function useDisclosure(options: UseDisclosureOptions = {}) {
  const inner = ref(options.initial ?? false)

  if (options.open !== undefined) {
    watch(
      () => toValue(options.open!),
      (v) => {
        inner.value = v
      },
      { immediate: true },
    )
  }

  function set(next: boolean) {
    inner.value = next
    options.onOpenChange?.(next)
  }

  function show() {
    set(true)
  }

  function hide() {
    set(false)
  }

  function toggle() {
    set(!inner.value)
  }

  return {
    open: readonly(inner),
    show,
    hide,
    toggle,
  }
}
