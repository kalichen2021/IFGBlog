import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import ImgWallView from '@/views/ImageWallView.vue'
import PublishView from '@/views/PublishView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/imgWall',
      name: 'imgWall',
      component: ImgWallView,
      props: {
        
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: PublishView
    }
  ]
})

export default router
