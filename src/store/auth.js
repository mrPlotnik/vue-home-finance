import firebase from 'firebase/app'

export default {
  actions: {

    // Логин в систему
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    // Регистрация в системе
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        // Создаем нового пользователя
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        // Берем uid
        const uid = await dispatch('getUid')
        // Делаем запись в базу данных
        // Метод .ref указывает, что мы хотим обратиться к какому либо полю в базе данных (необходимо указать путь)
        // В метод .set передаем значения, который необходимо записать в базу данных
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name
        })
      } catch (e) {
        // Заносим ошибку в state, вызвав мутацию
        commit('setError', e)
        throw e
      }
    },

    // Узнаем uid юзера из fb
    // Вызывается отсюда, а также...
    // из экшена fetchInfo() из info.js
    // из экшенов updateCategory(), createCategory(), fetchCategories() из category.js
    getUid () {
      const user = firebase.auth().currentUser
      // Если в поле user что либо есть, то возвращаем объект user.uid, иначе null
      return user ? user.uid : 'null'
    },

    // Выход
    async logout ({ commit }) {
      await firebase.auth().signOut()
      // Чистим данные пользователя
      commit('clearInfo')
    }
  }
}
