import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import PublishView from '@/views/PublishView.vue'
import ImgWallView from '@/views/ImgWallView.vue'

// 解决vue-router@4.x版本路由跳转后页面不刷新的问题
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // ...(typeof import.meta.env.BASE_URL === 'string' ? { base: import.meta.env.BASE_URL } : {}),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/imgwall',
      name: 'imgwall',
      component: ImgWallView
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
} as any)

export default router
