<template lang="pug">

div
  .page-title
    h3 История записей
  .history-chart
    canvas

  Loader(v-if="loading")

  p.center(v-else-if="!records.length") Записей пока нет
    router-link(to="/record") Добавьте первую

  section(v-else)
    HistoryTable(
      :records="items"
    )

    Paginate(
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    )

</template>

<script>

import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {

  name: 'history',

  mixins: [paginationMixin],

  data: () => ({
    loading: true,
    records: []
  }),

  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(
      this.records.map(
        record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход'
          }
        }
      )
    )
    this.loading = false
  },

  components: {
    HistoryTable
  }

}

</script>
