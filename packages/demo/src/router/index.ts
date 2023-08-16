import { createRouter, createWebHistory } from 'vue-router'
import Marker from '../views/Marker.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Marker
    }
  ]
})

export default router
