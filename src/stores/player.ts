import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Album, TopTrack } from '@/types/topTracks'

interface MusicData {
  song: TopTrack | null
  album: Album | null
}

export const usePlayerStore = defineStore('player', () => {
  const isPlaying = ref(false)

  const currentMusic = ref<MusicData>({
    song: null,
    album: null,
  })

  const setIsPlaying = (value: boolean) => {
    isPlaying.value = value ? true : false
  }

  const setCurrentMusic = (music: MusicData) => {
    currentMusic.value = music
  }

  return { isPlaying, setIsPlaying, currentMusic, setCurrentMusic }
})
