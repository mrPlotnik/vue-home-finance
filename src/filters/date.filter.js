import store from '../store'

// По умолчанию format = 'date'
export default function dateFilter (value, format = 'date') {
  const options = {}

  // Если format включает в себя строку 'date', то...
  // Применяем следующие опции
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  // Если format включает в себя строку 'time', то...
  // Применяем следующие опции
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  const locale = store.getters.info.locale || 'ru-RU'

  // Intl.DateTimeFormat - яыкозависимое форматирование даты и времени
  //  В уроке мне не ясно почему автор создает новую дату
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
