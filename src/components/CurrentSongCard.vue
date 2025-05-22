<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue'

const playerStore = usePlayerStore()

const currentSong = computed(() => playerStore.currentMusic.song)
</script>
<template>
  <div class="flex items-center gap-5 relative overflow-hidden">
    <picture
      v-if="currentSong?.images"
      className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden"
    >
      <img :src="currentSong?.images[0].url" alt="album cover" />
    </picture>

    <div className="flex flex-col">
      <h3 className="font-semibold text-sm block">{{ currentSong?.name }}</h3>
      <p class="text-gray-400 text-xs flex gap-x-2 flex-wrap">
        <RouterLink
          v-for="artist in currentSong?.artists"
          :to="`/artist/${artist.id}`"
          :key="artist.id"
          class="mr-2 cursor-pointer hover:underline"
        >
          {{ artist.name }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>
