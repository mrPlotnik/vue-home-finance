<template lang="pug">

div
  .page-title
    h3 Категории
  section

    Loader(v-if="loading")

    .row(v-else)

      //- Если произойдет событие @created, то вызываем метод addNewCategory
      //- Событие происходит в дочернем компоненте CategoryCreate
      CategoryCreate(@created="addNewCategory")

      //- Слушаем событие @updated, чтобы обновить категории на фронте
      //- Событие происходит в дочернем компоненте CategoryEdit
      //- Событие передает объект categoryData с даными формы
      //- Используем :key как хак, чтобы перерисовывать компонент, после каждого изменения массива категорий
      CategoryEdit(
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
        )

      p.center(v-else) Категорий пока нет

</template>

<script>

// Подключаем компоненты
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {

  name: 'categories',

  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),

  // Получаем список категорий с сервера
  async mounted () {
    // Экшн fetchCategories находится в category.js
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },

  // Регистрием компоненты
  components: {
    CategoryCreate, CategoryEdit
  },

  methods: {

    // Добавляем только что созданную категорию в конец массива
    addNewCategory (category) {
      this.categories.push(category)
    },

    // Обновляем список категорий
    updateCategories (category) {
      // Определяем индекс редактируемой категории в массиве
      const idx = this.categories.findIndex(c => c.id === category.id)
      // Обращаемся к массиву по этому индексу и меняем его значения
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }

}

</script>
