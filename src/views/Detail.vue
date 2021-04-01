<template lang="pug">

Loader(v-if="loading")

div(v-else-if="record")
  .breadcrumb-wrap
    router-link.breadcrumb(to="/history") История
    a.breadcrumb(@click.prevent)
      | {{ record.type === 'income' ? 'Доход' : 'Расход' }}
  .row
    .col.s12.m6
      .card(:class="{'red' : record.type === 'outcome', 'green' : record.type === 'income'}")
        .card-content.white-text
          p Описание: {{ record.description }}
          p Сумма: {{ record.amount | currency }}
          p Категория: {{ record.categoryName }}
          small {{ record.date | date('datetime') }}

p.center(v-else) Запись с id={{ $route.params.id }} не найдена

</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),

  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>
