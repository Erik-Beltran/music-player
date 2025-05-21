<script setup lang="ts">
import type { Artist } from '@/types/artist'
import IconArtist from './icons/IconArtist.vue'

interface Props {
  artist: Artist
}
defineProps<Props>()
</script>

<template>
  <article
    class="relative hover:bg-zinc-800 shadow-lg hover:shadow-xl rounded-md ransi transition-all duration-300"
  >
    <RouterLink
      :to="`/album/${artist.id}`"
      class="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col"
    >
      <picture class="h-auto w-full flex-none">
        <img
          v-if="artist.images[0]"
          :src="artist.images[0]?.url"
          alt="song cover"
          class="rounded-full mb-2 aspect-square bg-zinc-800"
        />
        <IconArtist v-else class="bg-zinc-800 rounded-full w-full h-full" />
      </picture>
      <div class="flex flex-auto flex-col px-2">
        <RouterLink
          :to="`/artist/${artist.id}`"
          :key="artist.id"
          class="mr-2 cursor-pointer hover:underline"
        >
          <h4 class="font-medium text-white text-sm">{{ artist.name }}</h4>
        </RouterLink>

        <p class="text-gray-400 text-xs flex gap-x-2 flex-wrap">Artist</p>
      </div>
    </RouterLink>
  </article>
</template>
