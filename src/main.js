import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Фильтр даты
import dateFilter from '@/filters/date.filter'
// Плагины, анимация и пр.
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

// Регистрируем фильтр для даты с названием "Date"
Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
