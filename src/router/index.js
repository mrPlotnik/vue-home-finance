import Vue from 'vue'
import VueRouter from 'vue-router'

// Регистрация Router как плагина
Vue.use(VueRouter)

// Набор роутов
const routes = [
  {
    // Главная страница
    path: '/',
    name: 'home',
    meta: { layout: 'main' },
    // ИзиЛоадинг для ускорения загрузки
    component: () => import('../views/Home.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main' },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main' },
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main' },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main' },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main' },
    component: () => import('../views/Detail.vue')
  }

]

const router = new VueRouter({
  // Пути со слэшами
  mode: 'history',
  // Базовый URL
  base: process.env.BASE_URL,
  routes
})

export default router
