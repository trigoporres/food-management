import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import AddFood from '@/components/AddFood'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/food',
      name: 'AddFood',
      component: AddFood
    }
  ]
})

export default router
