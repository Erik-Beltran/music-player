<script setup lang="ts">
import type { Song } from '@/types/album'
import { formatTime } from '@/utils/formatter'
import IconTime from '@icons/IconTime.vue'

interface Props {
  songs: Song[]
}

defineProps<Props>()
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
        <div class="flex flex-col">
          <h3 class="text-white text-base font-normal">{{ song.name }}</h3>
          <span> {{ song.artists.map((artist) => artist.name).join(', ') }} </span>
        </div>
      </td>

      <td class="px-4 py-2 rounded-tr-lg rounded-br-lg hidden lg:table-cell">
        {{ formatTime(song.duration_ms) }}
      </td>
    </tr>
  </table>
</template>
