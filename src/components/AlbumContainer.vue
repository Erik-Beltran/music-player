<script setup lang="ts">
import CardPlayButton from '@components/CardPlayButton.vue'
import SongsTable from '@components/SongsTable.vue'

import type { Album } from '@/types/album'

interface Props {
  album: Album | undefined
}
defineProps<Props>()
</script>
<template>
  <div v-if="album" class="relative bg-zinc-900 flex-col flex h-full overflow-x-hidden">
    <div class="relative z-10 px-6 pt-10">
      <header class="flex lg:flex-row gap-8 px-6 pt-10 flex-col">
        <picture class="h-52 w-52 flex-none aspect-auto">
          <img
            v-if="album.images"
            :src="album.images[0].url"
            :alt="`cover of ${album.name}`"
            class="object-cover w-full h-full rounded-md"
          />
        </picture>

        <div class="flex flex-col justify-between">
          <h2 class="flex flex-1 items-end">Album</h2>
          <div>
            <h2 class="text-5xl font-bold block text-white">{{ album.name }}</h2>
          </div>

          <div class="flex-1 flex items-end">
            <div class="text-sm text-gray-300 flex gap-x-2">
              <p v-if="album.artists" class="text-white font-bold">
                <RouterLink
                  v-for="artist in album.artists"
                  :to="`/artist/${artist.id}`"
                  :key="artist.id"
                  class="mr-2 cursor-pointer hover:underline"
                >
                  {{ artist.name }}
                </RouterLink>
                •
              </p>
              <p>
                <span v-if="album.total_tracks" class="text-white"
                  >{{ album.total_tracks }} songs</span
                >, about 2 hr 25 min
              </p>
            </div>
          </div>
        </div>
      </header>
      <div class="pl-6 pt-6">
        <CardPlayButton class="text-4xl" />
      </div>

      <section class="lg:p-8 mt-2 h-auto overflow-y-auto">
        <SongsTable :songs="album.tracks.items" :key="album.id" />
      </section>
    </div>
    <!-- <div
      :style="`background: linear-gradient(to bottom, ${darkColor} 10%, #18181b 60%);`"
      class="absolute inset-0 via-zinc-900/80"
    ></div> -->
  </div>
</template>
