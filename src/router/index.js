import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/detail/:code', name: 'detail', component: DetailPage, props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router


