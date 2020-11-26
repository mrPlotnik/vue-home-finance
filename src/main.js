import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'

import router from './router'
import store from './store'
// Фильтр даты
import dateFilter from '@/filters/date.filter'

import './registerServiceWorker'
// Плагины, анимация и пр.
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

// Регистрируем плагин "Vuelidate"
Vue.use(Vuelidate)
// Регистрируем фильтр для даты с названием "Date"
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
