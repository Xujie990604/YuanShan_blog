import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/project-main',
    },
    {
      path: '/project-main',
      name: 'ProjectMain',
      component: () => import('../views/project-main/project-main.vue'),
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('../views/home/home-item.vue'),
        },
        {
          path: 'vue-test',
          name: 'VueTest',
          component: () => import('../views/vue-test/vue-test.vue'),
        },
        {
          path: 'vue-i18n',
          name: 'VueI18n',
          component: () => import('../views/vue-i18n/vue-i18n.vue'),
          children: [],
        },
        {
          path: 'rem-size',
          name: 'RemSize',
          component: () => import('../views/rem-size/rem-size.vue'),
          children: [],
        },
        {
          path: 'console-info',
          name: 'ConsoleInfo',
          component: () => import('../views/console-info/console-info.vue'),
          children: [],
        },
        {
          path: 'tailwindcss-test',
          name: 'Tailwindcss-test',
          component: () => import('../views/tailwindcss-test/tailwindcss-test.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: () => import('../views/login/page-login.vue'),
    },
    {
      path: '/back-home',
      name: 'BackHome',
      component: () => import('../views/back-manage/back-home.vue'),
      children: [],
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('../views/not-found/not-found.vue'),
    },
  ],
})

export default router
