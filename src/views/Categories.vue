<template lang="pug">

div
  .page-title
    h3 Категории
  section

    Loader(v-if="loading")

    .row(v-else)

      CategoryCreate(@created="addNewCategory")
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
    addNewCategory (category) {
      this.categories.push(category)
      // console.log(this.categories)
    },

    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }

}

</script>
