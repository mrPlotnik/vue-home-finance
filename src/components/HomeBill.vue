<template lang="pug">
.col.s12.m6.l4
  .card.light-blue
    .card-content.white-text
      span.card-title {{ 'HomeBill_BillInCurrency' | localize }}
      p.currency-line(
        v-for="cur in currencies"
        :key="cur"
      )
        span {{ getCurrency(cur) | currency(cur) }}
</template>

<script>
export default {

  // Принимаем данные
  props: ['rates'],

  data: () => ({
    currencies: ['RUB', 'USD', 'EUR', 'GBP']
  }),

  computed: {

    // Сейчас основная валюта это EUR, исправляем на RUB
    base () {
      return this.$store.getters.info.bill / this.rates.RUB
    }

  },

  methods: {

    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }

  }

}
</script>
