import { readonly, ref } from 'vue'
import type { IconName } from '../components/q/icons/registry'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export type ToastInput = {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  /** Override default icon for variant */
  icon?: IconName
}

export type ToastItem = ToastInput & {
  id: string
  variant: ToastVariant
  duration: number
}

const toasts = ref<ToastItem[]>([])
const timers = new Map<string, ReturnType<typeof setTimeout>>()

let seed = 0

function uid() {
  seed += 1
  return `toast-${Date.now()}-${seed}`
}

export function dismissToast(id: string) {
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

export function toast(input: ToastInput | string) {
  const payload: ToastInput = typeof input === 'string' ? { description: input } : input
  const id = uid()
  const duration = payload.duration ?? 3200
  const item: ToastItem = {
    id,
    title: payload.title,
    description: payload.description,
    variant: payload.variant ?? 'default',
    duration,
    icon: payload.icon,
  }

  toasts.value = [...toasts.value, item]

  if (duration > 0) {
    timers.set(
      id,
      setTimeout(() => dismissToast(id), duration),
    )
  }

  return id
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    toast,
    dismiss: dismissToast,
  }
}

/** Internal — QToaster reads the live list */
export function useToastState() {
  return {
    toasts,
    dismiss: dismissToast,
  }
}
