<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const playerStore = usePlayerStore()

const currentSong = computed(() => playerStore.currentMusic.song)

const songNameRef = ref<HTMLElement | null>(null)
const artistsRef = ref<HTMLElement | null>(null)

const isSongNameOverflow = ref(false)
const isArtistsOverflow = ref(false)

function checkOverflow(elRef: typeof songNameRef, overflowFlag: typeof isSongNameOverflow) {
  if (!elRef.value) return
  overflowFlag.value = elRef.value.scrollWidth > elRef.value.clientWidth
}

function checkAllOverflows() {
  checkOverflow(songNameRef, isSongNameOverflow)
  checkOverflow(artistsRef, isArtistsOverflow)
}

watch(currentSong, () => {
  nextTick(() => {
    checkAllOverflows()
  })
})

onMounted(() => {
  checkAllOverflows()
  window.addEventListener('resize', checkAllOverflows)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkAllOverflows)
})
</script>
<template>
  <div class="flex items-center gap-5 relative overflow-hidden">
    <picture
      v-if="currentSong?.images"
      className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden"
    >
      <img
        :src="currentSong?.images[0].url"
        alt="album cover"
        class="h-full object-cover object-center"
      />
    </picture>

    <div className="flex flex-col  flex-1 overflow-hidden whitespace-nowrap">
      <h3
        ref="songNameRef"
        :class="['font-semibold text-xs', isSongNameOverflow ? 'animate-marquee inline-block' : '']"
        style="white-space: nowrap"
      >
        {{ currentSong?.name }}
      </h3>
      <div
        ref="artistsRef"
        :class="['flex', isArtistsOverflow ? 'animate-marquee' : '']"
        style="white-space: nowrap"
      >
        <span
          v-for="(artist, index) in currentSong?.artists"
          :key="artist.id"
          class="text-gray-400 text-[11px] mr-1"
        >
          <RouterLink :to="`/artist/${artist.id}`" class="cursor-pointer hover:underline">
            {{ artist.name }}
          </RouterLink>
          <span v-if="currentSong?.artists && index !== currentSong?.artists.length - 1">, </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes marquee {
  0% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}
</style>
