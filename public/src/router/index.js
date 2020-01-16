import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home')
  },
  {
    path: '/game',
    component: () => import('@/views/Game')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.username.length < 1 && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})

export default router
