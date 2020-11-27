import M from 'materialize-css'

export default {
  // Метод install будет вызывать vue.js чтобы примерить этот плагин
  install (Vue, options) {
    Vue.prototype.$message = function (html) {
      M.toast({ html })
    }

    Vue.prototype.$error = function (html) {
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  }
}
