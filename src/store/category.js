import firebase from 'firebase/app'

export default {
  state: {
    currentCategoryId: null
  },
  mutations: {
    setCurrentCategory (state, currentCategoryId) {
      console.log('Категория с id = ' + currentCategoryId + ' занесена в state')
      state.currentCategoryId = currentCategoryId
    }
  },

  actions: {

    // Получаем список категорий с сервера
    // Вызывается из Categories.vue (родительского)
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        // Используем .once для получения данных
        // Этот запрос возвращает объект, который имеет функцию .val, которая позволяет получить данные из базы
        // На всякий случай, если ничего не возвращается, то это будет пустой объект
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // console.log(categories) // Возвращает объект, а нам нужен массив с такими же значениями
        // Нужна трансформация
        //
        // 1й способ
        // const cats = []
        // Object.keys(categories).forEach(key => {
        //   cats.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   })
        // })
        // return cats
        //
        // 2й способ. Лаконичный. Делает тоже самое
        const cats = Object.keys(categories).map(key => ({ ...categories[key], id: key }))
        // console.log(cats)
        return cats
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async updateCategory ({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
        commit('setCurrentCategory', id)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        // Получаем uid юзера
        const uid = await dispatch('getUid')
        // Создаем категорию на сервере и возвращаем нужные значения для отрисовки на фронтенде
        // .ref - обращение к нужному полю
        // .push - положить значение
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }

  },
  getters: {
    currentCategoryId: s => s.currentCategoryId
  }
}
