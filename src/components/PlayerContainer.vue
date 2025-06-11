<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { usePlayerStore } from '@/stores/player'

import CurrentSongCard from '@components/CurrentSongCard.vue'
import SliderContiner from '@components/SliderContiner.vue'
import PlayButton from '@components/PlayButton.vue'
import PlayerModalMobile from '@components/PlayerModalMobile.vue'
import TimeControls from '@components/TimeControls.vue'

import IconVolumeUp from '@icons/IconVolumeUp.vue'
import IconVolumeMute from '@icons/IconVolumeMute.vue'
import IconVolumeDown from '@icons/IconVolumeDown.vue'

import { useDominantColor } from '@/composables/useImageColor'
import { getRandomSong } from '@/utils/music'

const { getDominantColor } = useDominantColor()
const playerStore = usePlayerStore()

const currentSong = computed(() => playerStore.currentMusic.song)
const { isPlaying } = storeToRefs(playerStore)
const audioSrc = ref('')
const volumeRef = ref(100)
const previousVolumeRef = ref(100)
const duration = ref<number | string>(0)
const currentTime = ref(0)
const isReadyToPlay = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)
const isMobileModalOpen = ref(false)
const dominantColor = ref('#18181b')

const isMobile = ref(window.innerWidth < 1024)

const updateMobileStatus = () => {
  isMobile.value = window.innerWidth < 1024
}

// const backgroundStyle = computed(() => {
//   return isMobile.value
//     ? `background: linear-gradient(to bottom, ${dominantColor.value} 10%, #18181b 60%);`
//     : 'background: none;'
// })

function openModalIfMobile() {
  if (isMobile.value) {
    isMobileModalOpen.value = true
  }
}

const handleClickVolume = () => {
  const isVolumeSilenced = volumeRef.value == 0

  if (isVolumeSilenced) {
    volumeRef.value = previousVolumeRef.value
  } else {
    volumeRef.value = 0
  }
}

const playAudio = () => {
  if (audioElement.value && isReadyToPlay.value && isPlaying.value) {
    audioElement.value.play()
  }
}

const pauseAudio = () => {
  if (audioElement.value) {
    audioElement.value.pause()
  }
}
const onLoadedMetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration
  }
}

const handleTimeUpdate = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
  }
}

const onCanPlay = () => {
  isReadyToPlay.value = true
  playAudio()
}

async function updateDominantColor() {
  const imageUrl = currentSong.value?.images?.[0]?.url

  if (imageUrl) {
    dominantColor.value = await getDominantColor(imageUrl)
  }
}

onMounted(() => {
  if (audioElement.value) {
    audioElement.value.addEventListener('timeupdate', handleTimeUpdate)
  }

  updateDominantColor()
  window.addEventListener('resize', updateMobileStatus)
})

onBeforeUnmount(() => {
  if (audioElement.value) {
    audioElement.value.removeEventListener('timeupdate', handleTimeUpdate)
  }
  window.removeEventListener('resize', updateMobileStatus)
})

watch(
  () => volumeRef.value,
  (newValue, oldValue) => {
    if (audioElement.value) {
      audioElement.value.volume = newValue / 100
      previousVolumeRef.value = oldValue
    }
  },
)

watch(currentSong, (newValue) => {
  if (newValue) {
    const index = getRandomSong()
    audioSrc.value = `/songs/0${index}.mp3`
    isReadyToPlay.value = false
    updateDominantColor()

    if (audioElement.value) {
      audioElement.value.load()
    }
  }
})

const onSliderChange = (value: number) => {
  if (audioElement.value) {
    audioElement.value.currentTime = value
  }
}

watch(isPlaying, (newValue) => {
  if (newValue) {
    playAudio()
  } else {
    pauseAudio()
  }
})
</script>

<template>
  <div
    v-if="currentSong"
    class="grid grid-cols-[1fr_auto] lg:grid-cols-[350px_1fr_350px] mt-4 py-3 lg:py-6 max-lg:px-6 max-lg:relative overflow-hidden"
    :style="
      isMobile && `background: linear-gradient(to bottom, ${dominantColor} 10%, #18181b 60%);`
    "
  >
    <PlayerModalMobile
      :open="isMobileModalOpen"
      :duration="Number(duration) || 0"
      :currentTime="currentTime || 0"
      :dominantColor="dominantColor"
      @close="isMobileModalOpen = false"
      @update:currentTime="onSliderChange"
    />

    <CurrentSongCard class="px-2" @click="openModalIfMobile" />

    <div class="flex justify-center flex-col items-center">
      <PlayButton />

      <div
        class="max-lg:absolute max-lg:-bottom-2.5 max-lg:-right-7 max-lg:-left-7 lg:flex lg:w-full"
      >
        <TimeControls
          :currentTime="currentTime"
          :duration="Number(duration ?? 0)"
          @update:currentTime="onSliderChange"
        />
      </div>
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
  <audio
    ref="audioElement"
    :src="audioSrc"
    @loadedmetadata="onLoadedMetadata"
    :oncanplay="onCanPlay"
  ></audio>
</template>
