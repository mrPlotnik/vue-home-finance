import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
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
    // Получение данных с сервера
    // Вызывается из MainLayote.vue
    async fetchInfo ({ dispatch, commit }) {
      try {
        // Получаем uid юзера
        const uid = await dispatch('getUid')
        // Получаем поле info из таблицы конкретного юзера
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        // Вызываем mutation. Пишем инфу в state
        commit('setInfo', info)
      } catch (e) {}
    }
  },
  getters: {
    info: s => s.info
  }
}
