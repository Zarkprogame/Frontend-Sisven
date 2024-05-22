import { createRouter, createWebHashHistory } from 'vue-router'

import EditarCustomer from '../components/customers/EditarCustomer.vue'
import NewCustomer from '../components/customers/NewCustomer.vue'
import HomeView from '../views/HomeView.vue'
import Customer from '../views/Customers'
import Paymode from '../views/Paymodes.vue'
import NewPaymode from '../components/paymodes/NewPaymode.vue'
import EditarPaymode from '../components/paymodes/EditPaymode.vue'
import Category from '../views/Categories.vue'
import NewCategory from '../components/categories/NewCategory.vue'
import EditCategory from '../components/categories/EditarCategory.vue'
import Product from '../views/Products.vue'
import NewProduct from '../components/products/NewProduct.vue'
import EditProduct from '../components/products/EditarProduct.vue'

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
    path: '/paymodes',
    name: 'paymodes',
    component: Paymode
  },
  {
    path: '/paymodes/new',
    name: 'NewPaymode',
    component: NewPaymode
  },
  {
    path: '/editar-paymode/:id',
    name: 'EditarPaymode',
    component: EditarPaymode
  },
  {
    path: '/categories',
    name: 'categories',
    component: Category
  },
  {
    path: '/categories/new',
    name: 'NewCategory',
    component: NewCategory
  },
  {
    path: '/editar-category/:id',
    name: 'EditCategory',
    component: EditCategory
  },
  {
    path: '/products',
    name: 'products',
    component: Product
  },
  {
    path: '/products/new',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/editar-product/:id',
    name: 'EditProduct',
    component: EditProduct
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
