<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@components/AppHeader.vue'
import PlayerContainer from '@components/PlayerContainer.vue'
import AsideMenu from './components/AsideMenu.vue'
</script>

<template>
  <header class="[grid-area:header]"><AppHeader /></header>
  <aside class="[grid-area:aside] flex">
    <AsideMenu />
  </aside>
  <footer class="[grid-area:player] lg:min-h-[100px]">
    <PlayerContainer />
  </footer>
  <RouterView />
</template>
