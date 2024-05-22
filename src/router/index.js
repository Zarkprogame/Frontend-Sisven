import { createRouter, createWebHashHistory } from 'vue-router'

import EditarCustomer from '../components/customers/EditarCustomer.vue'
import NewCustomer from '../components/customers/NewCustomer.vue'
import HomeView from '../views/HomeView.vue'
import Customer from '../views/Customers'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customer
  },
  {
    path: '/editar-customer/:id',
    name: 'EditarCustomer',
    component: EditarCustomer
  },
  {
    path: '/customers/new',
    name: 'NewCustomer',
    component: NewCustomer
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
