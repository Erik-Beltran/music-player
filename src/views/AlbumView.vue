<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import AlbumContainer from '@/components/AlbumContainer.vue'

import { getAlbum } from '@/services/spotifyApi'
import type { Album } from '@/types/album'
import { usePlayerStore } from '@/stores/player'

const route = useRoute()

const {
  params: { id },
} = route

const playerStore = usePlayerStore()

const currentSong = computed(() => playerStore.currentMusic.song)
const { data: album } = useQuery<Album>({
  queryKey: ['album', id],
  queryFn: () => getAlbum(id),
  staleTime: Infinity,
})

watch(album, (newAlbum) => {
  if (newAlbum) {
    playerStore.setCurrentMusic({
      album: album.value ?? null,
      song: currentSong.value,
    })
  }
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full">
    <AlbumContainer :album="album" />
  </main>
</template>
