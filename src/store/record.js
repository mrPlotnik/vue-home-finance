import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        // Получаем uid юзера
        const uid = await dispatch('getUid')
        // Создаем новую запись на сервере
        // .ref - обращение к нужному полю
        // .push - положить значение
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    // Загружаем записи с сервера
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
    },

    async fetchCategoryById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id: id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return { ...record, id: id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }

  }
}
