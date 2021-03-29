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

// Пагин сообщений. Тосты vuelidate
import messagePlugin from '@/utils/message.plugin'

// ***
import Loader from './components/app/Loader'

// ***
import './registerServiceWorker'

// Импортируем firebase
// И его модули. Для авторизации и базы данных
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

//
import M from 'materialize-css'
Vue.use(M)

Vue.config.productionTip = false

// Регистрируем плагин "messagePlugin"
Vue.use(messagePlugin)

// Регистрируем глобально плагин "Vuelidate"
// Без него не работает $v
Vue.use(Vuelidate)

// Регистрируем фильтр для даты
// Теперь он в глобальной области видимости
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
