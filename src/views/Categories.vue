<template lang="pug">
div
  .page-title
    h3 Категории
  section
    .row
      CategoryCreate(@created="addNewCategory")
      CategoryEdit
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name: 'categories',
  data: () => ({
    categories: []
  }),
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  }
}
</script>
