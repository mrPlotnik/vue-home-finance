import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

// Регистрация Router как плагина
Vue.use(VueRouter)

// Набор роутов
const routes = [
  {
    // Главная страница
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true },
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
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
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

// Данный метод будет вызываться перед каждой сменой роута
// Будем проверять на наличие авторизации
// to - тот роут, куда мы идем
// from - тот роут, откуда мы пришли
// next - функция, которую нужно выполнить, если мы хотим продолжить переход
router.beforeEach((to, from, next) => {
  // Сначала необходимо понять, если у пользователя авторицация
  const currentUser = firebase.auth().currentUser
  // Далее проверяем требует ли текущий роут авторизации
  const requiredAuth = to.matched.some(r => r.meta.auth)

  // Проверяем, если текущий роут требует авторизации и нет авторизованного пользователя, то...
  if (requiredAuth && !currentUser) {
    // Направляем на страницу логина
    next('/login?message=login')
  } else {
    // Иначе, продолжаем выполнение
    next()
  }
})

export default router
