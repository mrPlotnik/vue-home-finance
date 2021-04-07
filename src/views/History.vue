<template lang="pug">

div
  .page-title
    h3 {{ 'History_Head' | localize }}
  .history-chart
    canvas(ref="canvas" responsive="true")

  Loader(v-if="loading")

  p.center(v-else-if="!records.length") {{ 'History_NoRecords' | localize }}
    router-link(to="/record") {{ 'History_AddRecords' | localize }}

  section(v-else)
    HistoryTable(
      :records="items"
    )

    Paginate(
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'History_Back' | localize"
      :next-text="'History_Forward' | localize"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    )

</template>

<script>

import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin.js'
import generateColor from '@/mixins/generateColor.mixin.js'
import { Doughnut } from 'vue-chartjs'

export default {

  name: 'history',

  metaInfo () {
    return {
      title: this.$title('Menu_History')
    }
  },

  mixins: [paginationMixin, generateColor, Doughnut],

  data: () => ({
    loading: true,
    records: []
  }),

  async mounted () {
    // Загружаем все записи с сервера
    this.records = await this.$store.dispatch('fetchRecords')
    // Загружаем все  с сервера
    const categories = await this.$store.dispatch('fetchCategories')

    var color = categories.map(this.pastelColors)
    var bgColor = color.map(c => c + '99')

    this.setup(categories, bgColor)

    this.loading = false
  },

  components: {
    HistoryTable
  },

  methods: {

    setup (categories, bgColor) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: bgColor,
          borderWidth: 2,
          hoverBorderWidth: 4,
          borderAlign: 'inner'
        }]
      }, {
        aspectRatio: 1.5,
        maintainAspectRatio: true
      })
    }

  }

}

</script>
