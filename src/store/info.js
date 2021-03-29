import firebase from 'firebase/app'

export default {

  state: {
    // Данные о пользователе
    info: {}
  },

  mutations: {

    // Записывает в state данные пользователя, которые пришли с сервера
    setInfo (state, info) {
      state.info = info
    },

    // Очищаем state
    // Это нам требутся чтобы не кэшировалось при логине и логауте пользователей. Чтобы сессии не пересеклись
    // Вызывается из auth.js при logout
    clearInfo (state) {
      state.info = {}
    }

  },

  actions: {

    async updateInfo ({ dispatch, commit, getters }, toUpdate) {
      try {
        // Получаем uid юзера
        const uid = await dispatch('getUid')
        // 123
        const updateData = { ...getters.info, ...toUpdate }
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        // Вызываем mutation. Пишем инфу в state
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    // Получение данных пользователя с сервера
    // Вызывается из MainLayote.vue
    async fetchInfo ({ dispatch, commit }) {
      try {
        // Получаем uid юзера
        const uid = await dispatch('getUid')
        // Получаем поле info из таблицы конкретного юзера
        // .ref - обращение к нужному полю
        // .once - запрос на получение данных из поля
        // .val - извлекает значение
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        // Вызываем mutation. Пишем инфу в state
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }

  },

  getters: {
    // Принимает state и возвращает поле state.info
    info: s => s.info
  }

}
