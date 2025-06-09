<script setup lang="ts">
import CardPlayButton from '@components/CardPlayButton.vue'

import type { Release } from '@/types/song'
import { getTrackAlbum } from '@/services/spotifyApi'
import { usePlayerStore } from '@/stores/player'
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  release: Release
}
const props = defineProps<Props>()
const { release } = props

const playerStore = usePlayerStore()
const currentAlbum = computed(() => playerStore.currentMusic.album)
const activeItem = ref(false)

const onClick = async () => {
  if (currentAlbum.value?.id !== release.id) {
    const result = await getTrackAlbum(release.id)

    playerStore.setCurrentMusic({
      song: { ...result, images: release.images },
      album: release,
    })
  }
}

watch(currentAlbum, (newValue) => {
  activeItem.value = newValue?.id === release.id
})

onMounted(() => {
  activeItem.value = currentAlbum.value?.id === release.id
})
</script>

<template>
  <article
    @click="onClick"
    class="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl rounded-md ransi transition-all duration-300"
  >
    <div
      :class="`absolute right-4 bottom-20  transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-10 ${activeItem ? 'opacity-100 translate-y-0' : 'translate-y-4 opacity-0 '}`"
    >
      <CardPlayButton class="text-4xl hidden lg:block" :id="release.id" />
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
        <p class="text-gray-400 text-xs flex gap-x-2 flex-wrap">
          <RouterLink
            v-for="artist in release.artists"
            :to="`/artist/${artist.id}`"
            :key="artist.id"
            class="mr-2 cursor-pointer hover:underline"
          >
            {{ artist.name }}
          </RouterLink>
        </p>
      </div>
    </RouterLink>
  </article>
</template>
