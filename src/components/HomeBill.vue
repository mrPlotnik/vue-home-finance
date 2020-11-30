<template lang="pug">
.col.s12.m6.l4
  .card.light-blue.bill-card
    .card-content.white-text
      span.card-title Счет в валюте
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
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    // Сейчас основная валюта это EUR, исправляем на RUB
    base () {
      return this.$store.getters.info.bill / (this.rates.RUB / this.rates.EUR)
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
