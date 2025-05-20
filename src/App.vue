<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@components/AppHeader.vue'
</script>

<template>
  <header class="[grid-area:header]"><AppHeader /></header>
  <aside class="[grid-area:aside]">ASIDE</aside>
  <main class="[grid-area:main]">MAIN</main>
  <footer class="[grid-area:player]">PLAYER</footer>
  <RouterView />
</template>
