import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    // Вызывается из Planning.vue
    async fetchRecords ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        // Используем .once для получения данных
        // Этот запрос возвращает объект, который имеет функцию .val, которая позволяет получить данные из базы
        // На всякий случай, если ничего не возвращается, то это будет пустой объект
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        // Приводим к массиву
        const cats = Object.keys(records).map(key => ({ ...records[key], id: key }))
        return cats
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
