<script setup lang="ts">
import { useRoute } from 'vue-router'

import AlbumContainer from '@/components/AlbumContainer.vue'

import { getAlbum } from '@/services/spotifyApi'
import type { Album } from '@/types/album'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()

const {
  params: { id },
} = route

const { data: album } = useQuery<Album>({
  queryKey: ['album', id],
  queryFn: () => getAlbum(id),
  staleTime: Infinity,
})
</script>

<template>
  <main class="[grid-area:main] rounded-lg bg-zinc-900 overflow-y-auto w-full">
    <AlbumContainer :album="album" />
  </main>
</template>
