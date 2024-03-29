/* global M */
import localizeFilter from '@/filters/localize.filter'

// Регистрируем пользовательскую директиву

export default {

  // Хук bind вызывается однократно, при первичном связывании директивы с элементом. Здесь можно поместить код инициализации
  // Первый параметр - элемент, к которому привязана директива. Можно использовать для прямых манипуляций с DOM
  // Второй параметр - значение, переданное в директиву
  bind (el, { value }) {
    // Инициализация tooltip
    var localize = localizeFilter(value)
    M.Tooltip.init(el, { html: localize })
  },

  // Хук unbind вызывается однократно, при отвязывании директивы от элемента
  unbind (el) {
    // Получаем экземплар класса
    const tooltip = M.Tooltip.getInstance(el)

    // Уничтожаем tooltip, при отведении мыши, чтобы не засорять код
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
