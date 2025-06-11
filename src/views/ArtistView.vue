<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import ArtistContainer from '@/components/ArtistContainer.vue'

import { getArtist, getArtistTopTracks } from '@/services/spotifyApi'

import type { Artist } from '@/types/artist'
import type { TopTrack } from '@/types/topTracks'

import { useDominantColor } from '@/composables/useImageColor'

const route = useRoute()

const artistScrollContainer = ref<HTMLElement | null>(null)
const artistDominantColor = ref<string>('#18181b')
const { getDominantColor } = useDominantColor()

const artistId = computed(() => route.params.id as string)

const { data: artistQuery } = useQuery<Artist>({
  queryKey: ['artist', artistId],
  queryFn: () => getArtist(artistId.value),
  enabled: !!artistId.value,
  staleTime: 1000 * 60 * 5,
})

const { data: topTracksQuery = [] } = useQuery<TopTrack[]>({
  queryKey: ['artistTopTracks', artistId],
  queryFn: () => getArtistTopTracks(artistId.value),
  enabled: !!artistId.value,
  staleTime: 1000 * 60 * 5,
})

watch(
  () => artistQuery.value?.images?.[0]?.url,
  async (url) => {
    if (url) {
      artistDominantColor.value = await getDominantColor(url)
    }
  },
)

watch(
  () => artistId.value,
  () => {
    requestAnimationFrame(() => {
      const el = document.getElementById('artist-container')
      if (el) {
        el.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  },
)
</script>

<template>
  <main
    class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full h-full"
    ref="artistScrollContainer"
  >
    <ArtistContainer :artist="artistQuery" :topTracks="topTracksQuery" />
  </main>
</template>
