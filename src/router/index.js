import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import Checkout from '@/components/Checkout'
import Invoice from '@/components/Invoice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/invoice/:id',
      name: 'Invoice',
      component: Invoice,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      beforeEnter: AuthGuard
    }
  ]
})
