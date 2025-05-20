<script setup lang="ts">
import { onMounted, ref } from 'vue'

import SongCard from '@/components/SongCard.vue'

import { getNewReleases } from '@/services/spotifyApi'
import type { Release } from '@/types/song'

const newReleases = ref<Release[]>([])

onMounted(async () => {
  try {
    newReleases.value = await getNewReleases()
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
          v-for="release in newReleases"
          :key="release.id"
          :release="release"
          class="min-w-[150px] flex-shrink-0"
        />
      </div>
    </div>
  </main>
</template>
