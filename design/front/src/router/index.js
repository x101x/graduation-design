import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import login from '@/components/login/login'
import admin from '@/components/admin/admin'
import order from '@/components/order/order'

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
   },{
    path: '/order',
    name: 'order',
    component:order
  },{
     path: '/admin',
    name: 'admin',
    component:admin
  //   children:[
  //     {
  //       path: '/foods',
  //   component:foods
  // }
  //   ]
   }
  ]
})
