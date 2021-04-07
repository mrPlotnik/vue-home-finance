import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function localizeFilter (key) {
  // Определяем язык приложения
  // Если в сторе нет данных про язык, тогда по умолчанию EN
  const locale = store.getters.info.locale || 'en-US'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
