import { reactive, ref, type Reactive, type Ref } from 'vue'

export type FormErrors<T extends Record<string, unknown>> = Partial<
  Record<keyof T & string, string>
>

export type FormRule<T extends Record<string, unknown>, K extends keyof T> = (
  value: T[K],
  values: T,
) => true | string

export type FormRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: FormRule<T, K> | Array<FormRule<T, K>>
}

export type UseFormOptions<T extends Record<string, unknown>> = {
  initialValues: T
  rules?: FormRules<T>
}

export type UseFormReturn<T extends Record<string, unknown>> = {
  values: Reactive<T>
  errors: Reactive<FormErrors<T>>
  submitting: Ref<boolean>
  validate: () => boolean
  reset: (next?: Partial<T>) => void
  clearErrors: () => void
  handleSubmit: (
    onValid: (values: T) => void | Promise<void>,
  ) => (event?: Event) => Promise<void>
}

function runRules<T extends Record<string, unknown>, K extends keyof T>(
  rules: FormRule<T, K> | Array<FormRule<T, K>> | undefined,
  value: T[K],
  values: T,
): string | undefined {
  if (!rules) return undefined
  const list = Array.isArray(rules) ? rules : [rules]
  for (const rule of list) {
    const result = rule(value, values)
    if (result !== true) return result
  }
  return undefined
}

export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>,
): UseFormReturn<T> {
  const values = reactive({ ...options.initialValues }) as Reactive<T>
  const errors = reactive({}) as Reactive<FormErrors<T>>
  const submitting = ref(false)
  const initial = { ...options.initialValues }

  function clearErrors() {
    const bag = errors as FormErrors<T>
    for (const key of Object.keys(bag)) {
      delete bag[key as keyof T & string]
    }
  }

  function validate(): boolean {
    clearErrors()
    const rules = options.rules
    if (!rules) return true

    let ok = true
    const bag = errors as FormErrors<T>
    const current = values as T
    for (const key of Object.keys(rules) as Array<keyof T & string>) {
      const message = runRules(rules[key], current[key], current)
      if (message) {
        bag[key] = message
        ok = false
      }
    }
    return ok
  }

  function reset(next?: Partial<T>) {
    const source = { ...initial, ...next }
    const current = values as T
    for (const key of Object.keys(current) as Array<keyof T & string>) {
      current[key] = source[key] as T[typeof key]
    }
    clearErrors()
    submitting.value = false
  }

  function handleSubmit(onValid: (values: T) => void | Promise<void>) {
    return async (event?: Event) => {
      event?.preventDefault()
      if (submitting.value) return
      if (!validate()) return

      submitting.value = true
      try {
        await onValid({ ...(values as T) })
      } finally {
        submitting.value = false
      }
    }
  }

  return {
    values,
    errors,
    submitting,
    validate,
    reset,
    clearErrors,
    handleSubmit,
  }
}

/** Common field rules for QForm demos and apps */
export const formRules = {
  required:
    (message = '必填') =>
    (value: unknown) => {
      if (value === null || value === undefined) return message
      if (typeof value === 'string' && value.trim() === '') return message
      return true
    },
  minLength:
    (min: number, message?: string) =>
    (value: unknown) => {
      const str = String(value ?? '')
      if (str.length < min) return message ?? `至少 ${min} 个字符`
      return true
    },
  email:
    (message = '邮箱格式不正确') =>
    (value: unknown) => {
      const str = String(value ?? '').trim()
      if (!str) return true
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) ? true : message
    },
}
