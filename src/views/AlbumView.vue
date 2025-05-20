<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import AlbumContainer from '@/components/AlbumContainer.vue'

import { getAlbum } from '@/services/spotifyApi'
import type { Album } from '@/types/album'

const route = useRoute()
const album = ref<Album>()

const {
  params: { id },
} = route

onMounted(async () => {
  try {
    album.value = await getAlbum(id)
  } catch (err) {
    console.error('Failed to load new releases', err)
  }
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full">
    <AlbumContainer :album="album" />
  </main>
</template>
