import { createRouter, createWebHistory } from 'vue-router'
import Home from '../presenters/HomePresenter.vue'
import About from '../presenters/AboutPresenter.vue'
import SearchResults from '../presenters/SearchResultsPresenter.vue'
import Content from '../presenters/ContentPresenter.vue'
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
    path: '/',
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
    name: 'PageNotFound',
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
