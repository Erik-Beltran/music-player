import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/album/:id',
      name: 'Album',
      component: () => import('@/views/AlbumView.vue'),
      props: true,
    },
    {
      path: '/artist/:id',
      name: 'Artist',
      component: () => import('@/views/ArtistView.vue'),
      props: true,
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: () => import('@/views/SearchView.vue'),
      props: true,
    },
  ],
})

export default router
