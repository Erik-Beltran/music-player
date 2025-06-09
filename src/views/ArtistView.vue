<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import ArtistContainer from '@/components/ArtistContainer.vue'

import { getArtist, getArtistTopTracks } from '@/services/spotifyApi'
import type { Artist } from '@/types/artist'
import type { TopTrack } from '@/types/topTracks'

const route = useRoute()
const artist = ref<Artist>()
const topTracks = ref<TopTrack[]>([])

async function loadArtistData(id: string) {
  try {
    artist.value = await getArtist(id)
    topTracks.value = await getArtistTopTracks(id)
  } catch (err) {
    console.error('Failed to load artist data', err)
  }
}

onMounted(() => {
  if (route.params.id) {
    loadArtistData(route.params.id as string)
  }
})

// Observa cambios en el id y recarga los datos
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      loadArtistData(newId as string)
    }
  },
)
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full">
    <ArtistContainer :artist="artist" :topTracks="topTracks" />
  </main>
</template>
