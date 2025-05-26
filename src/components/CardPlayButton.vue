<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import IconPlay from '@icons/IconPlay.vue'
import { computed } from 'vue'

const playerStore = usePlayerStore()
const isPlaying = computed(() => playerStore.isPlaying)

const handleClick = () => {
  playerStore.setIsPlaying(!isPlaying.value)
}
</script>

<template>
  <button @click="handleClick" class="rounded-full bg-green-400 p-2 text-black cursor-pointer">
    <IconPlay />
  </button>
</template>
