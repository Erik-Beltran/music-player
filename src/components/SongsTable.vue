<script setup lang="ts">
import type { BasedTrack } from '@/types/song'
import { formatTime } from '@/utils/formatter'
import IconTime from '@icons/IconTime.vue'

interface Props {
  songs: BasedTrack[]
  showArtist?: boolean
}

withDefaults(defineProps<Props>(), {
  showArtist: true,
})
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
      class="border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300"
    >
      <td class="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5 hidden lg:table-cell">
        {{ index + 1 }}
      </td>
      <td class="px-4 py-2 flex gap-3">
        <picture v-if="song.images">
          <img :src="song.images[0].url" :alt="song.name" class="w-11 h-11" />
        </picture>
        <div class="flex flex-col">
          <h3 class="text-white text-base font-normal">{{ song.name }}</h3>
          <span v-if="showArtist" class="flex gap-x-2 flex-wrap">
            <RouterLink
              v-for="artist in song.artists"
              :to="`/artist/${artist.id}`"
              :key="artist.id"
              class="mr-2 cursor-pointer hover:underline"
            >
              {{ artist.name }}
            </RouterLink>
          </span>
        </div>
      </td>

      <td class="px-4 py-2 rounded-tr-lg rounded-br-lg hidden lg:table-cell">
        {{ formatTime(song.duration_ms) }}
      </td>
    </tr>
  </table>
</template>
