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

  // Intl.DateTimeFormat - яыкозависимое форматирование даты и времени
  //  В уроке мне не ясно почему автор создает новую дату
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}
