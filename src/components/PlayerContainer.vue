<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { usePlayerStore } from '@/stores/player'

import CurrentSongCard from '@components/CurrentSongCard.vue'
import SliderContiner from '@components/SliderContiner.vue'

import IconVolumeMute from '@icons/IconVolumeMute.vue'
import IconVolumeDown from '@icons/IconVolumeDown.vue'
import IconVolumeUp from '@icons/IconVolumeUp.vue'
import IconPause from '@icons/IconPause.vue'
import IconPlay from '@icons/IconPlay.vue'

const playerStore = usePlayerStore()
const currentSong = computed(() => playerStore.currentMusic.song)
const isPlaying = computed(() => playerStore.isPlaying)

const volumeRef = ref(100)
const previousVolumeRef = ref(100)

const audioElement = ref<HTMLAudioElement | null>(null)

const handleClickVolume = () => {
  const isVolumeSilenced = volumeRef.value == 0

  if (isVolumeSilenced) {
    volumeRef.value = previousVolumeRef.value
  } else {
    volumeRef.value = 0
  }
}

watch(
  () => volumeRef.value,
  (newValue, oldValue) => {
    if (audioElement.value) {
      audioElement.value.volume = newValue / 100
      previousVolumeRef.value = oldValue
    }
  },
)
</script>

<template>
  <div v-if="currentSong" class="grid grid-cols-[1fr_auto] lg:grid-cols-[350px_1fr_350px] mt-4">
    <CurrentSongCard class="px-2" />

    <div className="flex justify-center gap-4 lg:flex-1 p-4  ">
      <button
        @click="playerStore.setIsPlaying(!isPlaying)"
        class="rounded-full bg-white text-black cursor-pointer p-2"
      >
        <IconPlay v-if="isPlaying" />
        <IconPause v-else />
      </button>
    </div>

    <div class="hidden lg:flex justify-center items-center gap-x-1 px-4">
      <button class="cursor-pointer" @click="handleClickVolume">
        <IconVolumeMute v-if="volumeRef == 0" />
        <IconVolumeDown v-else-if="volumeRef <= 75" />
        <IconVolumeUp v-else />
      </button>
      <div class="w-[70%]">
        <SliderContiner v-model="volumeRef" :max="100" />
      </div>
    </div>
  </div>
  <audio ref="audioElement"></audio>
</template>
