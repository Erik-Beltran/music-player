<script setup lang="ts">
import type { Album } from '@/types/album'
import AlbumTable from '@components/AlbumTable.vue'
import CardPlayButton from './CardPlayButton.vue'

interface Props {
  album: Album | undefined
}
defineProps<Props>()
</script>
<template>
  <div
    v-if="album"
    id="playlist-container"
    class="relative bg-zinc-900 flex-col flex h-full overflow-x-hidden"
  >
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
                {{ album.artists.map((artist) => artist.name).join(', ') }} •
              </p>
              <p class="mt-1">
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

      <section class="lg:p-8 mt-2">
        <AlbumTable :songs="album.tracks.items" :key="album.id" />
      </section>
    </div>
    <!-- <div
      :style="`background: linear-gradient(to bottom, ${darkColor} 10%, #18181b 60%);`"
      class="absolute inset-0 via-zinc-900/80"
    ></div> -->
  </div>
</template>
