<template lang="pug">
.home
  .page-title
    h3 Счет
    button.btn.waves-effect.waves-light.btn-small(@click="refresh")
      i.material-icons refresh

  Loader(v-if="loading")

  .row(v-else)
    //- Передаем компоненту данные которые мы получили с сервера
    //- По этому необходимо принять его внутри компонента
    HomeBill(:rates="currency.rates")
    HomeCurrency(:rates="currency.rates" :date="currency.date")
</div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted () {
    // Экшн fethCurrency прописан в index.js
    this.currency = await this.$store.dispatch('fetchCurrency')
    // Показываем модель
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      console.log('refresh')
      this.loading = false
    }
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
