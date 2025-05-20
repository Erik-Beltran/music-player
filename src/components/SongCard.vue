<script setup lang="ts">
import type { Release } from '@/types/song'
import CardPlayButton from './CardPlayButton.vue'

interface Props {
  release: Release
}
defineProps<Props>()
</script>

<template>
  <article
    class="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl rounded-md ransi transition-all duration-300"
  >
    <div
      class="absolute right-4 bottom-30 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10 translate-y-4 opacity-0"
    >
      <CardPlayButton class="text-4xl" />
    </div>

    <RouterLink
      :to="`/album/${release.id}`"
      class="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col"
    >
      <picture class="h-auto w-full flex-none aspect-auto">
        <img :src="release.images[0]?.url" alt="song cover" class="rounded mb-2" />
      </picture>
      <div class="flex flex-auto flex-col px-2">
        <h4 class="font-medium text-white text-sm">{{ release.name }}</h4>
        <p class="text-gray-400 text-xs">
          {{ release.artists.map((artist) => artist.name).join(', ') }}
        </p>
      </div>
    </RouterLink>
  </article>
</template>
