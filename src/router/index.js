import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CartPage from '../views/CartPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ],
    beforeEnter (to, from, next) {
      if (localStorage.getItem('access_token')) {
        next({ name: 'MainPage' })
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    name: 'MainPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue')
  },
  {
    path: '/carts',
    name: 'CartPage',
    component: CartPage,
    beforeEnter (to, from, next) {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
