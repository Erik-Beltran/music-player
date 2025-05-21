<script setup lang="ts">
import type { Artist } from '@/types/common'
import CardPlayButton from '@components/CardPlayButton.vue'

interface Props {
  name: string
  artists: Artist[]
  image: string
  id: string
}
defineProps<Props>()
</script>

<template>
  <div
    class="group relative shadow-lg hover:shadow-xl rounded-md ransi transition-all duration-300 bg-zinc-800 p-6 h-full flex flex-col justify-center gap-y-4"
  >
    <div
      class="absolute right-4 bottom-5 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10 translate-y-4 opacity-0"
    >
      <CardPlayButton class="text-3xl" />
    </div>
    <picture v-if="image">
      <img :src="image" :alt="name" class="w-20 h-20" />
    </picture>
    <div>
      <h3 class="font-bold text-4xl">{{ name }}</h3>
      <span class="text-gray-400 text-xs flex gap-x-2 flex-wrap">
        <RouterLink
          v-for="artist in artists"
          :to="`/artist/${artist.id}`"
          :key="artist.id"
          class="mr-2 cursor-pointer hover:underline"
        >
          {{ artist.name }}
        </RouterLink>
      </span>
    </div>
  </div>
</template>
