import Vue from 'vue'
import Vuex from 'vuex'

// Данные об авторизации
import auth from './auth'

// Данные пользователя
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // С помощью данного стейта мы будеи передавать ошибки
    error: null

  },

  mutations: {

    // Мутация, которая позволяет менять значение ошибки
    setError (state, error) {
      state.error = error
    },

    // Очищение ошибок
    clearError (state) {
      state.error = null
    }

  },

  actions: {

    // Загружаем котировки валют с сайта fixer.io
    // Этот экшн вызывается из Home.vue при mounted
    async fetchCurrency () {
      // Берем ключ значение из .env

      const key = process.env.VUE_APP_EXCHANGERATE
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/EUR`)

      // const key = process.env.VUE_APP_FIXER
      // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB,BTC`)

      // Теперь надо распарсить json и вернуть данные

      return await res.json()
    }

  },

  getters: {

    // Получаем значение ошибки
    error: s => s.error

  },

  modules: {
    auth, info, category, record
  }
})
