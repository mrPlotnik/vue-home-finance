import firebase from 'firebase/app'

export default {
  actions: {

    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        // Берем uid
        const uid = await dispatch('getUid')
        // Делаем запись в базу данных
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
    // Вызывается отсюда, в экшене fetchInfo() из info.js
    getUid () {
      const user = firebase.auth().currentUser
      // Если в поле user что либо есть, то возвращаем объект user.uid, иначе null
      return user ? user.uid : 'null'
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      // Чистим информацию пользователя
      commit('clearInfo')
    }
  }
}
