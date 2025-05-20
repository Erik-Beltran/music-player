<script setup lang="ts">
import SongCard from '@/components/SongCard.vue'
import { getNewReleases } from '@/services/spotifyApi'
import type { Song } from '@/types/song'
import { onMounted, ref } from 'vue'

const newReleases = ref<Song[]>([])

onMounted(async () => {
  try {
    newReleases.value = await getNewReleases()
    console.log(newReleases.value)
  } catch (err) {
    console.error('Failed to load new releases', err)
  }
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full p-6">
    <div>
      <h2 class="text-2xl font-bold">New Releases</h2>
      <div class="flex overflow-x-auto gap-x-4 pb-2">
        <SongCard
          v-for="song in newReleases"
          :key="song.id"
          :song="song"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </div>
  </main>
</template>
