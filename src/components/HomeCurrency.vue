<template lang="pug">
.col.s12.m6.l8
  .card.orange.darken-3.bill-card
    .card-content.white-text
      .card-header
        span.card-title Курс валют
      table
        thead
          tr
            th Валюта
            th Курс
            th Дата
        tbody
          tr(v-for="cur in currencies" :key="cur")
            td {{ cur }}
            td {{ getCurrency(cur).toFixed(5) }}
            td {{ date | date('date') }}

</template>

<script>
export default {

  props: ['rates', 'date'],

  data: () => ({
    currencies: ['USD', 'EUR', 'BTC']
  }),

  methods: {

    getCurrency (currency) {
      return this.rates.RUB / this.rates[currency]
    }

  }

}
</script>
