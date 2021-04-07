<template lang="pug">
div
  .page-title
    h3 {{ 'Planning_Head' | localize }}
    h4 {{ info.bill | currency('RUB') }}

  Loader(v-if="loading")

  p.center(v-else-if="!categories.length") {{ 'Planning_NoCategories' | localize }}
    router-link(to="/categories") {{ 'Planning_AddNewCategory' | localize }}

  section(v-else)
    div(
      v-for="cat in categories"
      :key="cat.id"
     )
      p
        strong {{ cat.title }} &nbsp
        | {{ cat.spend | currency }} {{ 'Planning_of' | localize }} {{ cat.limit | currency }}
      .progress(v-tooltip="cat.tooltip")
        .determinate(
          :class="[cat.progressColor]"
          :style="{width: cat.progressPercent + '%'}"
        )
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {

  name: 'planning',

  metaInfo () {
    return {
      title: this.$title('Menu_Planning')
    }
  },

  data: () => ({
    loading: true,
    categories: []
  }),

  computed: {
    ...mapGetters(['info'])
  },

  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      // Считаем сколько денег потрачено в этой категории
      const spend = records
        // Отфильтруем ненужные сатегории
        .filter(r => r.categoryId === cat.id)
        // оставляем только расходные операции
        .filter(r => r.type === 'outcome')
        // Считаем сумму
        .reduce((total, record) => {
          total += +record.amount
          return total
        }, 0)

      // Считаем проценты
      const percent = 100 * spend / cat.limit
      // Дополнительная проверка, чтобы вермтка не поехала
      const progressPercent = percent > 100 ? 100 : percent
      // Определяем цвет
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      // Высчитываем значение, которое будет передавать в директиву tooltip
      // Оборачиваем в Math.abs(), чтобы не было отрицательного значения (приводим к модулю)
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
