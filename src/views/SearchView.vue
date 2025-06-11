<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ArtistCard from '@/components/ArtistCard.vue'
import SongCard from '@/components/SongCard.vue'
import SongsTable from '@/components/SongsTable.vue'
import TopResultCard from '@/components/TopResultCard.vue'

import { SearchItem } from '@/services/spotifyApi'
import type { SearchResults } from '@/types/search'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const query = computed(() => route.params.query as string)

const { data: items } = useQuery<SearchResults>({
  queryKey: ['search', query],
  queryFn: () => SearchItem(query.value),
  enabled: computed(() => !!query.value),
  staleTime: 1000 * 60 * 5,
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full p-6">
    <section v-if="items?.tracks" class="mb-10 flex justify-between gap-5 flex-col lg:flex-row">
      <div class="flex flex-col gap-y-2 flex-1">
        <h2 class="text-2xl font-bold">Top Result</h2>
        <TopResultCard
          v-if="items.tracks[0]"
          :name="items.tracks[0].name"
          :image="items.tracks[0].album ? items.tracks[0].album.images[0].url : ''"
          :id="items.tracks[0].id"
          :artists="items.tracks[0].artists"
          :song="items.tracks[0]"
        />
      </div>
      <div class="lg:w-[60%]">
        <h2 class="text-2xl font-bold">Songs</h2>
        <SongsTable :songs="items.tracks" :show-artist="true" :show-image="true" />
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
