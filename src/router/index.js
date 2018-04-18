import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import block from '@/components/block'
import tx from '@/components/tx'
import accounts from '@/components/accounts'
import account from '@/components/account'
import service from '@/components/service'
import service_detail from '@/components/service_detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/block/:number',
      name: 'block',
      component: block
    },
    {
      path: '/tx/:number',
      name: 'tx',
      component: tx
    },
    {
      path: '/service',
      name: 'service',
      component: service
    },
    {
      path: '/service/detail/:number',
      name: 'service_detail',
      component: service_detail
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: accounts
    },
    {
      path: '/account/:number',
      name: 'account',
      component: account
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
