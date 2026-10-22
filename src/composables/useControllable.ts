import { computed, ref, type Ref, type WritableComputedRef } from 'vue'

export type UseControllableOptions<T> = {
  /** Controlled value from parent */
  prop?: T
  defaultValue: T
  onChange?: (value: T) => void
}

/**
 * Unify controlled (`prop` + `onChange`) and uncontrolled (`defaultValue`) state.
 */
export function useControllable<T>(
  options: UseControllableOptions<T>,
): {
  value: WritableComputedRef<T>
  isControlled: Ref<boolean>
} {
  const isControlled = computed(() => options.prop !== undefined)
  const inner = ref(options.defaultValue) as Ref<T>

  const value = computed({
    get(): T {
      return isControlled.value ? (options.prop as T) : inner.value
    },
    set(next: T) {
      if (!isControlled.value) {
        inner.value = next
      }
      options.onChange?.(next)
    },
  })

  return {
    value,
    isControlled,
  }
}
