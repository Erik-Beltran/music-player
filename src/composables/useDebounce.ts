import { type Ref, ref, watch } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number = 500): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>

  let timeout: ReturnType<typeof setTimeout>

  watch(value, (newVal) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)
  })

  return debouncedValue
}
