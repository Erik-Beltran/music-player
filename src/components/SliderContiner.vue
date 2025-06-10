<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  max: number | string
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const value = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal
  },
)

const updateValue = (event: Event) => {
  const newValue = Number((event.target as HTMLInputElement).value)
  emit('update:modelValue', newValue)
}
</script>

<template>
  <input
    type="range"
    class="rounded-lg w-full h-2 accent-white outline-0 cursor-pointer hover:accent-green-500"
    :max="max"
    min="0"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<style>
input[type='range'] {
  outline: 1px solid white;
}

input[type='range']::-webkit-slider-thumb {
  opacity: 0;
  transition: opacity 0.2s;
}

input[type='range']:hover::-webkit-slider-thumb {
  opacity: 1;
}

input[type='range']::-moz-range-thumb {
  opacity: 0;
  transition: opacity 0.2s;
}

input[type='range']:hover::-moz-range-thumb {
  opacity: 1;
}
</style>
