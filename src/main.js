import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

import App from './App.vue'

import router from './router'
import store from './store'

import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

import tooltipDirective from '@/directives/tooltip.directive'

import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'

import Loader from './components/app/Loader'

import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import M from 'materialize-css'

Vue.use(M)

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCgsfjcTNzCSGAar9HD3igw5z4C7CKCQcI',
  authDomain: 'vue-new-pro.firebaseapp.com',
  databaseURL: 'https://vue-new-pro.firebaseio.com',
  projectId: 'vue-new-pro',
  storageBucket: 'vue-new-pro.appspot.com',
  messagingSenderId: '372207784304'
  // appId: '1:372207784304:web:683ad24f69dbf96fb53fb5"',
  // measurementId: 'G-1607CMTS2G'
})

// Заносим результат инициализации приложения в переменную app
let app

// Ищем локальные данные пользователя, которые позволят поддерживать автоматическую авторизацию
firebase.auth().onAuthStateChanged(() => {
  // Инициализируем приложение, только если переменная app не определена (приложение не было инициализированно)
  if (!app) {
    // Новый экземпляр приложения
    app = new Vue({
      router,
      store,
      // Метод h, который рендерит компонент App
      // Это заглавный компонент, с него все начинается
      render: h => h(App)
      // Маунтим все в div#app
    }).$mount('#app')
  }
})
