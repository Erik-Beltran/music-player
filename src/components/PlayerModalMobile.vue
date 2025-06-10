<script setup lang="ts">
import { defineEmits, computed, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'

import TimeControls from './TimeControls.vue'
import ArrowDown from '@icons/IconArrowDown.vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  open: boolean
  duration: number
  currentTime: number
  dominantColor: string
}>()
const playerStore = usePlayerStore()

const currentSong = computed(() => playerStore.currentMusic.song)

const emit = defineEmits(['close', 'update:currentTime'])

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    emit('close')
  },
)

function closeModal() {
  emit('close')
}

function updateTime(value: number) {
  emit('update:currentTime', value)
}
</script>

<template>
  <div
    v-if="props.open"
    class="fixed inset-0 z-50 flex items-center justify-center lg:hidden"
    :style="`background: linear-gradient(to bottom, ${dominantColor} 50%, #18181b  );`"
  >
    <div class="rounded p-6 shadow-lg w-full h-full flex flex-col pb-20">
      <button class="mt-4 text-sm text-white underline" @click.stop="closeModal">
        <ArrowDown class="w-6 h-6" />
      </button>

      <div class="flex flex-1 justify-center items-center flex-col gap-y-10">
        <picture v-if="currentSong?.images" className="w-full aspect-square md:max-w-10/12">
          <img
            :src="currentSong?.images[0].url"
            alt="album cover"
            class="h-full object-cover object-center"
          />
        </picture>

        <div className="flex flex-col w-full">
          <h3 class="font-bold text-xl">
            {{ currentSong?.name }}
          </h3>
          <div>
            <span
              v-for="(artist, index) in currentSong?.artists"
              :key="artist.id"
              class="text-gray-400 text-md mr-1"
            >
              <RouterLink :to="`/artist/${artist.id}`" class="cursor-pointer hover:underline">
                {{ artist.name }}
              </RouterLink>
              <span v-if="currentSong?.artists && index !== currentSong?.artists.length - 1"
                >,
              </span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <TimeControls
          :currentTime="props.currentTime"
          :duration="props.duration"
          @update:currentTime="updateTime"
        />
      </div>
    </div>
  </div>
</template>
