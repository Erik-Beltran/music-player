<script setup lang="ts">
import SongsTable from '@components/SongsTable.vue'
import CardPlayButton from '@components/CardPlayButton.vue'

import type { Artist } from '@/types/artist'
import { formatNumber } from '@/utils/formatter'
import type { TopTrack } from '@/types/topTracks'
import { ref, watch } from 'vue'
import { useDominantColor } from '@/composables/useImageColor'

interface Props {
  artist: Artist | undefined
  topTracks: TopTrack[] | [] | undefined
}
const props = defineProps<Props>()

const dominantColor = ref('#18181b')
const { getDominantColor } = useDominantColor()

async function updateDominantColor() {
  if (props.artist?.images?.[0]?.url) {
    dominantColor.value = await getDominantColor(props.artist.images[0].url)
  }
}

watch(
  () => props.artist?.images?.[0]?.url,
  () => {
    updateDominantColor()
  },
  { immediate: true },
)
</script>
<template>
  <div
    v-if="artist"
    id="artist-container"
    class="bg-zinc-900 flex-col flex h-full overflow-x-hidden relative"
  >
    <div class="px-6 pt-10 z-10">
      <header class="flex lg:flex-row gap-8 px-6 pt-10 flex-col">
        <picture class="h-52 w-52 flex-none aspect-auto">
          <img
            v-if="artist.images"
            :src="artist.images[0].url"
            :alt="`cover of ${artist.name}`"
            class="object-cover w-full h-full rounded-md"
          />
        </picture>

        <div class="flex flex-col justify-center gap-y-3">
          <h2 class="text-5xl font-bold block text-white">{{ artist.name }}</h2>

          <div class="text-sm text-gray-300 flex gap-x-2">
            <span v-if="artist.followers" class="text-white">{{
              formatNumber(artist.followers.total) + ' Followers'
            }}</span>
          </div>
        </div>
      </header>

      <div class="pl-6 pt-6">
        <CardPlayButton />
      </div>

      <section class="lg:p-8 mt-2">
        <h3 class="font-bold text-2xl mb-2">Popular</h3>
        <SongsTable
          :songs="topTracks || []"
          :key="artist.id"
          :show-artist="false"
          :show-image="true"
        />
      </section>
    </div>

    <div
      :style="`background: linear-gradient(to bottom, ${dominantColor} 10%, #18181b 60%);`"
      class="absolute inset-0 via-zinc-900/80"
    ></div>
  </div>
</template>
