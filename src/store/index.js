import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    // Этот экшн вызывается из Home.vue при mounted
    async fetchCurrency () {
      // Берем значение из .env
      const key = process.env.VUE_APP_FIXER
      // Делаем запрос, результат заносим в переменную
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,BTC`)
      // Теперь надо распарсить json и вернуть данные
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info
  }
})
