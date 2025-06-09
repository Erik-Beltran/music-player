<script setup lang="ts">
import { onMounted, ref } from 'vue'

import SongCard from '@/components/SongCard.vue'

import { getNewReleases, SearchItem } from '@/services/spotifyApi'
import type { Release } from '@/types/song'
import type { SearchResults } from '@/types/search'
import ArtistCard from '@/components/ArtistCard.vue'

const newReleases = ref<Release[]>([])
const items = ref<SearchResults | null>(null)

onMounted(async () => {
  try {
    newReleases.value = await getNewReleases()
    items.value = await SearchItem('bruno')
  } catch (err) {
    console.error('Failed to load new releases', err)
  }
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full p-6">
    <section>
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
    <section v-if="items?.artists" class="mb-10">
      <h2 class="text-2xl font-bold">Artists</h2>
      <div class="flex overflow-x-auto gap-x-4 pb-2">
        <ArtistCard
          v-for="artist in items.artists"
          :key="artist.id"
          :artist="artist"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </section>
    <section v-if="items?.albums">
      <h2 class="text-2xl font-bold">Albums</h2>
      <div class="flex overflow-x-auto gap-x-4 pb-2">
        <SongCard
          v-for="release in items.albums"
          :key="release.id"
          :release="release"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </section>
  </main>
</template>
