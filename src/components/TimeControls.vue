<script setup lang="ts">
import { defineEmits } from 'vue'

import SliderContiner from '@components/SliderContiner.vue'
import { formatAudioTime } from '@/utils/formatter'

defineProps({
  currentTime: Number,
  duration: Number,
})

const emit = defineEmits(['update:currentTime'])

function onSliderChange(value: number) {
  emit('update:currentTime', value)
}
</script>

<template>
  <div class="flex gap-x-3 text-xs pt-2 items-center w-full justify-center">
    <span>{{ formatAudioTime(currentTime ?? 0) }}</span>

    <div class="w-full lg:max-w-[60%]">
      <SliderContiner
        :max="duration ?? 0"
        :model-value="currentTime ?? 0"
        @update:model-value="onSliderChange"
      />
    </div>

    <span>{{ formatAudioTime(duration ?? 0) }}</span>
  </div>
</template>
