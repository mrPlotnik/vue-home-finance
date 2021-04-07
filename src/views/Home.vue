<template lang="pug">
.home
  .page-title
    h3 {{ 'Home_Amount' | localize }}
    button.btn.waves-effect.waves-light.btn-small(@click="refresh")
      i.material-icons refresh

  Loader(v-if="loading")

  .row(v-else)

    //- Передаем компоненту данные которые мы получили с сервера
    //- По этому необходимо принять его внутри компонента
    HomeBill(:rates="currency.conversion_rates")
    HomeCurrency(:rates="currency.conversion_rates" :date="currency.time_last_update_utc")

</template>

<script>

// Подключаем компоненты
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {

  name: 'Home',

  metaInfo () {
    return {
      title: this.$title('Menu_Bill')
    }
  },

  data: () => ({
    loading: true,
    currency: null
  }),

  async mounted () {
    // Загружаем котировки валют с сайта fixer.io
    // Экшн fethCurrency прописан в index.js
    this.currency = await this.$store.dispatch('fetchCurrency')
    console.log('🚀 ~ file: Home.vue ~ line 44 ~ mounted ~ currency', this.currency)
    // Выключаем лоадер
    this.loading = false
  },

  methods: {

    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }

  },

  // Регистрием компоненты
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
