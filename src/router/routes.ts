import { createRouter, createWebHistory } from 'vue-router'
import Home from '../presenters/HomePresenter.vue'
import About from '../presenters/AboutPresenter.vue'
import SearchResults from '../presenters/SearchResultsPresenter.vue'
import Content from '../presenters/ContentPresenter.vue'
import Reviews from '../presenters/ReviewsPresenter.vue'
import Cast from '../presenters/CastPresenter.vue'
import Profile from '../presenters/ProfilePresenter.vue'
import Login from '../presenters/LoginPresenter.vue'
import Register from '../presenters/RegisterPresenter.vue'
import PageNotFound from '../presenters/PageNotFoundPresenter.vue'

import {model} from '../model/model';

import { reactive } from "vue";

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
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
    props: {model: promiseModel},
  },
  {
    path: '/content/',
    name: 'Content',
    component: Content,
    props: {model: promiseModel},
  },
  {
    path: '/',
    name: 'Reviews',
    component: Reviews,
    props: {model: promiseModel},
  },
  {
    path: '/',
    name: 'Cast',
    component: Cast,
    props: {model: promiseModel},
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: {model: promiseModel},
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: {model: promiseModel},
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    props: {model: promiseModel},
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  }  
]

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  
  // const publicPages = ['/login', '/register']
  // const authRequired = !publicPages.includes(to.path)
  next();
})

export default router
