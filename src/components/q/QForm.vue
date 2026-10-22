<script setup lang="ts">
import { useTemplateRef } from 'vue'

withDefaults(
  defineProps<{
    /** Disable native browser validation UI; custom rules via useForm */
    novalidate?: boolean
    disabled?: boolean
  }>(),
  {
    novalidate: true,
    disabled: false,
  },
)

const emit = defineEmits<{
  submit: [event: SubmitEvent]
}>()

const formRef = useTemplateRef<HTMLFormElement>('formRef')

function onSubmit(event: SubmitEvent) {
  emit('submit', event)
}

function requestSubmit() {
  formRef.value?.requestSubmit()
}

function reset() {
  formRef.value?.reset()
}

defineExpose({ requestSubmit, reset, formRef })
</script>

<template>
  <form
    ref="formRef"
    class="q-form flex w-full flex-col gap-4"
    :novalidate="novalidate"
    :aria-disabled="disabled || undefined"
    @submit.prevent="onSubmit"
  >
    <fieldset
      class="m-0 flex min-w-0 flex-col gap-4 border-0 p-0"
      :disabled="disabled"
    >
      <slot />
    </fieldset>
  </form>
</template>
