import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type QShellContext = {
  collapsed: Ref<boolean>
  collapsible: ComputedRef<boolean>
  toggleCollapsed: () => void
}

export const Q_SHELL_KEY: InjectionKey<QShellContext> = Symbol('q-shell')
