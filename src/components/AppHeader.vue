<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useDebounce } from '@/composables/useDebounce'
import IconSpotify from '@icons/IconSpotify.vue'
import IconHome from '@icons/IconHome.vue'

const query = ref('')
const debouncedQuery = useDebounce(query, 500)
const router = useRouter()
const route = useRoute()

const isSearchPage = computed(() => route.path.startsWith('/search'))

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
  <div class="relative p-4 grid lg:grid-cols-[350px_1fr] gap-y-4">
    <RouterLink to="/" class="cursor-pointer w-9 h-9">
      <IconSpotify class="w-9 h-9" />
    </RouterLink>

    <div class="lg:flex lg:justify-center lg:gap-x-4">
      <RouterLink to="/" class="cursor-pointer w-10 h-10">
        <IconHome class="w-10 h-10 bg-zinc-500/50 p-1 rounded-full hidden lg:block" />
      </RouterLink>

      <input
        v-model="query"
        type="search"
        placeholder="What do you want to play?"
        :class="[
          ' w-full lg:max-w-md p-2 px-4 rounded-full bg-zinc-500/30 text-white focus:outline-none focus:ring-2',
          isSearchPage ? 'block' : 'hidden',
          'lg:block',
        ]"
      />
    </div>
  </div>
</template>
