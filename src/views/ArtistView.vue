<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import ArtistContainer from '@/components/ArtistContainer.vue'

import { getArtist, getArtistTopTracks } from '@/services/spotifyApi'
import type { Artist } from '@/types/artist'
import type { TopTrack } from '@/types/topTracks'
import { useDominantColor } from '@/composables/useImageColor'

const route = useRoute()
const artist = ref<Artist>()
const topTracks = ref<TopTrack[]>([])
const artistScrollContainer = ref<HTMLElement | null>(null)

const artistDominantColor = ref<string>('#18181b')

const { getDominantColor } = useDominantColor()

async function loadArtistData(id: string) {
  try {
    artist.value = await getArtist(id)
    topTracks.value = await getArtistTopTracks(id)

    if (artist.value?.images?.[0]?.url) {
      artistDominantColor.value = await getDominantColor(artist.value.images[0].url)
    }
  } catch (err) {
    console.error('Failed to load artist data', err)
  }
}

onMounted(() => {
  if (route.params.id) {
    loadArtistData(route.params.id as string)
  }
})

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (newId && newId !== oldId) {
      await loadArtistData(newId as string)

      // Espera a que DOM se actualice para hacer scroll
      requestAnimationFrame(() => {
        const el = document.getElementById('artist-container')
        if (el) {
          el.scrollTo({ top: 0, behavior: 'smooth' })
        }
      })
    }
  },
)
</script>

<template>
  <main
    class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full h-full"
    ref="artistScrollContainer"
  >
    <ArtistContainer :artist="artist" :topTracks="topTracks" />
  </main>
</template>
