import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/home/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/index')
  },
  {
    path: '/eth',
    name: 'eth',
    component: () => import('@/views/eth'),
  },
  {
    path: '/erc20',
    name: 'erc20',
    component: () => import('@/views/erc20'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
