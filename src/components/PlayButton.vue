<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { usePlayerStore } from '@/stores/player'

import IconPause from '@icons/IconPause.vue'
import IconPlay from '@icons/IconPlay.vue'

const playerStore = usePlayerStore()

const { isPlaying } = storeToRefs(playerStore)
</script>

<template>
  <button
    @click="playerStore.setIsPlaying(!isPlaying)"
    class="rounded-full bg-white text-black cursor-pointer p-2"
  >
    <IconPause v-if="isPlaying" />
    <IconPlay v-else />
  </button>
</template>
