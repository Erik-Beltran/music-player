<script setup lang="ts">
import SongsTable from '@components/SongsTable.vue'
import CardPlayButton from '@components/CardPlayButton.vue'

import type { Artist } from '@/types/artist'
import type { BasedTrack } from '@/types/song'
import { formatNumber } from '@/utils/formatter'

interface Props {
  artist: Artist | undefined
  topTracks: BasedTrack[] | []
}
defineProps<Props>()
</script>
<template>
  <div
    v-if="artist"
    id="playlist-container"
    class="bg-zinc-900 flex-col flex h-full overflow-x-hidden"
  >
    <div class="px-6 pt-10">
      <header class="flex lg:flex-row gap-8 px-6 pt-10 flex-col">
        <picture class="h-52 w-52 flex-none aspect-auto">
          <img
            v-if="artist.images"
            :src="artist.images[0].url"
            :alt="`cover of ${artist.name}`"
            class="object-cover w-full h-full rounded-md"
          />
        </picture>

        <div class="flex flex-col justify-between">
          <h2 class="text-5xl font-bold block text-white">{{ artist.name }}</h2>

          <div class="text-sm text-gray-300 flex gap-x-2">
            <span v-if="artist.followers" class="text-white">{{
              formatNumber(artist.followers.total) + ' Followers'
            }}</span>
          </div>
        </div>
      </header>

      <div class="pl-6 pt-6">
        <CardPlayButton class="text-4xl" />
      </div>

      <section class="lg:p-8 mt-2">
        <h3 class="font-bold text-2xl mb-2">Popular</h3>
        <SongsTable :songs="topTracks" :key="artist.id" :show-artist="false" />
      </section>
    </div>
  </div>
</template>
