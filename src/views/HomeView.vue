<script setup lang="ts">
import { getNewReleases } from '@/services/spotifyApi'
import { onMounted, ref } from 'vue'

const newReleases = ref([])

onMounted(async () => {
  try {
    newReleases.value = await getNewReleases()
    console.log(newReleases.value) // Imprimir el array de nuevos lanzamientos
  } catch (err) {
    console.error('Failed to load new releases', err)
  }
})
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
  </main>
</template>
