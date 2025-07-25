<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

import SongCard from '@/components/SongCard.vue'
import ArtistCard from '@/components/ArtistCard.vue'

import { getNewReleases, SearchItem } from '@/services/spotifyApi'

import type { Release } from '@/types/song'
import type { SearchResults } from '@/types/search'

const {
  data: newReleases,
  isLoading,
  isError,
} = useQuery<Release[]>({
  queryKey: ['new-releases'],
  queryFn: getNewReleases,
  staleTime: 1000 * 60 * 5,
})

const { data: homeData } = useQuery<SearchResults | null>({
  queryKey: ['home-data'],
  queryFn: () => SearchItem('bruno'),
  staleTime: 1000 * 60 * 5,
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full p-6">
    <div v-if="isLoading" class="p-8 text-white">Loading...</div>
    <div v-else-if="isError" class="p-8 text-red-500">Something went wrong. Please try again.</div>
    <section v-else>
      <h2 class="text-2xl font-bold">New Releases</h2>
      <div class="flex overflow-x-auto gap-x-4 pb-2">
        <SongCard
          v-for="release in newReleases"
          :key="release.id"
          :release="release"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </section>
    <section v-if="homeData?.artists" class="mb-10">
      <h2 class="text-2xl font-bold">Artists</h2>
      <div class="flex overflow-x-auto gap-x-4 pb-2">
        <ArtistCard
          v-for="artist in homeData.artists"
          :key="artist.id"
          :artist="artist"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </section>
    <section v-if="homeData?.albums">
      <h2 class="text-2xl font-bold">Albums</h2>
      <div class="flex overflow-x-auto gap-x-4 pb-2">
        <SongCard
          v-for="release in homeData.albums"
          :key="release.id"
          :release="release"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </section>
  </main>
</template>
