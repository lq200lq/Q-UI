import type { InjectionKey, Ref } from 'vue'
import type { IconName } from './icons'

export type QTreeNode = {
  key: string
  label: string
  icon?: IconName
  disabled?: boolean
  children?: QTreeNode[]
}

export type QTreeContext = {
  selected: Ref<string | null>
  isExpanded: (key: string) => boolean
  toggleExpanded: (key: string) => void
  select: (key: string) => void
}

export const Q_TREE_KEY: InjectionKey<QTreeContext> = Symbol('q-tree')
