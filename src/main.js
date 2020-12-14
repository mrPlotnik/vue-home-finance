import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

import router from './router'
import store from './store'
// Фильтр даты
import dateFilter from '@/filters/date.filter'
// Фильтр валют
import currencyFilter from '@/filters/currency.filter'
// -
import tooltipDirective from '@/directives/tooltip.directive'
// Пагин сообщений
import messagePlugin from '@/utils/message.plugin'
// ***
import Loader from './components/app/Loader'
// ***
import './registerServiceWorker'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

// Регистрируем плагин "messagePlugin"
Vue.use(messagePlugin)
// Регистрируем плагин "Vuelidate"
Vue.use(Vuelidate)
// Регистрируем фильтр для даты
Vue.filter('date', dateFilter)
// Регистрируем фильтр для даты
Vue.filter('currency', currencyFilter)
// -
Vue.directive('tooltip', tooltipDirective)
// Регистрируем глобально Loader.vue

Vue.component('Loader', Loader)

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

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
