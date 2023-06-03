import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/practice',
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: () => import('../views/login/page-login.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/home-item.vue'),
    },
  ],
})

export default router
