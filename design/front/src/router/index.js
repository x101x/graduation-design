import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
   {
     path: '/goods',
     name: 'Goods',
     component:Goods
   },
   {
    path: '/',
    name: 'login',
    component:login
   }
  ]
})
