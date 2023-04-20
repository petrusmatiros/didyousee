import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SearchResults from '../presenters/SearchResultsPresenter.vue'
import Content from '../presenters/ContentPresenter.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
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
