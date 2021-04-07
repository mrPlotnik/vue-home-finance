/* global M */

export default {

  // Метод install будет вызывать vue.js чтобы применить этот плагин
  install (Vue, options) {
    // Определяем метод $message
    Vue.prototype.$message = function (html) {
      M.toast({ html })
    }

    // Определяем метод $error
    Vue.prototype.$error = function (html) {
      // Воспользуемся шаблонизацией
      M.toast({ html: `[Ошибка]: ${html}` })
    }
  }
}
