import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'vehiclePassRecord',
      component: () => import('../views/vehicle-pass-record/vehicle-pass-record.vue'),
    },
    {
      path: '/choose-page',
      name: 'choosePage',
      component: () => import('../views/choose-page/choose-page.vue'),
    },
    {
      path: '/message-list',
      name: 'messageList',
      component: () => import('../views/message-list/message-list.vue'),
    },
    {
      path: '/select-device',
      name: 'selectDevice',
      component: () => import('../views/select-device/select-device.vue'),
    },
    {
      path: '/car-type-choose',
      name: 'carTypeChoose',
      component: () => import('../views/car-type-choose/car-type-choose.vue'),
    },
    {
      path: '/hook',
      name: 'Hook',
      component: () => import('../views/hook-test/hook.vue'),
    },
  ],
})

export default router
