<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import PlayingVisualizer from '@components/PlayingVisualizer.vue'
import IconTime from '@icons/IconTime.vue'
import IconPlay from '@icons/IconPlay.vue'

import { usePlayerStore } from '@/stores/player'
import type { TopTrack } from '@/types/topTracks'
import { formatTime } from '@/utils/formatter'

interface Props {
  songs: TopTrack[]
  showArtist?: boolean
  showImage?: boolean
}

withDefaults(defineProps<Props>(), {
  showArtist: true,
  showImage: false,
})

const playerStore = usePlayerStore()
const { currentMusic } = storeToRefs(playerStore)

const currentSong = computed(() => currentMusic.value.song)
const currentAlbum = computed(() => currentMusic.value.album)

const isPlaying = computed(() => playerStore.isPlaying)

const handleClick = (song: TopTrack) => {
  playerStore.setCurrentMusic({
    song: {
      ...song,
      images: song.images
        ? song.images
        : currentAlbum.value?.images
          ? currentAlbum.value?.images
          : currentSong.value?.images,
    },
    album: song.album || null,
  })
  playerStore.setIsPlaying(true)
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <table class="table-auto text-left min-w-full divide-y divide-gray-500/20">
    <thead class="hidden lg:table-header-group">
      <tr class="text-zinc-400 text-sm">
        <th class="px-4 py-2 font-light">#</th>
        <th class="px-4 py-2 font-light">Title</th>
        <th class="px-4 py-2 font-light"><IconTime /></th>
      </tr>
    </thead>

    <tr
      v-for="(song, index) in songs"
      :key="index"
      :class="`group border-spacing-0 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 ${currentSong?.id === song.id ? 'text-green-500' : 'text-white'}`"
      @click="handleClick(song)"
    >
      <td class="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5 hidden lg:table-cell relative">
        <PlayingVisualizer v-if="isPlaying && song.id === currentSong?.id" />
        <span v-else class="relative p-1"> {{ index + 1 }}</span>
        <IconPlay
          @click="handleClick(song)"
          class="absolute top-0 w-full inset-0 h-full p-3 z-50 bg-zinc-900 hidden group-hover:block cursor-pointer"
        />
      </td>
      <td class="px-4 py-2 flex gap-3">
        <picture v-if="showImage">
          <img
            v-if="song.album?.images"
            :src="song.album.images[0].url"
            :alt="song.name"
            class="w-11 h-11 object-cover"
          />
          <img v-if="song?.images" :src="song.images[0].url" :alt="song.name" class="w-11 h-11" />
        </picture>
        <div class="flex flex-col justify-center flex-1">
          <h3 class="text-base font-normal">{{ song.name }}</h3>

          <div class="hidden lg:block">
            <span
              v-for="(artist, index) in song?.artists"
              :key="artist.id"
              class="text-gray-400 text-[11px] mr-1"
            >
              <RouterLink
                :to="`/artist/${artist.id}`"
                class="cursor-pointer hover:underline"
                @click.stop="scrollToTop"
              >
                {{ artist.name }}
              </RouterLink>
              <span v-if="song?.artists && index !== song?.artists.length - 1">, </span>
            </span>
          </div>
        </div>
      </td>

      <td class="px-4 py-2 rounded-tr-lg rounded-br-lg hidden lg:table-cell">
        {{ formatTime(song.duration_ms) }}
      </td>
    </tr>
  </table>
</template>
