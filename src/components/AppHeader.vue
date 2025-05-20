<script setup lang="ts">
import { useDebounce } from '@/composables/useDebounce'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import IconHome from './icons/IconHome.vue'
import IconSpotify from './icons/IconSpotify.vue'

const query = ref('')
const debouncedQuery = useDebounce(query, 500)
const router = useRouter()

console.log('query', query.value)

watch(debouncedQuery, (val) => {
  const trimmed = val.trim()
  if (trimmed) {
    router.push({ name: 'Search', query: { q: trimmed } })
  }
})
</script>

<template>
  <div class="relative w-full max-w-md flex gap-x-6 p-4">
    <button class="cursor-pointer w-10 h-10"><IconSpotify class="w-10 h-10" /></button>
    <RouterLink to="/" class="cursor-pointer w-10 h-10">
      <IconHome class="w-10 h-10 bg-zinc-500/50 p-1 rounded-full" />
    </RouterLink>

    <input
      v-model="query"
      type="search"
      placeholder="What do you wanna play"
      class="w-full p-2 px-4 rounded-full bg-zinc-500/30 text-white focus:outline-none focus:ring-2"
    />
  </div>
</template>
