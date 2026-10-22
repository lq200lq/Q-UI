import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type QRadioGroupContext = {
  name: ComputedRef<string>
  modelValue: Ref<string | number | boolean | undefined>
  disabled: ComputedRef<boolean>
  invalid: ComputedRef<boolean>
  setValue: (value: string | number | boolean) => void
}

export const QRadioGroupKey: InjectionKey<QRadioGroupContext> =
  Symbol('QRadioGroup')
