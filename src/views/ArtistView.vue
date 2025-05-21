<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import ArtistContainer from '@/components/ArtistContainer.vue'

import { getArtist, getArtistTopTracks } from '@/services/spotifyApi'
import type { Artist } from '@/types/artist'
import type { BasedTrack } from '@/types/song'

const route = useRoute()
const artist = ref<Artist>()
const topTracks = ref<BasedTrack[]>([])

const {
  params: { id },
} = route

onMounted(async () => {
  try {
    artist.value = await getArtist(id)
    topTracks.value = await getArtistTopTracks(id)
  } catch (err) {
    console.error('Failed to load new releases', err)
  }
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full">
    <ArtistContainer :artist="artist" :topTracks="topTracks" />
  </main>
</template>
