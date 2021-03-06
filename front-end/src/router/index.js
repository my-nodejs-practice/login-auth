import Vue from 'vue';
import VueRouter from 'vue-router';
import BasicLayout from '@/layouts/BasicLayout';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/dingtalk',
    name: 'dingtalk',
    component: () => import(/* webpackChunkName: "login" */ '../views/DingTalk.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "login" */ '../views/401.vue')
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
