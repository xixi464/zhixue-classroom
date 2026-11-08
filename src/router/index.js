import { createRouter, createWebHashHistory } from 'vue-router'

// GitHub Pages 为纯静态托管，采用 hash 模式可避免子路径刷新 404
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/assignment3' },
    {
      path: '/assignment3',
      name: 'Assignment3',
      component: () => import('../views/Assignment3.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/assignment3' }
  ]
})
