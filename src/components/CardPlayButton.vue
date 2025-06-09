<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import IconPlay from '@icons/IconPlay.vue'
import { computed, onMounted, ref, watch } from 'vue'
import IconPause from './icons/IconPause.vue'
import type { TopTrack } from '@/types/topTracks'

const props = defineProps<{
  id?: string | string[]
  song?: TopTrack
  isTopResult?: boolean
}>()
const { id, isTopResult, song } = props

const displayedId = ref(id)
const isPlayingPlayList = ref(false)

const playerStore = usePlayerStore()

const isPlaying = computed(() => playerStore.isPlaying)
const currentAlbum = computed(() => playerStore.currentMusic.album)

const handleClick = () => {
  playerStore.setIsPlaying(!isPlayingPlayList.value)

  if (isTopResult && song) {
    playerStore.setCurrentMusic({
      song: { ...song, images: song.album?.images },
      album: song.album || null,
    })
  }
}

watch(currentAlbum, (newValue) => {
  if (isPlaying.value && newValue?.id === displayedId.value) {
    isPlayingPlayList.value = true
  } else {
    isPlayingPlayList.value = false
  }
})

watch(isPlaying, (newValue) => {
  if (newValue && currentAlbum.value?.id === displayedId.value) {
    isPlayingPlayList.value = true
  } else {
    isPlayingPlayList.value = false
  }
})

onMounted(() => {
  if (currentAlbum.value && displayedId.value) {
    isPlayingPlayList.value = currentAlbum.value?.id === displayedId.value
  }
})
</script>

<template>
  <button @click="handleClick" class="rounded-full bg-green-400 p-2 text-black cursor-pointer">
    <IconPause v-if="isPlayingPlayList" />
    <IconPlay v-else />
  </button>
</template>
