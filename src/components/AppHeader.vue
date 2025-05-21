<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useDebounce } from '@/composables/useDebounce'
import IconSpotify from '@icons/IconSpotify.vue'
import IconHome from '@icons/IconHome.vue'

const query = ref('')
const debouncedQuery = useDebounce(query, 500)
const router = useRouter()
const route = useRoute()

watch(debouncedQuery, (val) => {
  const trimmed = val.trim()
  if (trimmed) {
    router.push({ path: `/search/${trimmed}` })
  } else {
    router.push({ path: '/' })
  }
})

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      query.value = ''
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="relative w-full max-w-md flex gap-x-6 p-4">
    <RouterLink to="/" class="cursor-pointer w-10 h-10">
      <IconSpotify class="w-10 h-10" />
    </RouterLink>
    <RouterLink to="/" class="cursor-pointer w-10 h-10">
      <IconHome class="w-10 h-10 bg-zinc-500/50 p-1 rounded-full" />
    </RouterLink>

    <input
      v-model="query"
      type="search"
      placeholder="What do you want to play?"
      class="w-full p-2 px-4 rounded-full bg-zinc-500/30 text-white focus:outline-none focus:ring-2"
    />
  </div>
</template>
