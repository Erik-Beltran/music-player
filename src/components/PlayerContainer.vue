<script setup lang="ts">
import IconPlay from './icons/IconPlay.vue'
import CurrentSongCard from './CurrentSongCard.vue'
import { usePlayerStore } from '@/stores/player'
import { computed, ref } from 'vue'
import IconVolumeMute from '@icons/IconVolumeMute.vue'
import IconVolumeDown from '@icons/IconVolumeDown.vue'
import IconVolumeUp from '@icons/IconVolumeUp.vue'
import SliderContiner from '@components/SliderContiner.vue'

const playerStore = usePlayerStore()
const currentSong = computed(() => playerStore.currentMusic.song)
const volumeRef = ref(100)

const audioElement = ref<HTMLAudioElement | null>(null)
</script>

<template>
  <div v-if="currentSong" class="grid grid-cols-[1fr_auto] lg:grid-cols-[350px_1fr_350px] mt-4">
    <CurrentSongCard class="px-2" />

    <div className="flex justify-center gap-4 lg:flex-1 p-4  ">
      <button class="rounded-full bg-white text-black cursor-pointer w-auto p-2">
        <IconPlay />
      </button>
    </div>

    <div class="hidden lg:flex justify-center items-center gap-x-1 px-4">
      <button class="cursor-pointer">
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
