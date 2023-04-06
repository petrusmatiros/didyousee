import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
