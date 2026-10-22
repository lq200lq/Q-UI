import { computed, ref, type MaybeRefOrGetter, type Ref, toValue } from 'vue'

export type UseListKeyboardOptions = {
  /** Total item count (or getter) */
  count: MaybeRefOrGetter<number>
  /** Indexes that cannot be activated */
  disabledIndexes?: MaybeRefOrGetter<ReadonlyArray<number>>
  loop?: boolean
  initialIndex?: number
  onSelect?: (index: number) => void
}

/**
 * Arrow / Home / End / Enter keyboard navigation for listboxes and menus.
 */
export function useListKeyboard(options: UseListKeyboardOptions): {
  activeIndex: Ref<number>
  onKeydown: (event: KeyboardEvent) => void
  setActiveIndex: (index: number) => void
  move: (delta: number) => void
} {
  const activeIndex = ref(options.initialIndex ?? -1)
  const loop = options.loop ?? true

  const enabledIndexes = computed(() => {
    const count = toValue(options.count)
    const disabled = new Set(toValue(options.disabledIndexes) ?? [])
    const list: number[] = []
    for (let i = 0; i < count; i++) {
      if (!disabled.has(i)) list.push(i)
    }
    return list
  })

  function setActiveIndex(index: number) {
    activeIndex.value = index
  }

  function move(delta: number) {
    const list = enabledIndexes.value
    if (list.length === 0) return
    const currentPos = list.indexOf(activeIndex.value)
    let nextPos: number
    if (currentPos === -1) {
      nextPos = delta > 0 ? 0 : list.length - 1
    } else if (loop) {
      nextPos = (currentPos + delta + list.length) % list.length
    } else {
      nextPos = Math.min(list.length - 1, Math.max(0, currentPos + delta))
    }
    activeIndex.value = list[nextPos]!
  }

  function onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        move(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        move(-1)
        break
      case 'Home': {
        event.preventDefault()
        const first = enabledIndexes.value[0]
        if (first != null) activeIndex.value = first
        break
      }
      case 'End': {
        event.preventDefault()
        const last = enabledIndexes.value[enabledIndexes.value.length - 1]
        if (last != null) activeIndex.value = last
        break
      }
      case 'Enter':
      case ' ': {
        if (activeIndex.value < 0) break
        event.preventDefault()
        options.onSelect?.(activeIndex.value)
        break
      }
      default:
        break
    }
  }

  return {
    activeIndex,
    onKeydown,
    setActiveIndex,
    move,
  }
}
