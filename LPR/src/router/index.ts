import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(), // TODO: 修改成 hash
  routes: [
    {
      path: '/',
      name: 'vehiclePassRecord',
      component: () => import('../views/vehicle-pass-record/vehicle-pass-record.vue'),
    },
    {
      path: '/i18n-demo',
      name: 'i18nDemo',
      component: () => import('../views/project-demo/i18n-demo/i18n-demo.vue'),
    },
    {
      path: '/vant-demo',
      name: 'vantDemo',
      component: () => import('../views/project-demo/vant-demo/vant-demo.vue'),
    },
    {
      path: '/global-data-demo',
      name: 'globalDataDemo',
      component: () => import('../views/project-demo/global-data-demo/global-data-demo.vue'),
    },
  ],
})

export default router
