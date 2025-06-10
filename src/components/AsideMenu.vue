<script setup lang="ts">
import { useRoute } from 'vue-router'
import IconHome from './icons/IconHome.vue'
import IconLibrary from './icons/IconLibrary.vue'
import IconSearch from './icons/IconSearch.vue'
import SideMenuItem from './SideMenuItem.vue'
import { computed } from 'vue'

const route = useRoute()

const isHome = computed(() => route.path === '/')
const isSearch = computed(() => route.path.startsWith('/search'))
</script>

<template>
  <nav class="lg:bg-zinc-900 rounded-lg lg:p-2 flex-1">
    <ul class="w-full flex justify-between lg:flex-col">
      <SideMenuItem href="/" class="lg:hidden">
        <IconHome :class="['w-6 h-6', isHome ? 'text-white' : 'text-zinc-400']" />
        <span :class="isHome ? 'text-white' : 'text-zinc-400'">Home</span>
      </SideMenuItem>
      <SideMenuItem href="/search" class="lg:hidden">
        <IconSearch :class="['w-6 h-6', isSearch ? 'text-white' : 'text-zinc-400']" />
        <span :class="isSearch ? 'text-white' : 'text-zinc-400'">Search</span>
      </SideMenuItem>
      <SideMenuItem href="/">
        <IconLibrary class="w-6 h-6" />
        Your Library
      </SideMenuItem>
    </ul>

    <div class="hidden lg:block">
      <div class="bg-zinc-800 rounded-lg flex flex-col gap-y-4 p-4 mb-10">
        <h3 class="font-bold text-white">Create your first playlist</h3>
        <span class="text-sm">It's easy, we'll help you </span>
        <button class="bg-white text-black w-fit rounded-2xl p-2 text-xs font-bold">
          Create PlayList
        </button>
      </div>

      <div class="bg-zinc-800 rounded-lg flex flex-col gap-y-4 p-4">
        <h3 class="font-bold text-white">Let's find some podcasts to follow</h3>
        <span class="text-sm">We'll keep you updated on new episodes </span>
        <button class="bg-white text-black w-fit rounded-2xl p-2 text-xs font-bold">
          Browse podcasts
        </button>
      </div>
    </div>
  </nav>
</template>
