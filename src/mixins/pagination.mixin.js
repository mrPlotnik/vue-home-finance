import _ from 'lodash'

export default {

  data () {
    // Конфигурация пагинации
    return {
      // Считываем номер группы в query-параметре, иначе = 1
      // "+" приводит к числу
      page: +this.$route.query.page || 1,
      // Количество записей на странице
      pageSize: 5,
      // Количество страниц пагинации
      pageCount: 0,
      // Тут хранятся весь массив записей разбитый на подмассивы
      allItems: [],
      // Подмассив, который нужно показать
      items: []
    }
  },

  methods: {
    // Метод, вызываемый при смене страницы пагинации
    // Просто переопределяем массив this.items
    pageChangeHandler (page) {
      // Не перезагружаем страницу, а добавляем ее названию query-параметр с номером подмассива
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    },

    setupPagination (allItems) {
      // Разбиваем массив на подмассивы
      this.allItems = _.chunk(allItems, this.pageSize)
      // Определяем количество подмассивов
      this.pageCount = _.size(this.allItems)
      // Определяем текущий подмассив из query-параметра строки браузера, если такого нет, то показываем первый подмассив
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    }
  }

}
