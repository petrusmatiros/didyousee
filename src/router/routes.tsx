import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SearchResults from '../presenters/SearchResultsPresenter.vue'
import Result from '../views/Result.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PageNotFound from '../views/PageNotFound.vue'

import {model} from '../model/model';

import { reactive, watchEffect } from "vue";

const promiseModel = reactive(model);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: {model: promiseModel},
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/search/',
    name: 'SearchResults',
    component: SearchResults,
    props: {model: promiseModel},
  },
  {
    path: '/result/',
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  }  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // const publicPages = ['/login', '/register']
  // const authRequired = !publicPages.includes(to.path)
  next();
})

export default router
