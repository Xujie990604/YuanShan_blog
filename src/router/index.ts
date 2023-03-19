/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-03-19 17:57:52
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\router\index.ts
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/user-login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/my-home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/my-about.vue')
    }
  ]
})

export default router
